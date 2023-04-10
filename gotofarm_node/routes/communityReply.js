const express = require("express");

const db = require("./../modules/db_connect");

const bcrypt = require('bcrypt');


// const upload = require("./../modules/upload_img");

const multer = require("multer");

const router = express.Router();


router.use((req, res, next) => {
    next();
});
