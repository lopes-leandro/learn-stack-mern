import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {ThemeProvider} from '@material-ui/styles';
import {hot} from 'react-hot-loader';
import {MainRouter} from './MainRouter';

const App = () => {
    return(
        <BrowserRouter>
            <ThemeProvider>
                <MainRouter/>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default hot(module)(App);