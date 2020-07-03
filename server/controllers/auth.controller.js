import User from './../models/user.model';
import jwt from 'jsonwebtoken';
import config from './../../config/config';
import expressJWT from 'express-jwt';

const signin = async (req, res) => {
    try {
        let user = await User.findOne({"email": req.body.email});
        if (!user) {
            return res.status(401).json({error: 'Usuário não encontrado.'});
        }
        if (!user.authenticate(req.body.password)) {
            return res.status(401).send({error: 'Email e password não coincidem.'});
        }
        const token = jwt.sign({_id: user._id}, config.jwtSecret);
        res.cookie('t', token, { expires: new Date() + 9999});
        return res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        return res.status(401).json({error: 'Não foi possível entrar.'});
    }
}

const signout = (req, res) => {
    res.clearCookie('t');
    return res.status(200).json({message: 'Desconectado'});
}

const requireSignin = expressJWT({
    secret: config.jwtSecret,
    userProperty: 'auth'
});

const hasAuthorization = (req, res) => {}

export default { signin, signout, requireSignin, hasAuthorization }