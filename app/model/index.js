const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAlias: false,
    define: {
        timestamps: false
    },
    pool:{
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idel: dbConfig.pool.idel 
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Students = require('../model/student.model.js')(sequelize, Sequelize);

module.exports = db;