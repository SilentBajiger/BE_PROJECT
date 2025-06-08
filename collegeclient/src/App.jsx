import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router';
import Admission from './pages/Admission';
import Home from './pages/Home';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/admission'} Component={Admission} />
        <Route path={'/admin'} Component={AdminPage} />
        <Route path={'/*'} Component={Home} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
