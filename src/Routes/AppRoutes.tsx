import React from "react";
import {lazy} from "react";
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
        ]
    }
];

export default appRoutes;