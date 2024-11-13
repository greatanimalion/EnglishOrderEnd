import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import cors from 'cors';
// import router from './router/index.js';
import studentRouter from './router/student.js';

const app = express();

app.use(cors())
app.use(session({
    secret: 'hist',
    cookie: { maxAge: 60 * 1000 * 24 * 7 },
    resave: false,
    saveUninitialized: false
}));
app.use((req, res, next) => {
    console.log("method:" + req.method + ',url:' + req.url)
    next()
})

app.use((req, res, next) => {
    //模拟延迟
    setTimeout(() => {
        next();
    }, 1000)
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(router);
app.use(studentRouter);




const run = () => {
    app.listen(3000, () => {
        console.log('Server is running');
        console.log('http://localhost:3000');
    });
}
export default run;



