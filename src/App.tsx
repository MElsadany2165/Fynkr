import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Analytics from './pages/Analytics';
import Clients from './pages/Clients';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Help from './pages/Help';
import ProjectDetails from './pages/ProjectDetails';
import ClientView from './pages/ClientView';
import LogoPage from './pages/LogoPage';
import Layout from './components/Layout';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          {/* Homepage without sidebar */}
          <Route path="/" element={<Homepage />} />
          <Route path="/client/:projectId" element={<ClientView />} />
          <Route path="/logo" element={<LogoPage />} />
          
          {/* Dashboard routes with sidebar */}
          <Route path="/" element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/help" element={<Help />} />
            <Route path="/project/:projectId" element={<ProjectDetails />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;