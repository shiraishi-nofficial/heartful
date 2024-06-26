import { generateClient } from "aws-amplify/api";
import { useEffect, useState } from "react";
import { getLiveSessionDuration } from "../../graphql/queries";
import { onUpdateLiveSessionDuration } from "../../graphql/subscriptions";
import { updateLiveSessionDuration } from "../../graphql/mutations";

const useLiveSessionDuration = ({liveId, liveDuration, isTheyOnline, isActive}) => {
    const [originalLiveSessionDuration, setOriginalLiveSessionDuration] = useState(0);
    const [liveSessionDuration, setLiveSessionDuration] = useState(0);
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [leftSeconds, setLeftSeconds] = useState(0);
    const [isReady, setIsReady] = useState(false);
    const client = generateClient();

    const fetchLiveSessionDuration = async() => {
        const res = await client.graphql({query: getLiveSessionDuration, variables: {liveId}, authMode: 'iam'});
        const targetDuration = res.data.getLiveSessionDuration.duration;
        setLiveSessionDuration(targetDuration);
        setOriginalLiveSessionDuration(targetDuration)
        setLeftSeconds(liveDuration-targetDuration);
        setIsReady(true);
    };

    useEffect(()=>{
        if(liveId&&liveDuration){
            fetchLiveSessionDuration();
        }
    }, [liveId, liveDuration]);

    useEffect(()=>{
        let intervalId;
        if(isActive&&isTheyOnline&&isReady){
            intervalId = setInterval(async()=>{
                setElapsedSeconds(prev=>prev+1);
            }, 1000);
            return () => clearInterval(intervalId);
        }else{
            if(intervalId) clearInterval(intervalId);
        }
    }, [isActive, isTheyOnline, isReady]);

    useEffect(()=>{
        if(isActive&&isTheyOnline&&isReady&&elapsedSeconds>0){
            client.graphql({query: updateLiveSessionDuration, variables: {input: {liveId, duration: originalLiveSessionDuration+elapsedSeconds}}, authMode: 'iam'})
        }
    }, [elapsedSeconds, isActive, isTheyOnline, isActive]);

    useEffect(()=>{
        if(isReady){
            const updateSub = client
                                .graphql({query: onUpdateLiveSessionDuration, variables: {filter: {liveId: {eq: liveId}}}, authMode: 'iam'})
                                .subscribe({
                                    next: ({ data }) => {
                                        const newData = data.onUpdateLiveSessionDuration;
                                        setLiveSessionDuration(newData.duration);
                                        setLeftSeconds(liveDuration-newData.duration);
                                    },
                                    error: (error) => console.warn(error)
                                });
            return () => {updateSub.unsubscribe()}
        }
    }, [isReady]);

    return {liveSessionDuration, leftSeconds, isReady};
};

export default useLiveSessionDuration;