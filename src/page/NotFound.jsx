import { Text, VStack } from "@chakra-ui/react";

const NotFound = () => {
    return(
        <VStack pt={40}>
            <Text>ページが見つからないか、アクセス期間が過ぎています。</Text>
        </VStack>
    )
};

export default NotFound;