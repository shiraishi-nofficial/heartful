import { generateClient } from "aws-amplify/api";
import { useEffect, useState } from "react";
import { createPatrolDuration, updatePatrolDuration } from "../../graphql/mutations";

const usePatrolDuration = ({liveId, isActive}) => {
    const [patrolDurationId, setPatrolDurationId] = useState('');
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [isReady, setIsReady] = useState(false);
    const client = generateClient();

    useEffect(()=>{
        if(liveId){
            client.graphql({query: createPatrolDuration, variables: {input: {liveId, duration: 0}}, authMode: 'iam'})
                .then(res=>{
                    setPatrolDurationId(res.data.createPatrolDuration.id);
                    setIsReady(true);
                });
        }
    }, [liveId]);

    useEffect(()=>{
        let intervalId;
        if(isActive&&isReady){
            intervalId = setInterval(async()=>{
                setElapsedSeconds(prev=>prev+5);
            }, 5000);
            return () => clearInterval(intervalId);
        }else{
            if(intervalId) clearInterval(intervalId);
        }
    }, [isActive, isReady]);

    useEffect(()=>{
        if(isActive&&isReady&&elapsedSeconds>0){
            client.graphql({query: updatePatrolDuration, variables: {input: {id: patrolDurationId, liveId, duration: elapsedSeconds}}, authMode: 'iam'})
        }
    }, [elapsedSeconds, isActive]);

    return {elapsedSeconds, isReady};
};

export default usePatrolDuration;