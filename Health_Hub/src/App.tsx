
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BookAppointment from "./pages/BookAppointment";
import AppointmentConfirmation from "./pages/AppointmentConfirmation";
import GetDirections from "./pages/GetDirections";
import CenterOfExcellence from "./pages/CenterOfExcellence";
import SpecialtyDetail from "./pages/SpecialtyDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/appointment-confirmation" element={<AppointmentConfirmation />} />
          <Route path="/get-directions" element={<GetDirections />} />
          <Route path="/centers-of-excellence" element={<CenterOfExcellence />} />
          <Route path="/specialty/:specialty" element={<SpecialtyDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
