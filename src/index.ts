import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import router from './router/index.js';
import { connect } from './db/index.js';

connect();

const app = express();

app.use(cors())
app.use(session({
    secret: 'hist',
    cookie: { maxAge: 60 * 1000 * 24 * 7 },
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req:any, res:any, next:any) => {
    console.log("method:" + req.method + ',url:' + req.url)
    next()
})
app.use('/public',express.static('./public'));

app.use((req:any, res:any, next:any) => {
    //模拟延迟
    setTimeout(() => {
        next();
    },0)
})
app.use(router);
app.use((req, res, next)=>{
    console.log(1,req,res,next);
    
})
const run = () => {
    app.listen(3000, () => {
        console.log('Server is running');
        console.log('http://localhost:3000');
    });
}
export default run;

