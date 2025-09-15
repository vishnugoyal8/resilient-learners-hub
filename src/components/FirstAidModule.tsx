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
import firstAidSafetyThumbnail from '../assets/earthquake-safety-thumbnail.jpg';
import firstAidScienceThumbnail from '../assets/earthquake-science-thumbnail.jpg';
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

const FirstAidModule = ({ onBack }: { onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const videoContent: VideoContent[] = [
    {
      id: 'first-aid-hindi',
      title: 'प्राथमिक चिकित्सा - First Aid Training in Hindi',
      duration: '28:45',
      thumbnail: firstAidSafetyThumbnail,
      embedUrl: 'https://www.youtube.com/embed/z1NCStEbjSg',
      description: 'हिंदी में संपूर्ण प्राथमिक चिकित्सा प्रशिक्षण। सीखें जीवन बचाने के महत्वपूर्ण तरीके।'
    },
    {
      id: 'cpr-demonstration',
      title: 'CPR & AED Training - Complete Demonstration',
      duration: '15:30',
      thumbnail: firstAidScienceThumbnail,
      embedUrl: 'https://www.youtube.com/embed/aV89_yUJunM',
      description: 'Step-by-step CPR and AED training from certified medical professionals. Learn life-saving techniques.'
    },
    {
      id: 'wound-care-bandaging',
      title: 'Wound Care & Proper Bandaging Techniques',
      duration: '12:20',
      thumbnail: homePrepThumbnail,
      embedUrl: 'https://www.youtube.com/embed/EEYw0ZOKo_A',
      description: 'Professional wound care techniques, proper bandaging, and bleeding control methods.'
    },
    {
      id: 'choking-response',
      title: 'Choking Response & Heimlich Maneuver',
      duration: '8:45',
      thumbnail: schoolSafetyThumbnail,
      embedUrl: 'https://www.youtube.com/embed/7CgtIgSyAiU',
      description: 'Learn how to respond to choking emergencies for adults, children, and infants.'
    }
  ];

  const pdfResources: PDFResource[] = [
    {
      id: 'first-aid-kit-guide',
      title: 'Complete First Aid Kit Checklist',
      description: 'Comprehensive list of essential first aid supplies for home, office, and travel.',
      downloadUrl: '/pdfs/first-aid-kit-guide.pdf',
      size: '1.6 MB'
    },
    {
      id: 'emergency-response-cards',
      title: 'Emergency Response Quick Cards',
      description: 'Pocket-sized reference cards for common medical emergencies and first aid procedures.',
      downloadUrl: '/pdfs/emergency-response-cards.pdf',
      size: '2.2 MB'
    },
    {
      id: 'medical-emergency-protocols',
      title: 'Medical Emergency Protocols',
      description: 'Step-by-step protocols for handling various medical emergencies and when to call 911.',
      downloadUrl: '/pdfs/medical-emergency-protocols.pdf',
      size: '1.8 MB'
    }
  ];

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: 'What is the correct ratio of chest compressions to rescue breaths in adult CPR?',
      options: [
        '15:2',
        '30:2',
        '5:1',
        '10:2'
      ],
      correctAnswer: 1,
      explanation: 'The correct ratio for adult CPR is 30 chest compressions followed by 2 rescue breaths. This cycle should be repeated continuously.'
    },
    {
      id: 2,
      question: 'How deep should chest compressions be during adult CPR?',
      options: [
        '1 inch (2.5 cm)',
        '1.5 inches (3.8 cm)',
        '2 inches (5 cm)',
        '3 inches (7.6 cm)'
      ],
      correctAnswer: 2,
      explanation: 'Chest compressions should be at least 2 inches (5 cm) deep for adults, allowing complete chest recoil between compressions.'
    },
    {
      id: 3,
      question: 'What should you do first when someone is choking and can still cough?',
      options: [
        'Perform back blows immediately',
        'Start the Heimlich maneuver',
        'Encourage them to keep coughing',
        'Call 911 immediately'
      ],
      correctAnswer: 2,
      explanation: 'If the person can still cough, encourage them to continue coughing as this is the most effective way to dislodge the object. Only intervene if they cannot cough, speak, or breathe.'
    },
    {
      id: 4,
      question: 'How should you treat a severe bleeding wound?',
      options: [
        'Apply ice directly to the wound',
        'Apply direct pressure with a clean cloth',
        'Elevate the wound and apply a tourniquet',
        'Clean the wound with alcohol first'
      ],
      correctAnswer: 1,
      explanation: 'Apply direct pressure to the wound with a clean cloth or bandage to control bleeding. Maintain pressure and elevate if possible.'
    },
    {
      id: 5,
      question: 'What is the recovery position used for?',
      options: [
        'Someone having a heart attack',
        'Someone who is unconscious but breathing',
        'Someone who is choking',
        'Someone with a broken bone'
      ],
      correctAnswer: 1,
      explanation: 'The recovery position is used for someone who is unconscious but breathing normally. It helps keep their airway open and prevents choking on vomit.'
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
            <div className="w-16 h-16 rounded-full bg-emergency-success/10 flex items-center justify-center">
              <HeartIcon className="h-8 w-8 text-emergency-success" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gradient-hero">First Aid Training</h1>
              <p className="text-muted-foreground">Master essential first aid skills to save lives in emergencies</p>
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
                    <CardTitle className="text-emergency-success">First Aid Fundamentals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      First aid skills can mean the difference between life and death. This module covers:
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center space-x-2">
                        <CheckCircleIcon className="h-4 w-4 text-emergency-success" />
                        <span>CPR and AED usage</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircleIcon className="h-4 w-4 text-emergency-success" />
                        <span>Wound care and bleeding control</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircleIcon className="h-4 w-4 text-emergency-success" />
                        <span>Choking response techniques</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircleIcon className="h-4 w-4 text-emergency-success" />
                        <span>Emergency assessment procedures</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-emergency-success">Life-Saving Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">CPR can double survival rates</p>
                        <Progress value={100} className="mt-2" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Brain damage starts after 4-6 minutes without oxygen</p>
                        <Progress value={75} className="mt-2" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Immediate first aid prevents 50% of complications</p>
                        <Progress value={50} className="mt-2" />
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
                          title="First Aid Training Video"
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
                        <DocumentArrowDownIcon className="h-8 w-8 text-emergency-success" />
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
                      <CardTitle className="text-center text-2xl text-emergency-success">Quiz Results</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-6">
                      <div>
                        <p className="text-3xl font-bold text-emergency-success">
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

export default FirstAidModule;