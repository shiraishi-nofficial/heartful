import { HStack, Image, VStack } from "@chakra-ui/react";
import ChatInterface from "./chat/ChatInterface";
import StartBtn from "./StartBtn";
import * as Images from '../image/index';
import reload from "../function/reload";
import { useNavigate } from "react-router-dom";

const ChatIndex = ({liveProfile, chatHook, isPerformer, hasStarted, setHasStarted, isTheyOnline}) => {
    const navigate = useNavigate();
    return hasStarted
        ?<VStack w={'full'} h={'70vh'}>
            <HStack>
                <Image src={Images.Horyu} cursor={'pointer'} onClick={reload} />
                <Image src={Images.Leave} cursor={'pointer'} onClick={()=>navigate('/ended')} />
            </HStack>
            <ChatInterface chatHook={chatHook} isPerformer={isPerformer} performerIconUrl={liveProfile.iconUrl} isTheyOnline={isTheyOnline} />
        </VStack>
        :<VStack spacing={3} pt={40}>
            <StartBtn onClick={()=>setHasStarted(true)} />
        </VStack>
};

export default ChatIndex;




