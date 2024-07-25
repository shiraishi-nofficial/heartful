import { Box, Center, Heading } from "@chakra-ui/react";
import * as Images from '../image/index';

const CountDownTimer = ({leftSeconds, isPerformer}) => {
    return(
    <Box bg={'#467c9e'} py={3} w={'full'} bgImage={`url(${Images.Header})`}>
        <Center>
            <Heading size={'md'} color={'white'}>
                {leftSeconds>0?'残り':'延長'}{formatSecondsToMinutesAndSeconds(leftSeconds, isPerformer)}
            </Heading>
        </Center>
    </Box>
    )
};

export default CountDownTimer;

function formatSecondsToMinutesAndSeconds(seconds, isPerformer) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return isPerformer?`${minutes}分${remainingSeconds}秒`:`${minutes}分`;
}