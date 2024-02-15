const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.CONNECTION_URL);

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName:{
        type: String,
        required: true,
        trim: true,
        maxLength: 20
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 20
    }
})

const accountSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, //Reference to the User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);

module.exports = {
    User,
    Account
}
