import express from "express";

import repoModel from "../../models/Repos/Repos.js";

const router = express.Router()

router.post("/createrepo", async (req, res)=>{
    try {

        let userInput = req.body
        await repoModel.create(userInput);
        res.status(200).json({msg: "Repo created successfully"})
        
    } catch (error) {
        console.log(error);
        res.status(200).json({msg: error})
    }
})

router.get("/getallrepos", async (req, res)=>{
    try {

        let getAll = await repoModel.find({})
        res.status(200).json(getAll)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error})
    }
});


router.get("/getonerepo/:id", async (req, res)=>{
    try {
        let repoId = req.params.id
        let getOne = await repoModel.findOne({_id: repoId})
        res.status(200).json(getOne)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error})
    }
});



router.put("/edit/:id", async (req, res)=>{
    try {
        let repoId = req.params.id;
        let userInput = req.body;
        await repoModel.updateOne({_id: repoId}, {$set: userInput});
        res.status(200).json({msg: "Repo updated successfully"})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error})
    }
})



router.delete("/deleteone/:id", async (req, res)=>{
    try {
        let repoId = req.params.id
        await repoModel.deleteOne({_id: repoId})
        res.status(200).json({msg: `repo deleted succesfully!`})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error})
    }
})


router.delete("/deleteall", async (req, res)=>{
    try {
        await repoModel.deleteMany({});
        res.status(200).json({msg: `all repos deleted.`})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error})
    }
})


export default router