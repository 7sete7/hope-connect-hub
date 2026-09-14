import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { SiteProvider } from "@/contexts/SiteContext";
import { Layout } from "@/components/layout/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import About from "./pages/About";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Partners from "./pages/Partners";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AdminCarousel from "./pages/admin/AdminCarousel";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminPartners from "./pages/admin/AdminPartners";
import AdminAbout from "./pages/admin/AdminAbout";
import AdminContact from "./pages/admin/AdminContact";
import AdminColors from "./pages/admin/AdminColors";
import AdminGeneral from "./pages/admin/AdminGeneral";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <SiteProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public */}
              <Route element={<Layout />}>
                <Route path="/" element={<Index />} />
                <Route path="/quem-somos" element={<About />} />
                <Route path="/eventos" element={<Events />} />
                <Route path="/eventos/:id" element={<EventDetail />} />
                <Route path="/parceiros" element={<Partners />} />
                <Route path="/contato" element={<Contact />} />
              </Route>

              {/* Auth */}
              <Route path="/login" element={<Login />} />

              {/* Admin */}
              <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
                <Route index element={<Dashboard />} />
                <Route path="carrossel" element={<AdminCarousel />} />
                <Route path="eventos" element={<AdminEvents />} />
                <Route path="parceiros" element={<AdminPartners />} />
                <Route path="quem-somos" element={<AdminAbout />} />
                <Route path="contato" element={<AdminContact />} />
                <Route path="cores" element={<AdminColors />} />
                <Route path="geral" element={<AdminGeneral />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </SiteProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
