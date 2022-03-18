const { userModel, validate } = require('../models/user')
const bcrypt = require('bcrypt');
const Joi = require('joi');

async function register(req, res) {
    try {
        const { error } = validate(req.body);
        
        if (error) {
            return res.status(400).send({ message: error.details[0].message })
        }

        const user = await userModel.findOne({ email: req.body.email });
        if (user) {
            res.status(401).send({ message: 'email already been used' })
        }
        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        await new userModel({ ...req.body, password: hashPassword }).save()
        res.status(201).send({ message: "user has been created successfuly" })
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", details: error.message })
    }
}

async function logIn(req, res) {
    const validate = (data) => {
        const schema = Joi.object({
            email: Joi.string().email().required().label("email"),
            password: Joi.string().required().label("password")
        });
        return schema.validate(data)
    }
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message })
        }
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            res.status(401).send({ message: "Email or password are wrong" })
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            res.status(401).send({ message: "Email or password are wrong" })
        }
        const token = user.generateAuthToken();
        res.status(200).send({ data: token, message: "LoggedIn successfully" })
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", details: error.message })
    }
}

module.exports={logIn,register}