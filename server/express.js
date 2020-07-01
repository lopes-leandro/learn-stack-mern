import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import config from './../config/config';
import mongoose from 'mongoose';

const app = express();
mongoose.Promise = global.Promise;
mongoose.connect(
    config.mongoUri,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }
);
mongoose.connection.on('error', () => {
    throw new Error(`Não é possível se conectar ao banco de dados: ${mongoUri}`)
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

export default app;