import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExclamationTriangleIcon, 
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
import cycloneSafetyThumbnail from '../assets/earthquake-safety-thumbnail.jpg';
import cycloneScienceThumbnail from '../assets/earthquake-science-thumbnail.jpg';
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

const CycloneModule = ({ onBack }: { onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const videoContent: VideoContent[] = [
    {
      id: 'cyclone-preparedness-hindi',
      title: 'चक्रवात से बचाव - Cyclone Preparedness in Hindi',
      duration: '22:15',
      thumbnail: cycloneSafetyThumbnail,
      embedUrl: 'https://www.youtube.com/embed/OTKhh7dCW6c',
      description: 'हिंदी में चक्रवात की तैयारी और सुरक्षा के उपाय। समझें कि तूफान के दौरान कैसे सुरक्षित रहें।'
    },
    {
      id: 'hurricane-tracking',
      title: 'Hurricane Tracking & Warning Systems',
      duration: '16:30',
      thumbnail: cycloneScienceThumbnail,
      embedUrl: 'https://www.youtube.com/embed/pLrSqQjf4gI',
      description: 'Understanding hurricane formation, tracking systems, and early warning mechanisms.'
    },
    {
      id: 'storm-shelter-prep',
      title: 'Storm Shelter Preparation & Safety Measures',
      duration: '13:45',
      thumbnail: homePrepThumbnail,
      embedUrl: 'https://www.youtube.com/embed/THOLNOIJXgQ',
      description: 'How to prepare your home and create safe spaces during severe storms and cyclones.'
    },
    {
      id: 'coastal-evacuation',
      title: 'Coastal Area Evacuation Procedures',
      duration: '18:20',
      thumbnail: schoolSafetyThumbnail,
      embedUrl: 'https://www.youtube.com/embed/wdmfXVKPHmI',
      description: 'Essential evacuation procedures for coastal communities during cyclone threats.'
    }
  ];

  const pdfResources: PDFResource[] = [
    {
      id: 'cyclone-emergency-kit',
      title: 'Cyclone Emergency Kit Checklist',
      description: 'Complete list of essential supplies for cyclone preparedness and survival.',
      downloadUrl: '/pdfs/cyclone-emergency-kit.pdf',
      size: '1.4 MB'
    },
    {
      id: 'cyclone-evacuation-plan',
      title: 'Cyclone Evacuation Plan Guide',
      description: 'Step-by-step guide for creating and executing effective cyclone evacuation plans.',
      downloadUrl: '/pdfs/cyclone-evacuation-plan.pdf',
      size: '1.1 MB'
    },
    {
      id: 'storm-shelter-guide',
      title: 'Storm Shelter Construction Guide',
      description: 'Guidelines for building and reinforcing storm shelters and safe rooms.',
      downloadUrl: '/pdfs/storm-shelter-guide.pdf',
      size: '2.1 MB'
    }
  ];

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: 'What is the most dangerous part of a cyclone/hurricane?',
      options: [
        'The eye of the storm',
        'The storm surge',
        'The wind speed',
        'The heavy rainfall'
      ],
      correctAnswer: 1,
      explanation: 'Storm surge is often the most deadly aspect of hurricanes, causing massive flooding in coastal areas and accounting for about 90% of hurricane-related fatalities.'
    },
    {
      id: 2,
      question: 'When should you evacuate during a cyclone warning?',
      options: [
        'When winds reach 100 km/h',
        'When authorities issue evacuation orders',
        'When you see the storm approaching',
        'Only if your house is damaged'
      ],
      correctAnswer: 1,
      explanation: 'Always follow evacuation orders from local authorities. They have access to detailed weather data and know the most vulnerable areas.'
    },
    {
      id: 3,
      question: 'What should you NOT do during the eye of a cyclone?',
      options: [
        'Stay indoors',
        'Go outside to assess damage',
        'Monitor weather updates',
        'Keep emergency supplies ready'
      ],
      correctAnswer: 1,
      explanation: 'Never go outside during the eye of the storm. The calm period is temporary, and the other half of the storm will follow with winds from the opposite direction.'
    },
    {
      id: 4,
      question: 'How much emergency water should you store per person per day?',
      options: [
        '1 gallon (4 liters)',
        '2 gallons (8 liters)',
        '1/2 gallon (2 liters)',
        '3 gallons (12 liters)'
      ],
      correctAnswer: 0,
      explanation: 'Store at least 1 gallon (4 liters) of water per person per day for drinking, cooking, and hygiene. Plan for at least 3 days worth of supplies.'
    },
    {
      id: 5,
      question: 'What is the Saffir-Simpson scale used for?',
      options: [
        'Measuring earthquake intensity',
        'Categorizing hurricane strength',
        'Predicting storm paths',
        'Measuring rainfall amounts'
      ],
      correctAnswer: 1,
      explanation: 'The Saffir-Simpson Hurricane Wind Scale categorizes hurricanes from Category 1 to 5 based on their sustained wind speeds and potential for damage.'
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
            <div className="w-16 h-16 rounded-full bg-disaster-wind/10 flex items-center justify-center">
              <ExclamationTriangleIcon className="h-8 w-8 text-disaster-wind" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gradient-hero">Cyclone Preparedness</h1>
              <p className="text-muted-foreground">Learn to prepare for and survive cyclones and hurricanes</p>
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
                    <CardTitle className="text-disaster-wind">Cyclone Safety Knowledge</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Cyclones are powerful rotating storms that can cause devastating damage. This module covers:
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center space-x-2">
                        <CheckCircleIcon className="h-4 w-4 text-disaster-wind" />
                        <span>Cyclone formation and tracking</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircleIcon className="h-4 w-4 text-disaster-wind" />
                        <span>Early warning systems</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircleIcon className="h-4 w-4 text-disaster-wind" />
                        <span>Evacuation procedures</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircleIcon className="h-4 w-4 text-disaster-wind" />
                        <span>Storm shelter preparation</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-disaster-wind">Cyclone Impact Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Storm surge causes 90% of cyclone fatalities</p>
                        <Progress value={90} className="mt-2" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Category 3+ storms cause major damage</p>
                        <Progress value={75} className="mt-2" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">72 hours advance warning possible</p>
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
                          title="Cyclone Safety Video"
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
                        <DocumentArrowDownIcon className="h-8 w-8 text-disaster-wind" />
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
                      <CardTitle className="text-center text-2xl text-disaster-wind">Quiz Results</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-6">
                      <div>
                        <p className="text-3xl font-bold text-disaster-wind">
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

export default CycloneModule;