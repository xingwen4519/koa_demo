const StatusCode = {
    Success: (msg: string) => ({
        code: 1,
        msg,
    }),
    Error_Token: {
        code: 401,
        msg: '用户token过期，请重新登录'
    },
    Error_Insert: {
        code: 4,
        msg: '新增数据失败'
    },
    Error_Update: {
        code: 6,
        msg: '更新数据失败'
    },
    Error_Delete: {
        code: 8,
        msg: '删除数据失败'
    },
    Error_Login: {
        code: 10,
        msg: '登录失败'
    },
    ErrorCustome: (code: number, msg: string) => ({
        code: code || -1,
        msg,
    }),
    ThrowError: (ctx: any, err: any) => {
        ctx.throw(err.code, err.msg);
    }
}

export default StatusCode;