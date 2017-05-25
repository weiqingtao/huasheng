var express = require('express');
var router = express.Router();
SphinxClient = require ("sphinxapi");
var sequelize =require('../models/ModelHeader')();
/* GET home page. */
router.get('/goods', function(req, res, next) {
	console.log('访问goods');
  //res.locals.loginbean = req.session.loginbean;
  keywords = req.query.keywords;
  kwArr = keywords.split(' ');
  len = kwArr.length;
  keyword = '';
  for(i=0;i<len;i++){
  	if(kwArr[i]!=''){
  		keyword += kwArr[i]+'|';
  	}
  }
  var cl = new SphinxClient();
  cl.SetServer('localhost', 9312);
  cl.SetMatchMode(SphinxClient.SPH_MATCH_ANY);		//或运算
  cl.Query(keyword,'goods',function(err, result) {
	        if(err){
	        	console.log(err);
	        	console.log('-------有错-----------');
	        	res.send(err);
	        	return;
	        }
	        sql ='select s.shopid,g.id,s.shopname, from goods g,shops,s'
	        rsGoods=[];
	        for(var key in result['matches']){ //循环查出的id
				goodsid = result['matches'][key].id;
				sequelize.query(sql,{replacements:[goods.id],type:sequelize.QueryTypes.UPDATE}).then(function(rs1){ 
          		
       })
			}
			res.send('成功');
   });
});


module.exports = router;