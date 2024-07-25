import { FormControl, FormLabel, Heading, Input, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import VerifiedScreen from "../../component/mng/result/VerifiedScreen";
import useCheckPwd from "../../hook/useCheckPwd";

const PASS_CODE = 'wopmlmlojo09klaf';

const Result = () => {
    const [targetPassCode, SetTargetPassCode] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const {isValid} = useCheckPwd(PASS_CODE);

    useEffect(()=>{
        if(targetPassCode===PASS_CODE){
            setIsVerified(true);
        }
    }, [targetPassCode]);

    return(
        <VStack pt={20}>
            <VStack spacing={0}>
                <Heading>配信実績画面</Heading>
            </VStack>
            {(isVerified||isValid)
                ?<VerifiedScreen />
                :<FormControl maxW={'700px'}>
                    <FormLabel>パスワード</FormLabel>
                    <Input type='password' onChange={e=>SetTargetPassCode(e.target.value)} />
                </FormControl>
            }
        </VStack>
    )
};

export default Result;