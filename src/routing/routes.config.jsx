import { lazy } from "react";
import { Navigate } from "react-router-dom";
import AuthLayout from "../partials/layouts/AuthLayout";
import Unauthorized from "../partials/pages/auth/Unauthorized";
import PortalLayout from "../partials/layouts/PortalLayout";
import Feedback from '../partials/pages/user/Feedback'; // Din feedback-komponent

const NotFound = lazy(() => import("../partials/pages/NotFound"));

const SignUp = lazy(() => import("../partials/pages/auth/SignUp"));
const SignIn = lazy(() => import("../partials/pages/auth/SignIn"));

const UserDashboard = lazy(() => import("../partials/pages/user/Dashboard"));
const UserBookings = lazy(() => import("../partials/pages/user/Bookings"));
const UserCalendar = lazy(() => import("../partials/pages/user/Calendar"));
const UserInbox = lazy(() => import("../partials/pages/user/inbox/Inbox"));
const UserFeedback = lazy(() => import("../partials/pages/user/Feedback")); // Din feedback-länk
const UserEvents = lazy(() => import("../partials/pages/user/Events"));

const AdminDashboard = lazy(() => import("../partials/pages/admin/Dashboard"));
const AdminBookings = lazy(() => import("../partials/pages/admin/Bookings"));

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
        element: <UserDashboard />,
        meta: { title: 'Dashboard' }
      },
      {
        path: '/bookings',
        element: <UserBookings />,
        meta: { title: 'Bookings', parent: 'Dashboard' }
      },
      {
        path: '/calendar',
        element: <UserCalendar />,
        meta: { title: 'Calendar', parent: 'Dashboard' }
      },
      {
        path: '/inbox',
        element: <UserInbox />,
        meta: { title: 'Inbox', parent: 'Dashboard' }
      },
      {
        path: '/feedback',
        element: <UserFeedback />,
        meta: { title: 'Feedback', parent: 'Dashboard' }
      },
      {
        path: '/events',
        element: <UserEvents />,
        meta: { title: 'Events', parent: 'Dashboard' }
      }
    ]
  },
  {
    layout: PortalLayout,
    protected: true,
    adminOnly: true,
    children: [
      {
        path: 'admin/dashboard',
        element: <AdminDashboard />
      },
      {
        path: 'admin/bookings',
        element: <AdminBookings />
      },
      {
        path: 'admin/feedback',
        element: <UserFeedback />,
        meta: { title: 'Feedback', parent: 'Admin' }
      }
    ]
  },
  {
    children: [
      { path: '*', element: <NotFound /> }
    ]
  }
];
