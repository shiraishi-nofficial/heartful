import { FormControl, FormLabel, Heading, Input, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import VerifiedScreen from "../../component/mng/chatTemplate/VerifiedScreen";

const PASS_CODE = 'i93okl3mfajwfa';

const ChatTemplate = () => {
    const [targetPassCode, SetTargetPassCode] = useState('');
    const [isVerified, setIsVerified] = useState(false);

    useEffect(()=>{
        if(targetPassCode===PASS_CODE){
            setIsVerified(true);
        }
    }, [targetPassCode]);

    return(
        <VStack pt={20} px={10}>
            <VStack spacing={0}>
                <Heading>チャット定型文管理画面</Heading>
            </VStack>
            {isVerified
                ?<VerifiedScreen />
                :<FormControl maxW={'700px'}>
                    <FormLabel>パスワード</FormLabel>
                    <Input type='password' onChange={e=>SetTargetPassCode(e.target.value)} />
                </FormControl>
            }
        </VStack>
    )
};

export default ChatTemplate;