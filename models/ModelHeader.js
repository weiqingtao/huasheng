var Sequelize = require('sequelize'); 
var seqConn = null;
var sequelize = function(){
		if(seqConn==null){
			console.log('创建连接');
			seqConn=new Sequelize('huasheng', 'root', '1234', {
			    host: '127.0.0.1',
			    dialect: 'mysql'
			});
		}
		return seqConn;
	}

module.exports = sequelize;