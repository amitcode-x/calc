import React, { useState, useRef, useEffect } from 'react';
import { Heart, Calendar, Shuffle, Share2, Moon, Sun, History, Sparkles, X, HeartHandshake, Stars } from 'lucide-react';

const LoveCalculator = () => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [dob1, setDob1] = useState('');
  const [dob2, setDob2] = useState('');
  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [typingName1, setTypingName1] = useState('');
  const [typingName2, setTypingName2] = useState('');
  const [typingMessage, setTypingMessage] = useState('');
  const [showShareCard, setShowShareCard] = useState(false);
  const [easterEgg, setEasterEgg] = useState('');
  const [hearts, setHearts] = useState([]);
  
  const audioRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    if (showConfetti) {
      const interval = setInterval(() => {
        setHearts(prev => [...prev, {
          id: Math.random(),
          left: Math.random() * 100,
          duration: 2 + Math.random() * 2,
          delay: Math.random() * 0.5
        }]);
      }, 200);

      setTimeout(() => {
        clearInterval(interval);
        setHearts([]);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [showConfetti]);

  const easterEggs = {
    'romeo-juliet': { score: 100, message: '💫 The greatest love story ever told! Shakespeare would be proud! 💫' },
    'bonnie-clyde': { score: 95, message: '🔥 Partners in crime and love! Unstoppable together! 🔥' },
    'adam-eve': { score: 100, message: '🍎 The original love story! Perfect match from the beginning of time! 🍎' },
    'mickey-minnie': { score: 98, message: '🐭 Disney magic at its finest! A love that is truly magical! 🐭' },
    'jack-rose': { score: 87, message: '🚢 Like the love from Titanic - epic and unforgettable! 🚢' }
  };

  const calculateLove = (n1, n2, d1 = '', d2 = '') => {
    const combo1 = `${n1.toLowerCase()}-${n2.toLowerCase()}`;
    const combo2 = `${n2.toLowerCase()}-${n1.toLowerCase()}`;
    
    if (easterEggs[combo1]) {
      setEasterEgg(easterEggs[combo1].message);
      return easterEggs[combo1].score;
    }
    if (easterEggs[combo2]) {
      setEasterEgg(easterEggs[combo2].message);
      return easterEggs[combo2].score;
    }
    
    setEasterEgg('');
    
    const combined = (n1 + n2).toLowerCase().replace(/\s/g, '');
    let score = 0;
    
    const letterCounts = {};
    for (let char of combined) {
      letterCounts[char] = (letterCounts[char] || 0) + 1;
    }
    
    for (let count of Object.values(letterCounts)) {
      score += count * count;
    }
    
    if (d1 && d2) {
      const date1 = new Date(d1);
      const date2 = new Date(d2);
      const dayDiff = Math.abs(date1.getDate() - date2.getDate());
      const monthDiff = Math.abs(date1.getMonth() - date2.getMonth());
      
      if (dayDiff <= 3) score += 15;
      if (monthDiff <= 1) score += 10;
      
      const zodiacCompat = getZodiacCompatibility(date1, date2);
      score += zodiacCompat;
    }
    
    const lengthDiff = Math.abs(n1.length - n2.length);
    if (lengthDiff <= 2) score += 10;
    
    const vowels1 = (n1.match(/[aeiou]/gi) || []).length;
    const vowels2 = (n2.match(/[aeiou]/gi) || []).length;
    if (Math.abs(vowels1 - vowels2) <= 1) score += 8;
    
    let percentage = Math.min(100, Math.max(10, (score % 91) + 10));
    
    const randomFactor = Math.random() * 20 - 10;
    percentage = Math.max(10, Math.min(100, Math.round(percentage + randomFactor)));
    
    return percentage;
  };

  const getZodiacCompatibility = (date1, date2) => {
    const getZodiacSign = (date) => {
      const month = date.getMonth() + 1;
      const day = date.getDate();
      
      if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'aries';
      if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'taurus';
      if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'gemini';
      if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'cancer';
      if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'leo';
      if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'virgo';
      if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'libra';
      if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'scorpio';
      if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'sagittarius';
      if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'capricorn';
      if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'aquarius';
      return 'pisces';
    };
    
    const sign1 = getZodiacSign(date1);
    const sign2 = getZodiacSign(date2);
    
    const compatibility = {
      'aries': ['leo', 'sagittarius', 'gemini'],
      'taurus': ['virgo', 'capricorn', 'cancer'],
      'gemini': ['libra', 'aquarius', 'aries'],
      'cancer': ['scorpio', 'pisces', 'taurus'],
      'leo': ['aries', 'sagittarius', 'gemini'],
      'virgo': ['taurus', 'capricorn', 'cancer'],
      'libra': ['gemini', 'aquarius', 'leo'],
      'scorpio': ['cancer', 'pisces', 'virgo'],
      'sagittarius': ['aries', 'leo', 'libra'],
      'capricorn': ['taurus', 'virgo', 'scorpio'],
      'aquarius': ['gemini', 'libra', 'sagittarius'],
      'pisces': ['cancer', 'scorpio', 'capricorn']
    };
    
    return compatibility[sign1] && compatibility[sign1].includes(sign2) ? 15 : 0;
  };

  const getLoveMessage = (percentage) => {
    if (easterEgg) return easterEgg;
    
    if (percentage >= 90) return "💕 Perfect Match! You are soulmates destined to be together! 💕";
    if (percentage >= 80) return "💖 Excellent Compatibility! Your love story is written in the stars! 💖";
    if (percentage >= 70) return "💝 Great Match! You complement each other beautifully! 💝";
    if (percentage >= 60) return "💗 Good Chemistry! There is definitely something special here! 💗";
    if (percentage >= 50) return "💓 Decent Connection! With effort, love can bloom! 💓";
    if (percentage >= 40) return "💛 Friendship First! Build a strong foundation together! 💛";
    if (percentage >= 30) return "🧡 Growing Bond! Give it time to flourish! 🧡";
    return "💚 New Beginnings! Every great love story starts somewhere! 💚";
  };

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const typeText = (text, setter, delay = 100) => {
    setter('');
    for (let i = 0; i <= text.length; i++) {
      setTimeout(() => setter(text.slice(0, i)), i * delay);
    }
  };

  const handleCalculate = async () => {
    if (!name1.trim() || !name2.trim()) return;
    
    setIsCalculating(true);
    setResult(null);
    
    typeText(name1, setTypingName1, 50);
    setTimeout(() => typeText(name2, setTypingName2, 50), 500);
    
    setTimeout(() => {
      const score = calculateLove(name1.trim(), name2.trim(), dob1, dob2);
      const message = getLoveMessage(score);
      
      const newResult = {
        name1: name1.trim(),
        name2: name2.trim(),
        dob1,
        dob2,
        score,
        message,
        timestamp: new Date().toISOString()
      };
      
      setResult(newResult);
      
      setHistory(prev => [newResult, ...prev.slice(0, 9)]);
      
      setTimeout(() => typeText(message, setTypingMessage, 30), 500);
      
      if (score >= 75) {
        setShowConfetti(true);
        playSound();
        setTimeout(() => setShowConfetti(false), 3000);
      }
      
      setIsCalculating(false);
    }, 1500);
  };

  const swapNames = () => {
    setName1(name2);
    setName2(name1);
    setDob1(dob2);
    setDob2(dob1);
  };

  const resetCalculator = () => {
    setName1('');
    setName2('');
    setDob1('');
    setDob2('');
    setResult(null);
    setTypingName1('');
    setTypingName2('');
    setTypingMessage('');
    setEasterEgg('');
  };

  const shareResult = async () => {
    if (!result) return;
    
    setShowShareCard(true);
    setTimeout(() => {
      if (navigator.share) {
        navigator.share({
          title: 'Love Calculator Result',
          text: `${result.name1} & ${result.name2}: ${result.score}% compatibility!`,
          url: window.location.href
        });
      } else {
        const text = `💕 Love Calculator Result 💕\n${result.name1} & ${result.name2}: ${result.score}% compatibility!\n${result.message}`;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(text);
        }
      }
    }, 1000);
  };

  const HeartProgress = ({ percentage }) => {
    const circumference = 2 * Math.PI * 45;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
    return (
      <div className="relative w-36 h-36 sm:w-40 sm:h-40 mx-auto mb-6">
        <svg className="w-full h-full transform -rotate-90 drop-shadow-2xl" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EC4899" />
              <stop offset="50%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#EF4444" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path
            d="M50,85 C20,60 5,35 20,20 C30,10 45,15 50,30 C55,15 70,10 80,20 C95,35 80,60 50,85 Z"
            fill="none"
            stroke={darkMode ? '#374151' : '#E5E7EB'}
            strokeWidth="4"
          />
          <path
            d="M50,85 C20,60 5,35 20,20 C30,10 45,15 50,30 C55,15 70,10 80,20 C95,35 80,60 50,85 Z"
            fill="none"
            stroke="url(#heartGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
            filter="url(#glow)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r from-pink-500 via-red-500 to-purple-500 bg-clip-text text-transparent`}>
            {percentage}%
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
        : 'bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50'
    } relative overflow-hidden`}>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-10 w-72 h-72 ${darkMode ? 'bg-pink-500' : 'bg-pink-300'} rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob`}></div>
        <div className={`absolute top-40 right-10 w-72 h-72 ${darkMode ? 'bg-purple-500' : 'bg-purple-300'} rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000`}></div>
        <div className={`absolute -bottom-8 left-20 w-72 h-72 ${darkMode ? 'bg-red-500' : 'bg-red-300'} rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000`}></div>
      </div>

      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {hearts.map(heart => (
            <div
              key={heart.id}
              className="absolute text-4xl animate-float-up"
              style={{
                left: `${heart.left}%`,
                animationDuration: `${heart.duration}s`,
                animationDelay: `${heart.delay}s`
              }}
            >
              💕
            </div>
          ))}
        </div>
      )}
      
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-5xl relative z-10">
        <div className="text-center mb-6 sm:mb-8 relative">
          <div className="flex justify-between items-center mb-4 sm:mb-6 gap-2">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`p-2 sm:p-3 rounded-full ${
                darkMode ? 'bg-gray-800 text-white border-2 border-pink-500' : 'bg-white text-gray-600 border-2 border-pink-300'
              } shadow-xl hover:scale-110 transition-all duration-300 hover:shadow-2xl backdrop-blur-sm`}
              aria-label="Show history"
            >
              <History size={20} className="sm:w-6 sm:h-6" />
            </button>
            
            <div className="flex flex-col items-center">
              <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-800'
              } flex items-center gap-2 mb-2 drop-shadow-lg`}>
                <HeartHandshake className="w-8 h-8 sm:w-10 sm:h-10 text-pink-500 animate-pulse" />
                <span className="bg-gradient-to-r from-pink-500 via-red-500 to-purple-500 bg-clip-text text-transparent">
                  Love Calculator
                </span>
              </h1>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Stars key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            </div>
            
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 sm:p-3 rounded-full ${
                darkMode ? 'bg-gray-800 text-yellow-400 border-2 border-yellow-400' : 'bg-white text-purple-600 border-2 border-purple-300'
              } shadow-xl hover:scale-110 transition-all duration-300 hover:shadow-2xl backdrop-blur-sm`}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={20} className="sm:w-6 sm:h-6" /> : <Moon size={20} className="sm:w-6 sm:h-6" />}
            </button>
          </div>
          
          <p className={`text-base sm:text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} font-medium`}>
            ✨ Discover your romantic compatibility ✨
          </p>
        </div>

        {showHistory && (
          <div className={`mb-6 sm:mb-8 p-4 sm:p-6 rounded-2xl ${
            darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-pink-200'
          } border-2 shadow-2xl backdrop-blur-md animate-slideDown`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-lg sm:text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} flex items-center gap-2`}>
                <History className="text-pink-500" />
                Recent Calculations
              </h3>
              <button onClick={() => setShowHistory(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            {history.length === 0 ? (
              <p className={`text-center py-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No calculations yet!</p>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {history.map((item, index) => (
                  <div key={index} className={`p-3 sm:p-4 rounded-xl ${
                    darkMode ? 'bg-gray-700/50' : 'bg-gradient-to-r from-pink-50 to-purple-50'
                  } flex justify-between items-center hover:scale-102 transition-transform shadow-md`}>
                    <span className={`font-medium truncate mr-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {item.name1} 💕 {item.name2}
                    </span>
                    <span className={`font-bold text-lg whitespace-nowrap ${
                      item.score >= 75 ? 'text-green-500' : item.score >= 50 ? 'text-yellow-500' : 'text-orange-500'
                    }`}>
                      {item.score}%
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className={`p-6 sm:p-8 md:p-10 rounded-3xl ${
          darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-pink-200'
        } border-2 shadow-2xl mb-8 backdrop-blur-md`}>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
            <div className="space-y-2">
              <label className={`flex items-center gap-2 text-sm font-semibold ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <Heart size={18} className="text-pink-500 fill-pink-500" />
                First Name
              </label>
              <input
                type="text"
                value={name1}
                onChange={(e) => setName1(e.target.value)}
                placeholder="Enter first name..."
                className={`w-full p-3 sm:p-4 border-2 rounded-xl text-base sm:text-lg font-medium ${
                  darkMode 
                    ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-gradient-to-r from-pink-50 to-purple-50 border-pink-300 text-gray-800 placeholder-gray-500'
                } focus:ring-4 focus:ring-pink-500/50 focus:border-pink-500 transition-all shadow-md`}
              />
            </div>
            
            <div className="space-y-2">
              <label className={`flex items-center gap-2 text-sm font-semibold ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <Heart size={18} className="text-purple-500 fill-purple-500" />
                Second Name
              </label>
              <input
                type="text"
                value={name2}
                onChange={(e) => setName2(e.target.value)}
                placeholder="Enter second name..."
                className={`w-full p-3 sm:p-4 border-2 rounded-xl text-base sm:text-lg font-medium ${
                  darkMode 
                    ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-300 text-gray-800 placeholder-gray-500'
                } focus:ring-4 focus:ring-purple-500/50 focus:border-purple-500 transition-all shadow-md`}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
            <div className="space-y-2">
              <label className={`flex items-center gap-2 text-sm font-semibold ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <Calendar size={18} className="text-pink-500" />
                Date of Birth (Optional)
              </label>
              <input
                type="date"
                value={dob1}
                onChange={(e) => setDob1(e.target.value)}
                className={`w-full p-3 sm:p-4 border-2 rounded-xl font-medium ${
                  darkMode 
                    ? 'bg-gray-700/50 border-gray-600 text-white' 
                    : 'bg-gradient-to-r from-pink-50 to-purple-50 border-pink-300 text-gray-800'
                } focus:ring-4 focus:ring-pink-500/50 focus:border-pink-500 transition-all shadow-md`}
              />
            </div>
            
            <div className="space-y-2">
              <label className={`flex items-center gap-2 text-sm font-semibold ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <Calendar size={18} className="text-purple-500" />
                Date of Birth (Optional)
              </label>
              <input
                type="date"
                value={dob2}
                onChange={(e) => setDob2(e.target.value)}
                className={`w-full p-3 sm:p-4 border-2 rounded-xl font-medium ${
                  darkMode 
                    ? 'bg-gray-700/50 border-gray-600 text-white' 
                    : 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-300 text-gray-800'
                } focus:ring-4 focus:ring-purple-500/50 focus:border-purple-500 transition-all shadow-md`}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center mb-8">
            <button
              onClick={handleCalculate}
              disabled={!name1.trim() || !name2.trim() || isCalculating}
              className={`px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-white text-base sm:text-lg ${
                !name1.trim() || !name2.trim() || isCalculating
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-pink-500 via-red-500 to-purple-500 hover:from-pink-600 hover:via-red-600 hover:to-purple-600'
              } transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl`}
            >
              {isCalculating ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-3 border-white border-t-transparent"></div>
                  Calculating...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Heart size={20} className="fill-white" />
                  Calculate Love
                </div>
              )}
            </button>

            <button
              onClick={swapNames}
              title="Swap names"
              className={`px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-bold ${
                darkMode 
                  ? 'bg-gray-700 text-white hover:bg-gray-600 border-2 border-pink-500' 
                  : 'bg-gradient-to-r from-pink-100 to-purple-100 text-gray-700 hover:from-pink-200 hover:to-purple-200 border-2 border-pink-300'
              } transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl`}
            >
              <Shuffle size={20} className="sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={resetCalculator}
              title="Reset"
              className={`px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-bold ${
                darkMode 
                  ? 'bg-gray-700 text-white hover:bg-gray-600 border-2 border-purple-500' 
                  : 'bg-gradient-to-r from-purple-100 to-pink-100 text-gray-700 hover:from-purple-200 hover:to-pink-200 border-2 border-purple-300'
              } transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl`}
            >
              Reset
            </button>
          </div>

          {(typingName1 || typingName2) && (
            <div className="text-center mb-6 animate-fadeIn">
              <div className={`text-2xl sm:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {typingName1} {typingName2 && <span className="text-pink-500 animate-pulse">💕</span>} {typingName2}
              </div>
            </div>
          )}

          {result && (
            <div className="text-center space-y-6 animate-fadeIn">
              <HeartProgress percentage={result.score} />
              
              <div className="space-y-4">
                <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {result.name1} <span className="text-pink-500">💕</span> {result.name2}
                </h2>
                
                <div className={`text-base sm:text-lg md:text-xl font-semibold px-4 ${
                  result.score >= 75 ? 'text-green-500' :
                  result.score >= 50 ? 'text-yellow-500' : 'text-orange-500'
                }`}>
                  {typingMessage || result.message}
                </div>

                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-6">
                  <button
                    onClick={shareResult}
                    className="px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold hover:from-blue-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center gap-2"
                  >
                    <Share2 size={18} />
                    <span className="hidden sm:inline">Share Result</span>
                    <span className="sm:hidden">Share</span>
                  </button>
                  
                  <button
                    onClick={handleCalculate}
                    className="px-4 sm:px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold hover:from-green-600 hover:to-emerald-600 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center gap-2"
                  >
                    <Sparkles size={18} />
                    <span className="hidden sm:inline">Recalculate</span>
                    <span className="sm:hidden">Retry</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {showShareCard && result && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div ref={cardRef} className="bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 p-6 sm:p-8 rounded-3xl text-white text-center max-w-md w-full shadow-2xl transform animate-scaleIn border-4 border-white/20">
              <div className="mb-4">
                <HeartHandshake className="w-16 h-16 mx-auto text-white animate-bounce" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 drop-shadow-lg">💕 Love Calculator 💕</h3>
              <div className="text-xl sm:text-2xl font-semibold mb-2">{result.name1} & {result.name2}</div>
              <div className="text-5xl sm:text-6xl font-bold mb-4 drop-shadow-2xl animate-pulse">{result.score}%</div>
              <div className="text-sm sm:text-base opacity-90 mb-6 px-2">{result.message}</div>
              <button
                onClick={() => setShowShareCard(false)}
                className="px-6 sm:px-8 py-2 sm:py-3 bg-white text-purple-600 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl hover:scale-105"
              >
                Close
              </button>
            </div>
          </div>
        )}

        <div className={`text-center text-sm sm:text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'} font-medium px-4`}>
          💡 <span className="font-semibold">Pro Tip:</span> Try famous couples like "Romeo & Juliet" for special surprises!
        </div>
      </div>

      <audio ref={audioRef} preload="auto">
        <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcBSqH0fPFeSsFJHfH79+TQAoUXrTp7KVVFApBn+DysmEcBTeI0fLNeSsFJHfH8N6QQAoUXrTp66hVFAxGn+DywmEcBTWI0fLMeSsFJHfH79+QQAoUXrTp7KVVFApGn+DysmEcBTCI0fLNeSsFJHfH8N6QQAoUXrTp66hVFAxGn+DywmEcBTSI0fLMeSsFJHfH79+QQAoUXrTp7KVVFApGn+DysmEcBTCI0fLNeSsFJHfH8N6QQAoUXrTp66hVFAxGn+DywmEcBTSI0fLMeSsFJHfH79+QQAoUXrTp7KVVFApGn+DysmEcBTCI0fLNeSsFJHfH8N6QQAoUXrTp66hVFAxGn+DywmEcBTSI0fLMeSsFJHfH79+QQAoUXrTp7KVVFApGn+DysmEcBTCI0fLNeSsFJHfH8N6QQAoUXrTp66hVFAxGn+DywmEcBTSI0fLMeSsFJHfH" type="audio/wav" />
      </audio>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes float-up {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes slideDown {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animate-float-up { animation: float-up ease-in forwards; }
        .animate-slideDown { animation: slideDown 0.3s ease-out; }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.3s ease-out; }
        .hover\:scale-102:hover { transform: scale(1.02); }
      `}</style>
    </div>
  );
};

export default LoveCalculator;