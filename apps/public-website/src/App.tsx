import { Route, Routes } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { LocationsPage } from './pages/LocationsPage';
import { MenuPage } from './pages/MenuPage';
import { DownloadPage } from './pages/DownloadPage';
import { CheckoutPage } from './pages/CheckoutPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/locations" element={<LocationsPage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/download" element={<DownloadPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
  );
}
