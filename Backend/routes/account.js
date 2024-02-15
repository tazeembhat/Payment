const express = require("express");
const {Account} = require("../db");
const { authMiddleware } = require("../middlewares/authMiddleware");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/balance", authMiddleware, async (req, res)=>{
    try{
        const account = await Account.findOne({
            userId: req.userId
        });

        res.status(200).json({
            balance: account.balance
        })
    }
    catch(err){
        res.status(400).json({
            msg: "Error occured while fetching the balance"
        })
        return;
    }
});

router.post("/transfer", authMiddleware, async (req, res)=>{
    const session = await mongoose.startSession();

    session.startTransaction();
    const {amount, to} = req.body;

    const fromAccount = await Account.findOne({userId: req.userId}).session(session);

    if(!fromAccount || fromAccount.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({userId: to}).session(session);

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid Account"
        });
    }

    //Perform money transfer
    await Account.updateOne(
        {userId: req.userId}, 
        {
            $inc: {balance: -amount}
        }).session(session);

    await Account.updateOne(
        {userId: to}, 
        {
            $inc: {balance: amount}
        }).session(session);

    //Commit the transaction
    await session.commitTransaction();

    res.status(200).json({
        message: "Transfer Successful"
    });

});

module.exports = router;