import { Button, Heading, Progress, VStack } from "@chakra-ui/react";
import IconSetting from "./performer/IconSetting";
import useAgoraChannel from "../hook/agora/useAgoraChannel";
import useAgoraAudioPublisher from "../hook/agora/useAgoraAudioPublisher";
import ChatInterface from "./chat/ChatInterface";
import FuncBox from "./FuncBox";
import { BsFillMicFill, BsFillMicMuteFill } from "react-icons/bs";

const AudioIndex = ({liveProfile, uid, chatHook, isPerformer, hasStarted, handleIconChange, setHasStarted}) => {
    const {client, hasJoined, remoteUserList, screenVideoTrack, isPoorNetworkQuality} = useAgoraChannel({uid: uid, cname: liveProfile?.id});
    const {hasPublished, localAudioTrack, volume, publishAgora, toggleAudioOff} = useAgoraAudioPublisher({client});
    const gradientPercentage = Math.min(Math.max(volume, 0), 100);

    const handleStart = async() => {
        await publishAgora();
        setHasStarted(true);
    };

    const funcBoxList = [
        {name: 'マイク', icon: !localAudioTrack?.enabled?BsFillMicMuteFill:BsFillMicFill, isOpen: !localAudioTrack?.enabled, onClick: toggleAudioOff},
    ];

    return hasPublished
        ?<VStack>
            <ChatInterface liveProfile={liveProfile} chatHook={chatHook} isPerformer={isPerformer} performerIconUrl={liveProfile.iconUrl} />
            <VStack w={'full'} p={5} color={'white'} justify={'end'} pos={'fixed'} top={'0'} right={'0'} >
                {funcBoxList.map((item, i)=><FuncBox key={i} {...item} coverBg={`linear-gradient(to right, green ${gradientPercentage}%, transparent ${gradientPercentage}%)`} />)}
            </VStack>
        </VStack>
        :<VStack spacing={3}>
            <Heading>オーディオ</Heading>
            <IconSetting username={liveProfile.performerUsername} defaultIconUrl={liveProfile?.iconUrl} handleIconChange={handleIconChange} />
            {localAudioTrack&&<Progress colorScheme='green' size='sm' value={volume} w={'full'} maxW={'sm'} />}
            {hasJoined&&localAudioTrack&&<Button mt={5} colorScheme="red" size={'lg'} variant={'outline'} onClick={handleStart}>開始</Button>}
        </VStack>
};

export default AudioIndex;


