// why var not const ???
// why not use ES modules
const bcrypt = require('bcrypt');
const axios = require('axios');
const {sort} = require("fast-sort");

// pattern for email address
const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

/*
 * Call back messages 
*/

const callBackData = (error, data, cb) => {
    cb({
        "error": error,
        "data": data
    });
} // calls the function cb with an object as argument with error and data keys

const callBackMessage = (error, message, cb) => {
    cb({
        "error": error,
        "message": message
    });
} // calls the function cb with an object as argument with error and message keys

/*
 *  Res payload data
*/

const resPayloadData = (code, error, data, res) => {
    res.status(code).json({
        "error": error,
        "data": data
    });
} // returns res object with status of code, and object with error as error and data

const resPayloadMessage = (code, error, message, res) => {
    res.status(code).json({
        "error": error,
        "message": message
    });
} // returns res object with status of code, and object with error as error and message as message

/*
 *   HTTP Call
*/
// why not use async/await
const httpCall = (config) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios(config);
            resolve(response.data);
        } catch (error) {
            reject(error);
        }
    })
}

/*
 * Hash Password
*/

const hashPassword = (password) => {
    return new Promise( async resolve => {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        resolve(hash);
    });
}

const is18orOlder = (dateString) => {
    return new Promise(resolve => {
        const dob = new Date(dateString);
        const dobPlus18 = new Date(dob.getFullYear() + 18, dob.getMonth(), dob.getDate());
        resolve(dobPlus18.valueOf() <= Date.now())
    });
}

// format pairID
const formPairID = (senderID, receiverID) => {
    return new Promise(resolve => {
        if (senderID < receiverID) {
            resolve(senderID + receiverID);
        } else {
            resolve(receiverID + senderID)
        }
    });
}

const FormatFootballByImportance = (data) => {
    return new Promise(resolve => {
        const Importance = {
            152: 3,
            207 : 2,
            3 : 1
        };
        resolve(sort(data).desc(tag => Importance[tag.league_id] || 0));
    });
}

module.exports = {
    emailRegexp,
    callBackData,
    callBackMessage,
    resPayloadData,
    resPayloadMessage,
    httpCall,
    hashPassword,
    is18orOlder,
    formPairID,
    FormatFootballByImportance
}