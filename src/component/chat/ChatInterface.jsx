import { useEffect, useRef, useState } from 'react';
import { Box, Flex, VStack, Text, Textarea, HStack, useToast, Image, Heading, Button, Select } from '@chakra-ui/react';
import ChatMessage from './ChatMessage';
import * as Images from '../../image/index';
import extractLocalTimeFromISOString from '../../function/extractLocalTimeFromISOString';
import ImageForm from '../img/ImageForm';
import { uploadImageToS3 } from '../../function/aws';
import useChatTemplateList from '../../hook/aws/useChatTemplateList';

const CHAT_MAX_LENGTH = 400;

const ChatInterface = ({chatHook, isPerformer, performerIconUrl, isTheyOnline, display}) => {
  const [iconFile, setIconFile] = useState(null);
  const [fileURL, setFileURL] = useState('');
  const [iconName, setIconName] = useState('');
  const role = isPerformer?'performer':'audience';
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const toast = useToast();
  const {chatTemplateList, isReady} = useChatTemplateList();

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

  const resetImg = () => {
    setIconFile(null);
    setFileURL('');
    setIconName('');
  };

  const sendImg = async() => {
    try{
        await uploadImageToS3({filename: iconName, file: iconFile});
        await chatHook.postChat({role, content: iconName, kind: 'img'});
        resetImg();
    }catch(e){
        toast({ title: 'アイコン設定失敗', description: "正常に更新されませんでした", status: 'error', duration: 9000, isClosable: true});
    }
  };

  // メッセージ送信後にスクロールをトリガー
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHook.chatLogList, messages]); // chatLogListとmessagesが更新されたときにスクロール

  return (
    <VStack w={'full'} h="80vh" display={display} bg={'skyblue'} position={'relative'}>
        {fileURL&&<VStack position={'absolute'} w={'full'} bg={'black'} top={'10%'} color={'white'} py={10} >
          <Heading size={'md'}>画像の確認</Heading>
          <Image src={fileURL} w={'50%'} />
          <HStack>
            <Button size={'xs'} colorScheme='purple' onClick={sendImg}>送信</Button>
            <Button size={'xs'} colorScheme={'blue'} variant={'outline'} onClick={resetImg}>キャンセル</Button>
          </HStack>
        </VStack>}
        <Flex direction="column" h="100%" w={'full'}>
            <Box flex="1" overflowY="auto">
                {chatHook.chatLogList.map(chatLog => (
                  <ChatMessage
                      key={chatLog.id}
                      message={chatLog.content}
                      kind={chatLog.kind}
                      time={extractLocalTimeFromISOString(chatLog.createdAt)}
                      isOwnMessage={isOwnChatLog(chatLog.role)}
                      isTheyOnline={isTheyOnline}
                      iconUrl={chatLog.role==='performer'&&performerIconUrl}
                  />
                ))}
                <div ref={messagesEndRef} /> {/* スクロール位置の参照ポイント */}
            </Box>
            <HStack px={1} py={4} spacing={0}>
                <VStack w={'full'} spacing={0}>
                  <HStack w={'full'}>
                    <Textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    mr={2}
                    focusBorderColor='#467c9e'
                    bg={'white'}
                    />
                  </HStack>
                  <HStack justify={'space-between'} w={'full'}>
                    <ImageForm setImageFile={setIconFile} setFileURL={setFileURL} setIconName={setIconName} />
                    <Text pr={2} fontSize={'xs'} color={CHAT_MAX_LENGTH<inputValue.length&&'red'} w={'full'} textAlign={'right'}>{inputValue.length}/{CHAT_MAX_LENGTH}</Text>
                  </HStack>
                </VStack>
                <VStack justify={'center'} h={'full'}>
                  <Image w={'full'} src={Images.Send} opacity={(inputValue.length<=0||CHAT_MAX_LENGTH<inputValue.length)&&.3} onClick={(inputValue.length>0&&CHAT_MAX_LENGTH>=inputValue.length)&&handleSendMessage} cursor={(inputValue.length<=0||CHAT_MAX_LENGTH<inputValue.length)?'not-allowed':'pointer'} />
                </VStack>
            </HStack>
            {isReady&&isPerformer&&<Select w={'full'} size={'sm'} placeholder='定型文から選ぶ' bg={'purple'} color={'white'} onChange={e=>setInputValue(e.target.value)} mt={-2}>
              {chatTemplateList.map(item=><option key={item.id} value={item.content}>{item.content}</option>)}
            </Select>}
        </Flex>
    </VStack>
  );
};

export default ChatInterface