import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {ThemeProvider} from '@material-ui/styles';
import {hot} from 'react-hot-loader';

const App = () => {
    return(
        <BrowserRouter>
            <ThemeProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default hot(module)(App);