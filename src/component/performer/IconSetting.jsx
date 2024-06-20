import { Button, HStack, VStack } from "@chakra-ui/react";
import ImageForm from "../img/ImageForm";
import ImageDisplay from "../img/ImageDisplay";
import { useState } from "react";

const IconSetting = ({username, defaultIconUrl, handleIconChange}) => {
    const [iconName, setIconName] = useState('')
    const [iconFile, setIconFile] = useState(null);
    const [fileURL, setFileURL] = useState(defaultIconUrl||'');

    return(
        <VStack>
            <VStack>
                <ImageDisplay fileURL={fileURL} ratio={1} w={{base: 'full', sm: '50%'}} />
                <HStack>
                    <ImageForm name={'icon'} imageName={'icon/'+username} setImageFile={setIconFile} setFileURL={setFileURL} btnSize={'sm'} setIconName={setIconName} />
                    <Button size={'sm'} isDisabled={fileURL===defaultIconUrl} onClick={()=>handleIconChange({iconName, iconImage: iconFile})}>送信</Button>
                </HStack>
            </VStack>
        </VStack>
    )
};

export default IconSetting;