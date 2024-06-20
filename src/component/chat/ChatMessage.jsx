import { Avatar, Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";

const ChatMessage = ({ message, isOwnMessage }) => (
    <Flex justifyContent={isOwnMessage ? 'flex-end' : 'flex-start'}>
        <Stack maxW="70%" m={2} spacing={0}>
            <HStack flexDirection={isOwnMessage ? 'row-reverse' : 'row'}>
                <Avatar />
                <Box border={'solid 1px'} borderColor={isOwnMessage ? '#93b2c4' : 'gray.700'} bg={isOwnMessage ? '#c5dceb' : 'white'} color={isOwnMessage ? 'white' : 'black'} p={3} borderRadius="md">
                    <Text color={isOwnMessage ? '#578099' : 'gray.500'}>{message}</Text>
                </Box>
                <Stack justify={'end'} h={'full'}>
                    <Text fontSize={'xs'} >18:49</Text>
                </Stack>
            </HStack>
            
        </Stack>
    </Flex>
);

export default ChatMessage