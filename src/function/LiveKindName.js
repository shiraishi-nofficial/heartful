const LiveKindName = (kind) => {
    switch(kind){
        case 'chat':
            return 'チャット占い';
        case 'audio':
            return '音声占い';
        case 'video':
            return '映像占い';
        default:
            return '不明';
    }
};

export default LiveKindName;