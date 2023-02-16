const { response, request } = require('express');
const User = require('../models/User.model');
const authModel = require('../models/auth.model');

const usersGet = async (req = request, res = response) => {
    try {
        const id = req.query.id;
        let usuarios = null;
        if (id) {
            usuarios = await User.findById(id);
        } else {
            usuarios = await User.find();
        }

        res.status(200).json({
            msg: 'succes',
            data: usuarios
        })
    } catch (error) {
        res.status(400).json({
            msg: 'error',
            data: error.message
        });
    }
};

const usersPost = async (req = request, res = response) => {
    try {
        const body = req.body;
        let usuario = new User(body);
        usuario.active = true;
        usuario.password = await authModel.hashPassword(usuario.password);
        await usuario.save()
        res.status(200).json({
            msg: 'success',
        });
    } catch (error) {
        res.status(400).json({
            msg: 'error',
            data: error.message
        });
    }
};

const usersPut = async (req = request, res = response) => {
    const { id } = req.params;
    const body = req.body;
    await User.findByIdAndUpdate(id, body);
    res.status(200).json({
        msg: 'success',
    });
};

const usersDelete = async (req = request, res = response) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({
        msg: 'success',
        id
    });
};
const usersGetProfile = async (req = request, res = response) => {
    let token_raw = req.headers.authorization.split(' ')[1];
    let token_decode = authModel.decodeToken(token_raw);
    let profile = await User.findById(token_decode.data.id);
    profile.password = "";
    res.status(200).json({
        msg: 'success',
        data: profile
    });
};

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
    usersGetProfile
};