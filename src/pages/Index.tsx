import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheckIcon, 
  ExclamationTriangleIcon,
  AcademicCapIcon,
  NewspaperIcon,
  PhoneIcon,
  GlobeAltIcon,
  ChartBarIcon,
  FireIcon,
  CloudIcon,
  BuildingOffice2Icon
} from '@heroicons/react/24/outline';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import DisasterModules from '../components/DisasterModules';
import WeatherAlerts from '../components/WeatherAlerts';
import DisasterNews from '../components/DisasterNews';
import StudentDashboard from '../components/StudentDashboard';
import VirtualDrills from '../components/VirtualDrills';
import InteractiveTech from '../components/InteractiveTech';
import EmergencyContacts from '../components/EmergencyContacts';
import MultilingualSupport from '../components/MultilingualSupport';
import ERPIntegration from '../components/ERPIntegration';

const Index = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        <HeroSection />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-24 pb-24"
        >
          <DisasterModules />
          <WeatherAlerts />
          <DisasterNews />
          <StudentDashboard />
          <VirtualDrills />
          <InteractiveTech />
          <MultilingualSupport />
          <EmergencyContacts />
          <ERPIntegration />
        </motion.div>
      </main>

      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <ShieldCheckIcon className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-gradient-hero">DPRES</span>
            </div>
            <p className="text-muted-foreground">
              © 2024 Disaster Preparedness and Response Education System
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Aligned with NDMA & UNDRR guidelines for comprehensive disaster education
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;