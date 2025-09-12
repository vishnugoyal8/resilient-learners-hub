import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BuildingOffice2Icon, 
  FireIcon, 
  CloudIcon,
  SunIcon,
  HeartIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import EarthquakeModule from './EarthquakeModule';

const modules = [
  {
    id: 'earthquake',
    title: 'Earthquake Preparedness',
    description: 'Learn how to stay safe during earthquakes through interactive lessons and quizzes.',
    icon: BuildingOffice2Icon,
    color: 'disaster-earth',
    progress: 75,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop'
  },
  {
    id: 'flood',
    title: 'Flood Response',
    description: 'Understand flood risks and practice evacuation plans with gamified scenarios.',
    icon: CloudIcon,
    color: 'disaster-water',
    progress: 50,
    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=200&fit=crop'
  },
  {
    id: 'fire',
    title: 'Fire Safety',
    description: 'Interactive lessons on fire prevention, safety equipment, and emergency response.',
    icon: FireIcon,
    color: 'disaster-fire',
    progress: 90,
    image: 'https://images.unsplash.com/photo-1574869381285-af0c2d34ba6c?w=400&h=200&fit=crop'
  },
  {
    id: 'cyclone',
    title: 'Cyclone Preparedness',
    description: 'Prepare for cyclones with checklists, drills, and safety tips aligned with NDMA guidelines.',
    icon: ExclamationTriangleIcon,
    color: 'disaster-wind',
    progress: 25,
    image: 'https://images.unsplash.com/photo-1527482937786-6608a78fb5e0?w=400&h=200&fit=crop'
  },
  {
    id: 'pandemic',
    title: 'Pandemic Response',
    description: 'Learn about hygiene, social distancing, and emergency protocols during pandemics.',
    icon: HeartIcon,
    color: 'emergency-info',
    progress: 60,
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&h=200&fit=crop'
  },
  {
    id: 'first-aid',
    title: 'First Aid Training',
    description: 'Interactive first aid lessons to empower you to help during emergencies.',
    icon: HeartIcon,
    color: 'emergency-success',
    progress: 80,
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0
  }
};

const DisasterModules = () => {
  const [activeModule, setActiveModule] = useState<string | null>(null);

  // Handle module navigation
  if (activeModule === 'earthquake') {
    return <EarthquakeModule onBack={() => setActiveModule(null)} />;
  }

  return (
    <section id="modules" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gradient-hero sm:text-4xl mb-4">
            Gamified Disaster Modules
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Interactive learning experiences designed to prepare you for various disaster scenarios through engaging content and practical exercises.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {modules.map((module) => {
            const IconComponent = module.icon;
            return (
              <motion.div key={module.id} variants={cardVariants}>
                <Card className="disaster-card h-full group">
                  <div className="relative overflow-hidden rounded-t-2xl">
                    <img
                      src={module.image}
                      alt={module.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 right-4">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-foreground">
                      {module.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {module.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{module.progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <motion.div
                          className="progress-fill"
                          style={{ width: `${module.progress}%` }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${module.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                    </div>

                    <Button 
                      className="w-full btn-primary"
                      onClick={() => {
                        if (module.id === 'earthquake') {
                          setActiveModule('earthquake');
                        } else {
                          // Handle other modules
                          console.log(`Opening ${module.title} module`);
                        }
                      }}
                    >
                      {module.progress > 0 ? 'Continue Module' : 'Start Module'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default DisasterModules;