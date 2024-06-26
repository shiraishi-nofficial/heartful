import { useEffect, useRef, useState } from 'react';
import { Box, Flex, Button, VStack, Text, Textarea, HStack, useToast } from '@chakra-ui/react';
import ChatMessage from './ChatMessage';

const CHAT_MAX_LENGTH = 400;

const ChatInterface = ({chatHook, isPerformer, performerIconUrl, isTheyOnline}) => {
  const role = isPerformer?'performer':'audience';
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const toast = useToast();

  const handleSendMessage = async() => {
    if(inputValue.length===0){
      toast({ title: '文字数オーバー', description: `最大文字数は${CHAT_MAX_LENGTH}文字です。`, status: 'error', duration: 9000, isClosable: true});
      return;
    }
    if (inputValue.trim() !== '') {
      await chatHook.postChat({role, content: inputValue, kind: 'text'});
      setMessages([...messages, { text: inputValue, own: true }]);
      setInputValue('');
    }
  };

  const isOwnChatLog = (targetRole) => {
    if(isPerformer){
      return targetRole === 'performer';
    }else{
      return targetRole === 'audience';
    }
  };

  // メッセージ送信後にスクロールをトリガー
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHook.chatLogList, messages]); // chatLogListとmessagesが更新されたときにスクロール

  return (
    <VStack w={'full'}>
        <Flex direction="column" h="100vh" px={4} maxW={'1000px'}>
            <Box flex="1" overflowY="auto">
                {chatHook.chatLogList.map(chatLog => (
                  <ChatMessage
                      key={chatLog.id}
                      message={chatLog.content}
                      isOwnMessage={isOwnChatLog(chatLog.role)}
                      isTheyOnline={isTheyOnline}
                      iconUrl={chatLog.role==='performer'&&performerIconUrl}
                  />
                ))}
                <div ref={messagesEndRef} /> {/* スクロール位置の参照ポイント */}
            </Box>
            <HStack p={4}>
                <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="文字を入力..."
                mr={2}
                focusBorderColor='#467c9e'
                />
                <VStack spacing={0} justify={'end'} h={'full'}>
                  <Button isDisabled={inputValue.length<=0||CHAT_MAX_LENGTH<inputValue.length} onClick={handleSendMessage} colorScheme="blue" bg={'#467c9e'}>送信</Button>
                  <Text fontSize={'xs'} color={CHAT_MAX_LENGTH<inputValue.length&&'red'}>{inputValue.length}/{CHAT_MAX_LENGTH}</Text>
                </VStack>
            </HStack>
        </Flex>
    </VStack>
  );
};

export default ChatInterface