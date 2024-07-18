import { Box, Button, FormControl, FormLabel, IconButton, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Stack, Table, TableContainer, Tbody, Td, Textarea, Th, Thead, Tr } from "@chakra-ui/react";
import useChatTemplateList from "../../../hook/aws/useChatTemplateList";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";

const initialInputData = {weight: 50, content: ''};

const VerifiedScreen = () => {
    const [inputData, setInputData] = useState(initialInputData);
    const {chatTemplateList, postChatTemplate, removeChatTemplate, isReady} = useChatTemplateList();

    const handleSubmit = async() => {
        if(inputData.weight&&inputData.content.length){
            await postChatTemplate(inputData);
            setInputData(initialInputData);
        }
    };

    return isReady&&(
        <Box w={'full'}>
            <Stack>
                <FormControl>
                    <FormLabel>定型文</FormLabel>
                    <Textarea value={inputData.content} onChange={e=>setInputData(prev=>({...prev, content: e.target.value}))} />
                </FormControl>
                <FormControl>
                    <FormLabel>重み</FormLabel>
                    <NumberInput value={inputData.weight} onChange={e=>setInputData(prev=>({...prev, weight: parseInt(e, 10)}))}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>
                <Button onClick={handleSubmit}>作成</Button>
            </Stack>
            <TableContainer mt={10}>
                <Table variant='simple' size={'sm'}>
                    <Thead>
                        <Tr>
                            <Th>削除</Th>
                            <Th>重み</Th>
                            <Th>定型文</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {chatTemplateList.map(item=><Tr key={item.id}>
                            <IconButton size={'xs'} icon={<MdDeleteForever />} colorScheme="red" onClick={()=>removeChatTemplate(item.id)} />
                            <Td>{item.weight}</Td>
                            <Td>{item.content}</Td>
                        </Tr>)}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default VerifiedScreen;