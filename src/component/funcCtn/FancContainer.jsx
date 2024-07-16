import { CloseIcon, DragHandleIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonGroup, Center, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import Draggable from "react-draggable";
import FuncWidthBtn from "./FuncWidthBtn";

const FancContainer = ({children, top=20, left=20, title, boxWidth, setBoxWidth, setCommentSize, opacity=.9, onClose}) => {
    return(
        <Draggable handle=".handle" bounds="body">
            <Box w={boxWidth+'px'} minH={'400px'} pos={'fixed'} pt={3} px={2} top={top} left={left} zIndex={1000} bg={'black'} opacity={opacity}>
                <Box color={'white'}>
                    <HStack justify={'center'} className="handle" cursor={'grab'}>
                        <DragHandleIcon w={'20px'} h={'20px'} pos={'absolute'} top={3} left={0} />
                        <Center><Heading size={'md'}>{title}</Heading></Center>
                        {onClose&&<CloseIcon w={'20px'} h={'20px'} pos={'absolute'} top={3} right={2} onClick={onClose} />}
                    </HStack>
                    <HStack justify={'center'} spacing={10} mt={2}>
                        <FuncWidthBtn setBoxWidth={setBoxWidth} />
                        {setCommentSize&&<VStack spacing={0}>
                            <Text fontSize={'xs'}>文字の大きさ</Text>
                            <ButtonGroup size={'xs'} isAttached variant="outline" colorScheme='white'>
                                <Button onClick={()=>{setCommentSize('xs')}}>小</Button>
                                <Button onClick={()=>{setCommentSize('md')}}>中</Button>
                                <Button onClick={()=>{setCommentSize('xl')}}>大</Button>
                            </ButtonGroup>
                        </VStack>}
                    </HStack>
                    {children}
                </Box>
            </Box>
        </Draggable>
    )
};

export default FancContainer;