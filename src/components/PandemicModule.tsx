import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HeartIcon, 
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
import pandemicSafetyThumbnail from '../assets/earthquake-safety-thumbnail.jpg';
import pandemicScienceThumbnail from '../assets/earthquake-science-thumbnail.jpg';
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

const PandemicModule = ({ onBack }: { onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const videoContent: VideoContent[] = [
    {
      id: 'pandemic-preparedness-hindi',
      title: 'महामारी से बचाव - Pandemic Preparedness in Hindi',
      duration: '20:30',
      thumbnail: pandemicSafetyThumbnail,
      embedUrl: 'https://www.youtube.com/embed/A03IryJE16k',
      description: 'हिंदी में महामारी की तैयारी और सुरक्षा के उपाय। कोविड-19 से सीखे गए सबक।'
    },
    {
      id: 'hand-hygiene-demo',
      title: 'Proper Hand Hygiene & Sanitization Techniques',
      duration: '8:45',
      thumbnail: pandemicScienceThumbnail,
      embedUrl: 'https://www.youtube.com/embed/3PmVJQUCm4E',
      description: 'WHO recommended hand washing and sanitization techniques to prevent disease transmission.'
    },
    {
      id: 'home-isolation-guidelines',
      title: 'Home Isolation & Quarantine Guidelines',
      duration: '15:20',
      thumbnail: homePrepThumbnail,
      embedUrl: 'https://www.youtube.com/embed/sjLZZvOgtuY',
      description: 'Complete guide to safe home isolation practices and family protection during infectious diseases.'
    },
    {
      id: 'vaccine-awareness',
      title: 'Vaccine Awareness & Public Health Response',
      duration: '12:10',
      thumbnail: schoolSafetyThumbnail,
      embedUrl: 'https://www.youtube.com/embed/Hf2K-wJxOXE',
      description: 'Understanding vaccines, public health measures, and community response during pandemics.'
    }
  ];

  const pdfResources: PDFResource[] = [
    {
      id: 'pandemic-emergency-kit',
      title: 'Pandemic Emergency Kit Checklist',
      description: 'Essential supplies and medications for pandemic preparedness and home isolation.',
      downloadUrl: '/pdfs/pandemic-emergency-kit.pdf',
      size: '1.3 MB'
    },
    {
      id: 'hygiene-protocols',
      title: 'Personal & Home Hygiene Protocols',
      description: 'Comprehensive hygiene guidelines to prevent infectious disease transmission.',
      downloadUrl: '/pdfs/hygiene-protocols.pdf',
      size: '950 KB'
    },
    {
      id: 'mental-health-guide',
      title: 'Mental Health During Pandemics',
      description: 'Guide to maintaining mental health and dealing with isolation stress during health emergencies.',
      downloadUrl: '/pdfs/mental-health-guide.pdf',
      size: '1.7 MB'
    }
  ];

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: 'How long should you wash your hands to effectively remove germs?',
      options: [
        '10 seconds',
        '20 seconds',
        '30 seconds',
        '1 minute'
      ],
      correctAnswer: 1,
      explanation: 'Wash hands for at least 20 seconds with soap and water. This is about the time it takes to sing "Happy Birthday" twice.'
    },
    {
      id: 2,
      question: 'What is the recommended distance for social distancing?',
      options: [
        '3 feet (1 meter)',
        '6 feet (2 meters)',
        '9 feet (3 meters)',
        '12 feet (4 meters)'
      ],
      correctAnswer: 1,
      explanation: 'Maintain at least 6 feet (2 meters) distance from others to reduce the risk of respiratory droplet transmission.'
    },
    {
      id: 3,
      question: 'Which type of mask provides the best protection against airborne viruses?',
      options: [
        'Cloth mask',
        'Surgical mask',
        'N95/FFP2 respirator',
        'Any face covering'
      ],
      correctAnswer: 2,
      explanation: 'N95 or FFP2 respirators provide the highest level of protection by filtering at least 95% of airborne particles.'
    },
    {
      id: 4,
      question: 'What should you do if you develop symptoms during a pandemic?',
      options: [
        'Go to work as usual',
        'Self-isolate and seek medical advice',
        'Only worry if symptoms are severe',
        'Take over-the-counter medication and continue normal activities'
      ],
      correctAnswer: 1,
      explanation: 'Self-isolate immediately when symptoms develop and contact healthcare providers for guidance. This prevents spread to others.'
    },
    {
      id: 5,
      question: 'How long can some viruses survive on surfaces?',
      options: [
        'A few minutes',
        'A few hours',
        'Several days',
        'Several weeks'
      ],
      correctAnswer: 2,
      explanation: 'Many viruses can survive on surfaces for several days, which is why regular cleaning and disinfection of frequently touched surfaces is important.'
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
            <div className="w-16 h-16 rounded-full bg-emergency-info/10 flex items-center justify-center">
              <HeartIcon className="h-8 w-8 text-emergency-info" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gradient-hero">Pandemic Response</h1>
              <p className="text-muted-foreground">Learn hygiene protocols and emergency procedures for health crises</p>
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
                    <CardTitle className="text-emergency-info">Pandemic Preparedness</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Pandemics require specific knowledge and preparation. This module covers:
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center space-x-2">
                        <CheckCircleIcon className="h-4 w-4 text-emergency-info" />
                        <span>Personal hygiene and sanitization</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircleIcon className="h-4 w-4 text-emergency-info" />
                        <span>Social distancing guidelines</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircleIcon className="h-4 w-4 text-emergency-info" />
                        <span>Home isolation protocols</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircleIcon className="h-4 w-4 text-emergency-info" />
                        <span>Mental health support</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-emergency-info">Health Protection Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Hand hygiene reduces infection risk by 40%</p>
                        <Progress value={40} className="mt-2" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Masks reduce transmission by up to 80%</p>
                        <Progress value={80} className="mt-2" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Vaccines prevent severe disease in 90%+ cases</p>
                        <Progress value={95} className="mt-2" />
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
                          title="Pandemic Response Video"
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
                        <DocumentArrowDownIcon className="h-8 w-8 text-emergency-info" />
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
                      <CardTitle className="text-center text-2xl text-emergency-info">Quiz Results</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-6">
                      <div>
                        <p className="text-3xl font-bold text-emergency-info">
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

export default PandemicModule;