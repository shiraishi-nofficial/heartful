import { useEffect, useState } from "react";
import { generateClient } from 'aws-amplify/api';
import { listChatTemplates } from "../../graphql/queries";
import { createChatTemplate, deleteChatTemplate } from "../../graphql/mutations";

const useChatTemplateList = () => {
    const [chatTemplateList, setChatTemplateList] = useState([]);
    const [isReady, setIsReady] = useState();
    const client = generateClient();

    const fetchChatTemplateList = async() => {
        const res = await client.graphql({query: listChatTemplates, authMode: 'iam'});
        let tmpChatTemplateList = res.data.listChatTemplates.items.sort((a, b) => b.weight - a.weight);
        setChatTemplateList(tmpChatTemplateList);
        setIsReady(true);
    };

    const postChatTemplate = async(data) => {
        await client.graphql({query: createChatTemplate, variables: {input: data}, authMode: 'iam'});
        fetchChatTemplateList();
    };

    const removeChatTemplate = async(id) => {
        const input = { id: id };
        await client.graphql({query: deleteChatTemplate, variables: {input: input}, authMode: 'iam'});
        fetchChatTemplateList();
    };

    useEffect(()=>{
        fetchChatTemplateList();
    }, []);

    return {chatTemplateList, postChatTemplate, removeChatTemplate, isReady};
};

export default useChatTemplateList;