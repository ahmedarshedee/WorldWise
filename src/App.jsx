import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import { CitiesProvider } from "./contexts/CititesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import HomePage from "./pages/HomePage";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout";
// import Login from "./pages/Login";
//
//
// LAZY HUMARY PAGES KO TAB HI SHOW KARY GA JAB HUM KO NEED HOO GI
// IS SEY BUNDEL KI SPILTTING HOO GI
// JAB THK WO LOAD HO GA TU HUM SUSPENSE COMPNET KA USE KAR KEY LAODIN SHOW KARY GAY

const HomePage = lazy(() => import("./pages/HomePage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Login = lazy(() => import("./pages/Login"));

function App() {
  // index route default value ki traha kaam karta hai jesy agar koi value nhi hoo gi yey show hoo ga
  return (
    // Remember: CitiesProvider ik alag sey compnent hai jo alag file main hai
    // SUSPENSE MAIN JAB THK NAYA COCPMONET NHI ATAA KUCH BHI DETKHA DEY GAU
    // YEY IK FALLBACK LETA HAI USS KEY ANDAR  HUM KOI ELEMENT SHOW KARWATY HAIN
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="products" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                {/* // yey ik trha ka redicred hi jo react router deta hai yha jo bhi hoo ga hum whi chly jay gay */}
                {/* aur replace hum ko wapis peechy jany main help karta hai */}
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
              <Route path="login" element={<Login />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
