import { RouteObject, Outlet } from "react-router-dom";
import RequireAuth from "./AuthProvider";

import LoginPage from "../Pages/LoginPage";
import DashboardPage from "../Pages/DashboardPage";
import ProfilePage from "../Pages/ProfilePage";

import ListingsListPage from "../Pages/ListingsListPage";
import BidsListPage from "../Pages/BidsListPage";
import TradesListPage from "../Pages/TradesListPage";
import TransactionsListPage from "../Pages/TransactionsListPage";

import ResourceNotFoundPage from "../Pages/ResourceNotFound";
import { ErrorBoundary } from "react-error-boundary";
import { UIErrorFallback } from "../Components/Modals/UIErrorFallback";

const appRoutes: RouteObject[] = [
    {
        path: "/",
        element: <LoginPage/>
    },
    {
        path: "/",
        element: <RequireAuth children={<Outlet />} />,
        children:[
            {
                path: "/dashboard",
                element: <DashboardPage/>,
            },
            {
                path: "/listings/:userId",
                element: <ListingsListPage/>
            },
            {
                path: "/bids/:userId",
                element: <BidsListPage/>
            },
            {
                path: "/trades/:userId",
                element: <TradesListPage/>,
            },
            {
                path: "/transactions/:userId",
                element: <TransactionsListPage/>,
            },
            {
                path: "/profile/:userId",
                element: <ProfilePage/>
            },
            {
                path: "/resource_not_found",
                element: <ResourceNotFoundPage/>,
            }
        ],
        errorElement: <ErrorBoundary FallbackComponent={UIErrorFallback}/> 
    }
];

export default appRoutes;