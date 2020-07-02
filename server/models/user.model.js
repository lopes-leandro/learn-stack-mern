import mongoose from 'mongoose';

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

export default mongoose.model('User', UserSchema);