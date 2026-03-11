import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { EcommercePage } from './pages/EcommercePage';
import { CRMPage } from './pages/CRMPage';
import { ProfilePage } from './pages/ProfilePage';
import { NotificationPage } from './pages/NotificationPage';
import { OrdersPage } from './pages/commerce/OrdersPage';
import { ProductsPage } from './pages/commerce/ProductsPage';
import { CustomersPage } from './pages/commerce/CustomersPage';
import { InvoicesPage } from './pages/commerce/InvoicesPage';
import { 
  SaasPage, 
  ChartsPage, 
  MailPage, 
  ChatPage, 
  FilesPage, 
  KanbanPage, 
  CalendarPage, 
  WizardPage, 
  FormsPage 
} from './pages/OtherPages';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/notifications" element={<NotificationPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/ecommerce" element={<EcommercePage />} />
          <Route path="/crm" element={<CRMPage />} />
          <Route path="/saas" element={<SaasPage />} />
          <Route path="/charts" element={<ChartsPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/invoices" element={<InvoicesPage />} />
          <Route path="/mail" element={<MailPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/files" element={<FilesPage />} />
          <Route path="/kanban" element={<KanbanPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/wizard" element={<WizardPage />} />
          <Route path="/forms" element={<FormsPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
