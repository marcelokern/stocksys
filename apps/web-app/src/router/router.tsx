import App from "@/modules/global/views/App";
import ErrorScreen from "@/modules/global/views/Error";
import FirstAccessController from "@/modules/login/controllers/first-access.controller";
import LoginController from "@/modules/login/controllers/login.controller";
import MovementsController from "@/modules/movements/controllers/movements.controller";
import OrdersController from "@/modules/orders/controllers/orders.controller";
import ProductsController from "@/modules/products/controllers/products.controller";
import ReportDetailsController from "@/modules/reports/controllers/report-details.controller";
import ReportsController from "@/modules/reports/controllers/reports.controller";
import SuppliersController from "@/modules/suppliers/controllers/suppliers.controller";
import UsersController from "@/modules/users/controllers/users.controller";
import { Navigate, createBrowserRouter } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
    if (!localStorage.getItem('@stocksys-token')) {
        return <Navigate to="/login" />;
    }
    return children;
};

const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginController />,
    },
    {
        path: "/primeiro-acesso",
        element: <FirstAccessController />,
    },
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorScreen />,
        children: [
            {
                path: "/",
                element: <Navigate to={'/produtos'} />
            },
            {
                path: "/produtos",
                element: <ProtectedRoute><ProductsController /></ProtectedRoute>
            },
            {
                path: "/fornecedores",
                element: <ProtectedRoute><SuppliersController /></ProtectedRoute>
            },
            {
                path: "/movimentacoes",
                element: <ProtectedRoute><MovementsController /></ProtectedRoute>
            },
            {
                path: "/pedidos",
                element: <ProtectedRoute><OrdersController /></ProtectedRoute>
            },
            {
                path: "/relatorios",
                element: <ProtectedRoute><ReportsController /></ProtectedRoute>
            },
            {
                path: "/relatorios/detalhes",
                element: <ProtectedRoute><ReportDetailsController /></ProtectedRoute>
            },
            {
                path: "/usuarios",
                element: <ProtectedRoute><UsersController /></ProtectedRoute>
            }
        ]
    },
]);

export default router;