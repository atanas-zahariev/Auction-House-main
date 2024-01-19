const { verifiToken } = require("../services/userService");



module.exports = () => (req, res, next) => {
    const token = req.headers['x-authorization'];

    if (token) {
        try {
            const userData = verifiToken(JSON.parse(token))
            req.user = userData;
            req.token = token;

        } catch (error) {
            return res.status(401).json(['Invalid authorization token']);

        }
    }
    next();
}