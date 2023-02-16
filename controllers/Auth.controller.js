const { response, request } = require('express');
const Usuario = require('../models/User.model');
const authModel = require('../models/auth.model');


const login = async (req = request, res = response) => {
    const { email, password } = req.body;
    const userInformationDB = await Usuario.findOne({ email: email, active: true });
    if (userInformationDB === null) {
        return res.status(401).json({
            msg: 'User not found or inactive',
        });
    }
    const validPassword = await authModel.comparePassword(password, userInformationDB.password);

    if (validPassword) {
        const token = authModel.generarToken(
            {
                id: userInformationDB._id,
                full_name: `${userInformationDB.name} ${userInformationDB.last_name}`,
                email: userInformationDB.email,
                active: userInformationDB.active
            }
        );
        res.status(200).json({
            msg: 'Login success',
            data: {
                token,
                user: {
                    id: userInformationDB._id,
                    full_name: `${userInformationDB.name} ${userInformationDB.last_name}`,
                    email: userInformationDB.email,
                }
            }
        });
    } else {
        res.status(401).json({
            msg: 'Invalid password',
        });
    }

};


module.exports = {
    login
};