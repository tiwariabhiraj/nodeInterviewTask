
const express = require('express');
const app = express();
require('dotenv').config();
const redis = require("redis");
import { RedisClient } from "./redis";
const fileUpload = require("express-fileupload");
app.use(fileUpload());
import { ConnectToDatabase } from "./DatabaseConnection/connect";
import { Router } from "./route/route";
import { SERVER, MONGO_CRED } from "./constant/constant"
app.use(express.json());
app.use('/user', Router);
const init = async () => {
    new ConnectToDatabase(MONGO_CRED.MAIN_THREAD);   // connect database
    new RedisClient(redis);                          // connect redis
}
app.listen(SERVER.PORT, () => {
    console.log(`Express server workng on port :${SERVER.PORT}`);
})
init();









