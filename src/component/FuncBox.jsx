import { Box, Icon, Text, VStack } from "@chakra-ui/react";

const FuncBox = ({name, icon, isOpen, coverBg, onClick}) => {
    const length = {base: '60px', md: '110px'}
    return(
    <VStack pos={'relative'} w={length} h={length} justify={'center'} bg={isOpen?'pink':'black'} p={2} rounded={'full'} cursor={'pointer'} onClick={onClick}>
        <Box pos={'absolute'} h={'full'} w={'full'} rounded={'full'} bg={coverBg} />
        <Icon as={icon} boxSize={{base: 6, md:10}} pos={'absolute'} top={{base: 3, md:6}} />
        <Text fontSize={{base: '2xs', md:'lg'}} fontWeight={'bold'} pos={'absolute'} bottom={{base: 2, md:4}}>{name}</Text>
    </VStack>
    )
};

export default FuncBox;