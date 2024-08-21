import { Avatar, AvatarBadge, Box, Flex, HStack, Image, Stack, Text } from "@chakra-ui/react";

const ChatMessage = ({message, kind, isOwnMessage, isTheyOnline, iconUrl, time, handleDelete}) => (
    <Flex justifyContent={isOwnMessage ? 'flex-end' : 'flex-start'}>
        <Stack maxW="90%" m={2} spacing={0}>
            <HStack flexDirection={isOwnMessage ? 'row-reverse' : 'row'}>
                <Avatar src={iconUrl}>
                    {!isOwnMessage&&isTheyOnline&&<AvatarBadge boxSize='1.25em' bg='green.500' />}
                </Avatar>
                {kind==='text'
                    ?<Box bg={isOwnMessage ? '#f7f3be' : 'white'} p={3} borderRadius="md">
                        <Text color={isOwnMessage ? 'black' : 'black'} whiteSpace={'pre-wrap'}>{message}</Text>
                    </Box>
                    :<Image src={message} w={'50%'} />
                }
                <Stack justify={'end'} align={'flex-end'} h={'full'} spacing={0}>
                    <Text fontSize={'xs'} >{time}</Text>
                    {isOwnMessage&&<Text fontSize={'2xs'} fontWeight={'bold'} cursor={'pointer'} onClick={handleDelete}>削除</Text>}
                </Stack>
            </HStack>
        </Stack>
    </Flex>
);

export default ChatMessage