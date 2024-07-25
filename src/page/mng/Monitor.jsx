import { FormControl, FormLabel, Heading, Input, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useLiveProfile from "../../hook/aws/useLiveProfile";
import VerifiedScreen from "../../component/mng/monitor/VerifiedScreen";
import useCheckPwd from "../../hook/useCheckPwd";

const PASS_CODE = 'feijaomoiajoifaljfklaw';
const IS_PERFORMER = false;

const Monitor = () => {
    const [targetPassCode, SetTargetPassCode] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const { liveId } = useParams();
    const {liveProfile, isReady, passCodeError} = useLiveProfile({liveId, passCode: '333', isPerformer: IS_PERFORMER});
    const {isValid} = useCheckPwd(PASS_CODE);


    useEffect(()=>{
        if(targetPassCode===PASS_CODE){
            setIsVerified(true);
        }
    }, [targetPassCode]);

    return(
        <VStack>
            <VStack spacing={0}>
                <Heading>配信監視画面</Heading>
                <Text>{isReady&&liveProfile.kind}</Text>
            </VStack>
            {(isVerified||isValid)
                ?<VerifiedScreen liveId={liveId} liveProfile={liveProfile} />
                :<FormControl maxW={'700px'}>
                    <FormLabel>パスワード</FormLabel>
                    <Input type='password' onChange={e=>SetTargetPassCode(e.target.value)} />
                </FormControl>
            }
        </VStack>
    )
};

export default Monitor;