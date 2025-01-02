import express from "express"
import gistModel from "../../models/Gists/Gists.js"

const router = express.Router();

router.post("/creategist", async (req, res)=>{
    try {

        let userInput = req.body
        await gistModel.create(userInput);
        res.status(200).json({msg: "Gist created successfully."})
        
    } catch (error) {
        console.log(error);
        res.status(200).json({msg: error})
    }
})


router.get("/getallgists", async (req, res)=>{
    try {
        let getAll = await gistModel.find({})
        res.status(200).json({msg: getAll})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error})
    }
});


router.get("/getone/:id", async (req, res)=>{
    try {
        let paramsId = req.params.id
        let getOne = await gistModel.find({_id: paramsId})
        res.status(200).json({msg: getOne})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error})
    }
});

router.put("/edit/:id", async (req, res)=>{
    try {
        let gistId = req.params.id;
        let userInput = req.body;
        await gistModel.updateOne({_id: gistId}, {$set: userInput});
        res.status(200).json({msg: "Gist updated successfully"})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error})
    }
})


router.delete("/deleteone/:id", async (req, res)=>{
    try {
        let gistId = req.params.id
        await gistModel.deleteOne({_id: gistId})
        res.status(200).json({msg: "Gist deleted succesfully."})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error})
    }
})


router.delete("/deleteall", async (req, res)=>{
    try {
        await gistModel.deleteMany({});
        res.status(200).json({msg: "All gists deleted"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error})
    }
})


export default router