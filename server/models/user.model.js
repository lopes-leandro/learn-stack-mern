import mongoose from 'mongoose';
import crypto from 'crypto';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Nome é obrigatório.'
    },
    email: {
        type: String,
        trim: true,
        unique: 'Email informado já existe.',
        match: [/.+\@.+\..+/, 'Por favor, informe um email válido.'],
        required: 'Email é obrigatório.'
    },
    created: {
        type: Date,
        default: Date.now()
    },
    updated: Date,
    hashed_password: {
        type: String,
        required: 'Password é obrigatório.'
    },
    salt: String
});

UserSchema.methods = {
    authenticate: function (textoSimples) {
        return this.encryptPassword(textoSimples) === this.hashed_password;
    },
    encryptPassword: function (password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        } catch (err) {
            return '';
        }
    },
    makeSalt: function () {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    }
}

export default mongoose.model('User', UserSchema);