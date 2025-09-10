import { motion } from 'framer-motion';
import { 
  DevicePhoneMobileIcon,
  CubeTransparentIcon,
  PuzzlePieceIcon,
  UsersIcon,
  ChartBarIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const technologies = [
  {
    id: 1,
    title: 'Augmented Reality Simulations',
    description: 'Experience realistic disaster scenarios through AR technology that overlays emergency situations onto your real environment.',
    icon: CubeTransparentIcon,
    features: ['3D Disaster Visualization', 'Real Environment Integration', 'Interactive Response Training'],
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  },
  {
    id: 2,
    title: 'Gamified Learning Quizzes',
    description: 'Interactive quizzes with point systems, leaderboards, and achievement badges to make disaster education engaging.',
    icon: PuzzlePieceIcon,
    features: ['Point-Based Scoring', 'Achievement Badges', 'Global Leaderboards'],
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  {
    id: 3,
    title: 'Scenario-Based Learning',
    description: 'Role-playing scenarios that let you experience different perspectives during disasters - as a citizen, responder, or coordinator.',
    icon: UsersIcon,
    features: ['Multiple Role Perspectives', 'Decision Trees', 'Consequence Learning'],
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'  
  },
  {
    id: 4,
    title: 'Mobile Response Apps',
    description: 'Dedicated mobile applications for quick access to emergency procedures, local alerts, and communication tools.',
    icon: DevicePhoneMobileIcon,
    features: ['Offline Access', 'GPS Integration', 'Emergency Communication'],
    color: 'from-orange-500 to-red-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200'
  },
  {
    id: 5,
    title: 'Data Analytics Dashboard',
    description: 'Advanced analytics to track learning progress, identify knowledge gaps, and optimize disaster preparedness training.',
    icon: ChartBarIcon,
    features: ['Progress Tracking', 'Performance Analytics', 'Personalized Recommendations'],
    color: 'from-teal-500 to-green-600',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200'
  },
  {
    id: 6,
    title: 'AI-Powered Recommendations',
    description: 'Intelligent system that personalizes learning paths based on your location, risk profile, and learning preferences.',
    icon: LightBulbIcon,
    features: ['Personalized Content', 'Risk Assessment', 'Adaptive Learning'],
    color: 'from-yellow-500 to-orange-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200'
  }
];

const InteractiveTech = () => {
  return (
    <section id="interactive-tech" className="py-16 px-4 sm:px-6 lg:px-8 bg-accent/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gradient-hero sm:text-4xl mb-4">
            Interactive Technology
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Cutting-edge technologies that transform disaster preparedness education through immersive experiences, 
            intelligent systems, and interactive learning platforms.
          </p>
        </motion.div>

        {/* Technology Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <Card className="disaster-card">
            <CardContent className="pt-8">
              <div className="text-center max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold mb-4">Aligned with International Standards</h3>
                <p className="text-muted-foreground text-lg mb-8">
                  Our interactive technologies are developed in accordance with NDMA (National Disaster Management Authority) 
                  and UNDRR (United Nations Office for Disaster Risk Reduction) guidelines, ensuring comprehensive and 
                  standardized disaster preparedness education.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex items-center justify-center space-x-4 p-4 bg-blue-50 rounded-lg">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/200px-Emblem_of_India.svg.png" 
                      alt="NDMA Logo" 
                      className="h-12 w-12 object-contain"
                    />
                    <div>
                      <div className="font-semibold">NDMA Aligned</div>
                      <div className="text-sm text-muted-foreground">National Standards</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center space-x-4 p-4 bg-indigo-50 rounded-lg">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/UN_emblem_blue.svg/200px-UN_emblem_blue.svg.png" 
                      alt="UNDRR Logo" 
                      className="h-12 w-12 object-contain"
                    />
                    <div>
                      <div className="font-semibold">UNDRR Guidelines</div>
                      <div className="text-sm text-muted-foreground">International Framework</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Technologies Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {technologies.map((tech, index) => {
            const IconComponent = tech.icon;
            return (
              <motion.div
                key={tech.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className={`disaster-card h-full ${tech.bgColor} ${tech.borderColor} border-2`}>
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${tech.color} flex items-center justify-center mb-4`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-foreground">
                      {tech.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {tech.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0 flex-1 flex flex-col">
                    <div className="flex-1">
                      <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                        Key Features
                      </h4>
                      <ul className="space-y-2">
                        {tech.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm">
                            <div className="w-2 h-2 rounded-full bg-primary mr-3 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6">
                      <Button 
                        className="w-full"
                        variant="outline"
                      >
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Demo Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <Card className="disaster-card">
            <CardContent className="pt-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Experience the Technology</h3>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Ready to see how interactive technology can transform disaster preparedness education? 
                  Try our demo or schedule a personalized demonstration.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="btn-primary text-lg px-8 py-3">
                    Try Interactive Demo
                  </Button>
                  <Button variant="outline" className="text-lg px-8 py-3">
                    Schedule Demo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <Card className="disaster-card text-center">
            <CardContent className="pt-8">
              <div className="text-4xl font-bold text-primary mb-2">85%</div>
              <div className="text-sm text-muted-foreground">Better Retention Rate</div>
              <p className="text-xs text-muted-foreground mt-2">
                Interactive learning improves knowledge retention significantly
              </p>
            </CardContent>
          </Card>
          <Card className="disaster-card text-center">
            <CardContent className="pt-8">
              <div className="text-4xl font-bold text-secondary mb-2">3x</div>
              <div className="text-sm text-muted-foreground">Faster Learning</div>
              <p className="text-xs text-muted-foreground mt-2">
                Gamified approaches accelerate the learning process
              </p>
            </CardContent>
          </Card>
          <Card className="disaster-card text-center">
            <CardContent className="pt-8">
              <div className="text-4xl font-bold text-response mb-2">92%</div>
              <div className="text-sm text-muted-foreground">User Engagement</div>
              <p className="text-xs text-muted-foreground mt-2">
                High engagement rates with interactive content
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveTech;