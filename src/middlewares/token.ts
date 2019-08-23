
import JsonWebToken from 'jsonwebtoken';
import StatusCode from '../utils/status_code';

export default class Token {

    //jwt加密方式
    static jwtSecret: string = 'jwtSecret';
    //token过期时间
    static tokenExpiresTime: string = '5s';

    //设置token
    static setToken(userId: any, username: any): any {
        let user = {
            id: userId,
            username: username
        }
        let token = JsonWebToken.sign(user, this.jwtSecret, { expiresIn: this.tokenExpiresTime });
        return token;
    }

    //校验token
    static verifyToken(ctx: any, next: any): void {
        //校验api和token
        if (ctx.url.match(/^\/api/) && ctx.header && ctx.header.authorization) {
            const parts = ctx.header.authorization.split(' ');
            if (parts.length === 2) {
                //取出token
                const scheme = parts[0];
                const token = parts[1];
                if (/^Bearer$/i.test(scheme)) {
                    try {
                        //jwt.verify方法验证token是否有效
                        JsonWebToken.verify(token, this.jwtSecret, { complete: true });
                    } catch (error) {
                        StatusCode.ThrowError(ctx, StatusCode.Error_Token);
                    }
                }
            }
        }
    }
}