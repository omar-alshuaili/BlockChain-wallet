const router = require('express').Router();
const Users  = require('../model/user');
const defaultWallet  = require('../model/user');
const { validateUserRegister,validateUserLogin} = require('../validation')
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')

const crypto = require('crypto')
const dotenn = require('dotenv');
const sgMail = require('@sendgrid/mail')
var https = require("https");
dotenn.config();
//validation 
const Joi = require('@hapi/joi')




const schema = {
    name :Joi.string().min(3).max(255).required(),
    email:Joi.string().min(6).max(255).required().email(),
    password:Joi.string().min(6).max(255).required(),
}
router.post('/register', async (req,res) =>{
    const result2 =  ff(getWallet)
    console.log(result2);
    
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    // validation before adding users 

    const {error} = validateUserRegister(req.body)
    if(error) return res.status(400).send(error.details[0].message)



    const emailExist = await Users.findOne({email:req.body.email})
    if(emailExist) return res.status(400).send('email already exists')


    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt);



    const user = new Users({
        name:req.body.name,
        email:req.body.email,
        password:hashPassword,
        emailToken: crypto.randomBytes(64).toString('hex'),
        isVerified : false,
        // wallets : wallet.data.item.address

    })




//     sendGrid.setApiKey(process.env.SENDGRID_API_KEY)


    const msg = {
        from: 'project300-11@outlook.com',
        to: user.email,
        subject: 'Welcome to my website! – Please verfiy your account',
        text: `Hello ${user.name},
        To start using your account please use this code to verify your account
        http://localhost:4200/verify-email?token=${user.emailToken}
        `,
        html:`
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
<h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Hello ${user.name},</h1>
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
              <p style="margin: 0;">Tap the button below to confirm your email address.</p>
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
                          <a href="http://localhost:4200/verify-email?token=${user.emailToken}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Verify now</a>
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
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
              <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
              <p style="margin: 0;"><a href="http://localhost:4200/verify-email?token=${user.emailToken}" target="_blank">http://localhost:4200/verify-email?token=${user.emailToken}</a></p>
            </td>
          </tr>
          <!-- end copy -->

          <!-- start copy -->
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
              <p style="margin: 0;">Omar's lovely website,<br>Omar</p>
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
    res.status(201).json('Thanks for registering with us please check your email')

 
});





//log in 
router.post('/login', async (req,res) =>{

    //validation before logginging users 
   

    const {error} = validateUserLogin(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //check if the email exists 
    const user = await Users.findOne({email:req.body.email})
    if(!user) return res.status(400).send('email or password is wrong')

    //password is correct?
    const validPass = await bcrypt.compare(req.body.password,user.password)

    //check if verified
    const isVerified = await user.isVerified
    if(!isVerified) return res.status(400).send("Please verify your email first");

       
    //create token
    res.send(JSON.stringify('you can log in !'))
    const token = JWT.sign({_id:user._id},process.env.tokerSec)
    // res.header('auth-token',token).send(token)


});

router.get('/verify-email',async (req,res) => {
 

    try {
        console.log(1);
        const user = await Users.findOne({emailToken:req.query.token})
        if(!user){
            return res.status(404).json('Token is not valid.')
        }
       
        
        user.emailToken = null;
        user.isVerified = true;
        await user.save()
        

        return res.status(200).json('Thanks! Your email is verified you can log in now')

        } 
    catch (error) {

        return res.status(400).json('something went wrong please try again later')
    }
})





  var getWalletId = function(){
    var wallet ='123'
    var options = {
        "method": "POST",
        "hostname": "rest.cryptoapis.io",
        "path": "/v2/wallet-as-a-service/wallets/620bf50cf7a654000644660b/bitcoin/testnet/addresses",
        "qs": [],
        "headers": {
          "Content-Type": "application/json",
          "X-API-Key": "b97183b8611af75f133bc5d7f1db33d4344c6c56"
        }
      };

  var req = https.request(options, function (res) {
    var chunks = [];
    
    res.on("data", function (chunk) {
      chunks.push(chunk);
    });
  
    res.on("end", function () {
      var body = JSON.parse(Buffer.concat(chunks));

 
    wallet = body.data.item.address
    console.log(wallet);
    callback(wallet)
    });

  });

  req.write(JSON.stringify({
    "context": "",
    "data": {
        "item": {
            "label": "yourLabelStringHere"
        }
    }
}));



  req.end();
  
}
  



module.exports  = router
