const router = require('express').Router();
const Users = require('../model/user');
const defaultWallet = require('../model/user');
const { validateUserRegister, validateUserLogin } = require('../validation')
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')
var deasync = require('deasync');
const crypto = require('crypto')
const dotenn = require('dotenv');
const sgMail = require('@sendgrid/mail')
var https = require("https");
dotenn.config();
var request = require('request');
var Cryptoapis = require('cryptoapis');
const ObjectID = require('mongodb').ObjectID;

//aws
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

//validation 
const Joi = require('@hapi/joi')
var querystring = require('querystring');

//google
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID_GOOGLE);




router.post('/register', async (req, res) => {

  console.log(1);

  // const OTP = await Math.floor(1000 + Math.random() * 9000);


  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  // validation before adding users 

  const { error } = validateUserRegister(req.body)


  if (error) return res.json(error.details[0].message)


  const emailExist = await Users.findOne({ email: req.body.email })
  console.log(emailExist);
  if (emailExist)  return res.status(400).send('email already exists')


  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);


  var code =  await Math.floor(1000 + Math.random() * 9000)
  const user = new Users({
    
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashPassword,
    isVerified: false,
    jwtToken: '',
    OTP: code

  })







  const msg = {
    from: 'project300-11@outlook.com',
    to: user.email,
    subject: 'Thanks for joining us – Please verfiy your account',
    text: `Hello ${user.firstName},
        To start using your account please use this code to verify your account
        ${code}
        `,
    html: `
        <!DOCTYPE html>
<html>
<head>

  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Email Confirmation</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
  /**
   * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
   */
  @media screen {
    @font-face {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: 400;
      src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(http://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
    }
    @font-face {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: 700;
      src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(http://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
    }
  }
  
  body,
  table,
  td,
  a {
    -ms-text-size-adjust: 100%; /* 1 */
    -webkit-text-size-adjust: 100%; /* 2 */
  }
  
  table,
  td {
    mso-table-rspace: 0pt;
    mso-table-lspace: 0pt;
  }
 
  img {
    -ms-interpolation-mode: bicubic;
  }
  
  a[x-apple-data-detectors] {
    font-family: inherit !important;
    font-size: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
    color: inherit !important;
    text-decoration: none !important;
  }
 
  div[style*="margin: 16px 0;"] {
    margin: 0 !important;
  }
  body {
    width: 100% !important;
    height: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
  }
  
  table {
    border-collapse: collapse !important;
  }
  a {
    color: #1a82e2;
  }
  img {
    height: auto;
    line-height: 100%;
    text-decoration: none;
    border: 0;
    outline: none;
  }
  </style>

</head>
<body style="background-color: #e9ecef;">
<h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Hello ${user.firstName},</h1>
  <!-- start body -->
  <table border="0" cellpadding="0" cellspacing="0" width="100%">

    <!-- start hero -->
    <tr>
      <td align="center" bgcolor="#e9ecef">
        <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
              <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Confirm Your Email Address</h1>
            </td>
          </tr>
        </table>
        <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
    <!-- end hero -->

    <!-- start copy block -->
    <tr>
      <td align="center" bgcolor="#e9ecef">
        <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

          <!-- start copy -->
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
              <p style="margin: 0;">use this code to verify your account</p>
            </td>
          </tr>
          <!-- end copy -->

          <!-- start button -->
          <tr>
            <td align="left" bgcolor="#ffffff">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                          <a  target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">${code}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- end button -->

  

          <!-- start copy -->
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
              <p style="margin: 0;">opencoin.shop,<br>the team</p>
            </td>
          </tr>
          <!-- end copy -->

        </table>
        <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
    <!-- end copy block -->

  </table>
  <!-- end body -->

</body>
</html>
        `
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
  await user.save()
  createID(user.email)
  res.status(201).json('Thanks for registering with us please check your email')
  
});





//log in 
router.post('/login', async (req, res) => {


  //check if the email exists 
  let user = await Users.findOne({ email: req.body.email })

  if (!user) return res.status(400).json('email or password is wrong')

  //password is correct?
  const validPass = await bcrypt.compare(req.body.password, user.password)
  if (!validPass) return res.status(400).json('not the correct password')
  //check if verified
  const isVerified = await user.isVerified
  if (!isVerified) return res.status(400).json("Please verify your email first");


  //create token
  const jwtToken = JWT.sign({ _id: user._id }, process.env.tokenSec , {
    expiresIn: "2m",
    })
  const refreshToken = JWT.sign({ _id: user._id}, process.env.refreshTokenSec, {
      expiresIn: "10m",
  });

 
    user.jwtToken = jwtToken
    await user.save()
  
  return res.status(200).json(
    {
      _id: user._id,
      jwtToken :user.jwtToken,
      pic: user.pic
    }

  );

});



router.get('/:id',async(req,res) =>{
  const user = await Users.findById(req.params.id)
  return res.json({_id:user._id,pic:user.pic,name:user.firstName,email:user.email})
})
router.get('/reset/find/:email',async(req,res) =>{
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  const user = await Users.findOne({email:req.params.email})
  if(!user) return res.status(404).json('account does not exist')

  var code =  await Math.floor(1000 + Math.random() * 9000)

    const msg = {
    from: 'project300-11@outlook.com',
    to: user.email,
    subject: 'Thanks for joining us – Please verfiy your account',
    text: `Hello ${user.firstName},
        use this code to reset your password
        ${code}
        `,
    html: `
        <!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Email Confirmation</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
  /**
   * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
   */
  @media screen {
    @font-face {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: 400;
      src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(http://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
    }
    @font-face {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: 700;
      src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(http://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
    }
  }
  
  body,
  table,
  td,
  a {
    -ms-text-size-adjust: 100%; /* 1 */
    -webkit-text-size-adjust: 100%; /* 2 */
  }
  
  table,
  td {
    mso-table-rspace: 0pt;
    mso-table-lspace: 0pt;
  }
 
  img {
    -ms-interpolation-mode: bicubic;
  }
  
  a[x-apple-data-detectors] {
    font-family: inherit !important;
    font-size: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
    color: inherit !important;
    text-decoration: none !important;
  }
 
  div[style*="margin: 16px 0;"] {
    margin: 0 !important;
  }
  body {
    width: 100% !important;
    height: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
  }
  
  table {
    border-collapse: collapse !important;
  }
  a {
    color: #1a82e2;
  }
  img {
    height: auto;
    line-height: 100%;
    text-decoration: none;
    border: 0;
    outline: none;
  }
  </style>

</head>
<body style="background-color: #e9ecef;">
<h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Hello ${user.firstName},</h1>
  <!-- start body -->
  <table border="0" cellpadding="0" cellspacing="0" width="100%">

    <!-- start hero -->
    <tr>
      <td align="center" bgcolor="#e9ecef">
        <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
              <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">reset your password</h1>
            </td>
          </tr>
        </table>
        <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
    <!-- end hero -->

    <!-- start copy block -->
    <tr>
      <td align="center" bgcolor="#e9ecef">
        <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

          <!-- start copy -->
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
              <p style="margin: 0;">use this code to reset your password</p>
            </td>
          </tr>
          <!-- end copy -->

          <!-- start button -->
          <tr>
            <td align="left" bgcolor="#ffffff">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                          <a  target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">${code}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- end button -->

  

          <!-- start copy -->
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
              <p style="margin: 0;">opencoin.shop,<br>the team</p>
            </td>
          </tr>
          <!-- end copy -->

        </table>
        <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
    <!-- end copy block -->

  </table>
  <!-- end body -->

</body>
</html>
        `
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
    user.OTP = code
  await user.save()
  

  return res.status(201).json('Reset code sent to your email')
})



router.post('/reset',async(req,res) =>{

  const user = await Users.findOne({email:req.body.email})

  if(user){
    const code = user.OTP
    console.log(code);
    console.log(req.body.OTP );
    if(req.body.OTP != code){
      return res.status(404).json('code is not correct, Please try again')
    }
    user.OTP = ''
    
    return res.status(201).json('Enter new password')

  }
})
router.post('/reset/password',async(req,res) =>{

  const user = await Users.findOne({email:req.body.email})
console.log(user);
  if(user){
    const salt = await bcrypt.genSalt(10);
    console.log(req.body.password);
    const hashPassword = await bcrypt.hash(req.body.password, salt); 
    user.password = hashPassword
    user.save()
    res.status(201).json('password change please log in')
  }
})



router.post('/verify/:email', async (req, res) => {


  try {
    console.log(req.email);

    const user = await Users.findOne({ email: req.params.email })
    console.log(req.body.otp );
    if (!user) {
      return res.status(404).json('Token is not valid.')
    }


    if(!user.OTP){
      return res.status(404).json('Please check your email to log in')
    }

    if(req.body.otp != user.OTP){
      return res.status(400).send('please enter the correct code')
    }
    else{
      user.OTP = ''
      user.isVerified = true;
      await user.save()
      res.status(200).json('verified')
    }
  }
  catch (error) {

    return res.status(400).json('something went wrong please try again later')
  }
})


const s3 = new aws.S3();
aws.config.update({
    accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
    region: 'eu-west-1',
    signatureVersion: 'v4',
});

upload = multer({
  fileFilter: (req, file, cb) => {
      if (file.mimetype === 'application/octet-stream' || file.mimetype === 'video/mp4'
          || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
          cb(null, true);
      } else {
          cb(new Error('Invalid file type'), false);
      }
  },
  storage: multerS3({
      acl: 'public-read',
      s3,
      bucket:`${process.env.AWS_BUCKET_NAME}` ,
      key: function (req, file, cb) {
          req.file = file.originalname;
          cb(null, file.originalname);
      }
  })
})


router.post('/upload',upload.array('file', 1), async(req,res)=>{
  
  try{
    let id = req.file.split('.')[0];
    const user = await Users.findById(id)

    user.pic = req.file
    await user.save()
    res.send( {file: req.file });
  }
  catch(e){
    res.json(e)
  }
})
router.get('/getpic/:id',(req,res)=>{
  aws.config.update({
    accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
});


const s3 = new aws.S3();


  async function getImage(){
    const data =  s3.getObject(
      {
          Bucket: `${process.env.AWS_BUCKET_NAME}`,
          Key: req.params.id +'.png'
      }
      
    ).promise();
    return data;
  }
  getImage()
  .then((img)=>{
   let image="'data:image/jpeg;base64," + encode(img.Body) ;
   image = image.toString()
   res.json({image})
   }).catch((e)=>{
         res.send(e)
   }) 


  function encode(data){
    let buf = Buffer.from(data);
    let base64 = buf.toString('base64');
    return base64
    }

})

function generateJwtToken() {
  // create token that expires in 15 minutes
  const tokenPayload = { exp: Math.round(new Date(Date.now() + 15*60*1000).getTime() / 1000) }
  return `fake-jwt-token.${btoa(JSON.stringify(tokenPayload))}`;
}



var https = require("https");

var options = {
  "method": "POST",
  "hostname": "rest.cryptoapis.io",
  "path": "/v2/wallet-as-a-service/wallets/6236127f41012f0006bd6da3/ethereum/ropsten/addresses/0xd1b0b13114b6fbac0c4e1e461d36c0933c2b454c/all-transaction-requests",
  "qs": {"context":"yourExampleString"},
  "headers": {
    "Content-Type": "application/json",
    "X-API-Key": "8b06bb20d76030cdad9d3ace873c3b6541393099"
  }
};

var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.write(JSON.stringify({
    "context": "yourExampleString",
    "data": {
        "item": {
            "callbackSecretKey": "yourSecretString",
            "callbackUrl": "https:\/\/example.com",
            "feePriority": "standard",
            "note": "yourAdditionalInformationhere",
            "recipientAddress": "0x1e6ed0d09b5054b968a4fe5f4859f3bd6b85297b"
        }
    }
}));

req.end();


async function createID(email){


  var body = {

  "context": "",
  "data": {
    "item": {
      "label": "yourLabelStringHere"
    }
  }
};

var bodyJSON = JSON.stringify(body);
var contentLength = body.length;

request.post({
  uri: 'https://rest.cryptoapis.io/v2/wallet-as-a-service/wallets/621c6a570a13dd0006361114/bitcoin/testnet/addresses',
  body: bodyJSON,
  headers: {
    'Content-Length': contentLength,
    'Content-Type': 'application/json',
    'X-Api-Key': '0044f886dc36efe657cf6b7eec589032a31f8d98'
  },

  method: 'POST'
}, 
function (err, res, data) {
  var jsonResponse = JSON.parse(data);
  jsonResponse.data.item.address
  

 

});
const user = await Users.updateOne({ email: email },{
  $push:{
    wallets:{
      "coin":"Bitcoin",
      "address" : `${'jsonResponse.data.item.address'}`
    }
  }
    })


console.log(user.wallets);


}


module.exports = router
