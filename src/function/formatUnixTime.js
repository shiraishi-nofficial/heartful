function formatUnixTime(unixTimestamp) {
    // UNIXタイムスタンプはミリ秒単位でないことが多いため、1000倍します
    const date = new Date(unixTimestamp * 1000);

    // 各部分を取得
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // 月は0から11のため+1し、2桁にフォーマット
    const day = ("0" + date.getDate()).slice(-2); // 2桁にフォーマット
    const hours = ("0" + date.getHours()).slice(-2); // 2桁にフォーマット
    const minutes = ("0" + date.getMinutes()).slice(-2); // 2桁にフォーマット

    // フォーマットされた文字列を返す
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export default formatUnixTime;