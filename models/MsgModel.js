var Sequelize = require('sequelize'); 
var sequelize =require('./ModelHeader')();

var MsgModel = sequelize.define('msgs', {
	id: {type:Sequelize.BIGINT,primaryKey: true},
    sendid: Sequelize.BIGINT,
    toid: Sequelize.BIGINT,
    message: Sequelize.STRING,
    createtime:Sequelize.DATE
},{
		timestamps: false,
		//paranoid: true  //获取不到id的返回值
	});

module.exports = MsgModel;