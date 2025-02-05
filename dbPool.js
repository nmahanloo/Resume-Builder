const mysql = require('mysql');

const pool  = mysql.createPool({
    connectionLimit: 10,
    host: "bv2rebwf6zzsv341.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "jn983f0zgtjdma4z",
    password: "qudvcxb90kw5te6s",
    database: "bmaxshtg43yjjx81"
});

module.exports = pool;