import { lazy } from "react";
import { Navigate } from "react-router-dom";
import AuthLayout from "../partials/layouts/AuthLayout";
import Unauthorized from "../partials/pages/auth/Unauthorized";
import PortalLayout from "../partials/layouts/PortalLayout";
import {meta} from "@eslint/js";

const NotFound = lazy(() => import("../partials/pages/NotFound"))

const SignUp = lazy(() => import("../partials/pages/auth/SignUp"));
const SignIn = lazy(() => import("../partials/pages/auth/SignIn"));

const UserDashboard = lazy(() => import("../partials/pages/user/Dashboard"))
const UserBookings = lazy(() => import("../partials/pages/user/Bookings"))
const UserInbox = lazy(() => import("../partials/pages/user/inbox/Inbox"))

const AdminDashboard = lazy(() => import("../partials/pages/admin/Dashboard"))
const AdminBookings = lazy(() => import("../partials/pages/admin/Bookings"))
// const AdminInbox = lazy(() => import("../partials/pages/admin/inbox/Inbox"))

export const routes = [
  {
    children: [
      { path: "/", element: <Navigate to="/dashboard" replace /> }
    ]
  },
  {
    layout: AuthLayout,
    children: [
      { path: '/signup', element: <SignUp /> },
      { path: '/login', element: <SignIn /> },
      { path: '/denied', element: <Unauthorized /> },
    ]
  },
  {
    layout: PortalLayout,
    protected: true,
    children: [
      { 
        path: '/dashboard', 
        element: <UserDashboard /> , 
        meta: { title: 'Dashboard' } 
      },
      { 
        path: '/bookings', 
        element: <UserBookings />, 
        meta: { title: 'Bookings', parent: 'Dashboard' }
      },
      { 
        path: '/inbox', 
        element: <UserInbox />,  
        meta: { title: 'Inbox', parent: 'Dashboard' }
      }, 
    ]
  },
  {
    layout: PortalLayout,
    protected: true,
    adminOnly: true,
    children: [
      { 
        path: 'admin/dashboard', 
        element: <AdminDashboard /> },
      { 
        path: 'admin/bookings', 
        element: <AdminBookings /> },
    ]
  },
  {
    children: [
      { path: '*', element: <NotFound /> }
    ]
  }
];
