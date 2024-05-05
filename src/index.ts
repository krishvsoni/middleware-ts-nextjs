import express from 'express';
import jwt from "jsonwebtoken";
const app = express();

let requestCount = 0;

//@ts-ignore
async function authMiddleware(req,res,next){
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token,'secret');
    if(decode){
        next();
    } else{
        res.status(401).send('Unauthorised');
    }
}

app.use(
    function middleware(req,res,next){
        requestCount++;
        next();
    }
);

app.get('/',authMiddleware,(req,res) => {
    res.send("Namaste Duniya");
})

app.get('/requestCount',(req,res) => {
    res.json({
        requestCount
    })
})

app.get('/author',(req,res) =>{
    res.json({
        'name':'Krish Soni',
        'date':'May 5,2024',
        'location':'Andromeda Galaxy',
        

    })
})

app.listen(3000,() =>{
    console.log('Server is Running..')
});