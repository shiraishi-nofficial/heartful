import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Amplify } from 'aws-amplify';
import amplifyconfig from './amplifyconfiguration.json';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
Amplify.configure(amplifyconfig);

ReactDOM.createRoot(document.getElementById('root')).render(
    <ChakraProvider theme={extendTheme({fonts: {heading: '"Noto Sans JP", sans-serif;', body: '"Noto Sans JP", sans-serif;'}})}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ChakraProvider>,
)
