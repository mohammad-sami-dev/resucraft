import jwt  from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (userID) => jwt.sign({ id: userID }, process.env.JWT_SECRET,{ expiresIn: '7d' });

export const register = async (req,res) => {
    const { email, password,username } = req.body

    console.log('registering user : ',email);

    try {
        const userExists = await User.findOne({ email });
        if(userExists) return res.status(400).json({ message: 'User already exists' });

        const user =  await User.create({ email, password,username });
        const token = generateToken(user._id);

        res.status(201).json({ user : {id: user._id, email: user.email, username: user.username }, token});
    }
    catch(err) {
        console.error('Registration Error:', err);
        res.status(500).json({ message: 'Error registering user', error: err.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try{
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({ message: 'Invalid credentials'});

        const isMatch =  await user.matchPasswords(password);
        if(!isMatch) return res.status(400).json({ message: 'Invalid credentials'});

        const token = generateToken(user._id);
        res.status(200).json({ user: { id: user._id, email: user.email, username: user.username }, token });

    }
    catch(err) {
        res.status(500).json({ message:'Login error', error: err.message })
    }
};


export const getUserProfile = async (req, res) => {
    try {
        const user = req.user;    
        if (!user) return res.status(401).json({message: 'Unauthorized'});

        res.status(200).json({
            _id: user._id,
            email:user.email,
            username: user.username,
        });

    }
    catch(err) {
        res.status(500).json({message: 'Server Error', error: err.message});
    }
}


export const deleteAccount = async (req, res) => {
    try {
        const user = req.user;    
        if (!user) return res.status(401).json({message: 'Unauthorized'});  
        await User.findByIdAndDelete(user._id);
        res.status(200).json({message: 'Account deleted successfully'});
    } catch(err) {
        return res.status(500).json({message: 'Server Error', error: err.message});
    }
}