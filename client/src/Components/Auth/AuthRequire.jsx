import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

function RequireAuth({ children }) {
    const {user} = useAuth();
    const location = useLocation();

    if (!user) {
        // Redirect mereka ke halaman login, tetapi simpan lokasi yang mereka coba untuk pergi
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default RequireAuth;