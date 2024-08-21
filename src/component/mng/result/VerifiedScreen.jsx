import { Box, Button, Center, IconButton, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import useLiveProfileList from "../../../hook/aws/useLiveProfileList";
import formatUnixTime from "../../../function/formatUnixTime";
import LiveKindName from "../../../function/LiveKindName";
import { FaDownload } from "react-icons/fa";
import downloadCSV from "../../../function/downloadCSV";
import { generateClient } from "aws-amplify/api";
import { chatLogsByLive } from "../../../graphql/queries";

const VerifiedScreen = () => {
    const client = generateClient();
    const {liveProfileList, isReady} = useLiveProfileList();

    const dlLiveProfileList = () => {
        const header = [
            '配信開始日時',
            '占い師',
            '種類',
            '予定秒数',
            '実績秒数',
            '画面共有時間',
            'ID',
        ]
        const tmpLiveProfileList = liveProfileList.map(item=>([
            formatUnixTime(item.starttime),
            item.performerUsername,
            LiveKindName(item.kind),
            item.duration,
            item?.sessionDuration?item.sessionDuration.duration:0,
            item?.screenShareDuration?item.screenShareDuration.duration:0,
            item.id,
        ]));
        const todayDate = getTodayDate();
        downloadCSV([header, ...tmpLiveProfileList], `livveProfileList_${todayDate}.csv`);
    }

    const dlChatLog = async(liveId) => {
        const header = [
            '日時',
            '発言者',
            '種類',
            '内容',
        ]
        const res = await client.graphql({query: chatLogsByLive, variables: {liveId}, authMode: 'iam'});
        const tmpChatLog = res.data.chatLogsByLive.items.map(item=>([
            item.createdAt,
            item.role,
            item.kind,
            item.content,
        ]));
        downloadCSV([header, ...tmpChatLog], `chatLog_${liveId}.csv`);
    };

    return isReady&&(
        <Box w={'full'}>
            <Center><Button onClick={dlLiveProfileList}>全件ダウンロード</Button></Center>
            <TableContainer>
                <Table variant='simple' size={'sm'}>
                    <Thead>
                        <Tr>
                            <Th>チャットDL</Th>
                            <Th>配信開始日時</Th>
                            <Th>占い師</Th>
                            <Th>種類</Th>
                            <Th>予定秒数</Th>
                            <Th>実績秒数</Th>
                            <Th>通信料概算</Th>
                            <Th>ID</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {liveProfileList.map(item=><Tr key={item.id}>
                            <Td><IconButton icon={<FaDownload />} onClick={()=>dlChatLog(item.id)} /></Td>
                            <Td>{formatUnixTime(item.starttime)}</Td>
                            <Td>{item.performerUsername}</Td>
                            <Td>{LiveKindName(item.kind)}</Td>
                            <Td>{item.duration}</Td>
                            <Td>{item?.sessionDuration?item.sessionDuration.duration:0}</Td>
                            <Td>{calculateFee((item?.sessionDuration?item.sessionDuration.duration:0), item.kind)}</Td>
                            <Td>{item.id}</Td>
                        </Tr>)}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default VerifiedScreen;

function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = ("0" + (today.getMonth() + 1)).slice(-2); // 月は0から11のため+1し、2桁にフォーマット
    const day = ("0" + today.getDate()).slice(-2); // 2桁にフォーマット

    return `${year}-${month}-${day}`;
}

const calculateFee = (sec, type) => {
    const unit = type==='video'
                    ?5
                    :type==='audio'
                        ?2.5
                        :2
    return Math.ceil((sec/60)*unit*2);
}