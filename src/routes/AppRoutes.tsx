import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { routesConfig } from './routesConfig';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {

  return (
    <Routes>
      {routesConfig.map(({ path, element, roles }) => {
        if (!roles) {
          // Ruta pública
          return <Route key={path} path={path} element={element} />;
        }

        // Ruta protegida
        return (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute allowedRoles={roles}>
                {element}
              </ProtectedRoute>
            }
          />
        );
      })}

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
