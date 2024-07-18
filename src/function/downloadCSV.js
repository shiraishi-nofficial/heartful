function downloadCSV(data, filename = 'data.csv') {
    // 2次元配列をCSV形式に変換する関数
    const arrayToCSV = (arr) => {
        return arr.map(row => 
            row.map(item => `"${item.toString().replace(/"/g, '""')}"`).join(',')
        ).join('\n');
    };

    // 2次元配列をCSV形式に変換
    const csvContent = arrayToCSV(data);

    // Blobオブジェクトを作成
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // ダウンロードリンクを生成
    const link = document.createElement("a");
    if (link.download !== undefined) { // ダウンロード属性がサポートされているかチェック
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

export default downloadCSV;