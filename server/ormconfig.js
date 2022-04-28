"use strict";
var dotenv_1 = require("dotenv");
var User_1 = require("./src/entities/User");
var Company_1 = require("./src/entities/Company");
var JobPost_1 = require("./src/entities/JobPost");
var JobPostSupport_1 = require("./src/entities/JobPostSupport");
var LikeCompany_1 = require("./src/entities/LikeCompany");
dotenv_1["default"].config();
var config = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: [User_1.User, Company_1.Company, JobPost_1.JobPost, JobPostSupport_1.JobPostSupport, LikeCompany_1.LikeCompany],
    logging: true,
    synchronize: false,
    keepConnectionAlive: true
};
module.exports = config;
