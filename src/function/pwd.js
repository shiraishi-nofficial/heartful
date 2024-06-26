export async function generatePwd(passcode) {
    // パスコードをUTF-8エンコードしてUint8Arrayに変換
    const encoder = new TextEncoder();
    const data = encoder.encode(passcode);

    // SHA-256でハッシュ化
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);

    // ハッシュをBase64エンコード
    const base64String = btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));
    return base64String.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); // URL-safe Base64
}

export async function verifyPwd(inputPasscode, storedPwd) {
    const generatedPwd = await generatePwd(inputPasscode);
    return generatedPwd === storedPwd;
}