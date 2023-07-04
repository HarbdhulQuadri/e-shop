
const authService = require("../services/auth")
const Register = async (req, res) => {
    let data = req.body;
    try {
        const result = await authService.register(data);
        console.log(data)
        let code = result.code;
        console.log(data)
        delete result.code;
        res.status(code).json(result)
    } catch (error) {
        let code = error.code;
        delete error.code;
        res.status(code).json(error)
    }
}

// const Register = async (req, res) => {
//     let body  = req.body;
//     let result = await userService.register(body)
//     let statucode  = result.status
//     delete result.status
//     res.status(statucode).json(result);
// };
// const changePassword = async (req, res) => {
//     let body  = req.body;
//     body.rrn = req.params.rrn;
//     console.log(body)
//     let result = await authService.changePassword(body)
//     let statucode  = result.status
//     delete result.status
//     res.status(statucode).json(result);
// };

const verifyUser = async (req, res) => {
    let data = req.body;
    try {
        const result = await authService.verifyUser(data);
        let code = result.code;
        delete result.code;
        res.status(code).json(result)
    } catch (error) {
        let code = error.code;
        delete error.code;
        res.status(code).json(error)
    }
}
const refreshToken = async (req, res) => {
    let data = req.body;
    try {
        const result = await authService.refreshToken(data);
        let code = result.code;
        delete result.code;
        res.status(code).json(result)
    } catch (error) {
        let code = error.code;
        delete error.code;
        res.status(code).json(error)
    }
}



const Login = async (req, res) => {
    let data = req.body;
    try {
        const result = await authService.login(data);
        let code = result.code;
        delete result.code;
        res.status(code).json(result)
    } catch (error) {
        let code = error.code;
        delete error.code;
        res.status(code).json(error)
    }
}

const addProfile = async (req, res) => {
    let data = req.body;
    data.userID = req.query.userID;
    try {
        const result = await authService.addProfile(data);
        let code = result.code;
        delete result.code;
        res.status(code).json(result)
    } catch (error) {
        let code = error.code;
        delete error.code;
        res.status(code).json(error)
    }
}



const resetPassword = async (req, res) => {
    let data = req.body;
    try {
        const result = await authService.resetPassword(data);
        let code = result.code;
        delete result.code;
        res.status(code).json(result)
    } catch (error) {
        let code = error.code;
        delete error.code;
        res.status(code).json(error)
    }
}

module.exports = {
    verifyUser,
    Register,
    Login,
    addProfile,
    resetPassword,
    refreshToken
}




