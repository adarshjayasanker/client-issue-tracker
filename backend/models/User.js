import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({

    userName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },

}, {timestamps: true});

userSchema.pre('save', async function () {
    if(!this.isModified('password')) return;
    try{
       const salt = await bcrypt.genSalt(10);
       this.password = await bcrypt.hash(this.password, salt);
    }catch(error){
       throw error;
    }
});

userSchema.methods.comparePassword = async function(candidatePassword){
    try{
       return await bcrypt.compare(candidatePassword, this.password); 
    }catch(error){
        throw new Error(error);
    }
};

userSchema.methods.generateToken = function(){
    try{
       const token = jwt.sign({id: this._id, role: this.role}, process.env.JWT_SECRET, {expiresIn: '1d'});
       return token; 
    }catch(error){
        throw new Error(error);
    }
}





const User = mongoose.model('User', userSchema);

export default User;