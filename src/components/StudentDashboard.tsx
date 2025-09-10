import { motion } from 'framer-motion';
import { 
  UserCircleIcon, 
  TrophyIcon, 
  AcademicCapIcon,
  CalendarDaysIcon,
  MapPinIcon,
  PlayIcon
} from '@heroicons/react/24/outline';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const StudentDashboard = () => {
  const userProgress = [
    { module: 'Earthquake Preparedness', progress: 75, color: 'bg-amber-500' },
    { module: 'Flood Response', progress: 50, color: 'bg-blue-500' },
    { module: 'Fire Safety', progress: 90, color: 'bg-red-500' },
    { module: 'First Aid Training', progress: 65, color: 'bg-green-500' }
  ];

  const upcomingDrills = [
    {
      id: 1,
      title: 'Earthquake Drill',
      date: 'June 10, 2024',
      time: '10:00 AM',
      type: 'Virtual Reality Simulation'
    },
    {
      id: 2,
      title: 'Flood Evacuation Drill',
      date: 'June 15, 2024', 
      time: '2:00 PM',
      type: 'Interactive Scenario'
    }
  ];

  const achievements = [
    { title: 'Fire Safety Expert', icon: '🔥', earned: true },
    { title: 'First Aid Hero', icon: '🚑', earned: true },
    { title: 'Earthquake Ready', icon: '🏠', earned: false },
    { title: 'Flood Survivor', icon: '🌊', earned: false }
  ];

  return (
    <section id="dashboard" className="py-16 px-4 sm:px-6 lg:px-8 bg-accent/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gradient-hero sm:text-4xl mb-4">
            Student Dashboard
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Track your learning progress, view achievements, and stay updated with upcoming drills and assessments.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <Card className="disaster-card">
              <CardHeader className="text-center">
                <div className="mx-auto w-24 h-24 rounded-full bg-gradient-hero flex items-center justify-center mb-4">
                  <UserCircleIcon className="h-12 w-12 text-white" />
                </div>
                <CardTitle className="text-xl">Alex Johnson</CardTitle>
                <CardDescription>Student • Grade 10</CardDescription>
                <div className="flex items-center justify-center space-x-1 mt-2">
                  <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">North Region</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm font-bold">70%</span>
                  </div>
                  <Progress value={70} className="h-2" />
                  
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">8</div>
                      <div className="text-xs text-muted-foreground">Modules Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-secondary">15</div>
                      <div className="text-xs text-muted-foreground">Drills Attended</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="disaster-card mt-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrophyIcon className="h-5 w-5 text-yellow-500" />
                  <span>Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        achievement.earned 
                          ? 'border-yellow-200 bg-yellow-50' 
                          : 'border-gray-200 bg-gray-50 opacity-60'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-1">{achievement.icon}</div>
                        <div className="text-xs font-medium">{achievement.title}</div>
                        {achievement.earned && (
                          <Badge className="mt-1 bg-yellow-100 text-yellow-800">Earned</Badge>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Overview */}
            <Card className="disaster-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AcademicCapIcon className="h-5 w-5 text-primary" />
                  <span>Learning Progress</span>
                </CardTitle>
                <CardDescription>Your progress across all disaster preparedness modules</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {userProgress.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{item.module}</span>
                        <span className="text-muted-foreground">{item.progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <motion.div
                          className="progress-fill h-full rounded-full"
                          style={{ width: `${item.progress}%` }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Drills */}
            <Card className="disaster-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CalendarDaysIcon className="h-5 w-5 text-primary" />
                  <span>Upcoming Virtual Drills</span>
                </CardTitle>
                <CardDescription>Scheduled disaster response simulations and training exercises</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingDrills.map((drill, index) => (
                    <motion.div
                      key={drill.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="border border-border rounded-xl p-4 bg-gradient-to-r from-blue-50 to-indigo-50"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-foreground">{drill.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {drill.date} at {drill.time}
                          </p>
                          <Badge variant="secondary" className="mt-2">
                            {drill.type}
                          </Badge>
                        </div>
                        <Button className="btn-primary">
                          <PlayIcon className="h-4 w-4 mr-2" />
                          Join Drill
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="disaster-card">
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-primary">24</div>
                  <div className="text-sm text-muted-foreground">Quiz Score Average</div>
                </CardContent>
              </Card>
              <Card className="disaster-card">
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-secondary">7</div>
                  <div className="text-sm text-muted-foreground">Days Streak</div>
                </CardContent>
              </Card>
              <Card className="disaster-card">
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-response">95%</div>
                  <div className="text-sm text-muted-foreground">Drill Attendance</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StudentDashboard;