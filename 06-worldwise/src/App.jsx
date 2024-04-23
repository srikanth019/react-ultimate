import { Suspense, lazy } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import { CityContextProvider } from "./contexts/CitiesContext"
import { AuthContextProvider } from "./contexts/FakeAuthentication"
import ProtectRoute from "./pages/ProtectRoute"

import CityList from "./components/CityList"
import CountryList from "./components/CountryList"
import City from "./components/City"
import Form from "./components/Form"
import SpinnerFullPage from "./components/SpinnerFullPage"

const Homepage = lazy(() => import("./pages/Homepage"))
const Login = lazy(() => import("./pages/Login"))
const Product = lazy(() => import("./pages/Product"))
const Pricing = lazy(() => import("./pages/Pricing"))
const PageNotFound = lazy(() => import("./pages/PageNotFound"))
const AppLayout = lazy(() => import("./pages/AppLayout"))

// import Homepage from "./pages/Homepage"
// import Login from "./pages/Login"
// import Product from './pages/Product'
// import Pricing from "./pages/Pricing"
// import PageNotFound from "./pages/PageNotFound"
// import AppLayout from "./pages/AppLayout"

// dist/assets/index-D0oL885C.css   29.98 kB │ gzip:   5.08 kB
// dist/assets/index-CPzTZOBv.js   516.52 kB │ gzip: 148.56 kB

function App () {

  return (
    <AuthContextProvider>
      <CityContextProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route path="app" element={
                <ProtectRoute>
                  <AppLayout />
                </ProtectRoute>
              } >
                {/* <Route index element={<CityList cities={cities} isLoading={isLoading} />} /> */}
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CityContextProvider>
    </AuthContextProvider>
  )
}

export default App