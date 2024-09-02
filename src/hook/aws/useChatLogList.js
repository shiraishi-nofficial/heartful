import { generateClient } from "aws-amplify/api";
import { useEffect, useState } from "react";
import { chatLogsByLive } from "../../graphql/queries";
import { onCreateChatLog, onDeleteChatLog } from "../../graphql/subscriptions";
import { createChatLog, deleteChatLog } from "../../graphql/mutations";
import { getUrl } from "aws-amplify/storage";

const useChatLogList = ({liveId, role, isSub}) => {
    const [chatLogList, setChatLogList] = useState([]);
    const [newMsgList, setNewMsgList] = useState([]);
    const [isReady, setIsReady] = useState(false);
    const client = generateClient();

    const getChatLogList = async() => {
        const res = await client.graphql({query: chatLogsByLive, variables: {liveId}, authMode: 'iam'});
        const tmpChatLogList = await Promise.all(res.data.chatLogsByLive.items.map(async(item)=>{
            if(item.kind==='img'){
                const getUrlResult = await getUrl({
                    path: 'public/'+ item.content,
                    options: {
                        validateObjectExistence: false,  // Check if object exists before creating a URL
                        expiresIn: 90000 // validity of the URL, in seconds. defaults to 900 (15 minutes) and maxes at 3600 (1 hour)
                    }
                });
                return {...item, content: getUrlResult.url.href};
            }else{
                return item;
            }
        }));
        setChatLogList(tmpChatLogList);
        setIsReady(true);
    };

    const postChat = async({role, content, kind}) => {
        await client.graphql({query: createChatLog, variables: {input: {role, content, kind, type: 'chat', liveId}}, authMode: 'iam'});
    };

    const deleteChat = async(id) => {
        await client.graphql({query: deleteChatLog, variables: {input: {id}}, authMode: 'iam'});
    }

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
                                    next: async({ data }) => {
                                        let newChatLog = data.onCreateChatLog;
                                        if(role!==newChatLog.role){
                                            setNewMsgList(prev=>[newChatLog, ...prev]);
                                            setTimeout(()=>{
                                              setNewMsgList(prev=>prev.filter(item=>item.id!==newChatLog.id));
                                            }, 5000);
                                        }
                                        if(newChatLog.kind==='img'){
                                            const getUrlResult = await getUrl({
                                                path: 'public/'+ newChatLog.content,
                                                options: {
                                                    validateObjectExistence: false,  // Check if object exists before creating a URL
                                                    expiresIn: 90000 // validity of the URL, in seconds. defaults to 900 (15 minutes) and maxes at 3600 (1 hour)
                                                }
                                            });
                                            newChatLog = {...newChatLog, content: getUrlResult.url.href}
                                        }
                                        setChatLogList(prev=>[...prev, newChatLog]);
                                    },
                                    error: (error) => console.warn(error)
                                });
            const deleteSub = client
                                .graphql({query: onDeleteChatLog, variables: {filter: {liveId: {eq: liveId}}}, authMode: 'iam'})
                                .subscribe({
                                    next: async({ data }) => {
                                        let newChatLog = data.onDeleteChatLog;
                                        setChatLogList(prev=>prev.filter(item=>item.id!==newChatLog.id));
                                    },
                                    error: (error) => console.warn(error)
                                });
            return () => {
                createSub.unsubscribe();
                deleteSub.unsubscribe();
            }
        }
    }, [isReady, isSub]);

    return {chatLogList, newMsgList, isReady, postChat, deleteChat};
};

export default useChatLogList;