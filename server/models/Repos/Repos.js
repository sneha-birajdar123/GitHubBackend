import mongoose from "mongoose";
const repoSchema = mongoose.Schema({
    repoName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    keywords: {
        type: String,
        required: true
    },
    repoType:{
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
        unique: true
    }
},{
    timestamps: true
})

const repoModel = mongoose.model("repos", repoSchema, "repos")
export default repoModel

