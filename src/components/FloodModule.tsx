import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CloudIcon, 
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

// Import thumbnails (reusing existing ones or you can add flood-specific ones)
import floodSafetyThumbnail from '../assets/earthquake-safety-thumbnail.jpg';
import floodScienceThumbnail from '../assets/earthquake-science-thumbnail.jpg';
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

const FloodModule = ({ onBack }: { onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const videoContent: VideoContent[] = [
    {
      id: 'flood-safety-hindi',
      title: 'बाढ़ से सुरक्षा - Flood Safety in Hindi',
      duration: '15:45',
      thumbnail: floodSafetyThumbnail,
      embedUrl: 'https://www.youtube.com/embed/kWHBP3ArTvs',
      description: 'बाढ़ के दौरान सुरक्षा के महत्वपूर्ण नियम और तैयारी की जानकारी। सीखें कि बाढ़ से कैसे बचें।'
    },
    {
      id: 'flood-preparedness',
      title: 'Flood Emergency Preparedness & Response',
      duration: '12:30',
      thumbnail: floodScienceThumbnail,
      embedUrl: 'https://www.youtube.com/embed/VJGBHyEF_qA',
      description: 'Complete guide to flood preparedness including evacuation plans and emergency supplies.'
    },
    {
      id: 'flood-car-safety',
      title: 'Vehicle Safety During Floods - Real Demonstrations',
      duration: '8:20',
      thumbnail: homePrepThumbnail,
      embedUrl: 'https://www.youtube.com/embed/XM0RtUgwdlM',
      description: 'Critical safety measures when driving during floods. Learn when and how to evacuate your vehicle safely.'
    },
    {
      id: 'flash-flood-awareness',
      title: 'Flash Flood Awareness & Urban Flooding',
      duration: '10:15',
      thumbnail: schoolSafetyThumbnail,
      embedUrl: 'https://www.youtube.com/embed/YCa_RdEIJ4g',
      description: 'Understanding flash floods in urban areas and how to stay safe during sudden flooding events.'
    }
  ];

  const pdfResources: PDFResource[] = [
    {
      id: 'flood-emergency-kit',
      title: 'Flood Emergency Kit Checklist',
      description: 'Complete list of essential supplies for flood preparedness and evacuation.',
      downloadUrl: '/pdfs/flood-emergency-kit.pdf',
      size: '1.2 MB'
    },
    {
      id: 'flood-evacuation-plan',
      title: 'Family Flood Evacuation Plan',
      description: 'Template for creating your family\'s flood evacuation strategy and communication plan.',
      downloadUrl: '/pdfs/flood-evacuation-plan.pdf',
      size: '980 KB'
    },
    {
      id: 'flood-insurance-guide',
      title: 'Flood Insurance & Recovery Guide',
      description: 'Information about flood insurance, claims process, and post-flood recovery steps.',
      downloadUrl: '/pdfs/flood-insurance-guide.pdf',
      size: '1.5 MB'
    }
  ];

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: 'What should you do if you encounter a flooded road while driving?',
      options: [
        'Drive through slowly and carefully',
        'Turn around and find an alternate route',
        'Wait for the water to recede',
        'Call emergency services immediately'
      ],
      correctAnswer: 1,
      explanation: 'Never drive through flooded roads. Turn around, don\'t drown! Just 6 inches of moving water can knock you down, and 12 inches can carry away a vehicle.'
    },
    {
      id: 2,
      question: 'How much water is needed to float most cars?',
      options: [
        '6 inches',
        '12 inches', 
        '18 inches',
        '24 inches'
      ],
      correctAnswer: 2,
      explanation: 'Just 18-24 inches of flowing water is enough to float most vehicles. This is why it\'s crucial to avoid driving through flooded areas.'
    },
    {
      id: 3,
      question: 'What should be included in a flood emergency kit?',
      options: [
        'Only food and water',
        'Battery radio, flashlight, first aid kit, important documents',
        'Just important documents',
        'Only battery-powered devices'
      ],
      correctAnswer: 1,
      explanation: 'A comprehensive flood emergency kit should include water, food, battery radio, flashlight, first aid kit, medications, important documents, cash, and emergency contact information.'
    },
    {
      id: 4,
      question: 'During a flood warning, when should you evacuate?',
      options: [
        'When water reaches your door',
        'As soon as the warning is issued',
        'Only when authorities order evacuation',
        'When neighbors start evacuating'
      ],
      correctAnswer: 1,
      explanation: 'Evacuate immediately when a flood warning is issued for your area. Don\'t wait for water to reach your location, as conditions can deteriorate rapidly.'
    },
    {
      id: 5,
      question: 'What is the safest action if trapped in rising floodwater?',
      options: [
        'Try to swim to safety',
        'Climb to higher ground or the highest floor',
        'Wait in your car',
        'Walk through shallow water'
      ],
      correctAnswer: 1,
      explanation: 'If trapped, move to higher ground immediately - the roof of your house, upper floors, or any elevated area. Avoid walking or swimming in floodwater.'
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
            <div className="w-16 h-16 rounded-full bg-disaster-water/10 flex items-center justify-center">
              <CloudIcon className="h-8 w-8 text-disaster-water" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gradient-hero">Flood Response</h1>
              <p className="text-muted-foreground">Learn essential flood safety and emergency response techniques</p>
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
                    <CardTitle className="text-disaster-water">About Flood Safety</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Floods are one of the most common and devastating natural disasters. This module covers:
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center space-x-2">
                        <CheckCircleIcon className="h-4 w-4 text-disaster-water" />
                        <span>Flood types and warning systems</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircleIcon className="h-4 w-4 text-disaster-water" />
                        <span>Emergency evacuation procedures</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircleIcon className="h-4 w-4 text-disaster-water" />
                        <span>Vehicle and water safety</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircleIcon className="h-4 w-4 text-disaster-water" />
                        <span>Post-flood recovery and safety</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-disaster-water">Key Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Floods cause 90% of natural disaster damage</p>
                        <Progress value={90} className="mt-2" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">6 inches of water can knock you down</p>
                        <Progress value={100} className="mt-2" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">12 inches can carry away a car</p>
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
                          title="Flood Safety Video"
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
                        <DocumentArrowDownIcon className="h-8 w-8 text-disaster-water" />
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
                      <CardTitle className="text-center text-2xl text-disaster-water">Quiz Results</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-6">
                      <div>
                        <p className="text-3xl font-bold text-disaster-water">
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

export default FloodModule;