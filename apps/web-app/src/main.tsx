import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { GlobalProvider } from './modules/global/contexts/global.context.tsx';
import { ThemeProvider } from './modules/global/contexts/theme.context.tsx';
import { MovementsProvider } from './modules/movements/contexts/movements.context.tsx';
import { OrdersProvider } from './modules/orders/contexts/orders.context.tsx';
import { ProductsProvider } from './modules/products/contexts/products.context.tsx';
import { ReportsProvider } from './modules/reports/contexts/reports.context.tsx';
import { SuppliersProvider } from './modules/suppliers/contexts/suppliers.context.tsx';
import { UsersProvider } from './modules/users/contexts/users.context.tsx';
import router from './router/router.tsx';
import './styles/global.style.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <GlobalProvider>
            <ThemeProvider>
                <SuppliersProvider>
                    <ProductsProvider>
                        <MovementsProvider>
                            <OrdersProvider>
                                <ReportsProvider>
                                    <UsersProvider>
                                        <RouterProvider router={router} />
                                    </UsersProvider>
                                </ReportsProvider>
                            </OrdersProvider>
                        </MovementsProvider>
                    </ProductsProvider>
                </SuppliersProvider>
            </ThemeProvider>
        </GlobalProvider>
    </React.StrictMode>
);