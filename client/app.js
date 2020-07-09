import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {ThemeProvider} from '@material-ui/styles';
import {hot} from 'react-hot-loader';
import MainRouter from './MainRouter';
import theme from './theme';

const App = () => {
    return(
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <MainRouter/>
            </ThemeProvider>
        </BrowserRouter>
    );
}

React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
        jssStyles.parentNode.removeChild(jssStyles);
    }
}, []);

export default hot(module)(App);