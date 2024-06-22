import { AspectRatio, Box, Button, ButtonGroup, Center, Heading, Progress, VStack, useBoolean } from "@chakra-ui/react";
import IconSetting from "./performer/IconSetting";
import useAgoraChannel from "../hook/agora/useAgoraChannel";
import useAgoraPublisher from "../hook/agora/useAgoraPublisher";
import { AgoraVideoPlayer } from "agora-rtc-react";
import VideoInterface from "./video/VideoInterface";
import { BsFillCameraVideoFill, BsFillCameraVideoOffFill, BsFillMicFill, BsFillMicMuteFill } from "react-icons/bs";
import FuncBox from "./FuncBox";
import { IoChatboxEllipses } from "react-icons/io5";
import ChatInterface from "./chat/ChatInterface";
import { LuLayoutDashboard } from "react-icons/lu";
import { useState } from "react";

const VideoIndex = ({liveProfile, uid, chatHook, isPerformer, hasStarted, handleIconChange, setHasStarted}) => {
    const [isVideoModeShowed, setIsVideoModeShowed] = useBoolean(false);
    const [hasCommentShowed, setHasCommentShowed] = useBoolean(false);
    const [isCommentShowed, setIsCommentShowed] = useBoolean(false);
    const [videoMode, setVideoMode] = useState(31);
    const {client, hasJoined, remoteUserList, screenVideoTrack, isPoorNetworkQuality} = useAgoraChannel({uid, cname: liveProfile?.id});
    const {hasPublished, localVideoTrack, localAudioTrack, volume, isEnabled, isBlurred, publishAgora, toggleVideoOff, toggleAudioOff, toggleBackgroundBlurring} = useAgoraPublisher({client});
    const gradientPercentage = Math.min(Math.max(volume, 0), 100);

    const handleStart = async() => {
        await publishAgora();
        setHasStarted(true);
    };

    const handleShowComment = () => {
        setHasCommentShowed.on();
        setIsCommentShowed.toggle();
    };

    const hasStartedFuncList = [
        {name: 'コメント', icon: IoChatboxEllipses, isOpen: isCommentShowed, onClick: handleShowComment},
    ];

    const funcBoxList = [
        {name: 'マイク', icon: !localAudioTrack?.enabled?BsFillMicMuteFill:BsFillMicFill, isOpen: !localAudioTrack?.enabled, onClick: toggleAudioOff, coverBg: `linear-gradient(to right, green ${gradientPercentage}%, transparent ${gradientPercentage}%)`},
        {name: 'カメラ', icon: !localVideoTrack?.enabled?BsFillCameraVideoOffFill:BsFillCameraVideoFill, isOpen: !localVideoTrack?.enabled, onClick: toggleVideoOff},
        {name: 'モード', icon: LuLayoutDashboard, isOpen: isVideoModeShowed, onClick: ()=>setIsVideoModeShowed.toggle()},
        ...(hasStarted
            ?hasStartedFuncList
            :[]),
    ].filter(Boolean);

    return hasPublished
        ?<Box w={'full'} pos={'relative'}>
            {hasCommentShowed&&<Box display={!isCommentShowed&&'none'} pos={'absolute'} left={0} w={'full'} h={'full'} bg={'rgba(0, 0, 0, 0.5)'} zIndex={999}>
                <ChatInterface liveProfile={liveProfile} chatHook={chatHook} isPerformer={isPerformer} performerIconUrl={liveProfile.iconUrl} />
            </Box>}
            {isVideoModeShowed&&<VStack px={10} py={3} color={'white'} pos={'absolute'} top={50} bg={'black'} zIndex={999999}>
                <Heading size={'md'}>ビデオモード変更</Heading>
                <ButtonGroup size='xs' isAttached variant='outline'>
                    {[11, 12, 21, 22, 31, 32, 41, 42].map(key=><Button key={key} color={'white'} bg={videoMode===key&&'white'} onClick={()=>setVideoMode(key)}>{key}</Button>)}
                </ButtonGroup>
            </VStack>}
            <VideoInterface localVideoTrack={localVideoTrack} remoteUserList={remoteUserList} videoMode={videoMode} />
            <VStack p={5} color={'white'} justify={'end'} pos={'fixed'} top={'0'} right={'0'} zIndex={9999} >
                {funcBoxList.map((item, i)=><FuncBox key={i} {...item} />)}
            </VStack>
        </Box>
        :<VStack spacing={3}>
            <Heading>ビデオ</Heading>
            {isPerformer&&<IconSetting username={liveProfile.performerUsername} defaultIconUrl={liveProfile?.iconUrl} handleIconChange={handleIconChange} />}
            {localVideoTrack&&localAudioTrack&&<AspectRatio ratio={9/16} w={'full'} maxW={'sm'}><AgoraVideoPlayer videoTrack={localVideoTrack} style={{height: '100%', width: '100%'}} /></AspectRatio>}
            {localVideoTrack&&localAudioTrack&&<Progress colorScheme='green' size='sm' value={volume} w={'full'} maxW={'sm'} />}
            {hasJoined&&localVideoTrack&&localAudioTrack&&<Button mt={5} colorScheme="red" size={'lg'} variant={'outline'} onClick={handleStart}>開始</Button>}
        </VStack>
};

export default VideoIndex;


{/* <Box bg={'#467c9e'} py={3}>
    <Center><Text size={'lg'} fontWeight={'bold'} color={'white'}>残り5分10秒</Text></Center>
</Box> */}
