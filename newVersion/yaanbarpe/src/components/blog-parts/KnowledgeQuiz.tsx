import React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import { Brain, CheckCircle, XCircle, Trophy, Clock } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface KnowledgeQuizProps {
  onQuizComplete: (score: number) => void;
  blogTitle?: string;
}

// Blog-specific quiz questions
const getQuizQuestions = (blogTitle: string = ''): QuizQuestion[] => {
  // Default questions for Tulu culture
  const defaultQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "What is the traditional art form that combines dance, music, and storytelling in Tulu culture?",
      options: ["Bharatanatyam", "Yakshagana", "Kathakali", "Kuchipudi"],
      correct: 1,
      explanation: "Yakshagana is a traditional theatre form that uniquely combines dance, music, dialogue, costume, and stage techniques, originating from coastal Karnataka."
    },
    {
      id: 2,
      question: "Which temple in Udupi is famous for its unique darshan system?",
      options: ["Kollur Mookambika", "Sri Krishna Matha", "Anegudde Vinayaka", "Kateel Durgaparameshwari"],
      correct: 1,
      explanation: "Sri Krishna Matha in Udupi is famous for its unique darshan through a silver-plated window called 'Navagraha Kitiki'."
    },
    {
      id: 3,
      question: "What is 'Neer Dosa' in Tulu cuisine?",
      options: ["A spicy curry", "A thin rice crepe", "A sweet dessert", "A fermented drink"],
      correct: 1,
      explanation: "Neer Dosa is a paper-thin, delicate rice crepe that's a specialty of Tulu Nadu cuisine, often served with coconut chutney."
    }
  ];

  // You can add more specific questions based on blog titles
  if (blogTitle.toLowerCase().includes('yakshagana')) {
    return [
      {
        id: 1,
        question: "Yakshagana originated in which region?",
        options: ["Tamil Nadu", "Kerala", "Coastal Karnataka", "Andhra Pradesh"],
        correct: 2,
        explanation: "Yakshagana is a traditional theatre form from coastal Karnataka, particularly popular in Dakshina Kannada and Udupi districts."
      },
      {
        id: 2,
        question: "What are the main elements of Yakshagana performance?",
        options: ["Only dance", "Dance and music", "Dance, music, and dialogue", "Only music"],
        correct: 2,
        explanation: "Yakshagana combines dance, music, dialogue, costume, stage techniques, and elaborate makeup to tell stories from Hindu epics."
      },
      {
        id: 3,
        question: "When are Yakshagana performances traditionally held?",
        options: ["During the day", "During monsoon nights", "During harvest season", "Year-round"],
        correct: 2,
        explanation: "Traditional Yakshagana performances are held during the monsoon season nights, often continuing from evening till dawn."
      }
    ];
  }

  return defaultQuestions;
};

const KnowledgeQuiz = ({ onQuizComplete, blogTitle = '' }: KnowledgeQuizProps) => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const questions = getQuizQuestions(blogTitle);
  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  // Timer logic
  React.useEffect(() => {
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
    setTimeLeft(15);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === currentQ.correct) {
      setScore(score + 1);
    }

    setShowResult(true);
    setIsTimerActive(false);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(15);
        setIsTimerActive(true);
      } else {
        setQuizCompleted(true);
        setIsTimerActive(false);
        onQuizComplete(score + (selectedAnswer === currentQ.correct ? 1 : 0));
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
    setTimeLeft(15);
    setIsTimerActive(false);
  };

  if (!quizStarted && !quizCompleted) {
    return (
      <Card className="my-12 bg-gradient-to-br from-slate-50 to-gray-100 border-0 shadow-xl rounded-2xl overflow-hidden">
        <CardContent className="p-8">
          <div className="text-center">
            <Badge className="mb-4 bg-slate-800 text-white px-4 py-2 font-medium">
              <Brain className="w-4 h-4 mr-2" />
              Knowledge Quiz
            </Badge>
            
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Test Your Knowledge
            </h3>
            
            <p className="text-slate-600 mb-6 leading-relaxed">
              Challenge yourself with {questions.length} questions about this topic. Each question has 15 seconds to answer!
            </p>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <div className="font-bold text-blue-600 text-xl">{questions.length}</div>
                <div className="text-sm text-slate-600">Questions</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <div className="font-bold text-green-600 text-xl">15s</div>
                <div className="text-sm text-slate-600">Per Question</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <div className="font-bold text-purple-600 text-xl">100</div>
                <div className="text-sm text-slate-600">Points Max</div>
              </div>
            </div>
            
            <Button 
              onClick={startQuiz}
              className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Brain className="w-5 h-5 mr-2" />
              Start Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    const getScoreMessage = () => {
      if (percentage === 100) return "🎉 Perfect! You're an expert!";
      if (percentage >= 80) return "🌟 Excellent knowledge!";
      if (percentage >= 60) return "👍 Good job!";
      return "📚 Keep learning!";
    };

    return (
      <Card className="my-12 bg-gradient-to-br from-slate-50 to-gray-100 border-0 shadow-xl rounded-2xl overflow-hidden">
        <CardContent className="p-8">
          <div className="text-center">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4 animate-bounce" />
            
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Quiz Completed!
            </h3>
            
            <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              {score}/{questions.length}
            </div>
            
            <p className="text-lg text-slate-600 mb-6">
              {getScoreMessage()}
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <div className="font-bold text-green-700 text-lg">{score}</div>
                <div className="text-green-600 text-sm">Correct</div>
              </div>
              <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                <XCircle className="w-6 h-6 text-red-500 mx-auto mb-2" />
                <div className="font-bold text-red-700 text-lg">{questions.length - score}</div>
                <div className="text-red-600 text-sm">Incorrect</div>
              </div>
            </div>
            
            <Button 
              onClick={resetQuiz}
              variant="outline"
              className="border-slate-300 text-slate-600 hover:bg-slate-100 rounded-xl px-6 py-3 font-medium"
            >
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="my-12 bg-white border-0 shadow-xl rounded-2xl overflow-hidden">
      <CardContent className="p-8">
        <div className="flex justify-between items-center mb-6">
          <Badge className="bg-slate-800 text-white px-4 py-2 font-medium">
            <Brain className="w-4 h-4 mr-2" />
            Question {currentQuestion + 1} of {questions.length}
          </Badge>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono font-bold ${
            timeLeft <= 5 ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-blue-100 text-blue-700'
          }`}>
            <Clock className="w-4 h-4" />
            <span>{timeLeft}s</span>
          </div>
        </div>

        <Progress value={progress} className="mb-8 h-2 bg-slate-200" />

        <h3 className="text-xl font-bold mb-8 leading-relaxed text-slate-800">
          {currentQ.question}
        </h3>

        <div className="space-y-3 mb-8">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={showResult}
              className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 font-medium ${
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
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
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
                <span className="flex-1">{option}</span>
                {showResult && index === currentQ.correct && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
                {showResult && index === selectedAnswer && selectedAnswer !== currentQ.correct && (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
            </button>
          ))}
        </div>

        {showResult && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl mb-6">
            <h4 className="font-semibold text-blue-900 mb-2">Explanation:</h4>
            <p className="text-blue-800">{currentQ.explanation}</p>
          </div>
        )}

        {!showResult && (
          <Button 
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default KnowledgeQuiz;
