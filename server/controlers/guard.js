function hasUser() {
    return (req, res, next) => {
        if (req.user != undefined) {
            next();
        } else {
            const message = 'You do not have the required accreditation'
            res.status(400).json(message).end()
        }
    };
}


module.exports = {
    hasUser,    
}