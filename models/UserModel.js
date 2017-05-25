var Sequelize = require('sequelize'); 
var sequelize =require('./ModelHeader')();

var UserModel = sequelize.define('users', {
	id: {type:Sequelize.BIGINT,primaryKey: true},
    email: Sequelize.STRING,
    pwd: Sequelize.STRING,
    nicheng: Sequelize.STRING,
    createtime:Sequelize.DATE,
    updtime:Sequelize.DATE,
    role:Sequelize.INTEGER,
    msgnum:Sequelize.INTEGER
},{
		timestamps: false,
		//paranoid: true  //获取不到id的返回值
	});

module.exports = UserModel;