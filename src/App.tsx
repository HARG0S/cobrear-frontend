import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <AppRoutes />
        <Footer /> {/* 👈 Ahora aparece en todas las rutas */}
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;