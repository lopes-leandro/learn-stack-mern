import express from 'express';
import userController from './../controllers/user.controller';

const router = express.Router();

router.route('/api/v1/users')
    .get(userController.list)
    .post(userController.create)

router.route('/api/v1/users/:userId')
    .get(userController.read)
    .put(userController.update)
    .delete(userController.remove)

// configuramos o router Express para lidar com parâmetro
// em uma rota solicitada
router.param('userId', userController.userById);

export default router;