import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const verifyToken = async(req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) return res.status(401).json({message: "Authorization Failed or No token"});
    try{
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
       const user = await User.findById(decoded.id).select('-password');
       if (!user){
         return res.status(401).json({ message: "User no longer exists" });
      }
       req.user = {
         id: user.id,
         userName: user.userName,
         email: user.email,
         role: user.role,
       };
       next();
    }catch(error){
       return res.status(401).json({message: "Invalid or Expired token", error: error.message});
    }
};

export default verifyToken;