import { Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useState } from "react";

//custom files
import Signup from "./AuthPages/Signup";
import Login from "./AuthPages/Login";
import Verification from "./AuthPages/Verification";
import NavBar from "./Components/NavBar";
import { Container } from "@mui/material";
import Home from "./Pages/Home";
import E_Commerce from "./Apps/E_Commerce/E_Commerce";
import SellerProfile from "./Apps/E_Commerce/Seller/SellerProfile";
import SellerProducts from "./Apps/E_Commerce/Seller/SellerProducts";
import ProductDetails from "./Apps/E_Commerce/Seller/ProductDetails";

function App() {

  const [darkMode, setDarkMode] = useState(false);

  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light"
    },
  });

  useEffect(() => {
    const localStorageData = localStorage.getItem('darkMode');
    if (localStorageData) {
      setDarkMode(JSON.parse(localStorageData));
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />

        <Container>
          <Routes>
            <Route exact path="/auth/signup" element={<Signup />}></Route>
            <Route exact path="/auth/login" element={<Login />}></Route>
            <Route exact path="/auth/verification" element={<Verification />}></Route>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/app/ecommerce/" element={<E_Commerce />}></Route>
            <Route exact path="/app/ecommerce/seller/profile" element={<SellerProfile />}></Route>
            <Route exact path="/app/ecommerce/seller/products" element={<SellerProducts />}></Route>
            <Route exact path="/app/ecommerce/seller/products/:id" element={<ProductDetails />}></Route>

          </Routes>
        </Container>
      </ThemeProvider>

    </>
  );
}

export default App;
