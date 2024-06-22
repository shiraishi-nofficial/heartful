import { Button, Heading, VStack } from "@chakra-ui/react";
import IconSetting from "./performer/IconSetting";
import ChatInterface from "./chat/ChatInterface";

const ChatIndex = ({liveProfile, chatHook, isPerformer, hasStarted, handleIconChange, setHasStarted}) => {
    return hasStarted
        ?<ChatInterface liveProfile={liveProfile} chatHook={chatHook} isPerformer={isPerformer} performerIconUrl={liveProfile.iconUrl} />
        :<VStack spacing={3}>
            <Heading>チャット</Heading>
            {isPerformer&&<IconSetting username={liveProfile.performerUsername} defaultIconUrl={liveProfile?.iconUrl} handleIconChange={handleIconChange} />}
            <Button mt={5} colorScheme="red" size={'lg'} variant={'outline'} onClick={()=>setHasStarted(true)}>開始</Button>
        </VStack>
};

export default ChatIndex;




