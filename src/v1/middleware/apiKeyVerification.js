const userModel = require("../models/auth");
const globalMessage = require("../utility/globalMessage");

const apiKeyVerification = async (req, res, next) => {
  try {
    const apiKey = req.headers['x-api-key']; // Assuming the API key is passed in the 'x-api-key' header

    if (!apiKey) {
      return res.status(401).json({ error: true, message: globalMessage.apiKeyMissing });
    }

    const user = await userModel.getUserByApiKey(apiKey); // Replace 'getUserByApiKey' with the appropriate method from your userModel

    if (!user) {
      return res.status(401).json({ error: true, message: globalMessage.invalidApiKey });
    }

    // Attach the user object to the request for further processing
    req.user = user;

    next();
  } catch (error) {
    return res.status(500).json({ error: true, message: globalMessage.serverError });
  }
};

module.exports = apiKeyVerification;
