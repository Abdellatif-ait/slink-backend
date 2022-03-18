const { userModel } = require('../models/user')
const url = require('../models/url')
const jwt = require('jsonwebtoken')
async function getall(req, res) {
    try {
        const id = jwt.verify(req.params.user, process.env.JWTPRIVATEKEY)
        const User = await userModel.findById({ _id: id._id })
        if (User == null) { return res.status(404).json({ messsage: 'usernotfound' }) }
        const list = []
        for(var item in User.URL){
            await url.findOne({ _id: User.URL[item]._id }).exec().then(singleUrl => {
                list.push(singleUrl)
            }).catch(err => { res.status(500).json({ message: err.message }) })
        }
        res.status(200).json(list)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
async function getone(req, res) {
    const shortlink = req.params.shortlink;
    const link = await url.findOne({ shortLink: shortlink })
    if (link == null) {
        res.sendStatus(404)
    }
    res.send(link.fullLink)

}
async function addone(req, res) {
    try {
        const id = jwt.verify(req.body.user, process.env.JWTPRIVATEKEY)
        const User = await userModel.findById({ _id: id._id })
        if (User == null) { return res.status(401).json({ messsage: 'usernotfound' }) }
        const link = new url({
            fullLink: req.body.fullLink
        })
        await User.URL.push({ _id: link._id });
        await link.save();
        await User.save();
        res.status(201).json(link)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
async function deleteone(req, res) {
    try {
        const id = jwt.verify(req.body.token, process.env.JWTPRIVATEKEY)
        const User = await userModel.findById({ _id: id._id })
        if (User == null) { return res.status(401).json({ messsage: 'usernotfound' }) }
        User.URL.filter(link => {
            link._id !== id._id
        })
        User.save();
        url.deleteone({ _id: id._id })
        res.status(201).json({ message: "deleted!" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { getall, getone, addone, deleteone }