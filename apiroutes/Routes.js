import express from 'express'
import { addWallet, deletePrompt, getAllPrompt, getPrompt, loginUser, registerUser, searchPrompts, storePrompt } from '../controller/userControl.js'
import { RequireSignIn } from '../helpers/authMiddleware.js';

const router=express.Router()

router.post('/',registerUser);
router.post('/user',loginUser);
router.put('/user',addWallet);
router.post('/prompt/:id',RequireSignIn,storePrompt);
router.delete('/prompt',deletePrompt);
router.get('/prompt',getAllPrompt);
router.get('/prompt/:id',getPrompt);
router.post('/search',searchPrompts);
router.get('/user',RequireSignIn,(req,res)=>{
    res.status(200).send({
      ok:true,
      _id:req.user._id,
      email:req.user.email,
      role:req.user.role
    })
})
export default router;