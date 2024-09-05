import { AspectRatio, Avatar, Box, Button, HStack, Stack, StackDivider, Text, VStack } from "@chakra-ui/react";
import useChatLogList from "../../../hook/aws/useChatLogList";
import usePatrolDuration from "../../../hook/aws/usePatrolDuration";
import useAgoraChannel from "../../../hook/agora/useAgoraChannel";
import { AgoraVideoPlayer } from "agora-rtc-react";
import WatchScreenShareBox from "../../WatchScreenShareBox";
import extractLocalTimeFromISOString from "../../../function/extractLocalTimeFromISOString";
import { useState } from "react";

const UID = Math.floor(1000000 + Math.random() * 9000000);

const VerifiedScreen = ({liveId, liveProfile}) => {
    const {client, hasJoined, remoteUserList, screenVideoTrack, isPoorNetworkQuality} = useAgoraChannel({uid: UID, cname: liveProfile?.id});
    const {isReady: isChatLogListReady, ...chatHook} = useChatLogList({liveId, isSub: true});
    const {elapsedSeconds} = usePatrolDuration({liveId, isActive: remoteUserList?.length});
    const [isWatching, setIsWatching] = useState(false);
    return(
        <VStack w={'full'} maxW={'700px'}>
            {isWatching
                ?<HStack w={'full'} spacing={0}>
                    {remoteUserList.map(remote=>(
                        <AspectRatio key={remote.uid} ratio={9/16} w={'50%'}>
                            <VideoScreen videoTrack={remote?.videoTrack} />
                        </AspectRatio>
                    ))}
                    {remoteUserList.length===0&&<Text>※まだ参加者がいません。</Text>}
                </HStack>
                :<Button onClick={()=>setIsWatching(true)} my={10} colorScheme="pink">スタート</Button>
            }
            {screenVideoTrack&&<WatchScreenShareBox screenVideoTrack={screenVideoTrack} />}
            <Stack divider={<StackDivider />} w={'full'} maxW={'700px'} border={'1px'} h={'30vh'} overflowY={'scroll'}>
                {chatHook.chatLogList.map(chatLog=>{
                    return(
                        <Stack key={chatLog.id} spacing={0} px={2}>
                            <Text>{chatLog.role} {extractLocalTimeFromISOString(chatLog.createdAt)}</Text>
                            <Text>{chatLog.content}</Text>
                        </Stack>
                    )
                })}
            </Stack>
            <VStack w={'full'}><Text>接続時間: {elapsedSeconds}秒</Text></VStack>
        </VStack>
    )
};

export default VerifiedScreen;

const VideoScreen = ({videoTrack}) => {
    return videoTrack
        ?<AgoraVideoPlayer videoTrack={videoTrack} style={{height: '100%', width: '100%'}} />
        :<Box><Avatar /></Box>
}