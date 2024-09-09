import fs from "fs";
import path from "path";
import createHttpError from "http-errors";
import { JwtPayload, sign } from "jsonwebtoken";
import { Config } from "../config";

export class TokenService {
    generateAccessToken(payload: JwtPayload) {
        let privateKey: Buffer;
        try {
            privateKey = fs.readFileSync(
                path.join(__dirname, "../../certs/private.pem"),
            );
        } catch (error) {
            const err = createHttpError(
                500,
                "Error while generating private key",
            );
            throw err;
        }
        const accessToken = sign(payload, privateKey, {
            algorithm: "RS256",
            issuer: "auth-service",
            expiresIn: "1h",
        });
        return accessToken;
    }
    generateRefreshToken(payload: JwtPayload) {
        const refreshToken = sign(payload, Config.Refresh_Token_Secret!, {
            algorithm: "HS256",
            issuer: "auth-service",
            expiresIn: "1y",
            jwtid: payload.id,
        });
        return refreshToken;
    }
}
