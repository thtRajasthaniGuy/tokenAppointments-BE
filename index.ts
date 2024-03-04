import { app } from "./app";
import { mongoDbConnect } from "./src/config/db";
import bodyParser from "body-parser";
import http from "http";
import cors from "cors";
const server = http.createServer(app);

require("dotenv").config();
mongoDbConnect();



app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

app.use(function (req, res, next) {
  //to allow cross domain requests to send cookie information.
  res.header("Access-Control-Allow-Credentials", "true");

  // origin can not be '*' when crendentials are enabled. so need to set it to the request origin
  res.header("Access-Control-Allow-Origin", req.headers.origin);

  // list of methods that are supported by the server
  res.header("Access-Control-Allow-Methods", "OPTIONS,GET,PUT,POST,DELETE");

  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, X-XSRF-TOKEN"
  );
  next();
});

server.listen(process.env.PORT, () => {
  console.log(`API server is running at ${process.env.PORT}`);
});

export { app };