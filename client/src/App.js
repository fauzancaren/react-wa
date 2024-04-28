import {BrowserRouter as Router,Routes, Route, Navigate} from 'react-router-dom'  
import './App.css';
import Login from './Pages/Login';
import Forgot from './Pages/Forgot';
import Mainmenu from './Pages/Mainmenu';   
import AuthProvider from './Components/Auth/AuthContext'
import RequireAuth  from './Components/Auth/AuthRequire';  
const App = () => {   
  return ( 
    <AuthProvider>
      <Router>
        <Routes> 
          <Route path="/login" element={<Login/>} /> 
          <Route path="/forgot" element={<Forgot/>} /> 
          <Route path="/"  element={
            <RequireAuth>
              <Mainmenu/> 
            </RequireAuth>
          }  />
          <Route path="*" element={<Navigate to="/" replace/>} />  
        </Routes>
      </Router> 
    </AuthProvider> 
  );
}

export default App;
