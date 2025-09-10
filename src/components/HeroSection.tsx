import { motion } from 'framer-motion';
import { ShieldCheckIcon, AcademicCapIcon, UsersIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-24 sm:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-4xl"
          >
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Disaster Preparedness &
              <span className="block text-yellow-300">Response Education</span>
            </h1>
            <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto">
              Empowering students, teachers, NGOs, and citizens with interactive learning, 
              real-time alerts, and comprehensive disaster response training.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button className="btn-primary text-lg px-8 py-4">
              Start Learning
            </Button>
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-primary text-lg px-8 py-4">
              View Live Alerts
            </Button>
          </motion.div>

          {/* Feature Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm">
                <AcademicCapIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">Interactive Learning</h3>
              <p className="mt-2 text-blue-100 text-sm">Gamified modules and virtual drills</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm">
                <ShieldCheckIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">Real-time Alerts</h3>
              <p className="mt-2 text-blue-100 text-sm">Live weather and emergency updates</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm">
                <UsersIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">Community Ready</h3>
              <p className="mt-2 text-blue-100 text-sm">For students, teachers, NGOs & citizens</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;