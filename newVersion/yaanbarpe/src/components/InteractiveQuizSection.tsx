
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Trophy, Star, Zap, CheckCircle, XCircle, RefreshCw, Share2, Clock, Target } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const quizQuestions = [
  {
    id: 1,
    question: "Which traditional art form combines dance, music, and storytelling in Tulu culture?",
    options: ["Bharatanatyam", "Yakshagana", "Kathakali", "Odissi"],
    correct: 1,
    explanation: "Yakshagana is a traditional theatre form that uniquely combines dance, music, dialogue, costume, and stage techniques, originating from coastal Karnataka.",
    difficulty: "Easy",
    category: "Cultural Arts"
  },
  {
    id: 2,
    question: "What is the famous temple in Udupi dedicated to?",
    options: ["Lord Shiva", "Lord Vishnu", "Lord Krishna", "Goddess Durga"],
    correct: 2,
    explanation: "The famous Sri Krishna Matha in Udupi is dedicated to Lord Krishna and is one of the most important pilgrimage sites in South India.",
    difficulty: "Medium",
    category: "Spirituality"
  },
  {
    id: 3,
    question: "Which traditional Tulu dish is a thin, delicate crepe made from rice batter?",
    options: ["Dosa", "Neer Dosa", "Uttapam", "Idli"],
    correct: 1,
    explanation: "Neer Dosa, literally meaning 'water dosa', is a paper-thin, delicate rice crepe that's a specialty of Tulu Nadu cuisine.",
    difficulty: "Easy",
    category: "Cuisine"
  },
  {
    id: 4,
    question: "What geological feature makes St. Mary's Islands unique?",
    options: ["Coral reefs", "Hexagonal basalt rock formations", "Salt deposits", "Limestone caves"],
    correct: 1,
    explanation: "St. Mary's Islands are famous for their unique hexagonal basalt rock formations, created by volcanic activity millions of years ago.",
    difficulty: "Hard",
    category: "Geography"
  },
  {
    id: 5,
    question: "Which festival involves traditional buffalo racing in coastal Karnataka?",
    options: ["Diwali", "Kambala", "Holi", "Onam"],
    correct: 1,
    explanation: "Kambala is a traditional buffalo racing festival that takes place in the coastal districts of Karnataka, deeply rooted in local agricultural traditions.",
    difficulty: "Medium",
    category: "Festivals"
  }
];

const InteractiveQuizSection = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const currentQ = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  useEffect(() => {
    if (isTimerActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isTimerActive) {
      handleNext();
    }
  }, [timeLeft, isTimerActive]);

  const startQuiz = () => {
    setQuizStarted(true);
    setIsTimerActive(true);
    setTimeLeft(30);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = selectedAnswer;
    setUserAnswers(newAnswers);

    if (selectedAnswer === currentQ.correct) {
      setScore(score + 1);
    }

    setShowResult(true);
    setIsTimerActive(false);

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(30);
        setIsTimerActive(true);
      } else {
        setQuizCompleted(true);
        setIsTimerActive(false);
      }
    }, 2500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setUserAnswers([]);
    setQuizCompleted(false);
    setTimeLeft(30);
    setIsTimerActive(false);
    setQuizStarted(false);
  };

  const shareScore = () => {
    const scorePercentage = Math.round((score / quizQuestions.length) * 100);
    const text = `I scored ${score}/${quizQuestions.length} (${scorePercentage}%) on the Tulu Culture Quiz! 🎉 Test your knowledge too!`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Tulu Culture Quiz Results',
        text: text,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(text);
      toast({
        title: "Score copied!",
        description: "Share your results with friends",
        duration: 2000,
      });
    }
  };

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage === 100) return "🎉 Perfect! You're a Tulu culture expert!";
    if (percentage >= 80) return "🌟 Excellent! You know your Tulu culture well!";
    if (percentage >= 60) return "👍 Good job! You have solid cultural knowledge!";
    if (percentage >= 40) return "📚 Not bad! Keep exploring to learn more!";
    return "🚀 Great start! There's so much more to discover!";
  };

  if (!quizStarted && !quizCompleted) {
    return (
      <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-6 bg-slate-800 text-white px-6 py-3 text-sm font-medium">
                <Brain className="w-4 h-4 mr-2" />
                Cultural Knowledge Quiz
              </Badge>
              
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-slate-800">
                Test Your <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Cultural IQ</span>
              </h2>
              
              <p className="text-slate-600 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
                Challenge yourself with 5 carefully crafted questions about Tulu culture, traditions, and heritage. Each question has 30 seconds - can you beat the clock?
              </p>
            </div>

            <Card className="max-w-2xl mx-auto bg-white shadow-2xl border-0 rounded-3xl overflow-hidden">
              <CardContent className="p-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                  <div className="text-center p-4 bg-blue-50 rounded-2xl">
                    <div className="text-3xl font-bold text-blue-600 mb-2">5</div>
                    <div className="text-sm text-slate-600 font-medium">Questions</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-2xl">
                    <div className="text-3xl font-bold text-green-600 mb-2">30s</div>
                    <div className="text-sm text-slate-600 font-medium">Per Question</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-2xl">
                    <div className="text-3xl font-bold text-purple-600 mb-2">4</div>
                    <div className="text-sm text-slate-600 font-medium">Categories</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-2xl">
                    <div className="text-3xl font-bold text-yellow-600 mb-2">100</div>
                    <div className="text-sm text-slate-600 font-medium">Points Max</div>
                  </div>
                </div>

                <Button 
                  size="lg"
                  onClick={startQuiz}
                  className="w-full bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white px-12 py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group text-lg font-semibold"
                >
                  <Zap className="w-6 h-6 mr-3 animate-pulse" />
                  Start Quiz Challenge
                  <Trophy className="w-6 h-6 ml-3 group-hover:animate-bounce" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  if (quizCompleted) {
    return (
      <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="bg-white shadow-2xl border-0 rounded-3xl overflow-hidden">
              <CardContent className="p-12">
                <div className="mb-8">
                  <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-6 animate-bounce" />
                  
                  <h3 className="font-display text-3xl font-bold mb-4 text-slate-800">
                    Quiz Complete! 🎉
                  </h3>
                  
                  <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6">
                    {score}/{quizQuestions.length}
                  </div>
                  
                  <p className="text-xl mb-8 text-slate-600 font-medium">
                    {getScoreMessage()}
                  </p>
                </div>

                {/* Score Breakdown */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
                    <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-3" />
                    <div className="font-bold text-green-700 text-xl">{score}</div>
                    <div className="text-green-600 text-sm">Correct</div>
                  </div>
                  <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
                    <XCircle className="w-8 h-8 text-red-500 mx-auto mb-3" />
                    <div className="font-bold text-red-700 text-xl">{quizQuestions.length - score}</div>
                    <div className="text-red-600 text-sm">Incorrect</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={resetQuiz}
                    variant="outline"
                    className="border-slate-300 text-slate-600 hover:bg-slate-100 hover:text-slate-800 rounded-xl px-6 py-3 font-medium"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>
                  
                  <Button 
                    onClick={shareScore}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl px-6 py-3 font-medium"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Score
                  </Button>
                </div>

                <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-200">
                  <p className="text-slate-600 text-sm">
                    Want to learn more about Tulu culture? Explore our experiences and blog posts to deepen your knowledge!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-slate-800 text-white px-6 py-2 font-medium">
              <Brain className="w-4 h-4 mr-2" />
              Question {currentQuestion + 1} of {quizQuestions.length}
            </Badge>
            
            <Progress value={progress} className="mb-6 h-3 bg-slate-200" />
          </div>

          <Card className="bg-white shadow-2xl border-0 rounded-3xl overflow-hidden">
            <CardContent className="p-10">
              {/* Timer and Category */}
              <div className="flex justify-between items-center mb-8">
                <Badge variant="secondary" className="px-4 py-2 bg-slate-100 text-slate-700 font-medium">
                  {currentQ.category}
                </Badge>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono font-bold ${
                  timeLeft <= 10 ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-blue-100 text-blue-700'
                }`}>
                  <Clock className="w-4 h-4" />
                  <span>{timeLeft}s</span>
                </div>
              </div>

              {/* Question */}
              <h3 className="text-2xl md:text-3xl font-bold mb-10 leading-relaxed text-slate-800">
                {currentQ.question}
              </h3>

              {/* Options */}
              <div className="space-y-4 mb-10">
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                    className={`w-full p-5 text-left rounded-2xl border-2 transition-all duration-300 font-medium ${
                      showResult
                        ? index === currentQ.correct
                          ? 'border-green-500 bg-green-50 text-green-800'
                          : index === selectedAnswer && selectedAnswer !== currentQ.correct
                          ? 'border-red-500 bg-red-50 text-red-800'
                          : 'border-slate-200 bg-slate-50 text-slate-600'
                        : selectedAnswer === index
                        ? 'border-blue-500 bg-blue-50 text-blue-800 shadow-lg'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                        showResult
                          ? index === currentQ.correct
                            ? 'border-green-500 bg-green-500 text-white'
                            : index === selectedAnswer && selectedAnswer !== currentQ.correct
                            ? 'border-red-500 bg-red-500 text-white'
                            : 'border-slate-300 text-slate-500'
                          : selectedAnswer === index
                          ? 'border-blue-500 bg-blue-500 text-white'
                          : 'border-slate-300 text-slate-500'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="flex-1 text-lg">{option}</span>
                      {showResult && index === currentQ.correct && (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      )}
                      {showResult && index === selectedAnswer && selectedAnswer !== currentQ.correct && (
                        <XCircle className="w-6 h-6 text-red-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Explanation */}
              {showResult && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-2xl mb-8">
                  <h4 className="font-semibold text-blue-900 mb-3 text-lg">Explanation:</h4>
                  <p className="text-blue-800 leading-relaxed">{currentQ.explanation}</p>
                </div>
              )}

              {/* Action Button */}
              {!showResult && (
                <Button 
                  onClick={handleNext}
                  disabled={selectedAnswer === null}
                  className="w-full bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white py-4 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold"
                >
                  {currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                  <Target className="w-5 h-5 ml-2" />
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default InteractiveQuizSection;
