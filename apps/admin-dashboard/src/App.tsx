import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { AnalyticsOverview } from './modules/analytics/AnalyticsOverview';
import { CatalogManager } from './modules/catalog/CatalogManager';
import { CreditManagement } from './modules/credit/CreditManagement';
import { NotificationsCenter } from './modules/notifications/NotificationsCenter';
import { OrdersBoard } from './modules/orders/OrdersBoard';
import { RequireRole } from './modules/security/RequireRole';
import { UsersAdmin } from './modules/users/UsersAdmin';

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route
          path="/"
          element={
            <RequireRole allowedRoles={["admin", "analyst"]}>
              <AnalyticsOverview />
            </RequireRole>
          }
        />
        <Route
          path="/orders"
          element={
            <RequireRole allowedRoles={["admin", "staff"]}>
              <OrdersBoard />
            </RequireRole>
          }
        />
        <Route
          path="/catalog"
          element={
            <RequireRole allowedRoles={["admin", "merchant"]}>
              <CatalogManager />
            </RequireRole>
          }
        />
        <Route
          path="/credit"
          element={
            <RequireRole allowedRoles={["admin", "finance"]}>
              <CreditManagement />
            </RequireRole>
          }
        />
        <Route
          path="/notifications"
          element={
            <RequireRole allowedRoles={["admin", "marketer"]}>
              <NotificationsCenter />
            </RequireRole>
          }
        />
        <Route
          path="/users"
          element={
            <RequireRole allowedRoles={["admin", "owner"]}>
              <UsersAdmin />
            </RequireRole>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
