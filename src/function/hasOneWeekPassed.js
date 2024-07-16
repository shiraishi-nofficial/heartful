function hasOneWeekPassed(unixTime) {
    const oneWeekInSeconds = 7 * 24 * 60 * 60; // 1週間分の秒数
    const currentTime = Math.floor(Date.now() / 1000); // 現在のUNIXタイムスタンプ（秒単位）
    
    return currentTime >= (unixTime + oneWeekInSeconds);
}

export default hasOneWeekPassed;