import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {ThemeProvider} from '@material-ui/styles';

const App = () => {
    return(
        <BrowserRouter>
            <ThemeProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;