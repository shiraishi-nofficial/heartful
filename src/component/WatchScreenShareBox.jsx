import { AspectRatio } from "@chakra-ui/react";

import { AgoraVideoPlayer } from "agora-rtc-react";
import { useState } from "react";
import { isMobile } from "react-device-detect";
import FancContainer from "./funcCtn/FancContainer";

const WatchScreenShareBox = ({screenVideoTrack}) => {
  const [boxWidth, setBoxWidth] = useState(isMobile?200:400);

    return(
      <FancContainer title={'画面共有'} boxWidth={boxWidth} setBoxWidth={setBoxWidth} opacity={1} >
        <AspectRatio mt={3} w={'full'} ratio={screenVideoTrack._videoWidth/screenVideoTrack._videoHeight}>
          <AgoraVideoPlayer videoTrack={screenVideoTrack} style={{height: '100%', width: '100%'}} />
        </AspectRatio>
      </FancContainer>
    )
};

export default WatchScreenShareBox;