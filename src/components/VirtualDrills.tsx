import { motion } from 'framer-motion';
import { 
  PlayIcon, 
  UserGroupIcon, 
  ClockIcon,
  StarIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const drills = [
  {
    id: 1,
    title: 'Earthquake Drop, Cover & Hold',
    description: 'Practice the essential earthquake safety technique in a realistic virtual environment with real-time feedback.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=240&fit=crop',
    duration: '15 minutes',
    participants: 1247,
    difficulty: 'Beginner',
    rating: 4.8,
    type: 'VR Simulation'
  },
  {
    id: 2,
    title: 'Flood Evacuation Scenario',
    description: 'Navigate through a flooding scenario, make critical decisions, and practice safe evacuation procedures.',
    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=240&fit=crop',
    duration: '20 minutes',
    participants: 892,
    difficulty: 'Intermediate',
    rating: 4.7,
    type: 'Interactive Scenario'
  },
  {
    id: 3,
    title: 'Fire Emergency Response',
    description: 'Learn to respond to fire emergencies, use fire extinguishers, and execute evacuation plans effectively.',
    image: 'https://images.unsplash.com/photo-1574869381285-af0c2d34ba6c?w=400&h=240&fit=crop',
    duration: '18 minutes',
    participants: 1056,
    difficulty: 'Intermediate',
    rating: 4.9,
    type: 'Mixed Reality'
  },
  {
    id: 4,
    title: 'Cyclone Shelter Preparation',
    description: 'Experience preparing for a cyclone, securing your home, and making shelter-in-place decisions.',
    image: 'https://images.unsplash.com/photo-1527482937786-6608a78fb5e0?w=400&h=240&fit=crop',
    duration: '25 minutes',
    participants: 634,
    difficulty: 'Advanced',
    rating: 4.6,
    type: 'AR Experience'
  },
  {
    id: 5,
    title: 'Medical Emergency First Aid',
    description: 'Practice life-saving first aid techniques in emergency situations with virtual patients and scenarios.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=240&fit=crop',
    duration: '30 minutes',
    participants: 789,
    difficulty: 'Advanced',
    rating: 4.8,
    type: 'VR Training'
  },
  {
    id: 6,
    title: 'Community Response Coordination',
    description: 'Learn to coordinate community disaster response efforts and communicate effectively during emergencies.',
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=240&fit=crop',
    duration: '35 minutes',
    participants: 445,
    difficulty: 'Expert',
    rating: 4.5,
    type: 'Multiplayer Simulation'
  }
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner':
      return 'bg-green-100 text-green-800';
    case 'Intermediate':
      return 'bg-yellow-100 text-yellow-800';
    case 'Advanced':
      return 'bg-orange-100 text-orange-800';
    case 'Expert':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const VirtualDrills = () => {
  return (
    <section id="virtual-drills" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gradient-hero sm:text-4xl mb-4">
            Virtual Emergency Drills
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Immersive virtual reality and interactive simulations that prepare you for real emergency situations 
            through hands-on practice and realistic scenarios.
          </p>
        </motion.div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="disaster-card">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary">15,000+</div>
                  <div className="text-sm text-muted-foreground">Participants Trained</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary">25+</div>
                  <div className="text-sm text-muted-foreground">Virtual Scenarios</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-response">4.8</div>
                  <div className="text-sm text-muted-foreground">Average Rating</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-disaster-fire">98%</div>
                  <div className="text-sm text-muted-foreground">Completion Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Drills Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {drills.map((drill, index) => (
            <motion.div
              key={drill.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="disaster-card h-full group">
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img
                    src={drill.image}
                    alt={drill.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Overlay badges */}
                  <div className="absolute top-4 left-4">
                    <Badge className={getDifficultyColor(drill.difficulty)}>
                      {drill.difficulty}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-white/20 text-white backdrop-blur-sm">
                      {drill.type}
                    </Badge>
                  </div>

                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <PlayIcon className="h-8 w-8 text-white ml-1" />
                    </div>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {drill.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {drill.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0 flex-1 flex flex-col">
                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center space-x-1">
                      <ClockIcon className="h-4 w-4" />
                      <span>{drill.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <UserGroupIcon className="h-4 w-4" />
                      <span>{drill.participants.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{drill.rating}</span>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <Button className="w-full btn-primary group-hover:shadow-lg transition-shadow">
                      <PlayIcon className="h-4 w-4 mr-2" />
                      Start Drill
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Card className="disaster-card max-w-3xl mx-auto">
            <CardContent className="pt-8 pb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-hero flex items-center justify-center">
                  <TrophyIcon className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2">Earn Certificates</h3>
              <p className="text-muted-foreground mb-6">
                Complete virtual drills to earn official disaster preparedness certificates 
                recognized by emergency management agencies.
              </p>
              <Button className="btn-primary text-lg px-8 py-3">
                View Certification Program
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default VirtualDrills;