import { useNavigate, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import TutorMatchNavbar from "./components/TutorMatchNavbar";


function App() {

  return (
    <>
      <TutorMatchNavbar />

      <Routes>
        <Route path = "/login" element= { <Login /> }></Route>
        <Route path = "/signup" element = { <Signup /> } ></Route>
        <Route path = "/profile" element = { <Profile /> }></Route>
        <Route path='/landing' element={<LandingPage  navigate={useNavigate()} />}/>
      </Routes>
    </>

);
}

export default App;

