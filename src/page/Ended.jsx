import { Text, VStack } from "@chakra-ui/react";
import * as Images from '../image/index';

const Ended = () => {
    return(
        <VStack pt={40} bgImage={`url(${Images.Bg})`} bgSize="cover" bgPosition="center" width="100%" height="100vh">
            <Text bg={'white'} px={3} py={5} rounded={'md'} fontWeight={'bold'}>占い部屋から退出しました。</Text>
        </VStack>
    )
};

export default Ended;