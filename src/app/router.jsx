import { createBrowserRouter } from 'react-router-dom'
import AppLayout from './AppLayout.jsx'

import Home from '../pages/Home/index.jsx'
import Listing from '../pages/Listing/index.jsx'
import Detail from '../pages/Detail/index.jsx'
import Login from '../pages/Login.jsx'
import Profile from '../pages/Profile.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },        // /
      { path: 'items', element: <Listing /> },   // /items
      { path: 'items/:id', element: <Detail />}, // /items/id
      { path: 'login', element: <Login />},
      { path: 'profile', element: <Profile />},
    ],
  },
])

export default router