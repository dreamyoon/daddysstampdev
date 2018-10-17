var express = require('express');

var app = express();

// app.get('/',function (req,res) {
//     res.send('Hello World!');
// });
var path = require('path');

app.use(express.static(path.join(__dirname,'/')));

app.listen(3000, function() {
    console.log('server start');
});