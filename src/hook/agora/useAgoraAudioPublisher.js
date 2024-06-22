import { createMicrophoneAudioTrack } from "agora-rtc-react";
import { useEffect, useState } from "react";

const useMicrophoneAudioTrack = createMicrophoneAudioTrack();

const useAgoraAudioPublisher = ({client}) => {
    const [hasPublished, setHasPublished] = useState(false);
    const [volume, setVolume] = useState(0);
    const [isEnabled, setIsEnabled] = useState({video: true, audio: true});
    const {track: localAudioTrack, ready: micReady} = useMicrophoneAudioTrack();

    const publishAgora = async() => {
        try{
            await client.setClientRole('host');
            if(!localAudioTrack.enabled){
                await localAudioTrack.setEnabled(true);
                await client.publish([localAudioTrack]);
                await localAudioTrack.setEnabled(false);
            }else{
                await client.publish([localAudioTrack]);
            };
        }catch(e){
            console.log(e);
        }
        setHasPublished(true);
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

    return {hasPublished, localAudioTrack, volume, isEnabled, publishAgora, toggleAudioOff};
};

export default useAgoraAudioPublisher;