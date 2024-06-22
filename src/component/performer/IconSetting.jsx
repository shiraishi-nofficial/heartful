import { Avatar, Button, HStack, Heading, VStack } from "@chakra-ui/react";
import ImageForm from "../img/ImageForm";
import { useState } from "react";

const IconSetting = ({username, defaultIconUrl, handleIconChange}) => {
    const [iconName, setIconName] = useState('')
    const [iconFile, setIconFile] = useState(null);
    const [fileURL, setFileURL] = useState(defaultIconUrl||'');

    return(
        <VStack>
            <VStack spacing={1} border={'solid'} px={20} py={3}>
                <Heading size={'lg'}>あなたのアイコン</Heading>
                <Avatar src={fileURL} size={'2xl'} />
                <HStack>
                    <ImageForm name={'icon'} imageName={'icon/'+username} setImageFile={setIconFile} setFileURL={setFileURL} btnSize={'sm'} setIconName={setIconName} />
                    <Button size={'sm'} isDisabled={fileURL===defaultIconUrl} onClick={()=>handleIconChange({iconName, iconImage: iconFile})}>アイコン確定</Button>
                </HStack>
            </VStack>
        </VStack>
    )
};

export default IconSetting;