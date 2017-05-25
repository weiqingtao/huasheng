var Sequelize = require('sequelize'); 
var sequelize =require('./ModelHeader')();

var ShopModel = sequelize.define('shops', {
	id: {type:Sequelize.BIGINT,primaryKey: true},
    uid: Sequelize.BIGINT,
    shopname: Sequelize.STRING,
    photourl: Sequelize.STRING,
    shopintr: Sequelize.STRING,
    shoptype: Sequelize.INTEGER,
    keywords: Sequelize.STRING,
    lng:Sequelize.DECIMAL,
    lat:Sequelize.DECIMAL,
    praise: Sequelize.BIGINT,
    liveflag:Sequelize.INTEGER,
    createtime:Sequelize.DATE
},{
		timestamps: false,
		//paranoid: true  //获取不到id的返回值
	});

module.exports = ShopModel;