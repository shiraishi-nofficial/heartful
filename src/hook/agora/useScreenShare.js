import { createClient, createScreenVideoTrack } from "agora-rtc-react";
import { useEffect } from "react";
import generateAgoraToken from "../../function/generateAgoraToken";

const useScreenClient = createClient({ mode: "live", codec: "vp8" });
const SCREEN_SHARE_ID = 100;

const useScreenShare = ({liveId, closeScreenShare}) => {
    const useScreenTrack = createScreenVideoTrack();
    const screenClient = useScreenClient();
    const screenTracks = useScreenTrack();
      //['tracks']['ready']

    const publishScreen = async() => {
        const variables = { uid: SCREEN_SHARE_ID, cname: liveId, role: "publisher", type: "rtc" };
        const token = await generateAgoraToken(variables);
        await screenClient.setClientRole("host");
        await screenClient.join(import.meta.env.VITE_AGORA_WITH_TOKEN, liveId, token, SCREEN_SHARE_ID);
        await screenClient.publish(screenTracks['tracks']);
    }

    useEffect(()=>{
        if(screenTracks['error']){
            screenClient.leave();
            closeScreenShare();
        }
    }, [screenTracks['error']])

    useEffect(()=>{
        if(screenTracks['ready']){
            screenTracks['tracks'].on('track-ended', async ()=>{
                await screenTracks['tracks'].close();
                await screenClient.leave();
                // 画面をしまう
                closeScreenShare();
            })
            publishScreen();
        }
    }, [screenTracks['ready']])

    return {screenVideoTrack: screenTracks['tracks']}
};

export default useScreenShare;