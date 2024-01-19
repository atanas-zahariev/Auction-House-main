const { register, login, logout } = require('../services/userService');
const errorParser = require('../utyl/parser');
const { body, validationResult } = require('express-validator')

const authControler = require('express').Router();




authControler.post('/register',
    body('email').isEmail({ allow_utf8_local_part: false }).withMessage('Invalid Email'),

    async (req, res) => {
        try {
            const { email, firstname, lastname, password, repass } = req.body;

            const { errors } = validationResult(req)
            
            if (errors.length > 0) {
                throw errors;
            }
            if (password.length < 5) {
                throw new Error('Password must be at least 5 characters.')
            }


            if (password != repass) {
                throw new Error('Passwords don\'t match');
            }

            const token = await register(req.body.email, firstname, lastname, req.body.password);

            res.json(token)

        } catch (error) {
          const message = errorParser(error);
          res.status(400).json(message)
        }

    });



authControler.post('/login', async (req, res) => {
    try {
        const token = await login(req.body.email, req.body.password);
        res.json(token);      
    } catch (error) {
        const message = errorParser(error);
        res.status(401).json(message)
    }
})

authControler.get('/logout', async (req, res) => {
    const token = req.token  ///req.headers['x-authorization'];
    await logout(token);
    res.status(204).end();
})

module.exports = authControler;