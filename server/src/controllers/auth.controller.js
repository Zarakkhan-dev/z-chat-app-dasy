import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { upsertStreamUser } from "../lib/stream.js";

export const Login = async (req, res) => {
  try {
    const {email, password} = req.body;

    if(!email || !password) {
      return res.status(400).json({ message: "All fields are Required" });
    }
    const verifyUser = await User.findOne({email});
    if(!verifyUser) return res.status(401).json({message: "Invalid email or password"});

    const isPassowrd = await verifyUser.matchPassword(password)
    if(!isPassowrd) return res.status(401).json({message: "Invalid email or password"});
    
    const token = jwt.sign({userId: verifyUser._id}, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d"
    });

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, // prevent XSS attacks,
      sameSite: "strict", // prevent CSRF attacks
      secure: process.env.NODE_ENV === "production",
    });

    res.status(201).json({success: true, user: verifyUser});
  } catch (error) {
    console.log("Sigin controller error", error)
    res.status(500).json({message:"Internal Server Error"})
  }
};

export const Signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are Required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email Already exists, please use different one" });
    }

    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    const newUser = await User.create({
      fullName,
      email,
      password,
      profileImage: randomAvatar,
    });
    
    try {
      await upsertStreamUser({
        id: newUser._id.toString(),
        name: newUser.fullName,
        image: newUser.profilePic || "",
      });
      console.log(`Stream user created for ${newUser.fullName}`);
    } catch (error) {
      console.log("Error creating Stream user:", error);
    }

    const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d"
    });

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, // prevent XSS attacks,
      sameSite: "strict", // prevent CSRF attacks
      secure: process.env.NODE_ENV === "production",
    });
    
    res.status(201).json({success: true, user: newUser});
  } catch (error) {
    console.log("Signup controller error", error)
    res.status(500).json({message:"Internal Server Error"})
  }
};

export const Logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({message: "Logout successfully"})
  } catch (error) {
    console.log("Logout controller error", error)
    res.status(500).json({message:"Internal Server Error"})
  }
};

export const onboard = async (req, res) => {
  try {
   const userId = req.user._id;
   const {fullName, bio, nativeLanguage, learningLanguage, location} = req.body;
   if(!fullName || !bio || !nativeLanguage || !learningLanguage || !location) {
    res.status(400).json({message:"All fields are required"});
   }
  
   const updateUser = await User.findByIdAndUpdate (userId, {
    ...req.body,
    isOnboarded: true
   })

   try {
    await upsertStreamUser({
      id: updateUser._id.toString(),
      name: updateUser.fullName,
      image: updateUser.profilePic || "",
    });
    console.log(`Stream user created for ${updateUser.fullName}`);
  } catch (error) {
    console.log("onboard controller error", error)
    res.status(500).json({message:"Internal Server Error"})
  }

  res.status(200).json({success: true, user: updateUser});
  } catch (error) {
    console.log("onboard controller error", error);
    res.status(500).json({message:"Internal Server Error"})
  }
}
