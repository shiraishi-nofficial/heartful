import { Button, ButtonGroup, Text, VStack, useBreakpointValue } from "@chakra-ui/react";

const BASE_SM_WIDTH = 300;
const BASE_MD_WIDTH = 400;
const BASE_LG_WIDTH = 500;
const BASE_XL_WIDTH = 600;

const MD_SM_WIDTH = 400;
const MD_MD_WIDTH = 700;
const MD_LG_WIDTH = 1000;
const MD_XL_WIDTH = 1300;


const FuncWidthBtn = ({setBoxWidth}) => {
    const isMdBreakpoint = useBreakpointValue({ base: false, md: true });
    return(
    <VStack spacing={0}>
        <Text fontSize={'xs'}>欄の幅</Text>
        <ButtonGroup size="xs" isAttached variant="outline" colorScheme='white'>
            <Button onClick={()=>{setBoxWidth(isMdBreakpoint?MD_SM_WIDTH:BASE_SM_WIDTH)}}>小</Button>
            <Button onClick={()=>{setBoxWidth(isMdBreakpoint?MD_MD_WIDTH:BASE_MD_WIDTH)}}>中</Button>
            <Button onClick={()=>{setBoxWidth(isMdBreakpoint?MD_LG_WIDTH:BASE_LG_WIDTH)}}>大</Button>
            <Button onClick={()=>{setBoxWidth(isMdBreakpoint?MD_XL_WIDTH:BASE_XL_WIDTH)}}>特大</Button>
        </ButtonGroup>
    </VStack>
    )
};

export default FuncWidthBtn;