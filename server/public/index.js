import express from "express";
import config from "config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

import userModel from "../models/Users/Users.js";
import sendSMS from "../utils/sendSMS.js";
import sendEmail from "../utils/sendEmail.js";

let jwt_secret = config.get("JWT_SECRET");
let URL = config.get("SERVER_URL");

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { role_type, user_view_type, site_admin, name, company, blog, location, email, phone, password, bio } = req.body

        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ msg: "Email already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const emailToken = Math.random().toString(36).substring(2);
        const phoneToken = Math.random().toString(36).substring(2);

        const newUser = {
            role_type,
            user_view_type,
            site_admin,
            name,
            company,
            blog,
            location,
            email,
            password: hashedPassword,
            bio,
            phone,
            userVerifyToken: {
                email: emailToken,
                phone: phoneToken,
            },
        }

        await userModel.create(newUser);

        let emailData = {
            from: "Team GitHub",
            to: email,
            subject: "Email Verification",
            html: "<h1> Team GitHub</h1>\n <p> Dear user, please verify your email by clicking on below link </p>\n ",
            text: `${URL}/api/public/emailverify/${emailToken}`
        }

        sendEmail(emailData)
        let smsData = {
            body: `dear user, please verify your email here, ${URL}/api/public/phoneverify/${phoneToken}`,
            to: phone
        }

        sendSMS(smsData);
        console.log(`${URL}/api/public/emailverify/${emailToken}`);
        console.log(`${URL}/api/public/phoneverify/${phoneToken}`);
        res.status(200).json({ msg: `You will be registered as new GitHub user once your verify your email and mobile via link provided on your email and phone number!🙌` })
   
    } catch (error) {
        console.log(error);
        res.status(200).json({ msg: error })
    }
})

router.get("/emailverify/:token", async (req, res) => {
    try {
        const { token } = req.params
        const user = await userModel.findOne({ "userVerifyToken.email": token });

        if (!user) {
            return res.status(400).json({ msg: "Invalid token." });
        }

        if (user.userVerified.email == true) {
            return res.status(400).json({ msg: "User email is already verified" })
        }

        user.userVerified.email == true
        user.userVerifyToken.email == null

        await user.save()

        res.status(200).json({ msg: "Email verified successfully" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error })
    }
})


router.get("/phoneverify/:token", async (req, res) => {
    try {

        const { token } = req.params.token
        const user = await userModel.findOne({ "userVerifytoken.phone": token })

        if (!user) {
            return res.status(400).json({ msg: "Invalid phone verificationtoken" })
        }

        if (user.userVerified.phone == true) {
            return res.status(400).json({ msg: "User phone is already verified" })
        }
        user.userVerified.phone == true
        user.userVerifyToken.phone == null
        await user.save()
        res.status(200).json({ msg: "Phone verified successfully" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error })
    }
})

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }

        if (!user.userVerified.email) {
            return res.status(400).json({ msg: "Please verify your email before logging in." });
        }

        if (!user.userVerified.phone) {
            return res.status(400).json({ msg: "Please verify your phone before logging in." });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ msg: "User LoggedIn Successfully", token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error })
    }
})


export default router;