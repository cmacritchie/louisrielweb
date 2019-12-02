import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider as HouseProvider } from './contexts/HousePointsContext';
import { Provider as UserProvider } from './contexts/UserContext';
import { Provider as WhiteListProvider } from './contexts/WhiteListContext'
import { Provider as AdminProvider } from './contexts/AdminListContext'


ReactDOM.render(
    <AdminProvider>
        <WhiteListProvider>
            <HouseProvider>
                <UserProvider>
                    <App />
                </UserProvider>
            </HouseProvider>
        </WhiteListProvider>
    </AdminProvider>
, document.getElementById('root'));


