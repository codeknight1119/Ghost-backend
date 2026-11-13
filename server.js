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


function sendJSON(res, data, status = 200) {
    res.writeHead(status, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    });

    res.end(JSON.stringify(data));
}

function unauthorized(res) {
    return sendJSON(res, { error: "Unauthorized access" }, 401);
}

function notFound(res) {
    return sendJSON(res, { error: "Endpoint not found." }, 404);
}

function readBody(req) {
    return new Promise((resolve, reject) => {
        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {
            if (!body) return resolve(null);

            try {
                resolve(JSON.parse(body));
            } catch (err) {
                reject(err);
            }
        });

        req.on("error", reject);
    });
}

server.listen(PORT, async () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});