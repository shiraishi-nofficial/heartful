/* eslint-disable react/prop-types */
import { Button, Input, VStack } from "@chakra-ui/react";
import { useRef } from "react";

const ImageForm = ({setImageFile, setFileURL, setIconName, imageName}) => {
    const inputRef = useRef(null);

    const fileUpload = () => {
        inputRef.current.click();
      };

    const recieveImageFile = (e) => {
        setImageFile(e.target.files[0])
        const ext = e.target.files[0].name.split('.').pop()
        const fileName = `${imageName}.${ext}`
        setIconName(fileName)
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onload = (e) => {
            setFileURL(e.target.result)
        }
        reader.readAsDataURL(file)
    }
    return(
    <VStack>
        <Button colorScheme={'linkedin'} onClick={fileUpload} size={'sm'}>アイコン変更</Button>
        <Input id='image' ref={inputRef} type="file" hidden accept="image/*,.png,.jpg,.jpeg" variant='unstyled' onChange={(e) => recieveImageFile(e)} />
    </VStack>
    )
}

export default ImageForm;