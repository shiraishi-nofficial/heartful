import { createCameraVideoTrack, createMicrophoneAudioTrack } from "agora-rtc-react";
import { useEffect, useState } from "react";
import VirtualBackgroundExtension from "agora-extension-virtual-background";
import { registerExtensions } from "agora-rtc-sdk-ng/esm";

const useMicrophoneAudioTrack = createMicrophoneAudioTrack();
const useCameraVideoTrack = createCameraVideoTrack({encoderConfig: {width: 1280, height: 720, frameRate: 15}});

const useAgoraPublisher = ({client}) => {
    const [hasPublished, setHasPublished] = useState(false);
    const [volume, setVolume] = useState(0);
    const [isEnabled, setIsEnabled] = useState({video: true, audio: true});
    const {track: localAudioTrack, ready: micReady} = useMicrophoneAudioTrack();
    const {track: localVideoTrack, ready: cameraReady} = useCameraVideoTrack();
    const [processor, setProcessor] = useState(null);
    const [isBlurred, setIsBlurred] = useState(false);

    // 背景関連
    const extension = new VirtualBackgroundExtension();
    registerExtensions([extension]);

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

    const toggleBackgroundBlurring = async() => {
        if (localVideoTrack) {
          if(!isBlurred){
            processor.setOptions({type: 'blur', blurDegree: 3});
            await processor.enable();
            setIsBlurred(true)
          }else{
            processor.setOptions({type: 'blur', blurDegree: 3});
            await processor.disable();
            setIsBlurred(false);
          };
        }
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

    useEffect(()=>{
        const getProcessorInstance = async() => {
          if (!processor && localVideoTrack) {
            // Create a VirtualBackgroundProcessor instance
            let tmpProcessor = extension.createProcessor();
            try {
                // Initialize the extension and pass in the URL of the Wasm file
                await tmpProcessor.init("./assets/wasms");
            } catch(e) {
                console.log("Fail to load WASM resource!");return null;
            }
            // Inject the extension into the video processing pipeline in the SDK
            localVideoTrack.pipe(tmpProcessor).pipe(localVideoTrack.processorDestination);
            setProcessor(tmpProcessor)
          }
        }
        getProcessorInstance()
    }, [localVideoTrack]);

    return {hasPublished, localVideoTrack, localAudioTrack, volume, isEnabled, publishAgora, toggleVideoOff, toggleAudioOff, toggleBackgroundBlurring};
};

export default useAgoraPublisher;