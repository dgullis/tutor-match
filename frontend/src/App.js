import { useNavigate, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";

function App() {
  return (
    <Routes>
      <Route path = "/login" element= { <Login /> }></Route>
      <Route path = "/signup" element = { <Signup /> } ></Route>
      <Route path = "/profile" element = { <Profile /> }></Route>
      <Route path='/landing' element={<LandingPage  navigate={useNavigate()} />}/>
    </Routes>
// New routes go inside <Routes> tags
);
}

export default App;

