import { Box, Icon, Image, Text, VStack } from "@chakra-ui/react";

const FuncBox = ({icon, coverBg, onClick}) => {
    const length = {base: '60px', md: '80px'}
    return(
    <Box pos={'relative'}>
        <Image src={icon} w={length} h={length} cursor={'pointer'} onClick={onClick} />
        {/* <Box pos={'absolute'} h={'full'} w={'full'} rounded={'full'} bg={coverBg} /> */}
    </Box>
    // <VStack   justify={'center'}  p={2} rounded={'full'}>
    //     
    //     <
    // </VStack>
    )
};

export default FuncBox;