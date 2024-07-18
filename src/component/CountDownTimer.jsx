import { Box, Center, Heading } from "@chakra-ui/react";
import * as Images from '../image/index';

const CountDownTimer = ({leftSeconds}) => {
    return(
    <Box bg={'#467c9e'} py={3} w={'full'} bgImage={`url(${Images.Header})`}>
        <Center>
            <Heading size={'md'} color={'white'}>
                {leftSeconds>0?`残り${leftSeconds>60?formatSecondsToMinutesAndSeconds(leftSeconds):`${Math.abs(leftSeconds)}秒`}`:`延長${leftSeconds*-1}秒`}
            </Heading>
        </Center>
    </Box>
    )
};

export default CountDownTimer;

function formatSecondsToMinutesAndSeconds(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}分${remainingSeconds}秒`;
}