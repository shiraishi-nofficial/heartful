import useAgoraChannel from "../hook/agora/useAgoraChannel";
import { AspectRatio, Button, VStack } from "@chakra-ui/react";
import useAgoraPublisher from "../hook/agora/useAgoraPublisher";
import { AgoraVideoPlayer } from "agora-rtc-react";

const VideoScreen = ({liveId, uid}) => {
    const {client, hasJoined, remoteUserList, screenVideoTrack, isPoorNetworkQuality} = useAgoraChannel({uid, cname: liveId});
    const {hasPublished, localVideoTrack, localAudioTrack, volume, isEnabled, isBlurred, publishAgora, toggleVideoOff, toggleAudioOff, toggleBackgroundBlurring} = useAgoraPublisher({client});

    return hasPublished
        ?<>ok</>
        :<VStack>
            {localVideoTrack&&<AspectRatio ratio={9/16} w={'full'}><AgoraVideoPlayer videoTrack={localVideoTrack} style={{height: '100%', width: '100%'}} /></AspectRatio>}
            {hasJoined&&<Button onClick={publishAgora}>スタート</Button>}
        </VStack>
};

export default VideoScreen;