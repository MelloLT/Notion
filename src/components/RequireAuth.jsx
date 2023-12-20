import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContextProvider';
import React from 'react';
import { CircularProgress } from '@mui/material';

function RequireAuth({ children }) {
  let { user, loading } = useContext(UserContext);

  if (loading) {
    return <CircularProgress sx={{ mx: 'auto', my: '30vh' }} />;
  }

  if (!user?.id) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default React.memo(RequireAuth);
