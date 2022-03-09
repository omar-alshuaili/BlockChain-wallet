const router = require('express').Router();
const https = require('https');
const dotenn = require('dotenv');
dotenn.config();






router.get('/:name', function(req,res){
    let coinName = req.params.name
    let str = '';
    var options = {
        "method": "GET",
        "hostname": "rest.coinapi.io",
        "path": `/v1/assets/`+coinName,
        "headers": {'X-CoinAPI-Key': process.env.ApiKey}
      };
  
    const request = https.request(options, (response) => {
        response.on('data', d => {
          str += d;
        });
        response.on('end', () => {
          try {
            let obj = JSON.parse(str);
            res.json(obj);
          } catch(e){
            console.log(e);
            res.status(500).json({ message: 'Something went wrong - parse error' });
          }
        });
    });
    request.end();
  
    request.on('error', (e) => {
      console.log(e);
      res.status(500).json({ message: 'Something went wrong - req error' });
    });
  });
module.exports  = router
