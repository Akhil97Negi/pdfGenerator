import jwt from 'jsonwebtoken'
import blackListModel from '../model/blackListModel.js';

//generate token and expire in 8h

export const generateToken = (payload) =>{
    return jwt.sign(payload, process.env.JWT_SECRET , {expiresIn : '8h'})
}

//blacklisttoken

export const blackListToken = async (token) =>{
    const blackList = new blackListModel({token});
    await blackList.save()
}

//check token is blacklisted

export const isTokenBlackListed = async (token) =>{
    const blackList = await blackListModel.findOne({token})
    return blackList ? true : false
}