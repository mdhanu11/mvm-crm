import { Route, Routes } from 'react-router-dom'
import type { AppRoute } from './types/Route.type';
import { appRoutes } from './routes/route.config';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './store/store';
import { setAuthState } from './store/slices/authSlice';
import { Permission, Role } from './types/common.type';
import Page404 from './pages/404/404';

function App() {
  const appStoreVariable = useAppSelector((state) => state?.auth);
  const dispatch = useAppDispatch();
  const [isInitialized, setIsInitialized] = useState(false);

  const renderRoutes = (routes: AppRoute[],) => {
    const userRole = appStoreVariable?.role || null;
    const userPermissions = appStoreVariable?.permissions || null;
    
    const hasAccess = (routeRoles?: Role[], routePermission?: Permission) => {
      if (!routeRoles || routeRoles.length === 0) return true; // Public route

      const userHavePermission= userRole!="staff" || userPermissions.some((permission) => permission==routePermission);
      return routeRoles.some((role) => userRole==role) && userHavePermission;
    };

    // Filter routes first, then map
    const accessibleRoutes = routes.filter(({ roles, permission }) => {
      if (!roles || roles.length === 0) return true; // Public routes
      return hasAccess(roles, permission);
    });

    return accessibleRoutes.map(({ path, element, children }, index) => (
      <Route key={`${path}-${index}`} path={path} element={element}>
        {children && renderRoutes(children)}
      </Route>
    ));
  };

  // Initialize auth state from localStorage
  useEffect(() => {
    // Skip if already initialized or if permissions already exist
    if (isInitialized || appStoreVariable?.permissions?.length > 0) {
      setIsInitialized(true);
      return;
    }

    const initializeAuth = () => {
      try {
        const fullName = localStorage.getItem('full_name') || '';
        const username = localStorage.getItem('username') || '';
        const role = localStorage.getItem('role') || '';
        let permissions: string[] = [];

        const permissionsRaw = localStorage.getItem('permissions');
        if (permissionsRaw) {
          const parsed = JSON.parse(permissionsRaw);
          permissions = Array.isArray(parsed) ? parsed : [];
        }

        const authData: any = {};
        if (username) authData.username = username;
        if (fullName) authData.full_name = fullName;
        if (role) authData.role = role;
        authData.permissions = permissions; // Always set permissions array

        dispatch(setAuthState(authData));
      } catch (error) {
        console.error('Failed to initialize auth from localStorage:', error);
        // Set empty permissions to prevent infinite loading
        dispatch(setAuthState({ permissions: [] }));
      } finally {
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, [dispatch, isInitialized, appStoreVariable?.permissions]);

  // Show loading until auth is initialized
  if (!isInitialized) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        Loading...
      </div>
    );
  }

  return (
    <>
      <Routes>
        {renderRoutes(appRoutes)}
        <Route path="*" element={<Page404 />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeButton={true}
        rtl={false}
        pauseOnFocusLoss={false}
        pauseOnHover={true}
        theme="colored"
      />
    </>
  );
}

export default App;