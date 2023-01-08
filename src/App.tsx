import { Routes, Route } from 'react-router-dom';
import './App.css';
import Expenditures from './Components/Organisms/Expenditures/Expenditures';
import HomePage from './Components/Organisms/HomePage/HomePage';
import Landing from './Components/Organisms/Landing/Landing';
import LoanDetails from './Components/Organisms/LoanTracker/LoanDetails/LoanDetails';
import LoanTracker from './Components/Organisms/LoanTracker/LoanTracker';
import Login from './Components/Organisms/Login/Login';
import Register from './Components/Organisms/Register/Register';
import Wrapper from './Components/UtilityComponents/Wrapper/Wrapper';
import { useAppSelector } from './Redux/hooks';

function App() {

  const authorized = useAppSelector((state) => state.auth.authorized)

  return (
    <Wrapper>
      <Routes>

        <Route element={authorized ? <HomePage /> : <Landing />} path="/"/>
        <Route element={ <Login /> } path="/login"/>
        <Route element={ <Register /> } path="/register"/>
        <Route element={authorized ? <Expenditures /> : <Landing />} path="/expenditures"/>
        <Route path="/loan">
          <Route  index element={authorized ? <LoanTracker /> : <Landing />} />
          <Route element={<LoanDetails />} path=":loanIndex" />
        </Route>

      </Routes>
    </Wrapper>
  );
}

export default App;
