import { createBrowserRouter } from 'react-router-dom'
import AppLayout from './AppLayout.jsx'

import Home from '../pages/Home/index.jsx'
import Listing from '../pages/Listing/index.jsx'
import Detail from '../pages/Detail/index.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },        // /
      { path: 'items', element: <Listing /> },   // /items
      { path: 'items/:id', element: <Detail />}, // /items/id
    ],
  },
])

export default router