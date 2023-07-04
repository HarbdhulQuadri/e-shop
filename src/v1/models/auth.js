const DbConnection = require("../../database/connection");
const moment = require("moment-timezone");
const Dbname = require("../../database/name")
const { v4: uuidv4 } = require('uuid');


const userCollection = Dbname.UserCollection;

const register = async (data) => {
    let myquery = { userID: data.userID };
    let newvalues = {
        $set: {

            userID: uuidv4(),
            emailAddress: data.emailAddress,
            phoneNumber: data.phoneNumber,
            password: data.password,
            status: "active", 
            emailverify: false,
            registerType: "password",
            fullName: data.fullName,
            username:data.username,
             businessName:data.businessName,
             branch:data.branch ||[],
             apiKey:uuidv4(), 
             createdAt:data.createdAt,
        }
    };
    let upsert = { upsert: true }
    try {
         await DbConnection.updateData(userCollection, myquery, newvalues, upsert);
        return ({ error: false, message: "successfully" });
    } catch (error) {
        return ({ error: true, message: error.message })
    }
}
const getShortProfile = async (data) => {
    let query = { $or: [{ emailAddress: data.emailAddress }, { phoneNumber: data.phoneNumber }] };
    let select = {
        projection: {
          // to ask what the zeros and ones is for 
          _id: 0, userID: 1,emailAddress: 1, phoneNumber: 1,  password: 1, status: 1, emailverify: 1,
            fullName: 1,apiKey:1,businessName:1,branch:1,
        }
    };
    try {
        const result = await DbConnection.findAndSelectData(userCollection, query, select);
        return ({ error: false, data: result.data })
    } catch (error) {
        return ({ error: true, message: error.message })
    }
}

const updatePasswordLoginUser = async (data) => {
    let myquery = { userID: data.userID };
    let newvalues = { $set: { loginType: "password" } };
    let upsert = { upsert: true }
    try {
        const result = await DbConnection.updateData(userCollection, myquery, newvalues, upsert);
        return ({ error: false, message: result.message })
    } catch (error) {
        return ({ error: true, message: error.message })
    }
}



module.exports = {
    register,
    getShortProfile,
    updatePasswordLoginUser,
}



// const UserSchema = new mongoose.Schema({
//     username, email, businessName,branch,verified, apiKey, createdAt

  
  
  