import { Route, Routes } from 'react-router-dom'
import type { AppRoute } from './types/Route.type';
import { appRoutes } from './routes/route.config';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/store';
import { setAuthState } from './store/slices/authSlice';

function App() {
  const appStoreVariable=useAppSelector((state)=>state);
  const dispatch = useAppDispatch();
  const renderRoutes = (routes: AppRoute[]) => {
    return routes.map(({ path, element, children }, index) => (
      <Route key={index} path={path} element={element}>
        {children && renderRoutes(children)}
      </Route>
    ));
  };

  useEffect(() => {
    if(appStoreVariable?.auth?.permissions?.length>0) return;
    
    let fullName = localStorage.getItem('full_name') || '';
    let role = localStorage.getItem('role') || '';
    let permissions: string[] = [];

    try {
      const permissionsRaw = localStorage.getItem('permissions');
      if (permissionsRaw) {
        permissions = JSON.parse(permissionsRaw);
        if (!Array.isArray(permissions)) {
          permissions = [];
        }
      }
    } catch (error) {
      console.error('Failed to parse permissions from localStorage', error);
      permissions = [];
    }

    let obj:any={};

    if(fullName) obj.full_name=fullName;
    if(role) obj.role=role;
    if(permissions.length>0) obj.permissions=permissions;

    dispatch(setAuthState({
      ...obj,
    }));
  }, [appStoreVariable?.auth?.permissions]);


  return (
    <>


      <Routes>
        {renderRoutes(appRoutes)}
      </Routes>
      <ToastContainer
        position="top-right" // Toast position
        autoClose={5000} // Auto close after 5 seconds
        hideProgressBar={false} // Show progress bar
        newestOnTop={true} // Newest toast on top
        closeButton={false} // Hide the close button
        rtl={false} // Disable right to left direction
        pauseOnFocusLoss={false} // Disable pause on focus loss
        pauseOnHover={true} // Pause on hover
        theme="colored" // Use colored theme
      />
    </>
  )
}

export default App
