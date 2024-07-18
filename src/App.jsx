import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useContext, lazy, Suspense, useEffect, useState } from "react";
import { DataContext, FunctionsContext } from "./components/Context";

import "./App.css";
import NavBar from "./components/Navbar/NavBar";
import Profile from "./pages/Profile/Profile";
//pages
// import Home from './pages/Home/Home';
// import Buy from './pages/Buy/Buy';
// import Rent from './pages/Rent/Rent';
// import User from "./pages/User/User";
// import NotFound from './pages/NotFound';

const Home = lazy(() => import("./pages/Home/Home"));
const Buy = lazy(() => import("./pages/Buy/Buy"));
const Rent = lazy(() => import("./pages/Rent/Rent"));
const User = lazy(() => import("./pages/User/User"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const auth = useContext(DataContext).loginState;
  const tokenChanger = useContext(FunctionsContext).changeToken;
  const [searchFilter, setSearchFilter] = useState(null);
  // const navigate = useNavigate(); // Declare useNavigate hook

  console.log(auth);

  const url = new URL(window.location.href);
  const tok = url.searchParams.get("token");

  useEffect(() => {
    if (tok) {
      console.log("token: ", tok);
      tokenChanger(tok, true);
    }
  }, [tok]);
  // const navigate = useNavigate();
  function handleSearch(e) {
    // console.log(e);
    setSearchFilter(e);
    // navigate("/buy");
  }
  sessionStorage.setItem("token", "التوكين");

  return (
    <BrowserRouter>
      <NavBar />
      <Suspense fallback={<h1>Loading..</h1>}>
        <Routes>
          <Route path="/" element={<Home onSearch={handleSearch} />}></Route>
          <Route path="/rent" element={<Rent searchFilter={searchFilter} />} />
          <Route path="/buy" element={<Buy searchFilter={searchFilter} />} />
          <Route
            path="/profile"
            element={
              auth.login ? (
                <Profile token={auth.token} />
              ) : (
                <Home onSearch={handleSearch} notAuth={true} />
              )
            }
          />
          {/* <Route path="/profile" element={<Profile token={auth.token}/>}/> */}
          <Route
            path="/user"
            element={
              auth.login ? (
                auth.phone ? (
                  <User />
                ) : (
                  <Profile token={auth.token} phoneState={false} />
                )
              ) : (
                <Home onSearch={handleSearch} notAuth={true} />
              )
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
