require("dotenv").config();

const firebase = require("./services/firebase");
const http = require("http");

const PORT = process.env.PORT || 8080;

const server = http.createServer(async (req, res)=>{
    try{
          const url = new URL(req.url, `http://${req.headers.host}`);

        console.log(`${req.method} ${url.pathname}`);

        if (req.method === "OPTIONS") {
            res.writeHead(204, {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization, ngrok-skip-browser-warning",
                "Access-Control-Max-Age": "86400"
            });
            return res.end();
        }

        if (req.method === "GET" && url.pathname === "/health") {
            return sendJSON(res, { message: "Server is active." });
        }

        if(req.method === "POST"){
            switch(url.pathname){
                case("/message"):
                console.log("Message Recived")
                break
            }
        }
    }catch(err){
        console.error("SERVER ERROR:");
        console.error(err);
    }
})