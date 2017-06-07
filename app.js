var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var index = require('./routes/index');
var users = require('./routes/users');
var home = require('./routes/home');
var admin = require('./routes/admin');
var msg = require('./routes/msg');
var search = require('./routes/search');
var pay = require('./routes/pay');
//加载ueditor 模块  
var ueditor = require("ueditor");  

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'recommand 128 bytes random string', // 建议使用 128 个字符的随机字符串    
cookie: { maxAge: 20 * 60 * 1000 }, //cookie生存周期20*60秒    
resave: true,  //cookie之间的请求规则,假设每次登陆，就算会话存在也重新保存一次    
saveUninitialized: true //强制保存未初始化的会话到存储器    
}));  //这些是写在app.js里面的 
app.use(express.static(path.join(__dirname, 'public')));

//使用模块  
app.use("/ueditor/ue", ueditor(path.join(__dirname, 'public'), function (req, res, next) {  
    // ueditor 客户发起上传图片请求  
    if (req.query.action === 'uploadimage') {  
        var foo = req.ueditor;  
  
        var imgname = req.ueditor.filename;  
  
        var img_url = '/images/ueditor/';  
        res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做  
        res.setHeader('Content-Type', 'text/html');//IE8下载需要设置返回头尾text/html 不然json返回文件会被直接下载打开  
    }  
    //  客户端发起图片列表请求  
    else if (req.query.action === 'listimage') {  
        var dir_url = '/images/ueditor/';  
        res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片  
    }  
    // 客户端发起其它请求  
    else {  
        // console.log('config.json')  
        res.setHeader('Content-Type', 'application/json');  
        res.redirect('/ueditor/jsp/config.json');  
    }  
}));  


var openPage = ['/','/aa','/users/zhuce','/users/login','/users/logout','/search/goods','/search/shop','/pay/putshopping'];
app.use(function(req, res, next) {
  var url = req.originalUrl;
  url = (url.split('?'))[0];
  if(openPage.indexOf(url)>-1){
      next();
    }else{
      if(req.session.loginbean){
        next();
      }else{
        res.redirect('/');
      }
    }
});


app.use('/', index);
app.use('/users', users);
app.use('/home', home);
app.use('/admin', admin);
app.use('/msg', msg);
app.use('/search', search);
app.use('/pay', pay);
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
