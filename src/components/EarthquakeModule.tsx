import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlayIcon, 
  DocumentIcon, 
  QuestionMarkCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowLeftIcon,
  BookOpenIcon,
  VideoCameraIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';

// Import earthquake module images
import earthquakeSafetyThumbnail from '@/assets/earthquake-safety-thumbnail.jpg';
import homePrepThumbnail from '@/assets/home-prep-thumbnail.jpg';
import earthquakeScienceThumbnail from '@/assets/earthquake-science-thumbnail.jpg';
import schoolSafetyThumbnail from '@/assets/school-safety-thumbnail.jpg';

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
  pages: number;
  downloadUrl: string;
}

const EarthquakeModule = ({ onBack }: { onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'videos' | 'pdfs' | 'quiz'>('overview');
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const videoContent: VideoContent[] = [
    {
      id: 'eq-basics',
      title: 'Earthquake Fundamentals: Understanding Seismic Activity',
      duration: '12:45',
      thumbnail: earthquakeScienceThumbnail,
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Learn the basic science behind earthquakes, including tectonic plate movements and seismic waves.'
    },
    {
      id: 'drop-cover-hold',
      title: 'Drop, Cover, and Hold On - Emergency Response',
      duration: '8:30',
      thumbnail: earthquakeSafetyThumbnail,
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Master the essential earthquake safety technique that can save your life during seismic events.'
    },
    {
      id: 'home-prep',
      title: 'Earthquake-Proofing Your Home',
      duration: '15:20',
      thumbnail: homePrepThumbnail,
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Practical steps to secure your home and prepare an earthquake emergency kit.'
    },
    {
      id: 'school-safety',
      title: 'Earthquake Safety in Schools',
      duration: '10:15',
      thumbnail: schoolSafetyThumbnail,
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Special considerations and protocols for earthquake safety in educational environments.'
    }
  ];

  const pdfResources: PDFResource[] = [
    {
      id: 'earthquake-guide',
      title: 'Comprehensive Earthquake Preparedness Guide',
      description: 'Complete handbook covering all aspects of earthquake preparedness, response, and recovery.',
      pages: 48,
      downloadUrl: '/pdfs/earthquake-preparedness-guide.pdf'
    },
    {
      id: 'emergency-kit',
      title: 'Earthquake Emergency Kit Checklist',
      description: 'Detailed checklist of essential items for your earthquake emergency kit.',
      pages: 8,
      downloadUrl: '/pdfs/emergency-kit-checklist.pdf'
    },
    {
      id: 'family-plan',
      title: 'Family Emergency Communication Plan',
      description: 'Template and guide for creating a family emergency communication plan.',
      pages: 12,
      downloadUrl: '/pdfs/family-emergency-plan.pdf'
    },
    {
      id: 'building-safety',
      title: 'Earthquake Building Safety Assessment',
      description: 'Guide for assessing structural vulnerabilities in buildings and homes.',
      pages: 24,
      downloadUrl: '/pdfs/building-safety-assessment.pdf'
    }
  ];

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "What should you do immediately when you feel earthquake shaking?",
      options: [
        "Run outside as quickly as possible",
        "Stand in a doorway",
        "Drop, Cover, and Hold On",
        "Look for the nearest window"
      ],
      correctAnswer: 2,
      explanation: "Drop to your hands and knees, take cover under a sturdy desk or table, and hold on to your shelter while protecting your head and neck."
    },
    {
      id: 2,
      question: "How much water should you store per person for earthquake emergency supplies?",
      options: [
        "1 gallon per day for 3 days",
        "2 gallons per day for 2 days", 
        "1 gallon per day for 7 days",
        "Half gallon per day for 5 days"
      ],
      correctAnswer: 0,
      explanation: "Store at least 1 gallon of water per person per day for at least 3 days. Consider storing more if you have space."
    },
    {
      id: 3,
      question: "Where is the safest place to be during an earthquake if you're indoors?",
      options: [
        "Near a window with natural light",
        "Under a sturdy desk or table",
        "In a doorway",
        "Against an interior wall"
      ],
      correctAnswer: 1,
      explanation: "Under a sturdy desk or table provides the best protection from falling objects. Doorways are no longer considered the safest place."
    },
    {
      id: 4,
      question: "What magnitude earthquake is considered major?",
      options: [
        "5.0 - 5.9",
        "6.0 - 6.9", 
        "7.0 - 7.9",
        "8.0 and above"
      ],
      correctAnswer: 2,
      explanation: "Earthquakes of magnitude 7.0-7.9 are considered major and can cause serious damage over wider areas."
    },
    {
      id: 5,
      question: "How long should you wait before re-entering a building after an earthquake?",
      options: [
        "Immediately after shaking stops",
        "Wait for official clearance from authorities",
        "Wait 10 minutes",
        "Wait until the next day"
      ],
      correctAnswer: 1,
      explanation: "Wait for official clearance from emergency authorities. Buildings may have structural damage that isn't immediately visible."
    }
  ];

  const handleQuizAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizCompleted(false);
  };

  const correctAnswers = selectedAnswers.filter((answer, index) => 
    answer === quizQuestions[index].correctAnswer
  ).length;

  const scorePercentage = Math.round((correctAnswers / quizQuestions.length) * 100);

  const tabVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Modules
          </Button>
          
          <div className="text-center">
            <motion.h1 
              className="text-4xl font-bold text-gradient-hero mb-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              🌍 Earthquake Preparedness Module
            </motion.h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Master earthquake safety through comprehensive videos, guides, and interactive quizzes. 
              Learn life-saving techniques and preparedness strategies.
            </p>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-card rounded-xl p-2 shadow-md border">
            {[
              { id: 'overview', label: 'Overview', icon: BookOpenIcon },
              { id: 'videos', label: 'Videos', icon: VideoCameraIcon },
              { id: 'pdfs', label: 'Resources', icon: DocumentIcon },
              { id: 'quiz', label: 'Quiz', icon: AcademicCapIcon }
            ].map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant={activeTab === id ? "default" : "ghost"}
                onClick={() => setActiveTab(id as any)}
                className="mr-2 last:mr-0"
              >
                <Icon className="h-4 w-4 mr-2" />
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="disaster-card">
                    <CardHeader>
                      <CardTitle className="flex items-center text-disaster-earth">
                        <QuestionMarkCircleIcon className="h-6 w-6 mr-2" />
                        Learning Objectives
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <CheckCircleIcon className="h-5 w-5 text-success mt-0.5 mr-2 flex-shrink-0" />
                          <span>Understand earthquake science and causes</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircleIcon className="h-5 w-5 text-success mt-0.5 mr-2 flex-shrink-0" />
                          <span>Master Drop, Cover, and Hold On technique</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircleIcon className="h-5 w-5 text-success mt-0.5 mr-2 flex-shrink-0" />
                          <span>Create comprehensive emergency plans</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircleIcon className="h-5 w-5 text-success mt-0.5 mr-2 flex-shrink-0" />
                          <span>Prepare emergency supply kits</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircleIcon className="h-5 w-5 text-success mt-0.5 mr-2 flex-shrink-0" />
                          <span>Identify structural vulnerabilities</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="disaster-card">
                    <CardHeader>
                      <CardTitle className="flex items-center text-disaster-earth">
                        <AcademicCapIcon className="h-6 w-6 mr-2" />
                        Module Progress
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span>Videos Watched</span>
                            <span>0/4</span>
                          </div>
                          <Progress value={0} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span>Resources Downloaded</span>
                            <span>0/4</span>
                          </div>
                          <Progress value={0} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span>Quiz Completed</span>
                            <span>{quizCompleted ? '✓' : '✗'}</span>
                          </div>
                          <Progress value={quizCompleted ? 100 : 0} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="disaster-card">
                  <CardHeader>
                    <CardTitle>Quick Start Guide</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                          <VideoCameraIcon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold mb-2">1. Watch Videos</h3>
                        <p className="text-sm text-muted-foreground">
                          Start with fundamental concepts and safety techniques
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                          <DocumentIcon className="h-6 w-6 text-secondary" />
                        </div>
                        <h3 className="font-semibold mb-2">2. Study Resources</h3>
                        <p className="text-sm text-muted-foreground">
                          Download and review comprehensive guides and checklists
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-response/10 rounded-full flex items-center justify-center mx-auto mb-3">
                          <AcademicCapIcon className="h-6 w-6 text-response" />
                        </div>
                        <h3 className="font-semibold mb-2">3. Take Quiz</h3>
                        <p className="text-sm text-muted-foreground">
                          Test your knowledge and earn your completion certificate
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Videos Tab */}
            {activeTab === 'videos' && (
              <div className="space-y-6">
                {currentVideoId ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <Button
                      variant="ghost"
                      onClick={() => setCurrentVideoId(null)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <ArrowLeftIcon className="h-4 w-4 mr-2" />
                      Back to Video List
                    </Button>
                    
                    <Card className="disaster-card">
                      <CardContent className="p-0">
                        <div className="aspect-video w-full">
                          <iframe
                            src={videoContent.find(v => v.id === currentVideoId)?.embedUrl}
                            title="Earthquake Safety Video"
                            className="w-full h-full rounded-t-xl"
                            allowFullScreen
                          />
                        </div>
                        <div className="p-6">
                          <h2 className="text-2xl font-bold mb-2">
                            {videoContent.find(v => v.id === currentVideoId)?.title}
                          </h2>
                          <p className="text-muted-foreground">
                            {videoContent.find(v => v.id === currentVideoId)?.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {videoContent.map((video, index) => (
                      <motion.div
                        key={video.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="disaster-card cursor-pointer overflow-hidden">
                          <CardContent className="p-0">
                            <div 
                              className="relative group"
                              onClick={() => setCurrentVideoId(video.id)}
                            >
                              <img 
                                src={video.thumbnail} 
                                alt={video.title}
                                className="w-full aspect-video object-cover"
                              />
                              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 group-hover:scale-110 transition-transform">
                                  <PlayIcon className="h-8 w-8 text-white" />
                                </div>
                              </div>
                              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                {video.duration}
                              </div>
                            </div>
                            <div className="p-4">
                              <h3 className="font-semibold mb-2">{video.title}</h3>
                              <p className="text-sm text-muted-foreground">
                                {video.description}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* PDFs Tab */}
            {activeTab === 'pdfs' && (
              <div className="grid md:grid-cols-2 gap-6">
                {pdfResources.map((pdf, index) => (
                  <motion.div
                    key={pdf.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="disaster-card">
                      <CardHeader>
                        <CardTitle className="flex items-start">
                          <DocumentIcon className="h-6 w-6 text-primary mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <div>{pdf.title}</div>
                            <div className="text-sm text-muted-foreground font-normal mt-1">
                              {pdf.pages} pages
                            </div>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">{pdf.description}</p>
                        <Button 
                          className="w-full bg-gradient-hero hover:shadow-md"
                          onClick={() => window.open(pdf.downloadUrl, '_blank')}
                        >
                          Download PDF
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Quiz Tab */}
            {activeTab === 'quiz' && (
              <div className="max-w-2xl mx-auto">
                {!showResults ? (
                  <Card className="disaster-card">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
                        <span className="text-sm text-muted-foreground">
                          Progress: {Math.round(((currentQuestion) / quizQuestions.length) * 100)}%
                        </span>
                      </CardTitle>
                      <Progress value={((currentQuestion) / quizQuestions.length) * 100} className="mt-2" />
                    </CardHeader>
                    <CardContent>
                      <h3 className="text-lg font-semibold mb-6">
                        {quizQuestions[currentQuestion].question}
                      </h3>
                      
                      <div className="space-y-3 mb-6">
                        {quizQuestions[currentQuestion].options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleQuizAnswer(index)}
                            className={`w-full p-4 text-left rounded-lg border transition-all ${
                              selectedAnswers[currentQuestion] === index
                                ? 'border-primary bg-primary/10 text-primary'
                                : 'border-border hover:border-primary/50 hover:bg-accent'
                            }`}
                          >
                            <span className="font-medium mr-3">
                              {String.fromCharCode(65 + index)}.
                            </span>
                            {option}
                          </button>
                        ))}
                      </div>
                      
                      <Button
                        onClick={nextQuestion}
                        disabled={selectedAnswers[currentQuestion] === undefined}
                        className="w-full bg-gradient-hero"
                      >
                        {currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="disaster-card">
                    <CardHeader className="text-center">
                      <CardTitle className="text-2xl mb-2">Quiz Complete!</CardTitle>
                      <div className="text-6xl mb-4">
                        {scorePercentage >= 80 ? '🎉' : scorePercentage >= 60 ? '👍' : '📚'}
                      </div>
                      <div className="text-xl">
                        Your Score: <span className="font-bold text-primary">{correctAnswers}/{quizQuestions.length}</span>
                        <div className="text-lg text-muted-foreground">({scorePercentage}%)</div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 mb-6">
                        {quizQuestions.map((question, index) => (
                          <div key={question.id} className="p-4 border rounded-lg">
                            <div className="flex items-start mb-2">
                              {selectedAnswers[index] === question.correctAnswer ? (
                                <CheckCircleIcon className="h-5 w-5 text-success mt-0.5 mr-2 flex-shrink-0" />
                              ) : (
                                <XCircleIcon className="h-5 w-5 text-destructive mt-0.5 mr-2 flex-shrink-0" />
                              )}
                              <div className="flex-1">
                                <p className="font-medium">{question.question}</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {question.explanation}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex gap-4">
                        <Button onClick={resetQuiz} variant="outline" className="flex-1">
                          Retake Quiz
                        </Button>
                        {scorePercentage >= 80 && (
                          <Button className="flex-1 bg-gradient-safety">
                            Download Certificate
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EarthquakeModule;