const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            maxlength: 30,
            unique: true
        },
        email: {
            unique: true,
            type: String,
            required: true,
            trim: true,
            minlength: 5,
            maxlength: 50,
            lowercase: true
        },
        password: {
            type: String,
            select: false,
            required: true,
            maxlength: 255
        },
        userType: {
            type: String,
            required: true,
            enum: ['visitor', 'admin', 'manager'],
            default: 'visitor'
        },
        cart: {
            type: [{
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Product'
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1
                },
            }],
            default: [],
        },
        refreshToken: {
            type: String
        },
        refreshExpires: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);

// hashing password
userSchema.pre('save', function (next) {
    const user = this;

    // if password not modified, skip hashing 
    if (!user.isModified('password')) return next();

    // if password is modified, hash it
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

// compare password
userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// generate jwt token
userSchema.methods.genTokens = function () {
    try {
        const authToken = jwt.sign(
            {                       // payload
                _id: this._id,
                username: this.username,
                email: this.email,
                userType: this.userType,
            }, 
            process.env.JWT_SECRET, // secret
            { expiresIn: "3d" }    // expires in 30 minutes
        );
        const refreshToken = crypto.randomBytes(16).toString('hex');
        this.refreshToken = refreshToken;
        this.refreshExpires = Date.now() + 518400000; //  6 days from now
        this.save();
        return {
            authToken,
            refreshToken
        };
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = mongoose.model('User', userSchema);
