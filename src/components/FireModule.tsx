import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FireIcon, 
  ArrowLeftIcon,
  PlayIcon,
  DocumentArrowDownIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

// Import thumbnails
import fireSafetyThumbnail from '../assets/earthquake-safety-thumbnail.jpg';
import fireScienceThumbnail from '../assets/earthquake-science-thumbnail.jpg';
import homePrepThumbnail from '../assets/home-prep-thumbnail.jpg';
import schoolSafetyThumbnail from '../assets/school-safety-thumbnail.jpg';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface VideoContent {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  embedUrl: string;
  description: string;
}

interface PDFResource {
  id: string;
  title: string;
  description: string;
  downloadUrl: string;
  size: string;
}

const FireModule = ({ onBack }: { onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const videoContent: VideoContent[] = [
    {
      id: 'fire-safety-hindi',
      title: 'आग से सुरक्षा - Fire Safety Training in Hindi',
      duration: '18:25',
      thumbnail: fireSafetyThumbnail,
      embedUrl: 'https://www.youtube.com/embed/JYYSNj7lCe4',
      description: 'हिंदी में आग से सुरक्षा की संपूर्ण जानकारी। सीखें कि आग लगने पर क्या करना चाहिए और कैसे बचाव करें।'
    },
    {
      id: 'fire-extinguisher-demo',
      title: 'Fire Extinguisher Types & Usage Demo',
      duration: '12:15',
      thumbnail: fireScienceThumbnail,
      embedUrl: 'https://www.youtube.com/embed/7XCYK5Z5WE4',
      description: 'Learn about different types of fire extinguishers and proper techniques for using them effectively.'
    },
    {
      id: 'home-fire-prevention',
      title: 'Home Fire Prevention & Safety Measures',
      duration: '15:30',
      thumbnail: homePrepThumbnail,
      embedUrl: 'https://www.youtube.com/embed/6W1qv1CB27I',
      description: 'Complete guide to preventing fires at home and creating fire-safe environments for your family.'
    },
    {
      id: 'escape-plan-drill',
      title: 'Fire Evacuation Plan & Emergency Drill',
      duration: '10:45',
      thumbnail: schoolSafetyThumbnail,
      embedUrl: 'https://www.youtube.com/embed/WQG_wnyEw5Q',
      description: 'How to create and practice fire escape plans for homes, schools, and workplaces.'
    }
  ];

  const pdfResources: PDFResource[] = [
    {
      id: 'fire-safety-checklist',
      title: 'Home Fire Safety Checklist',
      description: 'Comprehensive checklist for fire prevention and safety measures in residential settings.',
      downloadUrl: '/pdfs/fire-safety-checklist.pdf',
      size: '1.1 MB'
    },
    {
      id: 'fire-escape-plan',
      title: 'Fire Escape Plan Template',
      description: 'Create your family fire escape plan with this easy-to-use template and guidelines.',
      downloadUrl: '/pdfs/fire-escape-plan.pdf',
      size: '850 KB'
    },
    {
      id: 'fire-extinguisher-guide',
      title: 'Fire Extinguisher Selection Guide',
      description: 'Guide to selecting and maintaining different types of fire extinguishers for various fire classes.',
      downloadUrl: '/pdfs/fire-extinguisher-guide.pdf',
      size: '1.3 MB'
    }
  ];

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: 'What does the acronym PASS stand for when using a fire extinguisher?',
      options: [
        'Point, Aim, Spray, Sweep',
        'Pull, Aim, Squeeze, Sweep',
        'Push, Activate, Spray, Stop',
        'Prepare, Aim, Start, Stop'
      ],
      correctAnswer: 1,
      explanation: 'PASS stands for Pull (the pin), Aim (at the base of the fire), Squeeze (the handle), and Sweep (from side to side).'
    },
    {
      id: 2,
      question: 'What type of fire extinguisher should be used on electrical fires?',
      options: [
        'Water extinguisher',
        'Foam extinguisher',
        'CO2 or dry powder extinguisher',
        'Any available extinguisher'
      ],
      correctAnswer: 2,
      explanation: 'CO2 or dry powder extinguishers should be used on electrical fires (Class C). Never use water on electrical fires as it conducts electricity.'
    },
    {
      id: 3,
      question: 'How often should smoke detector batteries be changed?',
      options: [
        'Once a year',
        'Every 6 months',
        'Every 2 years',
        'Only when they beep'
      ],
      correctAnswer: 1,
      explanation: 'Smoke detector batteries should be changed every 6 months. A good way to remember is to change them when clocks change for daylight saving time.'
    },
    {
      id: 4,
      question: 'If your clothes catch fire, what should you do?',
      options: [
        'Run to get help',
        'Stop, Drop, and Roll',
        'Try to pull off the clothes',
        'Jump in water immediately'
      ],
      correctAnswer: 1,
      explanation: 'Stop what you are doing, Drop to the ground, cover your face with your hands, and Roll back and forth to smother the flames.'
    },
    {
      id: 5,
      question: 'When should you fight a fire yourself instead of evacuating?',
      options: [
        'When the fire is larger than you',
        'When you have the right extinguisher and the fire is small',
        'Always fight the fire first',
        'Never fight a fire yourself'
      ],
      correctAnswer: 1,
      explanation: 'Only fight a fire if it\'s small (no bigger than a wastepaper basket), you have the right extinguisher, and your escape route is clear.'
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setUserAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers([]);
    setShowResults(false);
    setQuizCompleted(false);
  };

  const calculateScore = () => {
    return userAnswers.reduce((score, answer, index) => {
      return answer === quizQuestions[index].correctAnswer ? score + 1 : score;
    }, 0);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-6 hover:bg-accent"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Modules
          </Button>

          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-disaster-fire/10 flex items-center justify-center">
              <FireIcon className="h-8 w-8 text-disaster-fire" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gradient-hero">Fire Safety</h1>
              <p className="text-muted-foreground">Master fire prevention, safety equipment, and emergency response</p>
            </div>
          </div>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <TabsContent value="overview" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-disaster-fire">Fire Safety Essentials</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Fire safety knowledge can save lives and property. This module covers:
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center space-x-2">
                        <CheckCircleIcon className="h-4 w-4 text-disaster-fire" />
                        <span>Fire prevention strategies</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircleIcon className="h-4 w-4 text-disaster-fire" />
                        <span>Fire extinguisher types and usage</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircleIcon className="h-4 w-4 text-disaster-fire" />
                        <span>Evacuation procedures</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircleIcon className="h-4 w-4 text-disaster-fire" />
                        <span>Smoke detection systems</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-disaster-fire">Fire Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Home fires occur every 93 seconds</p>
                        <Progress value={85} className="mt-2" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Working smoke alarms reduce death risk by 50%</p>
                        <Progress value={50} className="mt-2" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">You have less than 2 minutes to escape</p>
                        <Progress value={100} className="mt-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="videos" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {selectedVideo ? (
                  <Card>
                    <CardContent className="p-6">
                      <Button
                        variant="ghost"
                        onClick={() => setSelectedVideo(null)}
                        className="mb-4"
                      >
                        <ArrowLeftIcon className="h-4 w-4 mr-2" />
                        Back to Videos
                      </Button>
                      <div className="aspect-video">
                        <iframe
                          src={selectedVideo}
                          className="w-full h-full rounded-lg"
                          allowFullScreen
                          title="Fire Safety Video"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {videoContent.map((video) => (
                      <motion.div key={video.id} whileHover={{ scale: 1.02 }}>
                        <Card className="overflow-hidden cursor-pointer" onClick={() => setSelectedVideo(video.embedUrl)}>
                          <div className="relative">
                            <img 
                              src={video.thumbnail} 
                              alt={video.title}
                              className="w-full h-48 object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <PlayIcon className="h-16 w-16 text-white" />
                            </div>
                            <Badge className="absolute top-2 right-2 bg-black/60 text-white">
                              {video.duration}
                            </Badge>
                          </div>
                          <CardHeader>
                            <CardTitle className="text-lg">{video.title}</CardTitle>
                            <CardDescription>{video.description}</CardDescription>
                          </CardHeader>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </TabsContent>

            <TabsContent value="resources" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {pdfResources.map((resource) => (
                  <Card key={resource.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <DocumentArrowDownIcon className="h-8 w-8 text-disaster-fire" />
                        <Badge variant="secondary">{resource.size}</Badge>
                      </div>
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                      <CardDescription>{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full" variant="outline" asChild>
                        <a href={resource.downloadUrl} download>
                          <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
                          Download PDF
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="quiz" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {showResults ? (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-center text-2xl text-disaster-fire">Quiz Results</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-6">
                      <div>
                        <p className="text-3xl font-bold text-disaster-fire">
                          {calculateScore()}/{quizQuestions.length}
                        </p>
                        <p className="text-muted-foreground">Questions Correct</p>
                      </div>
                      
                      <div className="space-y-4">
                        {quizQuestions.map((question, index) => (
                          <div key={question.id} className="text-left p-4 bg-accent/50 rounded-lg">
                            <p className="font-medium mb-2">{question.question}</p>
                            <div className="flex items-center space-x-2">
                              {userAnswers[index] === question.correctAnswer ? (
                                <CheckCircleIcon className="h-5 w-5 text-green-500" />
                              ) : (
                                <XCircleIcon className="h-5 w-5 text-red-500" />
                              )}
                              <span className="text-sm text-muted-foreground">
                                {question.explanation}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <Button onClick={handleRestartQuiz} className="w-full">
                        Retake Quiz
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>Question {currentQuestion + 1} of {quizQuestions.length}</CardTitle>
                        <Badge variant="outline">
                          {Math.round(((currentQuestion + 1) / quizQuestions.length) * 100)}% Complete
                        </Badge>
                      </div>
                      <Progress 
                        value={((currentQuestion + 1) / quizQuestions.length) * 100} 
                        className="mt-4"
                      />
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <h3 className="text-xl font-medium">
                        {quizQuestions[currentQuestion].question}
                      </h3>
                      
                      <div className="space-y-3">
                        {quizQuestions[currentQuestion].options.map((option, index) => (
                          <Button
                            key={index}
                            variant={userAnswers[currentQuestion] === index ? "default" : "outline"}
                            className="w-full text-left justify-start h-auto p-4"
                            onClick={() => handleAnswerSelect(index)}
                          >
                            <span className="mr-3 font-bold">
                              {String.fromCharCode(65 + index)}.
                            </span>
                            {option}
                          </Button>
                        ))}
                      </div>

                      <Button 
                        onClick={handleNextQuestion}
                        disabled={userAnswers[currentQuestion] === undefined}
                        className="w-full"
                      >
                        {currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </div>
    </div>
  );
};

export default FireModule;