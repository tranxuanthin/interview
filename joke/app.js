var express = require('express');  
const path = require('path');
const { engine } = require ('express-handlebars');
const cookieParser = require('cookie-parser');

const app = express();

const route = require('./routes/index');

const bodyParser = require('body-parser');

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.use(express.static(path.join(__dirname,'public')));
//template engine
app.engine('hbs', engine({
   extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname,'public/views'));

//route init
route(app);  

var server = app.listen(8001, function () {  
var host = server.address().address  
  var port = server.address().port  
 console.log("Example app listening at http://%s:%s", host, port)  
})  