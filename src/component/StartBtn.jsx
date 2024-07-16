import { Image } from "@chakra-ui/react";
import StartImg from '../image/kaisi.svg';

const StartBtn = (props) => {
    return(
        <Image src={StartImg} cursor={'pointer'} {...props} />
    );
};

export default StartBtn;