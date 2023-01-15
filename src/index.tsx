import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

const theme = createTheme({
    palette: {
        primary: {
            main: '#0071b3'
        }
    }
})

ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('root')
);
