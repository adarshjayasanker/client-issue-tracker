import express from 'express';

const healthApi = express.Router();

healthApi.get('/checknetwork', (req, res) => {
    try{
       res.json("Successful"); 
    }catch(error){
        res.json("Connection failed");
        console.error(error);
    }
})

export default healthApi;