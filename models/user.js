const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    hashPassword: {
        type: String,
        required: true
    },
    lateReturnFine: {
        type: Number,
        required: true,
        min: 0
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});

// Virtual for password to hash it before saving to the database
userSchema.virtual('password')
    .set(function(password) {
        this.hashPassword = bcrypt.hashSync(password, 10);
    });

// Method to authenticate a user
userSchema.methods.authenticate = function(password) {
    return bcrypt.compareSync(password, this.hashPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
