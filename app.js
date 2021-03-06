var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejsLocals = require('ejs-locals');

var index = require('./routes/index');

var app = express();

app.engine('ejs',ejsLocals);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set("view engine",'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));

app.use('/',index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
//테스트
/*
var data = {count:0};
app.get('/',function(req,res) {
    //data.count++;
    res.render('index',data);
    //addCounter(res);
});
app.get('/reset',function(req,res) {
    setCounter(res,0);
});
*/

/*var mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/dev");
var db = mongoose.connection;
db.once("open",function() {
    console.log("DB connected!!");
});
db.on("error",function(err) {
    console.log("DB Error:", err);
});*/

/*var dataSchema = mongoose.Schema({
    name:String,
    count:Number
});

var Data = mongoose.model('data',dataSchema);
Data.findOne({name:"myData"},function(err,data) {
    if(err) return console.log("db error:",err);
    if(!data){
        Data.create({name:"myData",count:0},function(err,data) {
            if(err) return console.log("db creeate err:",err);
            console.log("Counter DB created!:",data);
        });
    }
});*/

/*app.get('/set/count',function(req,res) {
    if(req.query.count) setCounter(res,req.query.count);
    else getCounter(res);
});


function addCounter(res) {
    Data.findOne({name:"myData"},function(err,data){
        if(err) return console.log("Data error:",err);
        data.count++;
        data.save(function(err) {
            if(err) return console.log("Data error:",err);
            //res.render('index',data);
        });
        getCounter(res)
    });
}
app.get('/set/:num',function(req,res) {
    if(req.params.num) setCounter(res,req.params.num);
    else getCounter(res);
});

function setCounter(res, num) {
    Data.findOne({name:"myData"},function(err,data){
        if(err) return console.log("Data error:",err);
        data.count = num;
        data.save(function(err) {
            if(err) return console.log("Data error:",err);
            res.render('index',data);
        });
    });
}

function getCounter(res){
    Data.findOne({name:"myData"},function(err,data){
        if(err) return console.log("Data error:",err);
        res.render('index',data);
        console.log(data.count);
    });
}*/
