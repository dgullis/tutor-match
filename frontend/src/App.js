import { useNavigate, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import TutorMatchNavbar from "./components/TutorMatchNavbar";


function App() {

  return (
    <>

      <TutorMatchNavbar />

      <Routes>
        <Route path = "/" element = { <Layout></Layout> }>
              <Route index element = { <Login></Login> }></Route>
              <Route path = "/signup" element = { <Signup></Signup> } ></Route>
              <Route path = "/profile" element = { <Profile></Profile> }></Route>
            </Route>
        <Route path='/landing' element={<LandingPage  navigate={useNavigate()} />}/>
      </Routes>

    </>

);
}

export default App;

