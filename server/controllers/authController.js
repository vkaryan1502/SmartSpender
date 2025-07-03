import User from "../models/userModel.js";
import jwt from 'jsonwebtoken'

const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user._id.toString(),  
      name: user.name,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

export const registerUser = async (req, res) =>{
    try {
        const { name , email, password } = req.body;

        const userExist = await User.findOne({ email });
        if(userExist) {
            return res.status(400).json({ message: "User already exists"});
        }

        const user = await User.create({ name, email, password});

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });

    } catch (error) {
       res.status(500).json({ message: error.message });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password} = req.body;

    const user = await User.findOne({ email });
    if(!user) {
        return res.status(400).json({ message: "Invalid email or password"});
    }

    const isMatch = await user.matchPassword(password);
    if(!isMatch) {
        return res.status(400).json({ message: "Invalid email and password" });
    }

    //send response
     res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
}
