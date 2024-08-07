import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

//register
export const register= async (req,res)=>{
   try{
      const {username, password} = req.body
      const isUsed = await User.findOne({username})

      if(isUsed){
         return res.json({
            message:'Введений username не доступний'
         })
      }

      const salt= bcrypt.genSaltSync(10)
      const hash= bcrypt.hashSync(password,salt)

      const newUser = new User({
         username,
         password:hash,
      })

      const token = jwt.sign(
         {
         id:newUser._id,
         },
         process.env.JWT_SECRET,
         {expiresIn: '30d'},
      )

      await newUser.save()

      res.json({
         token,
         newUser,
         message:'Реєстрація успішна'
      })
   }
   catch(error){
      res.json({message:'Помилка при створенні користувача'})
   }
}

//login
export const login= async (req,res)=>{
   try{
      const{username, password}=req.body

      const user = await User.findOne({username})

      if(!user){
         return res.json({
            message:'Користувача не знайдено'
         })
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password)

      if(!isPasswordCorrect){
         return res.json({
            message:'не правильний логін чи пароль'
         })
      }

      const token = jwt.sign(
         {
         id:user._id,
         },
         process.env.JWT_SECRET,
         {expiresIn: '30d'},
      )

      res.json({
         token,
         user,
         message:'Авторизація успішна',
      })
   }
   catch(error){
      res.json({message:'Помилка при вході'})
   }
}
//get me
export const getMe= async (req,res)=>{
   try{
      const user= await User.findById(req.userId)

      if(!user){
         return res.json({
            message:'Користувача не знайдено'
         })
      }

      const token = jwt.sign(
         {
         id:user._id,
         },
         process.env.JWT_SECRET,
         {expiresIn: '30d'},
      )

      res.json({
         user,
         token,
      })
   }
   catch(error){
      res.json({message:'Помилка доступу'})
   }
} 