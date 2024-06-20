import { createCameraVideoTrack, createMicrophoneAudioTrack } from "agora-rtc-react";
import { useEffect, useState } from "react";
// import VirtualBackgroundExtension from "agora-extension-virtual-background";

const useMicrophoneAudioTrack = createMicrophoneAudioTrack();
const useCameraVideoTrack = createCameraVideoTrack();

const useAgoraPublisher = ({client}) => {
    const [hasPublished, setHasPublished] = useState(false);
    const [volume, setVolume] = useState(0);
    const [isEnabled, setIsEnabled] = useState({video: true, audio: true});
    const {track: localAudioTrack, ready: micReady} = useMicrophoneAudioTrack();
    const {track: localVideoTrack, ready: cameraReady} = useCameraVideoTrack();

    const publishAgora = async() => {
        try{
            await client.setClientRole('host');
            if(!localAudioTrack.enabled){
                await localAudioTrack.setEnabled(true);
                await client.publish([localAudioTrack, localVideoTrack]);
                await localAudioTrack.setEnabled(false);
            }else{
                await client.publish([localAudioTrack, localVideoTrack]);
            };
        }catch(e){
            console.log(e);
        };
        setHasPublished(true);
    };

    const toggleVideoOff = async() => {
        localVideoTrack.setEnabled(!localVideoTrack.enabled);
        setIsEnabled(prev=>({...prev, video: !localVideoTrack.enabled}));
    };
  
    const toggleAudioOff = async() => {
        localAudioTrack.setEnabled(!localAudioTrack.enabled);
        setIsEnabled(prev=>({...prev, audio: !localAudioTrack.enabled}));
    };

    useEffect(() => {
        const updateVolume = () => {
          const currentVolume = localAudioTrack.getVolumeLevel();
          setVolume(currentVolume*100);
        };
  
        let timerId;
  
        if(localAudioTrack){
          timerId = setInterval(updateVolume, 500);
        }
  
        return () => clearInterval(timerId);
    }, [localAudioTrack]);

    return {hasPublished, localVideoTrack, localAudioTrack, volume, isEnabled, publishAgora, toggleVideoOff, toggleAudioOff};
};

export default useAgoraPublisher;