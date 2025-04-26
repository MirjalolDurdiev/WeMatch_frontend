import { RouterProvider } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { router } from './pages/Router/Router'

function App() {
  return (
    <>
      <RouterProvider router={router}/>
      <ToastContainer />
    </>
  )
}

export default App
