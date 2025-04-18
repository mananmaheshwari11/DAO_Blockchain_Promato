import { checkPassword, hashedPassword } from "../helpers/authMiddleware.js";
import jwt from 'jsonwebtoken';
import userModel from "../models/userModel.js";
import promptModel from "../models/promptModel.js";

export const registerUser = async (req, res) => {
    try {
      const { email, password, name } = req.body;
      const exist_user = await userModel.findOne({ email });
      if (exist_user) {
        return res
          .status(404)
          .send({ success: false, message: "E-mail already registered" });
      }
      const hashedpassword = await hashedPassword(password);
      const user = await new userModel({
        name:name,
        email: email,
        password: hashedpassword,
      }).save();
      return res.status(201).send({
        success: true,
        message: "Student Registered Successfully",
        user
      });
    } catch (error) {
      return res.status(400).send({
        success: false,
        message: "error while signup",
        error,
      });
    }
  };

export const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email == null) {
        return res.status(400).send({ message: "Enter correct email!" });
      }
      if (!password) {
        return res.status(400).send({ message: "Password is required!" });
      }
      const user = await userModel.findOne({ email });
      if (await checkPassword(password, user.password)) {
        const token = jwt.sign({ _id: user._id,email: user.email}, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });
        return res.status(201).send({
          success: true,
          message: "User Logged-In Successfully",
          token,
        });
      } else {
        return res.status(400).send({
          message: "Invalid user email or password",
        });
      }
    } catch (error) {
      console.log(error)
      return res.status(400).send({
        success: false,
        message: "Error in student Sign-in",
        error,
      });
    }
  };

export const addWallet=async(req,res)=>{
    try{
        const {id}=req.params
        const {wallet}=req.body
        await userModel.findByIdAndUpdate(id,{walletAddress:wallet},{new:true})
        return res.status(200).send({
            success:true,
            message:"Metamask added successfully"
        })
    }
    catch(error){
        return res.status(400).send({
            success:false,
            message:"Cannot update metamask"
        })
    }
}

export const storePrompt=async(req,res)=>{
    try{
        const {id}=req.params
        const {seller,description,title,cost,fileHash,models}=req.body
        const prompt= new promptModel({seller:id,description:description,title:title,cost:cost,wallet:seller,fileHash:fileHash,models:models}).save()
        return res.status(200).send({
            success:true,
        })
    }
    catch(error){
        return res.status(400).send({
            success:false,
        })
    }
}

export const deletePrompt=async(req,res)=>{
    try{
        const {seller,fileHash}=req.body
        await promptModel.findOneAndDelete({wallet:seller,fileHash:fileHash});
        return res.status(200).send({
            success:true,
        })
    }
    catch(error){
        return res.status(400).send({
            success:false,
        })
    }
}

export const getAllPrompt=async(req,res)=>{
    try {
        const prompts=await promptModel.find({});
        return res.status(200).send({
            success:true,
            prompts
        })
    } catch (error) {
        return res.status(400).send({
            success:false,
            error
        })
    }
}

export const getPrompt=async(req,res)=>{
    try {
        const {id}=req.params
        const prompts=await promptModel.findById(id);
        return res.status(200).send({
            success:true,
            prompts
        })
    } catch (error) {
        return res.status(400).send({
            success:false,
            error
        })
    }
}

export const searchPrompts = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q || q.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Search query is required.",
            });
        }

        const regex = new RegExp(q, "i"); // case-insensitive

        const results = await promptModel.find({
            $or: [
                { title: { $regex: regex } },
                { description: { $regex: regex } },
                { models: { $regex: regex } },
                { fileHash: { $regex: regex } },
            ]
        });

        return res.status(200).json({
            success: true,
            results,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error while searching",
            error: error.message,
        });
    }
};


