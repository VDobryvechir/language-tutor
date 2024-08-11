import React from 'react';
import { Outlet } from "react-router-dom";
import Header from '../../header/header/Header.tsx';
import NotificationBar from '../notification-bar/NotificationBar.tsx';
import './CommonRoot.css';

const CommonRoot = () => (
    <>
       <Header />
        <div className="common-root">
            <Outlet />
        </div>
        <NotificationBar />
    </>
);

export default CommonRoot;