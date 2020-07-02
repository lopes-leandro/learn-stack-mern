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
            message: errorHandler.getErrorMessage(err)
        });
    }
}
const list = (req, res) => {}
const userById = (req, res, next, id) => {}
const read = (req, res) => {}
const update = (req, res) => {}
const remove = (req, res, next) => {}

export default { create, list, userById, read, update, remove }