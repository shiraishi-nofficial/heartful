import { useState } from 'react';
import { Box, Flex, Button, VStack, Center, Text, Textarea, HStack } from '@chakra-ui/react';
import ChatMessage from './ChatMessage';

const ChatInterface = () => {
  const [messages, setMessages] = useState(initialChat);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      setMessages([...messages, { text: inputValue, own: true }]);
      setInputValue('');
    }
  };

  return (
    <VStack w={'full'}>
        <Flex direction="column" h="100vh" px={4} maxW={'1000px'}>
            <Box bg={'#467c9e'} py={3}>
                <Center><Text size={'lg'} fontWeight={'bold'} color={'white'}>残り5分10秒</Text></Center>
            </Box>
            <Box flex="1" overflowY="auto">
                {messages.map((message, index) => (
                <ChatMessage
                    key={index}
                    message={message.text}
                    isOwnMessage={message.own}
                />
                ))}
            </Box>
            <HStack p={4}>
                <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="文字を入力..."
                mr={2}
                focusBorderColor='#467c9e'
                />
                <Button onClick={handleSendMessage} colorScheme="blue" bg={'#467c9e'}>送信</Button>
            </HStack>
        </Flex>
    </VStack>
  );
};

export default ChatInterface

const initialChat = [
    { text: 'こんにちは！お元気ですか？', own: false },
    { text: 'こんにちは！元気です。あなたは？', own: true },
    { text: '私も元気です。今日は何をしていましたか？', own: false },
    { text: '今日は仕事をしていました。あなたは？', own: true },
    { text: '私は家でリラックスしていました。', own: false },
];