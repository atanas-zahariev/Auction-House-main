const authControler = require("../controlers/authControler");
const itemControler = require("../controlers/itemControler");

module.exports = (app) => {
    app.use('/auth', authControler);
    app.use('/house', itemControler);
};
