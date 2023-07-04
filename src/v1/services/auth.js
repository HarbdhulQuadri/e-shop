const globalFunction = require("../../utility/globalFunction");
const globalMessage = require("../../utility/globalMessage");
const userModel = require("../models/auth");
const tokenModel = require("../models/token");
const jwt = require('jsonwebtoken');
let uuid = require("uuid");
const bcrypt = require('bcrypt');


const register = async (data) => {
    try {
         await checkRegisterUserExist(data);
        data.password = await globalFunction.hashPassword(data.password)
        data.userID = uuid.v4
        await userModel.register(data);
        delete data.password
        const result_1 = await addAccessToken(data);
        let dataWithToken = result_1.data
        let token = dataWithToken.accessToken,
            expire_at = dataWithToken.expire_at;
        delete dataWithToken.accessToken;
        delete dataWithToken.expire_at;
        dataWithToken.status = "active";
        dataWithToken.emailverify = false;
        return ({
            error: false,
            message: globalMessage.registerSuccessful,
            token: {
                token: token,
                expire_at: expire_at
            },
            profile: dataWithToken,
            code: 200
        })
    } catch (error) {
        if (error.code !== undefined) {
            return ({ error: true, message: error.message, code: error.code })
        } else {
            return ({ error: true, message: error.message, code: 403 })
        }
    }
}

const login = async (data) => {
    try {

        const result = await userModel.getShortProfile(data);
        if (result.data.length === 0) {
            return ({ error: true, message: globalMessage.userNotFound, code: 404 })
        } else {
            const answer = await bcrypt.compare(data.password, result.data[0].password);
            if (!answer) {
                return ({ error: true, message: globalMessage.userNotFound, code: 404 })
            } else {
                data.profile = result.data[0]
                delete data.profile.password
                data.userID = result.data[0].userID;
                await userModel.updatePasswordLoginUser(data);
                const result_3 = await addAccessToken(data);
                return ({
                    error: false,
                    message: globalMessage.loginSuccessful,
                    token: {
                        token: result_3.data.accessToken,
                        expire_at: result_3.data.expire_at
                    },
                    profile: data.profile,
                    code: 200
                })
            }
        }
    } catch (error) {
        return ({ error: true, message: error.message, code: 403 })
    }
}

async function checkRegisterUserExist(data) {
    try {
        let shortProfile;
        data.user = data.emailAddress;
        shortProfile = await userModel.getShortProfile(data);
        if (shortProfile.data.length !== 0) {
            return ({ error: true, message: globalMessage.emailTaken, code: 403 })
        }
        data.user = data.phoneNumber;
        shortProfile = await userModel.getShortProfile(data);
        if (shortProfile.data.length !== 0) {
            return ({ error: true, message: globalMessage.phoneTaken, code: 403 })
        }

        delete data.user

    } catch (error) {
        return ({ error: true, message: error.message })
    }
}

const refreshToken = async (token) => {
    let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    let data = {};
    data.userID = decoded.userID
    try {
        const result = await tokenModel.getToken(data);
        if ((result.data.length === 0) || (token !== result.data[0].accessToken)) {
            return ({ error: true, message: globalMessage.AuthorizationNotFound, code: 401 })
        }
        const result_1 = await addAccessToken(data);
        return ({
            error: false,
            message: globalMessage.AuthorizationRefresh,
            token: {
                token: result_1.data.accessToken,
                expire_at: result_1.data.expire_at
            },
            code: 200
        });
    } catch (error) {
        return ({ error: true, message: error.message, code: 403 });
    }
}



async function addAccessToken(data) {
    data.accessToken = jwt.sign({
        userID: data.userID,
        iat: Math.floor(Date.now()),
        exp: Math.floor(Date.now() + 1000 * 60 * 15) //1000 = 1 seconds mul 60 == 1 minutes mul 15 === 15 minutes
    }, process.env.JWT_SECRET_KEY,);
    data.expire_at = new Date(new Date().getTime() + 1000 * 60 * 15);
    try {
        await tokenModel.addToken(data)
        return ({ error: false, data: data })
    } catch (error) {
        return ({ error: false, message: error.message })
    }
}
const changePassword = async (data) => {
    let result = await userModel.changePassword(data);
    return (result);
}



module.exports = {
    register,
    login,
    changePassword,
    refreshToken
}


