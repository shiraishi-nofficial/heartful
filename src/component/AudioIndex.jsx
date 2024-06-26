import { Avatar, Box, Button, Center, Heading, Icon, Image, Progress, Text, VStack, useBoolean } from "@chakra-ui/react";
import IconSetting from "./performer/IconSetting";
import useAgoraChannel from "../hook/agora/useAgoraChannel";
import useAgoraAudioPublisher from "../hook/agora/useAgoraAudioPublisher";
import ChatInterface from "./chat/ChatInterface";
import FuncBox from "./FuncBox";
import { BsFillMicFill, BsFillMicMuteFill } from "react-icons/bs";
import { MdScreenShare } from "react-icons/md";
import ScreenShareBox from "./ScreenShareBox";
import WatchScreenShareBox from "./WatchScreenShareBox";

const AudioIndex = ({liveProfile, uid, chatHook, isPerformer, setHasStarted, isTheyOnline}) => {
    const {client, hasJoined, remoteUserList, screenVideoTrack, isPoorNetworkQuality} = useAgoraChannel({uid: uid, cname: liveProfile?.id});
    const {hasPublished, localAudioTrack, volume, publishAgora, toggleAudioOff} = useAgoraAudioPublisher({client});
    const [isScreenShareShowed, setIsScreenShareShowed] = useBoolean(false);
    const useScreenShareState = useBoolean(false);
    const gradientPercentage = Math.min(Math.max(volume, 0), 100);

    const handleStart = async() => {
        await publishAgora();
        setHasStarted(true);
    };

    const performerFuncBoxList = [
        {name: '画面共有', icon: MdScreenShare, isOpen: isScreenShareShowed, onClick: ()=>{setIsScreenShareShowed.toggle()}},
    ];

    const funcBoxList = [
        {name: 'マイク', icon: !localAudioTrack?.enabled?BsFillMicMuteFill:BsFillMicFill, isOpen: !localAudioTrack?.enabled, onClick: toggleAudioOff, coverBg: `linear-gradient(to right, green ${gradientPercentage}%, transparent ${gradientPercentage}%)`},
        ...(isPerformer
            ?performerFuncBoxList
            :[]),
    ].filter(Boolean);

    return hasPublished
        ?<VStack w={'full'}>
            {isScreenShareShowed&&<ScreenShareBox useScreenShareState={useScreenShareState} screenVideoTrack={screenVideoTrack} liveId={liveProfile.id} onClose={setIsScreenShareShowed.off} />}
            {screenVideoTrack&&<WatchScreenShareBox screenVideoTrack={screenVideoTrack} />}
            <ChatInterface chatHook={chatHook} isPerformer={isPerformer} performerIconUrl={liveProfile.iconUrl} isTheyOnline={isTheyOnline} />
            <VStack p={5} color={'white'} justify={'end'} pos={'fixed'} top={'0'} right={'0'} >
                {funcBoxList.map((item, i)=><FuncBox key={i} {...item} />)}
            </VStack>
        </VStack>
        :<VStack spacing={3}>
            <Heading>オーディオ</Heading>
            {/* <Avatar boxSize={'xl'} src={'https://uranai.heartf.com/images3/0524.jpg'} /> */}
            {/* <IconSetting username={liveProfile.performerUsername} defaultIconUrl={liveProfile?.iconUrl} handleIconChange={handleIconChange} /> */}
            {localAudioTrack&&<Progress colorScheme='green' size='sm' value={volume} w={'full'} maxW={'sm'} />}
            {hasJoined&&localAudioTrack&&<Button mt={5} colorScheme="red" size={'lg'} variant={'outline'} onClick={handleStart}>開始</Button>}
        </VStack>
};

export default AudioIndex;


