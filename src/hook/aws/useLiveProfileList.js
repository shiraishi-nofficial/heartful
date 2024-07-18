import { useEffect, useState } from "react";
import { generateClient } from 'aws-amplify/api';
import { liveProfilesByType } from "../../constant/queries";

const useLiveProfileList = () => {
    const [liveProfileList, setLiveProfileList] = useState([]);
    const [isReady, setIsReady] = useState();
    const client = generateClient();

    const fetchLiveProfileList = async() => {
        const res = await client.graphql({query: liveProfilesByType, variables: {type: 'live'}, authMode: 'iam'})
        let tmpLiveProfileList = res.data.liveProfilesByType.items.reverse();
        setLiveProfileList(tmpLiveProfileList);
        setIsReady(true);
    };

    useEffect(()=>{
        fetchLiveProfileList();
    }, []);

    return {liveProfileList, isReady};
};

export default useLiveProfileList;