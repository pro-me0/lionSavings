process.env.NODE_ENV = 'test';
process.env.PORT = 3000;
process.env.HOST = `http://localhost:${process.env.PORT}`;
main = require("./main.js")

main