import jwt from 'jsonwebtoken';
const key = 'hist';
export const signToken = function ({ id, type }) {
    let token = jwt.sign({ id, type }, key, { expiresIn: '12h' });
    return token;
};
export const verifyToken = function (token) {
    try {
        let tokenKey = jwt.verify(token, key);
        return {
            code: 200,
            msg: '校验成功',
            tokenKey,
        };
    }
    catch {
        return {
            code: 400,
            msg: '校验失败'
        };
    }
};
