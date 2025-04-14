import React from 'react'; // Necesario para JSX en este archivo
import type { ReactElement } from 'react';

import Inicio from '../pages/Home/Inicio';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Productos from '../pages/Productos/Productos';
import MiPedido from '../pages/MiPedido/MiPedido';

import Perfil from '../pages/Perfil/Perfil';

import Stock from '../pages/Stock/Stock';
import Clientes from '../pages/Clientes/Clientes';
import Cotizador from '../pages/Cotizador/Cotizador';

import Dashboard from '../pages/Admin/Dashboard';
import GestionUsuarios from '../pages/Admin/GestionUsuarios';

export interface RouteConfig {
  path: string;
  element: ReactElement;
  roles?: ('cliente' | 'vendedor' | 'admin')[];
}

export const routesConfig: RouteConfig[] = [
  // Públicas
  { path: '/', element: <Inicio /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/productos', element: <Productos /> },
  { path: '/mi-pedido', element: <MiPedido /> },

  // Cliente
  { path: '/perfil', element: <Perfil />, roles: ['cliente'] },

  // Vendedor
  { path: '/stock', element: <Stock />, roles: ['vendedor'] },
  { path: '/clientes', element: <Clientes />, roles: ['vendedor'] },
  { path: '/cotizador', element: <Cotizador />, roles: ['vendedor'] },

  // Admin
  { path: '/dashboard', element: <Dashboard />, roles: ['admin'] },
  { path: '/usuarios', element: <GestionUsuarios />, roles: ['admin'] },
];