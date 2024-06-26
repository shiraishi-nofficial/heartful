import { Box, Center, Text } from "@chakra-ui/react";

const CountDownTimer = ({leftSeconds}) => {
    return(
    <Box bg={'#467c9e'} py={3} w={'full'}>
        <Center>
            <Text size={'lg'} fontWeight={'bold'} color={'white'}>{leftSeconds>0?`残り${leftSeconds}秒`:`${leftSeconds}秒延長`}</Text>
        </Center>
    </Box>
    )
};

export default CountDownTimer;