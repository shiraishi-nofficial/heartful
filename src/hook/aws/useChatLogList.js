import { generateClient } from "aws-amplify/api";
import { useEffect, useState } from "react";
import { chatLogsByLive } from "../../graphql/queries";
import { onCreateChatLog } from "../../graphql/subscriptions";

const useChatLogList = ({liveId, isSub}) => {
    const [chatLogList, setChatLogList] = useState([]);
    const [isReady, setIsReady] = useState(false);
    const client = generateClient();

    const getChatLogList = async() => {
        const res = await client.graphql({query: chatLogsByLive, variables: {liveId}, authMode: 'iam'});
        setChatLogList(res.data.chatLogsByLive);
        setIsReady(true);
    };

    useEffect(()=>{
        if(liveId){
            getChatLogList();
        }
    }, [liveId])

    useEffect(()=>{
        if(isReady&&isSub){
            const createSub = client
                                .graphql({query: onCreateChatLog, variables: {filter: {liveId: {eq: liveId}}}})
                                .subscribe({
                                    next: ({ data }) => console.log(data),
                                    error: (error) => console.warn(error)
                                });
            return () => {createSub.unsubscribe()}
        }
    }, [isReady, isSub]);

    return {chatLogList};
};

export default useChatLogList;