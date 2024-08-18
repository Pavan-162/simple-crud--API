const express = require('express');
const mongoose = require('mongoose');
const BrandName = require('./model');

const app = express();

app.use(express.json())

//Replace <password> with the password for the username of the user.

mongoose.connect('mongodb+srv://username:<password>@clustername.noi4z.mongodb.net/').then(
    () => console.log('DB connected...')
).catch(err => console.log(err))

app.post('/addbrands',async(req, res) => {
    const {brandname} = req.body;
    try{
        const  newData = new BrandName({brandname});
        await newData.save();
        return res.json(await BrandName.find())
    }
    catch(err){
        console.log(err.message);
    }
})

app.get('/getallbrands', async(req, res) => {
    try{
        const allData = await BrandName.find();
        return res.json(allData);
    }
    catch(err){
        console.log(err.message);
    }
})

app.get('/getallbrands/:id', async(req, res) => {
    try{
        const Data = await BrandName.findById(req.params.id)
        return res.json(Data);
    }
    catch(err){
        console.log(err.message);
    }
})

app.delete('/deletebrand/:id', async(req, res) => {
    try{
        await BrandName.findByIdAndDelete(req.params.id);
        return res.json(await BrandName.find())
    }
    catch(err){
        console.log(err.message);
    }
})

app.put('/putbrand/:id', async(req, res) => {
    try {
        const { id } = req.params;

        const brandname = await BrandName.findByIdAndUpdate(id, req.body);

        if(!brandname) {
            return res.status(404).json({message: "product not found"});
        }

        const updateBrandname = await BrandName.findById(id)
        res.status(200).json(updateBrandname);
    }catch(err){
        console.log(err.message);
    }
})

app.listen(3000,() => console.log('server running...'))