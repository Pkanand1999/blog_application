
const jwt = require('jsonwebtoken')
require('dotenv').config()
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY; //key of json web token
//verify token
async function verifyToken(token) {
    let payload =await jwt.verify(token, JWT_SECRET_KEY);
// console.log(payload,payload);
    return payload;
}

async function authLoginUser(req, res, next) {
    try{
        // seprate token and send to verify in loggedInUser function
const brearHeader=req.headers['authorization'];
if(typeof brearHeader !== 'undefined') {
    const[prefix,token] = brearHeader.split(' ');
 const verification=await verifyToken(token);
 req.verification=verification;

 next();
}else{
    return res.status(500).send({
        error: 'Something went wrong'
    })
}
    }catch(e){
        return res.status(500).send({
            error: 'Something went wrong'
        })
    }
}



module.exports =authLoginUser;