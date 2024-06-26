import { AspectRatio } from "@chakra-ui/react";
import { AgoraVideoPlayer } from "agora-rtc-react";
import useScreenShare from "../hook/agora/useScreenShare";


const ScreenPlayer = ({liveId, useScreenShareState}) => {
    const {screenVideoTrack} = useScreenShare({liveId, closeScreenShare: useScreenShareState[1].off});
    return screenVideoTrack?(
        <AspectRatio ratio={16/9} w={'full'}>
            <AgoraVideoPlayer videoTrack={screenVideoTrack} style={{height: '100%', width: '100%'}} />
        </AspectRatio>
    ):(
        <></>
    )
};

export default ScreenPlayer;