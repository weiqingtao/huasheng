var express = require('express');
var router = express.Router();
//var Sequelize = require('sequelize');
var Users = require('../models/UserModel');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/zhuce', function(req, res, next) {
	Users.create(req.body).then(function(rs){
		res.redirect(307,'./login');
	}).catch(function(err){
		// console.log('失败');
		// console.log(err);
		if(err.errors[0].path=='emailuniq')
		{
			res.send('email重复');
		}else if(err.errors[0].path=='nichenguniq'){
			res.send('昵称重复');
		}else{
			res.send('数据库错误,稍后再试');
		}
		
	})
});
router.post('/login', function(req, res, next) {
	Users.findOne({where:{email:req.body.email,pwd:req.body.pwd}}).then(function(rs){
		if(rs!=null){
			loginbean=new Object();
			loginbean.id = rs.id;
			loginbean.nicheng = rs.nicheng;
			loginbean.role = rs.role;
			loginbean.msgnum = rs.msgnum;
			req.session.loginbean=loginbean;
			res.redirect('/');
		}else{
			res.send("<script>alert('email/密码错误');location.href='/';</script>");
		}
	});
})

router.get('/logout', function(req, res, next) {
	delete req.session.loginbean;
	res.redirect('/');
})

module.exports = router;
