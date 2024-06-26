import { Button, Center, Text } from "@chakra-ui/react";
import { useState } from "react";
import ScreenPlayer from "./ScreenPlayer";
import { BrowserView } from "react-device-detect";
import FancContainer from "./funcCtn/FancContainer";

const ScreenShareBox = ({useScreenShareState, liveId, screenVideoTrack, onClose}) => {
    const [boxWidth, setBoxWidth] = useState(300);
    return(
      <FancContainer title={'画面共有'} boxWidth={boxWidth} setBoxWidth={setBoxWidth} top={{base: 10, md: 20}} left={{base: 10, md: 64}} onClose={onClose}>
              {screenVideoTrack
                ?<Center mt={4}><Text>※共有中の画面があります</Text></Center>
                :useScreenShareState[0]
                  ?<ScreenPlayer useScreenShareState={useScreenShareState} liveId={liveId} />
                  :<Center mt={4}><BrowserView><Button colorScheme='red' variant={'outline'} onClick={()=>{useScreenShareState[1].on()}}>画面共有スタート</Button></BrowserView></Center>
              }
              <Text fontSize={'sm'} mt={2} textAlign={'center'}>※画面共有はPCからのみ可能です。</Text>
              {!screenVideoTrack&&<Text fontSize={'sm'} mt={2} textAlign={'center'}>※共有停止する際は、ブラウザの「共有停止」ボタンから停止してください。</Text>}
      </FancContainer>
    )
};

export default ScreenShareBox;