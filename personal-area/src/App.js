
import { Route, Routes } from 'react-router-dom';
import './App';
import ContactsPage from './components/ContactsPage/ContactsPage';
import LoginForm from './components/LoginForm/LoginForm';
import { MainPage } from './components/MainPage/MainPage';
import { RegForm } from './components/RegPage/RegForm';
import WelcomePage from './components/WelcomePage/WelcomePage';

function App() {
  return (
    <Routes>
      {<Route path='/' element={<MainPage/>}>
        <Route index element ={<RegForm/>}/>
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='/welcome' element={<WelcomePage/>}/>
        <Route path='/contacts' element={<ContactsPage/>}/>

      </Route> 
      }
    </Routes>
  );
}


export default App;
