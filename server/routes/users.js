var express = require('express');
const multer = require('multer');
var router = express.Router();
const queryEngine = require('../common/mysql').queryEngine;
const response = require('../common/response');
const { v5: uuidv5 } = require('uuid');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/../public/profile')
  },
  filename: function (req, file, cb) {
    const fileArray = file.originalname.split('.');
    const fileExtension = fileArray[fileArray.length - 1];
    cb(null, Date.now() + '.' + fileExtension)
  }
})

var upload = multer({ storage: storage })


/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    const users = await queryEngine.executeQuery("SELECT * FROM users");
    response.sendResponse(200, 'SUCCESS', users, res);
  } catch (err) {
    console.log("Error", err);
    response.sendResponse(500, 'Internal server error', err, res);
  }
});

/* GET users login. */
router.post('/login', async function (req, res, next) {
  const userData = req.body;
  try {
    if (!userData.email || !userData.password) {
      response.sendResponse(400, 'Email and password required', [], res);
      return;
    }
    const user = await queryEngine.executeQuery(`SELECT * FROM users WHERE email='${userData.email}' AND password='${userData.password}'`);
    if (user.length > 0) {
      const currentDate = new Date();
      const sessionId = uuidv5(`${userData.email}${currentDate}`, uuidv5.DNS);
      const userRespData = user[0];
      req.session[sessionId] = userRespData;
      userRespData.profileURL = `http://localhost:3000/public/profile/${userRespData.profileURL}`
      userRespData.sessionId = sessionId;
      response.sendResponse(200, 'SUCCESS', userRespData, res);
    } else {
      response.sendResponse(404, 'Invalid Email and password', [], res);
    }
  } catch (err) {
    console.log("Error", err);
    response.sendResponse(500, 'Internal server error', err, res);
  }
});


/**
 * @description User signup 
 */
router.post('/avatar', upload.single('avatar'), async function (req, res, next) {
  try {
    if (!req.headers.useragentid) {
      response.sendResponse(400, 'Invalid request session', [], res);
      return;
    }
    if (!req.file.filename) {
      response.sendResponse(400, 'Profile not uploaded', [], res);
      return;
    }
    const queryData = await queryEngine.executeQuery(`UPDATE users SET profileURL='${req.file.filename}' WHERE Id=${req.headers.useragentid}`);
    if (queryData.affectedRows > 0) {
      const profileURL = `http://localhost:3000/public/profile/${req.file.filename}`;
      response.sendResponse(200, 'SUCCESS', { profileURL }, res);
    } else {
      response.sendResponse(404, 'Somthing went wrong while updating', [], res);
    }
  } catch (err) {
    console.log("Error", err);
    response.sendResponse(500, 'Internal server error', err, res);
  }
});


/**
 * @description User signup 
 */
router.post('/password', async function (req, res, next) {

  try {
    const passwordData = req.headers.passtoken;
    const userId = req.headers.useragentid;

    if (!userId) {
      response.sendResponse(400, 'Invalid user token', [], res);
      return;
    } else if (!passwordData) {
      response.sendResponse(400, 'User password required', [], res);
    } else {
      const user = await queryEngine.executeQuery(`SELECT * FROM users WHERE Id=${userId}`);
      if (user.length > 0) {
        const oldPassword = req.headers.oldpassword;
        console.log("Old password",oldPassword);
        console.log("User",user[0]);
        if (oldPassword !== user[0].password) {
        console.log("Old password",oldPassword);
          response.sendResponse(400, 'Old password is incorrect', [], res);
          return;
        }
        const queryData = await queryEngine.executeQuery(`UPDATE users set password='${passwordData}' WHERE Id=${userId}`);
        if (queryData.affectedRows > 0) {
          response.sendResponse(200, 'SUCCESS', [], res);
        } else {
          response.sendResponse(404, 'Something went wrong', [], res);
        }
      } else {
        response.sendResponse(400, 'User not exists', [], res);
      }
    }
  } catch (err) {
    console.log("Error", err);
    response.sendResponse(500, 'Internal server error', err, res);
  }

});

/**
 * @description User Profile update 
 */
router.post('/profile', async function (req, res, next) {
  const userData = req.body;
  try {
    if (!userData.email || !userData.name || !userData.mobile || !userData.city || !userData.dob || !userData.user_id) {
      response.sendResponse(400, 'Some details are missing', [], res);
      return;
    }
    const queryData = await queryEngine.executeQuery(`UPDATE users SET name='${userData.name}', email='${userData.email}', mobile='${userData.mobile}', city='${userData.city}', dob='${userData.dob}' WHERE Id=${userData.user_id}`);
    if (queryData.affectedRows > 0) {
      response.sendResponse(200, 'SUCCESS', [], res);
    } else {
      response.sendResponse(404, 'Somthing went wrong while updating', [], res);
    }
  } catch (err) {
    console.log("Error", err);
    response.sendResponse(500, 'Internal server error', err, res);
  }
});

module.exports = router;
