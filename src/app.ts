import Koa from 'koa';
import KoaRouter from 'koa-router';
import KoaJwt from "koa-jwt";
import KoaBody from "koa-body";

import StatusCode from './utils/status_code';
import Token from './middlewares/token';

const app = new Koa();
const router = new KoaRouter();


//Jwt配置
app.use(KoaJwt({ secret: Token.jwtSecret, passthrough: true, key: Token.jwtSecret }).unless({ path: [/^\/public/] }));

//错误捕捉中间件
app.use(function (ctx, next) {
    return next().catch((err) => {
        if (err.status) {
            ctx.body = {
                status: StatusCode.ErrorCustome(err.status, err.message)
            }
        } else {
            throw err;
        }
    });
});

router.post('/public/login', KoaBody(), (ctx) => {
    const user = {
        id: 1,
        username: "Join",
        password: "123456"
    };
    if (user && user.username) {
        let token = Token.setToken(user.id, user.username);
        ctx.body = {
            status: StatusCode.Success("成功了"),
            data: {
                user,
                token
            }
        }
    } else {
        ctx.body = {
            code: -1
        }
    }
});

router.post('/public/register', KoaBody(), (ctx) => {
    ctx.body = {
        code: 2
    }
});

router.get('/api', async (ctx, next) => {
    ctx.body = {
        code: 1
    }
});

import UserService from "./services/user"


router.get('/user', async (ctx, next) => {
    await next();
    ctx.response.body = '<h1>Hello, user</h1>';
});

router.get('/db', async (ctx, next) => {
    //await next();
    var name = 'aaa';
    await ctx.render('index', {
        name: name
    });

    var time = new Date();
    console.log(await UserService.findAll());
    var time2 = new Date();
    console.log((time2.getTime() - time.getTime()));
});


app.use(async (ctx, next) => {
    Token.verifyToken(ctx, next);
    await next();
});

app.use(router.routes());
app.use(router.allowedMethods());

// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');