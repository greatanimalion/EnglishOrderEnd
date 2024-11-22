/**
 * 成功的返回信息格式
 * @param {Context}  ctx
 * @param { * } data 返回的数据
 * @param { string }  msg 提示信息
 * @param { number } code 状态码
 */
export function success(data = "", msg = 'success', code = 200) {
    return {
        data,
        code,
        msg,
    };
}


const errorMap = {
    0: "参数错误",
    1: "服务器错误",
    2: "未登录",
    3: "无权限",
    4: "资源不存在",
    5: "操作失败"
} as Record<number, string>
/**
 * 错误的返回信息格式
 * @param {number} code 状态码
 * @description 
 *  0:参数错误
 *  1:服务器错误
 *  2:未登录
 *  3:无权限
 *  4:资源不存在
 *  5:操作失败
 */
export function error(code: keyof typeof errorMap) {
    return {
        data: errorMap[code],
        msg: "error",
        code: 400,
    };
}
export default {
    success,
    error,
}


