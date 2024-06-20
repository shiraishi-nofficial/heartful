import { Button, Heading, VStack } from "@chakra-ui/react";
import IconSetting from "./performer/IconSetting";
import ChatInterface from "./chat/ChatInterface";

const ChatIndex = ({liveProfile, hasStarted, handleIconChange, setHasStarted}) => {
    return hasStarted
    ?<ChatInterface />
    :<VStack>
        <Heading>チャット</Heading>
        <IconSetting username={liveProfile.performerUsername} defaultIconUrl={liveProfile?.iconUrl} handleIconChange={handleIconChange} />
        <Button onClick={()=>setHasStarted(true)}>開始</Button>
    </VStack>
};

export default ChatIndex;




