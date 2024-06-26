import { Button, Heading, VStack } from "@chakra-ui/react";
import ChatInterface from "./chat/ChatInterface";

const ChatIndex = ({liveProfile, chatHook, isPerformer, hasStarted, setHasStarted, isTheyOnline}) => {
    return hasStarted
        ?<ChatInterface chatHook={chatHook} isPerformer={isPerformer} performerIconUrl={liveProfile.iconUrl} isTheyOnline={isTheyOnline} />
        :<VStack spacing={3}>
            <Heading>チャット</Heading>
            <Button mt={5} colorScheme="red" size={'lg'} variant={'outline'} onClick={()=>setHasStarted(true)}>開始</Button>
        </VStack>
};

export default ChatIndex;




