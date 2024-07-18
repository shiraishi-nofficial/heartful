import { generateClient } from "aws-amplify/api";
import { useEffect, useState } from "react";
import { getScreenShareDuration } from "../../graphql/queries";
import { createScreenShareDuration, updateLiveSessionDuration, updateScreenShareDuration } from "../../graphql/mutations";

const useScreenShareDuration = ({liveId, hasScreenShare}) => {
    const [screenShareDuration, setScreenShareDuration] = useState(0);
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [isReady, setIsReady] = useState(false);
    const client = generateClient();

    const fetchScreenShareDuration = async() => {
        const res = await client.graphql({query: getScreenShareDuration, variables: {liveId}, authMode: 'iam'});
        let targetDuration = res.data.getScreenShareDuration?.duration;
        if(targetDuration===undefined){
            await client.graphql({query: createScreenShareDuration, variables: {input: {liveId, duration: 0}}, authMode: 'iam'});
            targetDuration = 0;
        }
        setScreenShareDuration(targetDuration);
        setIsReady(true);
    };

    useEffect(()=>{
        if(liveId&&hasScreenShare){
            fetchScreenShareDuration();
        }
    }, [liveId, hasScreenShare]);

    useEffect(()=>{
        let intervalId;
        if(hasScreenShare&&isReady){
            intervalId = setInterval(async()=>{
                setElapsedSeconds(prev=>prev+5);
            }, 5000);
            return () => clearInterval(intervalId);
        }else{
            if(intervalId) clearInterval(intervalId);
        }
    }, [hasScreenShare, isReady]);

    useEffect(()=>{
        if(hasScreenShare&&isReady&&elapsedSeconds>0){
            client.graphql({query: updateScreenShareDuration, variables: {input: {liveId, duration: screenShareDuration+elapsedSeconds}}, authMode: 'iam'})
        }
    }, [elapsedSeconds, hasScreenShare]);

    return {screenShareDuration, isReady};
};

export default useScreenShareDuration;