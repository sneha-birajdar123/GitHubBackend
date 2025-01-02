import express from "express";
import userModel from "../../models/Users/Users.js";

const router = express.Router()

router.get("/getallusers", async (req, res) => {
    try {
        const users = await userModel.find({});
        res.status(200).json({ msg: "Users retrieved successfully", users})
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error })
    }
})

router.get("/getone/:id", async (req, res)=>{
    try {
        let userId = req.params.id
        let getOne = await userModel.find({_id: userId})
        res.status(200).json({msg: getOne})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error})
    }
});

router.put("/updateUserData/:id", async(req, res) => {
    try {
        let userId = req.params.id
        let userData = req.body
        await userModel.updateOne({ _id: userId }, { $set: userData })
        res.status(200).json({msg: "User updated successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error })
    }
})

router.delete("/deleteone/:id", async (req, res) => {
    try {
        let userId = req.params.id
        await userModel.deleteOne({ _id: userId })
        res.status(200).json({ msg: "User deleted successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error })
    }
})


router.delete("/deleteall", async (req, res) => {
    try {
        await userModel.deleteMany()
        res.status(200).json({ msg: "Deleted all users" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error })
    }
})

export default router
