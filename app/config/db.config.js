module.exports = {
    HOST : "localhost",
    USERNAME : "root",
    PASSWORD : "root",
    DB : "testdb",
    DIALECT : "mysql",
    pool : {
        max : 5,
        min : 0,
        acquire : 30000,
        idle: 10000
    }
};