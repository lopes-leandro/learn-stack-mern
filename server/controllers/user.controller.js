import User from './../models/user.model';
import errorHandler from './../helpers/dbErrorHandler';
import lodash from 'lodash';

const create = async (req, res, next) => {
    const user = new User(req.body);
    try {
        await user.save();
        return res.status(200).json({
            message: 'Cadastrado realizado com sucesso!'
        });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}
const list = async (req, res) => {
    try {
        let users = await User.find().select('name email updated created');
        res.json(users);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}
const userById = (req, res, next, id) => {
    try {
        let user = await User.findById(id);
        if (!user) {
            return res.status(400).json({
                error: 'Usuário não encontrado.'
            });
        }
        req.profile = user;
        next();
    } catch (err) {
        return res.status(400).json({
            error: 'Não foi possível recuperar o registro solicitado.'
        });
    }
}
const read = (req, res) => {}
const update = (req, res) => {}
const remove = (req, res, next) => {}

export default { create, list, userById, read, update, remove }