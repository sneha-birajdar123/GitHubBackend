import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    roleType: {
        type: String,
    },
    user_view_type: {
        type: String,
    },
    site_admin: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true,
        maxlength: 50,
        minlength: 2
    },
    company: {
        type: String,
        required: true
    },
    blog: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    hireable: {
        type: Boolean
    },
    bio: {
        type: String,
        required: true
    },
    twitter_username: {
        type: String
    },
    public_repos: {
        type: Number,
        required: true
    },
    public_gists: {
        type: Number,
        required: true
    },
    followers: {
        type: Number,
        required: true
    },
    following: {
        type: Number,
        required: true
    },
    userVerified: {
        email: {
            type: Boolean,
            default: false,
        },
        phone: {
            type: Boolean,
            default: false,
        },
    },
    userVerifyToken: {
        email: {
            type: String,

        },
        phone: {
            type: String,

        },
    }
},
    {
        timestamps: true,
    }
)

const userModel = mongoose.model("users", userSchema, "users")
export default userModel