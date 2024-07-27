import React from 'react';
import { Outlet } from "react-router-dom";
import Header from '../../header/header/Header.tsx';
import './CommonRoot.css';

const CommonRoot = () => (
    <>
       <Header />
      <div className="common-root">
        <Outlet />
        </div>
    </>
);

export default CommonRoot;