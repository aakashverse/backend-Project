import {mongoose,Schema} from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },

        email:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        fullName:{
            type: String,
            required: true,
            trim: true,
            index: true,
        },

        avatar:{
            type: String, // cloudinary url
            required: true,
        },

        coverImage:{
            type: String,
        },

        email:{
            type: String,
            required: true,
            unique: true,
        },

        watchHistory:[
            {
                type: Schema.Types.ObjectId,
                ref: "Video",
            }
        ],

        password:{
            type: String,
            required: [true,'Password is required'],
        },

        refreshToken:{
            type: String,
        },

    },{timestamps:true})


    userSchema.pre("save", async function(next){   // since its a middleware so next flag ka access hona chahiye
        if(!this.isModified("password")) return next();

        this.password = bcrypt.hash(this.password, 10)
        next()
    })
    
    // JWT is a (**) BEARER TOKEN (**) means jiske pass token h use data bhej dega
    // PRE has access to all objects either before data gets stored inside database or vice versa
    // METHODS also has access 
    

    // way to inject methods
    userSchema.methods.isPasswordCorrect = async function(password){
        return await bcrypt.compare(password,this.password);  // [this.password] due to methods properties written above
    }

    userSchema.methods.generateAccessToken = function(){
        return jwt.sign(
            {
                _id: this._id,
                email: this.email,
                username: this.username,
                fullName: this.fullName
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            }
        )
    }

    // refresh token same way to generate as access token, then whats diff?? refresh token contains less data since, it gets refreshes time to time
    userSchema.methods.generateRefreshToken = function(){
         return jwt.sign(
            {
                _id: this._id,
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY
            }
        )
    }

export const User = mongoose.model('User',userSchema);