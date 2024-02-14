const express = require("express");
const { newUser, existingUser, updateUser } = require("../types");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");
const {User, Account} = require("../db");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/signup", async (req, res)=>{
    const payload = req.body;
    const {success} = newUser.safeParse(payload);

    if(!success){
        res.status(411).json({
            message: "Invalid Input"
        });
        return;
    }

    const existingUser = await User.findOne({
        username: payload.username
    })

    if(existingUser){
        res.status(400).json({
            message:"User already exists"
        })
    }

    const user = await User.create({
        username: payload.username,
        password: payload.password,
        firstName: payload.firstname,
        lastName: payload.lastname,
    });

    const UserId = user["_id"];
    await Account.create({
        userId: UserId,
        balance: 1 + Math.floor(Math.random() * 10000)
    })
    
    const token = jwt.sign({
        UserId
    }, JWT_SECRET);

    req.headers.authorization = `Bearer ${token}`;

    res.status(200).json({
        message: "User created Successfully",
        token: token,
        firstName: payload.firstname
    })
})

router.post("/signin", async (req, res)=>{
    const payload = req.body;
    const {success} = existingUser.safeParse(payload);

    if(!success){
        res.status(411).json({
            message: "Invalid Input"
        })
    }

    const user = await User.findOne({
        username: payload.username,
        password: payload.password
    })

    if(user["_id"]){
        const token = jwt.sign({
            userId: user["_id"]
        }, JWT_SECRET);

        res.status(200).json({
            token: token,
            firstName: user.firstName,
        });

        return;
    }

    res.status(411).json({
        message: "Invalid username or password"
    })
});

router.put("/user", authMiddleware, async (req, res)=>{
    const payload = req.body;
    const {success} = updateUser.safeParse(payload);

    if(!success){
        res.status(411).json({
            message: "Invalid Input"
        });
        return;
    }

    await User.updateOne({
        _id : req.userId
    }, req.body);

    res.status(200).json({
        message: "Updated Sucessfully"
    })
});

router.get("/bulk", async (req, res)=>{
    const filter = req.query.filter || "";
    
    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    });

    res.json({
        user: users.map(u=>({
            username: u.username,
            firstName: u.firstName,
            lastName: u.lastName,
            _id: u._id
        }))
    })
})


module.exports = router;