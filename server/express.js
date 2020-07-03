import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import config from './../config/config';
import mongoose from 'mongoose';
import Template from './../template';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';

const app = express();
mongoose.Promise = global.Promise;
mongoose.connect(
    config.mongoUri,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        user: 'App',
        pass: 'App'
    }
);
mongoose.connection.on('error', () => {
    throw new Error(`Não é possível se conectar ao banco de dados: ${config.mongoUri}`)
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

app.use('/', userRoutes);
app.use('/', authRoutes);

app.get('/', (req, res) => {
    res.status(200).send(Template())
});

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({error: `${err.name}: ${err.message}`});
    }else if (err) {
        res.status(400).json({error: `${err.name}: ${err.message}`});
        console.log(err);        
    }
});

export default app;