import { AspectRatio, Box, Button, Divider, HStack, Heading, Image, Img, Progress, SimpleGrid, Stack, Text, VStack, useBoolean } from "@chakra-ui/react";
import useAgoraChannel from "../hook/agora/useAgoraChannel";
import useAgoraPublisher from "../hook/agora/useAgoraPublisher";
import { AgoraVideoPlayer } from "agora-rtc-react";
import VideoInterface from "./video/VideoInterface";
import FuncBox from "./FuncBox";
import ChatInterface from "./chat/ChatInterface";
import { useEffect, useState } from "react";
import ScreenShareBox from "./ScreenShareBox";
import WatchScreenShareBox from "./WatchScreenShareBox";
import StartBtn from "./StartBtn";
import * as Images from '../image/index';
import reload from "../function/reload";
import { useNavigate } from "react-router-dom";

const modeImgList = [
    {mode: 11, img: Images.Mode1},
    {mode: 12, img: Images.Mode2},
    {mode: 21, img: Images.Mode3},
    {mode: 22, img: Images.Mode4},
    {mode: 31, img: Images.Mode5},
    {mode: 32, img: Images.Mode6},
    {mode: 41, img: Images.Mode7},
    {mode: 42, img: Images.Mode8},
];

const VideoIndex = ({liveProfile, uid, setHasScreenShare, newMsgList, chatHook, isPerformer, hasStarted, setHasStarted, isTheyOnline}) => {
    const [isVideoModeShowed, setIsVideoModeShowed] = useBoolean(false);
    const [hasCommentShowed, setHasCommentShowed] = useBoolean(false);
    const [isCommentShowed, setIsCommentShowed] = useBoolean(false);
    const [isScreenShareShowed, setIsScreenShareShowed] = useBoolean(false);
    const useScreenShareState = useBoolean(false);
    const [videoMode, setVideoMode] = useState(31);
    const {client, hasJoined, remoteUserList, screenVideoTrack, isPoorNetworkQuality} = useAgoraChannel({uid, cname: liveProfile?.id});
    const {hasPublished, localVideoTrack, localAudioTrack, volume, isEnabled, isBlurred, publishAgora, toggleVideoOff, toggleAudioOff, toggleBackgroundBlurring} = useAgoraPublisher({client});
    const gradientPercentage = Math.min(Math.max(volume, 0), 100);

    const navitate = useNavigate();

    const handleStart = async() => {
        await publishAgora();
        setHasStarted(true);
    };

    const handleShowComment = () => {
        setHasCommentShowed.on();
        setIsCommentShowed.toggle();
    };

    const hasStartedFuncList = [
        {name: 'チャット', icon: Images.ChatImg, isOpen: isCommentShowed, onClick: handleShowComment},
    ];

    const performerFuncBoxList = [
        {name: '画面共有', icon: Images.ScreenShareImg, isOpen: isScreenShareShowed, onClick: ()=>{setIsScreenShareShowed.toggle()}},
    ];

    const funcBoxList = [
        {name: 'マイク', icon: !localAudioTrack?.enabled?Images.MicImgToumei:Images.MicImg, isOpen: !localAudioTrack?.enabled, onClick: toggleAudioOff, coverBg: `linear-gradient(to right, green ${gradientPercentage}%, transparent ${gradientPercentage}%)`},
        {name: 'カメラ', icon: !localVideoTrack?.enabled?Images.CameraImgToumei:Images.CameraImg, isOpen: !localVideoTrack?.enabled, onClick: toggleVideoOff},
        {name: 'モード', icon: Images.ModeImg, isOpen: isVideoModeShowed, onClick: ()=>setIsVideoModeShowed.toggle()},
        ...(hasStarted
            ?hasStartedFuncList
            :[]),
         ...(isPerformer
            ?performerFuncBoxList
            :[]),
        {name: '保留', icon: Images.Horyu, onClick: reload},
        {name: '退出', icon: Images.Leave, onClick: ()=>navitate('/ended')},
    ].filter(Boolean);

    useEffect(()=>{
        if(setHasScreenShare){
            if(screenVideoTrack){
                setHasScreenShare(true);
            }else{
                setHasScreenShare(false);
            }
        }
    }, [screenVideoTrack]);

    return hasPublished
        ?<Box w={'full'} pos={'relative'}>
            {/* {hasCommentShowed&&<Box display={!isCommentShowed&&'none'} pos={'absolute'} left={0} w={'full'} h={'full'} bg={'rgba(0, 0, 0, 0.5)'} zIndex={999}>
                <ChatInterface chatHook={chatHook} isPerformer={isPerformer} performerIconUrl={liveProfile.iconUrl} isTheyOnline={isTheyOnline} />
            </Box>} */}
            {isScreenShareShowed&&<ScreenShareBox useScreenShareState={useScreenShareState} screenVideoTrack={screenVideoTrack} liveId={liveProfile.id} onClose={setIsScreenShareShowed.off} />}
            {screenVideoTrack&&<WatchScreenShareBox screenVideoTrack={screenVideoTrack} />}
            {isVideoModeShowed&&<VStack px={10} py={3} color={'white'} pos={'absolute'} top={50} bg={'#321887'} zIndex={999999} rounded={'md'} borderColor={'white'} border={'1px'} opacity={.9}>
                <VStack>
                    <HStack>
                        <Img src={Images.VideoIcon} />
                        <Heading size={'md'} >ビデオモード変更</Heading>
                    </HStack>
                    <Divider borderColor="white" />
                </VStack>
                <SimpleGrid columns={4} gap={4}>
                    {modeImgList.map(item=>(
                        <VStack key={item.mode} boxSize={10}>
                            <Image src={item.img} bg={videoMode===item.mode&&'skyblue'} onClick={()=>setVideoMode(item.mode)} cursor={'pointer'} />
                        </VStack>
                    ))}
                </SimpleGrid>
            </VStack>}
            <Stack w={'full'} direction={{base: 'column', md: 'row'}} spacing={0}>
                <VideoInterface localVideoTrack={localVideoTrack} remoteUserList={remoteUserList} videoMode={videoMode} newMsg={newMsgList.length>0&&!isCommentShowed&&newMsgList[0]} />
                {hasCommentShowed&&<VStack w={'full'} pr={{base: 0, md: 28}} display={!isCommentShowed&&'none'}><ChatInterface chatHook={chatHook} isPerformer={isPerformer} performerIconUrl={liveProfile.iconUrl} isTheyOnline={isTheyOnline} /></VStack>}
            </Stack>
            <VStack p={5} color={'white'} justify={'end'} pos={'fixed'} top={'0'} right={'0'} zIndex={9999} >
                {funcBoxList.map((item, i)=><FuncBox key={i} {...item} />)}
            </VStack>
        </Box>
        :<VStack spacing={3} w={'full'}>
            {/* {isPerformer&&<IconSetting username={liveProfile.performerUsername} defaultIconUrl={liveProfile?.iconUrl} handleIconChange={handleIconChange} />} */}
            {localVideoTrack&&localAudioTrack&&<AspectRatio ratio={9/16} w={{base: '30%', md: '60%'}} maxH={'full'} maxW={'xs'}><AgoraVideoPlayer videoTrack={localVideoTrack} style={{height: '100%', width: '100%'}} /></AspectRatio>}
            {localVideoTrack&&localAudioTrack&&<Progress colorScheme='green' size='sm' value={volume} w={'60%'} maxW={'xs'} />}
            <HStack>
                {hasJoined&&localVideoTrack&&localAudioTrack&&<StartBtn onClick={handleStart} />}
                {localVideoTrack&&localAudioTrack&&<Button colorScheme={'purple'} onClick={toggleBackgroundBlurring}>背景ぼかし</Button>}
            </HStack>
        </VStack>
};

export default VideoIndex;


{/* <Box bg={'#467c9e'} py={3}>
    <Center><Text size={'lg'} fontWeight={'bold'} color={'white'}>残り5分10秒</Text></Center>
</Box> */}
