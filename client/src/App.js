import {BrowserRouter as Router,Routes, Route, Navigate} from 'react-router-dom'  
import './App.css';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';   
import { AuthProvider } from './Components/Auth/AuthContext'
import RequireAuth  from './Components/Auth/AuthRequire'; 
import 'bootstrap/dist/css/bootstrap.min.css';
const App = () => {  

  return (
    <div className='app'>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />  
          <Route path="/login" element={<Login/>} /> 
          <Route path="/Dashboard"  element={
            <RequireAuth>
              <Dashboard/> 
            </RequireAuth>
          }  />
          <Route path="*" element={<Navigate to="/login" replace/>} />  
        </Routes>
      </Router> 
    </AuthProvider>
    </div>
  );
}

export default App;
