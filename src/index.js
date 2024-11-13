"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var express_session_1 = require("express-session");
var cors_1 = require("cors");
// import router from './router/index.js';
var student_js_1 = require("./router/student.js");
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, express_session_1.default)({
    secret: 'hist',
    cookie: { maxAge: 60 * 1000 * 24 * 7 },
    resave: false,
    saveUninitialized: false
}));
app.use(function (req, res, next) {
    console.log("method:" + req.method + ',url:' + req.url);
    next();
});
app.use(function (req, res, next) {
    //模拟延迟
    setTimeout(function () {
        next();
    }, 1000);
});
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
// app.use(router);
app.use(student_js_1.default);
var run = function () {
    app.listen(3000, function () {
        console.log('Server is running');
        console.log('http://localhost:3000');
    });
};
exports.default = run;
