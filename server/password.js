function encryptPassword(pass) {
    const str1 = " ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890?!@#$%^&*()_+|;:,'.-`~";
    const str2 = "?!@#$%^&*()_+|;:,'.-`~1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ";
    let encryptedText = "";

    for (let i = 0; i < pass.length; i++) {
        const ori = pass.charAt(i);
        const lngPos = str1.indexOf(ori);
        if (lngPos >= 0) {
            const encryptedChar = str2.charAt(lngPos);
            encryptedText += encryptedChar;
        } else {
            encryptedText += ori;
        }
    }
    return encryptedText;
}

function decryptPassword(pass) {
    const str1 = "?!@#$%^&*()_+|;:,'.-`~1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ";
    const str2 = " ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890?!@#$%^&*()_+|;:,'.-`~";
    let decryptedText = "";

    for (let i = 0; i < pass.length; i++) {
        const ori = pass.charAt(i);
        const lngPos = str1.indexOf(ori);
        if (lngPos >= 0) {
            const decryptedChar = str2.charAt(lngPos);
            decryptedText += decryptedChar;
        } else {
            decryptedText += ori;
        }
    }
    return decryptedText;
}

module.exports = {encryptPassword,decryptPassword}