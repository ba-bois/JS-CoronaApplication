import hkdf from "@panva/hkdf";
import * as jose from "jose";

async function getDerivedEncryptionKey(secret) {
    return await (0, hkdf.default)("sha256", secret, "", "NextAuth.js Generated Encryption Key", 32);
}

export default async function decode(params) {
    const { token, secret } = params;
    if (!token) {
        return null;
    }
    const encryptionSecret = await getDerivedEncryptionKey(secret);
    const { payload } = await (0, jose.jwtDecrypt)(token, encryptionSecret, {
        clockTolerance: 15,
    });
    return payload;
}