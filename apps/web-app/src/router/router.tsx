import App from "@/App";
import LoginController from "@/modules/login/controllers/login.controller";
import MovementsController from "@/modules/movements/controllers/movements.controller";
import OrdersController from "@/modules/orders/controllers/orders.controller";
import ProductsController from "@/modules/products/controllers/products.controller";
import ReportDetailsController from "@/modules/reports/controllers/report-details.controller";
import ReportsController from "@/modules/reports/controllers/reports.controller";
import SuppliersController from "@/modules/suppliers/controllers/suppliers.controller";
import UsersController from "@/modules/users/controllers/users.controller";
import { Navigate, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginController />,
    },
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Navigate to={'/produtos'} />
            },
            {
                path: "/produtos",
                element: <ProductsController />
            },
            {
                path: "/fornecedores",
                element: <SuppliersController />
            },
            {
                path: "/movimentacoes",
                element: <MovementsController />
            },
            {
                path: "/pedidos",
                element: <OrdersController />
            },
            {
                path: "/relatorios",
                element: <ReportsController />
            },
            {
                path: "/relatorios/detalhes",
                element: <ReportDetailsController />
            },
            {
                path: "/usuarios",
                element: <UsersController />
            }
        ]
    },
]);

export default router;