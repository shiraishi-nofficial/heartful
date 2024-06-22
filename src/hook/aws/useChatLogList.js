import { generateClient } from "aws-amplify/api";
import { useEffect, useState } from "react";
import { chatLogsByLive } from "../../graphql/queries";
import { onCreateChatLog } from "../../graphql/subscriptions";
import { createChatLog } from "../../graphql/mutations";

const useChatLogList = ({liveId, isSub}) => {
    const [chatLogList, setChatLogList] = useState([]);
    const [isReady, setIsReady] = useState(false);
    const client = generateClient();

    const getChatLogList = async() => {
        const res = await client.graphql({query: chatLogsByLive, variables: {liveId}, authMode: 'iam'});
        setChatLogList(res.data.chatLogsByLive.items);
        setIsReady(true);
    };

    const postChat = async({role, content, kind}) => {
        await client.graphql({query: createChatLog, variables: {input: {role, content, kind, type: 'chat', liveId}}, authMode: 'iam'});
    };

    useEffect(()=>{
        if(liveId){
            getChatLogList();
        }
    }, [liveId])

    useEffect(()=>{
        if(isReady&&isSub){
            const createSub = client
                                .graphql({query: onCreateChatLog, variables: {filter: {liveId: {eq: liveId}}}, authMode: 'iam'})
                                .subscribe({
                                    next: ({ data }) => {
                                        const newChatLog = data.onCreateChatLog;
                                        setChatLogList(prev=>[...prev, newChatLog]);
                                    },
                                    error: (error) => console.warn(error)
                                });
            return () => {createSub.unsubscribe()}
        }
    }, [isReady, isSub]);

    return {chatLogList, isReady, postChat};
};

export default useChatLogList;