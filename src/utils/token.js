"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.signToken = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var key = 'hist';
var signToken = function (_a) {
    var id = _a.id, type = _a.type;
    var token = jsonwebtoken_1.default.sign({ id: id, type: type }, key, { expiresIn: '12h' });
    return token;
};
exports.signToken = signToken;
var verifyToken = function (token) {
    try {
        var tokenKey = jsonwebtoken_1.default.verify(token, key);
        return {
            code: 200,
            msg: '校验成功',
            tokenKey: tokenKey,
        };
    }
    catch (_a) {
        return {
            code: 400,
            msg: '校验失败'
        };
    }
};
exports.verifyToken = verifyToken;
