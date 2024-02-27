import { useNavigate, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";



function App() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage  navigate={useNavigate()} />}/>
    </Routes>
// New routes go here
);
}

export default App;

