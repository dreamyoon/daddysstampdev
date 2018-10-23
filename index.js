var express = require('express');

var app = express();

// app.get('/',function (req,res) {
//     res.send('Hello World!');
// });
var path = require('path');
var mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/dev");
var db = mongoose.connection;
db.once("open",function() {
    console.log("DB connected!!");
});
db.on("error",function(err) {
    console.log("DB Error:", err);
});

var dataSchema = mongoose.Schema({
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
});

app.use(express.static(path.join(__dirname,'/')));
app.set("view engine",'ejs');

//테스트
//var data = {count:0};
app.get('/',function(req,res) {
    //data.count++;
    //res.render('index',data);
    addCounter(res);
});
app.get('/reset',function(req,res) {
    setCounter(res,0);
});

app.get('/set/count',function(req,res) {
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
}

app.listen(3000, function() {
    console.log('server start');
});