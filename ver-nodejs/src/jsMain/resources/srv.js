let http = require("http");
let KT = require("pskov-ver-nodejs").org.opengamestudio;

KT.tmpHWFun();

let srv = http.createServer((req, res) => {
    res.write("Hello, world. Kotlin is in the console");
    res.end();
});
srv.listen(8099)

