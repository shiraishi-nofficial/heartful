import { AspectRatio, Image } from "@chakra-ui/react";

const ImageDisplay = ({fileURL, ratio=16/9, ...props}) => {
    return <AspectRatio ratio={ratio} {...props}><Image src={fileURL} /></AspectRatio>
}

export default ImageDisplay;