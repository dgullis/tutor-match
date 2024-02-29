import { useNavigate, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import TutorMatchNavbar from "./components/TutorMatchNavbar";
import ProtectedRoute from "./components/protectedRoutes";
import SearchPage from "./pages/SearchPage";



function App() {

  return (
    <>
      <TutorMatchNavbar />

      <Routes>
        <Route path = "/login" element= { <Login /> }></Route>
        <Route path = "/signup" element = { <Signup /> } ></Route>
        <Route path = "/profile" element = { <ProtectedRoute> <Profile /> </ProtectedRoute>  }></Route>
        <Route path = "/search" element = {<ProtectedRoute> <SearchPage /> </ProtectedRoute>}></Route>
        <Route path = "/profile/:id" element = {<ProtectedRoute> <Profile /> </ProtectedRoute>  }></Route>

        <Route path='/' element={<LandingPage  navigate={useNavigate()} />}/>
      </Routes>

    </>

);
}

export default App;

