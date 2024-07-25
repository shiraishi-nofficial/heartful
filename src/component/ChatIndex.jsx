import { VStack } from "@chakra-ui/react";
import ChatInterface from "./chat/ChatInterface";
import StartBtn from "./StartBtn";
import * as Images from '../image/index';
import reload from "../function/reload";
import { useNavigate } from "react-router-dom";
import FuncBox from "./FuncBox";

const ChatIndex = ({liveProfile, chatHook, isPerformer, hasStarted, setHasStarted, isTheyOnline}) => {
    const navigate = useNavigate();

    const performerFuncBoxList = [
        {name: '保留', icon: Images.Horyu, onClick: reload},
    ];

    const funcBoxList = [
        ...(isPerformer
            ?performerFuncBoxList
            :[]),
        {name: '退出', icon: Images.Leave, onClick: ()=>navigate('/ended')},
    ].filter(Boolean);

    return hasStarted
        ?<VStack w={'full'} h={'70vh'}>
            <ChatInterface chatHook={chatHook} isPerformer={isPerformer} performerIconUrl={liveProfile.iconUrl} isTheyOnline={isTheyOnline} />
            <VStack p={5} color={'white'} justify={'end'} pos={'fixed'} top={'0'} right={'0'} >
                {funcBoxList.map((item, i)=><FuncBox key={i} {...item} />)}
            </VStack>
        </VStack>
        :<VStack spacing={3} pt={40}>
            <StartBtn onClick={()=>setHasStarted(true)} />
        </VStack>
};

export default ChatIndex;




