// GA
import ReactGA from 'react-ga4';

// utils
import {lazy, Suspense} from 'react';

// styles
import '@styles/index.scss';
import 'react-toastify/dist/ReactToastify.min.css';
import ThemeStyles from '@styles/theme';

// fonts
import '@fonts/icomoon/icomoon.woff';

// contexts
import {SidebarProvider} from '@contexts/sidebarContext';
import {ThemeProvider} from 'styled-components';

// hooks
import {useTheme} from '@contexts/themeContext';
import {useEffect, useRef} from 'react';
import {useWindowSize} from 'react-use';

// components
import ScrollToTop from '@components/ScrollToTop';
import Loader from '@components/Loader';
import {Route, Routes, useLocation, Navigate} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import Sidebar from '@layout/Sidebar';
import Copyright from '@components/Copyright';
import AppBar from '@layout/AppBar';
import ProductContextProvider from "@contexts/productContext";

// pages

const ProductsGrid = lazy(() => import('@pages/ProductsGrid'));
const ProductsManagement = lazy(() => import('@pages/ProductsManagement'));
const ProductEditor = lazy(() => import('@pages/EditProduct'));

// const Orders = lazy(() => import('@pages/Orders'));

// const PageNotFound = lazy(() => import('@pages/PageNotFound'));

const App = () => {
    const {width} = useWindowSize();
    const appRef = useRef(null);
    const {theme} = useTheme();
    const path = useLocation().pathname;
    const withSidebar = path !== '/login' && path !== '/404';

    // Google Analytics init
    const gaKey = import.meta.env.VITE_GA;
    gaKey && ReactGA.initialize(gaKey);

    useEffect(() => {
        appRef.current && appRef.current.scrollTo(0, 0);
    }, []);

    return (
        <ProductContextProvider>
        <SidebarProvider>
            <ThemeProvider theme={{theme: theme}}>
                <ThemeStyles/>
                <ToastContainer theme={theme} autoClose={2000} style={{padding: '20px'}}/>
                {width < 1280 && withSidebar && <AppBar/>}
                <div className={`app ${!withSidebar ? 'fluid' : ''}`} ref={appRef}>
                    <ScrollToTop/>
                    {withSidebar && <Sidebar/>}
                    <div className="app_content">
                        {width >= 1280 && withSidebar && <AppBar/>}
                        <Suspense fallback={<Loader/>}>
                            <div className="main">
                                <Routes>
                                    
                                    <Route path="products-management" element={<ProductsManagement/>}/>
                                    <Route path="/" element={<ProductsGrid/>}/>
                                   <Route path="product-editor" element={<ProductEditor/>}/>
                                     {/*
                                    <Route path="orders" element={<Orders/>}/> */}
                    
                                    {/* <Route path="*" element={<Navigate to="/404"/>}/> */}
                                    {/* <Route path="/404" element={<PageNotFound/>}/> */}
                                </Routes>
                            </div>
                            {withSidebar && <Copyright/>}
                        </Suspense>
                    </div>
                </div>
            </ThemeProvider>
        </SidebarProvider>
        </ProductContextProvider>
    );
}

export default App
