import React, { useState, useEffect, useRef } from 'react';
import { Settings, Ban, FolderOpen, Crown, LayoutGrid, PenSquare, Play, RotateCcw, Check, X, Sparkles, Loader2, ArrowUp } from 'lucide-react';

// --- DICTIONARIES ---
const WORD_LISTS = {
  superstars: [
    "Virat Kohli", "Shah Rukh Khan", "Salman Khan", "MS Dhoni", "Amitabh Bachchan", 
    "Deepika Padukone", "Priyanka Chopra", "Ranveer Singh", "Alia Bhatt", "Sachin Tendulkar",
    "Rajinikanth", "Akshay Kumar", "Hrithik Roshan", "Aamir Khan", "Kareena Kapoor",
    "Rohit Sharma", "Allu Arjun", "Ram Charan", "Jr NTR", "Yash", "Katrina Kaif", 
    "Anushka Sharma", "Arijit Singh", "Shreya Ghoshal", "Hardik Pandya", "Neeraj Chopra",
    "Ayushmann Khurrana", "Vicky Kaushal", "Prabhas", "Suriya"
  ],
  food: [
    "Samosa", "Dosa", "Biryani", "Vada Pav", "Pav Bhaji", "Pani Puri", "Chole Bhature", "Idli", 
    "Gulab Jamun", "Rasgulla", "Jalebi", "Palak Paneer", "Butter Chicken", "Naan", "Aloo Paratha", 
    "Dhokla", "Poha", "Misal Pav", "Bhel Puri", "Lassi", "Dal Makhani", "Kachori",
    "Rajma Chawal", "Mutter Paneer", "Kheer", "Gajar Ka Halwa", "Malai Kofta", "Momos",
    "Soya Chaap", "Sev Puri", "Dahi Bhalla", "Aloo Tikki", "Kathi Roll", "Rabri", "Kulfi"
  ],
  movies: [
    "Sholay", "Dangal", "3 Idiots", "Lagaan", "PK", "Dilwale Dulhania Le Jayenge", "Baahubali", 
    "Kabhi Khushi Kabhie Gham", "Munna Bhai M.B.B.S.", "Zindagi Na Milegi Dobara", "Queen", 
    "Taare Zameen Par", "Chak De! India", "Bajrangi Bhaijaan", "Swades", "Andhadhun", "Drishyam", 
    "Hera Pheri", "Gully Boy", "Kahaani", "Pushpa", "KGF", "RRR", "Jawan", "Pathaan", 
    "Animal", "Kabir Singh", "Ludo", "Stree", "Bhool Bhulaiyaa", "Yeh Jawaani Hai Deewani",
    "Om Shanti Om", "Chennai Express", "Gadar", "Border", "Welcome"
  ],
  animals: [
    "Tiger", "Elephant", "Lion", "Leopard", "Monkey", "Dog", "Cat", "Cow", "Horse", "Bear", 
    "Wolf", "Fox", "Deer", "Rabbit", "Snake", "Crocodile", "Rhinoceros", "Hippopotamus", 
    "Giraffe", "Zebra", "Cheetah", "Kangaroo", "Penguin", "Dolphin", "Whale", "Shark", 
    "Octopus", "Eagle", "Peacock", "Parrot", "Owl", "Camel", "Goat", "Sheep", "Pig",
    "Frog", "Turtle", "Gorilla", "Panda", "Koala"
  ],
  objects: [
    "Chair", "Table", "Laptop", "Mobile Phone", "Bottle", "Pen", "Notebook", "Spectacles",
    "Watch", "Shoes", "Backpack", "Television", "Refrigerator", "Washing Machine", "Mirror",
    "Toothbrush", "Soap", "Towel", "Pillow", "Blanket", "Umbrella", "Keys", "Wallet",
    "Headphones", "Camera", "Scissors", "Comb", "Spoon", "Fork", "Plate", "Cup", 
    "Clock", "Bicycle", "Car", "Iron", "Hairdryer", "Perfume", "Lipstick", "Ring"
  ],
  disney: [
    "Doraemon", "Chhota Bheem", "Shin Chan", "Tom and Jerry", "Motu Patlu", 
    "Ben 10", "Pokemon", "Oggy", "Ninja Hattori", "Aladdin", 
    "Cinderella", "Mickey Mouse", "Peppa Pig", "Mr. Bean", "SpongeBob", 
    "Scooby-Doo", "Mowgli", "Oswald", "Noddy", "Phineas and Ferb",
    "Roll No 21", "Little Krishna", "Bal Hanuman", "Spider-Man", "Batman",
    "Power Rangers", "Mr. Maker", "Bob the Builder", "Thomas the Tank Engine",
    "Teletubbies", "Pink Panther", "Popeye", "Donald Duck", "Snow White"
  ]
};

const DECKS = [
  { id: 'superstars', title: 'Superstars', icon: '⭐', color: 'bg-slate-600' },
  { id: 'food', title: 'Food', icon: '🍔', color: 'bg-amber-500' },
  { id: 'animals', title: 'Animals', icon: '🦁', color: 'bg-teal-400' },
  { id: 'movies', title: 'Hindi Movies', icon: '🎬', color: 'bg-blue-400' },
  { id: 'objects', title: 'Objects', icon: '🖍️', color: 'bg-purple-500' },
  { id: 'disney', title: 'Cartoons', icon: '🐭', color: 'bg-amber-400' }
];

export default function App() {
  const [gameState, setGameState] = useState('home'); // home, setup, waiting-forehead, countdown, playing, results, create
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [timeLimit, setTimeLimit] = useState(60);
  
  // Game Play State
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentWords, setCurrentWords] = useState([]);
  const [currentWord, setCurrentWord] = useState('');
  const [score, setScore] = useState(0);
  const [cardStatus, setCardStatus] = useState('neutral'); // neutral, correct, pass
  const [isCooldown, setIsCooldown] = useState(false);
  const [infoMessage, setInfoMessage] = useState(''); // Added for popup modal
  
  // AI Custom Decks State
  const [customDecks, setCustomDecks] = useState([]);
  const [customWordLists, setCustomWordLists] = useState({});
  const [customPrompt, setCustomPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const timerRef = useRef(null);
  const isCooldownRef = useRef(false); // Using ref to prevent stale closure in event listener

  // Detect touch capability for hiding/showing desktop tap zones
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  // --- FULLSCREEN LOGIC ---
  const enterFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch(err => console.log("Fullscreen error:", err));
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen().catch(err => console.log("Exit fullscreen error:", err));
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
  };

  // --- FOREHEAD DETECTION ---
  useEffect(() => {
    const handleForeheadDetection = (event) => {
      if (gameState !== 'waiting-forehead') return;
      // When user lifts phone to forehead (landscape), gamma or beta will shift significantly
      const tilt = event.gamma || 0;
      const beta = event.beta || 0;
      if (Math.abs(tilt) > 60 || Math.abs(beta) > 60) {
        startCountdown();
      }
    };

    if (gameState === 'waiting-forehead') {
      window.addEventListener('deviceorientation', handleForeheadDetection);
    }
    return () => window.removeEventListener('deviceorientation', handleForeheadDetection);
  }, [gameState]);
  
  // --- GYROSCOPE HANDLING ---
  useEffect(() => {
    const handleOrientation = (event) => {
      if (gameState !== 'playing') return;

      // In landscape mode, Gamma usually represents forward/backward tilt
      const tilt = event.gamma || 0; 
      const beta = event.beta || 0;

      // Depending on phone rotation and OS, either beta or gamma tracks the "nod"
      const isTiltingDown = tilt > 45 || beta > 45; 
      const isTiltingUp = tilt < -45 || beta < -45;
      
      // Neutral position (phone placed flat against forehead again)
      const isNeutral = Math.abs(tilt) < 25 && Math.abs(beta) < 25;

      if (isCooldownRef.current) {
        // If we are currently showing Correct/Pass, wait for phone to return to neutral
        if (isNeutral) {
          proceedToNextWord();
        }
      } else {
        // Ready for a new answer
        if (isTiltingDown) {
          handleAnswer(true, false);
        } else if (isTiltingUp) {
          handleAnswer(false, false);
        }
      }
    };

    if (gameState === 'playing') {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [gameState]);

  // --- GAME LOGIC ---
  const requestSensorAccessAndPlay = () => {
    // Attempt to make the browser go fullscreen
    enterFullscreen();

    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then(permissionState => {
          if (permissionState === 'granted') {
            setGameState('waiting-forehead');
          } else {
            alert("Tilt controls disabled. Using manual controls instead.");
            setGameState('waiting-forehead');
          }
        })
        .catch(console.error);
    } else {
      setGameState('waiting-forehead');
    }
  };

  // --- AI DECK GENERATOR (GEMINI API) ---
  const generateCustomDeck = async () => {
    if (!customPrompt.trim()) return;
    setIsGenerating(true);
    
    try {
      const apiKey = ""; // API key is provided by the execution environment
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
      
      const prompt = `Generate a list of 20 fun and recognizable charades words or short phrases for the category: "${customPrompt}". The words should be suitable for a party game. Respond ONLY with a valid JSON array of strings. Example: ["Word 1", "Word 2"]`;

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json"
          }
        })
      });

      if (!response.ok) throw new Error("API Request Failed");

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      const words = JSON.parse(text);

      if (words && words.length > 0) {
        const newDeckId = 'custom_' + Date.now();
        const deckTitle = customPrompt.length > 15 ? customPrompt.substring(0, 15) + '...' : customPrompt;
        
        const newDeck = {
          id: newDeckId,
          title: deckTitle,
          icon: '✨',
          color: 'bg-indigo-500'
        };

        setCustomDecks(prev => [...prev, newDeck]);
        setCustomWordLists(prev => ({ ...prev, [newDeckId]: words }));
        setGameState('home');
        setCustomPrompt('');
      }
    } catch (error) {
      console.error("Error generating deck:", error);
      setInfoMessage("Oops! Failed to generate the AI deck. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const startCountdown = () => {
    // Prepare words (checking both hardcoded and AI generated lists)
    const currentDeckWords = WORD_LISTS[selectedDeck.id] || customWordLists[selectedDeck.id];
    let shuffled = [...currentDeckWords].sort(() => Math.random() - 0.5);
    setCurrentWords(shuffled);
    setCurrentWord(shuffled[0]);
    setScore(0);
    setGameState('countdown');
    setTimeLeft(3); // Quick 3 second countdown after placing on forehead

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          startGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startGame = () => {
    setGameState('playing');
    setTimeLeft(timeLimit);
    setCardStatus('neutral');
    setIsCooldown(false);
    isCooldownRef.current = false;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setGameState('results');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleAnswer = (isCorrect, isManual = false) => {
    if (isCooldownRef.current) return;
    
    isCooldownRef.current = true;
    setIsCooldown(true);
    setCardStatus(isCorrect ? 'correct' : 'pass');
    
    if (isCorrect) {
      setScore(s => s + 1);
    }

    // Vibrate if supported
    if (window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(isCorrect ? [50, 50, 50] : 100);
    }

    if (isManual) {
      // If playing manually on desktop without gyro, proceed to next word automatically
      setTimeout(() => {
        proceedToNextWord();
      }, 1000);
    }
  };

  const proceedToNextWord = () => {
    setCurrentWords(prev => {
      const nextWords = [...prev.slice(1)];
      if (nextWords.length > 0) {
        setCurrentWord(nextWords[0]);
      } else {
        setCurrentWord("OUT OF WORDS!");
        setTimeout(() => setGameState('results'), 1000);
      }
      return nextWords;
    });
    setCardStatus('neutral');
    isCooldownRef.current = false;
    setIsCooldown(false);
  };

  const quitGame = () => {
    clearInterval(timerRef.current);
    exitFullscreen();
    setGameState('results');
  };

  // --- UI COMPONENTS ---

  // Forces Portrait screens into Landscape physically using CSS
  const LandscapeWrapper = ({ children, bgColor = "bg-[#5c5cce]" }) => (
    <div className={`fixed inset-0 ${bgColor} overflow-hidden z-50 transition-colors duration-300`}>
      <div 
        className="absolute top-0 left-0 flex items-center justify-between w-[100vh] h-[100vw]"
        style={{ 
          transform: 'rotate(90deg) translateY(-100%)', 
          transformOrigin: 'top left' 
        }}
      >
        {children}
      </div>
    </div>
  );

  const TopBar = () => (
    <div className="bg-[#5c5cce] h-14 flex items-center justify-between px-4 sticky top-0 z-10 w-full shrink-0">
      <div className="flex gap-3">
        <div 
          className="bg-white rounded-full p-1.5 cursor-pointer active:scale-95 transition-transform"
          onClick={() => setInfoMessage('Settings feature coming soon!')}
        >
          <Settings className="text-[#5c5cce] w-5 h-5" />
        </div>
      </div>
      <div 
        className="bg-white rounded-full p-1.5 cursor-pointer active:scale-95 transition-transform"
        onClick={() => setInfoMessage('Custom decks folder coming soon!')}
      >
        <FolderOpen className="text-[#5c5cce] w-5 h-5" />
      </div>
    </div>
  );

  const BottomNav = () => (
    <div className="bg-white h-16 flex justify-around items-end pb-2 fixed bottom-0 w-full z-10 rounded-t-2xl shadow-[0_-4px_10px_rgba(0,0,0,0.05)] shrink-0">
      <div 
        className={`flex flex-col items-center gap-1 cursor-pointer relative ${gameState === 'home' ? 'text-[#5c5cce]' : 'text-slate-400 hover:text-[#5c5cce]'}`}
        onClick={() => setGameState('home')}
      >
        <div className={`absolute -top-6 bg-white p-3 rounded-full shadow-sm border-t border-slate-100 ${gameState === 'home' ? 'block' : 'hidden'}`}>
            <LayoutGrid className="w-8 h-8 fill-[#5c5cce]" />
        </div>
        <LayoutGrid className={`w-6 h-6 ${gameState === 'home' ? 'opacity-0' : 'opacity-100'}`} />
        <span className={`text-xs font-bold ${gameState === 'home' ? 'mt-6' : ''}`}>Decks</span>
      </div>

      <div 
        className={`flex flex-col items-center gap-1 cursor-pointer relative ${gameState === 'create' ? 'text-[#5c5cce]' : 'text-slate-400 hover:text-[#5c5cce]'}`}
        onClick={() => setGameState('create')}
      >
        <div className={`absolute -top-6 bg-white p-3 rounded-full shadow-sm border-t border-slate-100 ${gameState === 'create' ? 'block' : 'hidden'}`}>
            <PenSquare className="w-8 h-8 fill-[#5c5cce]" />
        </div>
        <PenSquare className={`w-6 h-6 ${gameState === 'create' ? 'opacity-0' : 'opacity-100'}`} />
        <span className={`text-xs font-bold ${gameState === 'create' ? 'mt-6' : ''}`}>Create ✨</span>
      </div>
    </div>
  );

  // --- RENDER SCREENS ---

  if (gameState === 'home') {
    return (
      <div className="flex flex-col h-screen w-full bg-[#f0f2f5] font-sans overflow-hidden relative">
        <TopBar />
        
        <div className="flex-1 overflow-y-auto pb-24 pt-4 px-4 w-full max-w-md mx-auto relative">
          <h1 className="text-center font-black text-2xl text-[#1e2338] mb-6 tracking-wide">
            CHARADES PARTY
          </h1>
          
          <div className="grid grid-cols-2 gap-4">
            {[...DECKS, ...customDecks].map((deck) => (
              <div 
                key={deck.id}
                onClick={() => {
                  setSelectedDeck(deck);
                  setGameState('setup');
                }}
                className={`${deck.color} rounded-2xl p-4 flex flex-col items-center justify-center aspect-[4/5] relative shadow-md cursor-pointer transform active:scale-95 transition-transform`}
              >
                <div className="text-6xl mb-4 drop-shadow-md">
                  {deck.icon}
                </div>
                <h3 className="text-white font-bold text-center text-lg leading-tight w-full absolute bottom-4 px-2">
                  {deck.title}
                </h3>
                {deck.id.startsWith('custom_') && (
                  <div className="absolute top-2 right-2 bg-white/20 p-1 rounded-full">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-8 mb-4 text-center">
            <p className="text-slate-400 font-bold text-sm tracking-wide">Developed by Mohit Ingale</p>
          </div>
        </div>

        <BottomNav />

        {infoMessage && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
            <div className="bg-white p-6 rounded-3xl shadow-xl flex flex-col items-center max-w-xs w-full">
              <div className="bg-amber-100 p-3 rounded-full mb-4">
                <Settings className="text-amber-500 w-8 h-8 animate-spin-slow" />
              </div>
              <h3 className="text-xl font-black text-slate-800 mb-2">Coming Soon!</h3>
              <p className="text-slate-500 mb-6 text-center font-medium">{infoMessage}</p>
              <button 
                onClick={() => setInfoMessage('')}
                className="bg-[#5c5cce] w-full text-white px-6 py-3 rounded-2xl font-bold shadow-[0_4px_0_#4343a3] active:translate-y-1 active:shadow-none transition-all"
              >
                Got it!
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (gameState === 'setup') {
    return (
      <div className="flex flex-col h-screen w-full bg-[#f0f2f5] font-sans items-center justify-center p-6 relative">
        <button 
          onClick={() => setGameState('home')}
          className="absolute top-6 left-6 text-slate-500 bg-white p-2 rounded-full shadow-sm"
        >
          <X className="w-6 h-6" />
        </button>

        <div className={`${selectedDeck.color} w-32 h-32 rounded-2xl flex items-center justify-center text-6xl shadow-lg mb-6`}>
          {selectedDeck.icon}
        </div>
        <h2 className="text-3xl font-black text-slate-800 mb-8">{selectedDeck.title}</h2>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm w-full max-w-sm mb-8">
          <label className="block text-slate-600 font-bold mb-4 text-center">Round Duration (Seconds)</label>
          <div className="flex items-center justify-between bg-slate-100 rounded-xl p-2">
            <button onClick={() => setTimeLimit(Math.max(10, timeLimit - 10))} className="p-3 bg-white rounded-lg shadow-sm text-slate-800 font-bold">-</button>
            <span className="text-2xl font-black text-[#5c5cce]">{timeLimit}s</span>
            <button onClick={() => setTimeLimit(Math.min(300, timeLimit + 10))} className="p-3 bg-white rounded-lg shadow-sm text-slate-800 font-bold">+</button>
          </div>
        </div>

        <button 
          onClick={requestSensorAccessAndPlay}
          className="bg-[#5c5cce] text-white font-bold text-xl py-4 px-12 rounded-full shadow-[0_8px_0_#4343a3] active:translate-y-2 active:shadow-none transition-all flex items-center gap-2"
        >
          <Play className="fill-white" />
          START
        </button>
      </div>
    );
  }

  if (gameState === 'waiting-forehead') {
    return (
      <LandscapeWrapper>
        <button 
          onClick={() => {
            exitFullscreen();
            setGameState('setup');
          }}
          className="absolute top-6 right-6 z-50 bg-white rounded-full p-2 active:scale-95 transition-transform"
        >
          <ArrowUp className="w-8 h-8 text-[#5c5cce]" />
        </button>
        <div 
          className="flex-1 flex items-center justify-center h-full w-full px-8 cursor-pointer"
          onClick={startCountdown} 
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white text-center leading-snug tracking-wide">
            Place phone on forehead<br/>and continue
          </h1>
          <p className="absolute bottom-6 text-white/50 text-sm md:text-base font-semibold">
            (Tap screen to skip detection on PC)
          </p>
        </div>
      </LandscapeWrapper>
    );
  }

  if (gameState === 'countdown') {
    return (
      <LandscapeWrapper bgColor={selectedDeck.color}>
        <div className="flex-1 flex items-center justify-center w-full h-full">
          <div className="text-[25vh] font-black text-white drop-shadow-xl">{timeLeft}</div>
        </div>
      </LandscapeWrapper>
    );
  }

  if (gameState === 'playing') {
    let bgColor = '#5c5cce'; // Default purple matching reference
    if (cardStatus === 'correct') bgColor = '#22c55e'; // Green
    if (cardStatus === 'pass') bgColor = '#ef4444'; // Red

    return (
      <LandscapeWrapper bgColor={`bg-[${bgColor}]`}>
        {/* Back Button (Top Right) */}
        <button 
          onClick={quitGame}
          className="absolute top-6 right-6 z-50 bg-white rounded-full p-2 active:scale-95 transition-transform"
        >
          <ArrowUp className="w-8 h-8 text-[#5c5cce]" />
        </button>

        {/* Main Content Layout */}
        <div className="flex w-full h-full relative z-10">
          {/* Left Side: Score */}
          <div className="w-24 md:w-32 flex justify-center items-center h-full pointer-events-none">
            <span className="-rotate-90 origin-center text-white font-bold tracking-[0.3em] text-xl whitespace-nowrap opacity-90">
              {score} CORRECT
            </span>
          </div>

          {/* Center: Timer ABOVE Word */}
          <div className="flex-1 flex flex-col justify-center items-center h-full px-4 pointer-events-none">
            {/* Timer Element */}
            <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-6">
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="6" />
                <circle 
                  cx="50" cy="50" r="45" 
                  fill="none" stroke="white" strokeWidth="6" 
                  strokeDasharray="283" 
                  strokeDashoffset={283 - (283 * timeLeft / timeLimit)} 
                  strokeLinecap="round" 
                  className="transition-all duration-1000 linear"
                />
              </svg>
              <span className="text-white text-2xl md:text-3xl font-bold relative z-10">{timeLeft}</span>
            </div>

            {/* Word Element */}
            <h1 className="text-[10vh] md:text-[14vh] leading-none font-black text-white text-center drop-shadow-md break-words max-w-full uppercase">
              {currentWord}
            </h1>
          </div>

          {/* Right Side Empty Space for Balance */}
          <div className="w-24 md:w-32 h-full pointer-events-none"></div>
        </div>

        {/* ONLY visible if NOT on a touch device (Laptop/Desktop tap zones) */}
        {!isTouchDevice && (
          <div className="absolute inset-0 flex z-30">
             <div 
               className="flex-1 flex flex-col justify-end p-8 cursor-pointer group hover:bg-black/10 transition-colors"
               onClick={() => handleAnswer(false, true)}
             >
               <div className="text-white/60 font-bold text-2xl flex items-center gap-2 group-hover:text-white transition-colors">
                  <RotateCcw className="w-6 h-6" /> TAP TO PASS
               </div>
             </div>
             <div 
               className="flex-1 flex flex-col justify-end items-end p-8 cursor-pointer group hover:bg-white/10 transition-colors"
               onClick={() => handleAnswer(true, true)}
             >
               <div className="text-white/60 font-bold text-2xl flex items-center gap-2 group-hover:text-white transition-colors">
                  TAP FOR CORRECT <Check className="w-6 h-6" />
               </div>
             </div>
          </div>
        )}
      </LandscapeWrapper>
    );
  }

  if (gameState === 'results') {
    return (
      <div className="flex flex-col h-screen w-full bg-[#f0f2f5] font-sans items-center justify-center p-6 text-center">
        <h2 className="text-4xl font-black text-[#1e2338] mb-2 uppercase">Time's Up!</h2>
        <p className="text-slate-500 font-bold mb-8">Category: {selectedDeck.title}</p>

        <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-sm mb-12 flex flex-col items-center">
           <div className="text-6xl mb-4">🏆</div>
           <p className="text-slate-500 font-bold uppercase tracking-wider text-sm mb-2">Final Score</p>
           <h1 className="text-8xl font-black text-[#5c5cce] mb-6">{score}</h1>
           <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
              <div 
                className="bg-[#5c5cce] h-full" 
                style={{ width: `${Math.min(100, (score / 15) * 100)}%` }}
              ></div>
           </div>
           <p className="text-xs text-slate-400 mt-3 font-semibold">Great job! Keep practicing.</p>
        </div>

        <div className="flex gap-4 w-full max-w-sm">
          <button 
            onClick={() => {
              exitFullscreen();
              setGameState('home');
            }}
            className="flex-1 bg-white text-slate-700 font-bold text-lg py-4 rounded-2xl shadow-[0_4px_0_#d1d5db] active:translate-y-1 active:shadow-none transition-all flex justify-center items-center gap-2"
          >
            <LayoutGrid className="w-5 h-5" /> Home
          </button>
          <button 
            onClick={() => setGameState('setup')}
            className="flex-1 bg-[#5c5cce] text-white font-bold text-lg py-4 rounded-2xl shadow-[0_4px_0_#4343a3] active:translate-y-1 active:shadow-none transition-all flex justify-center items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" /> Play Again
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'create') {
    return (
      <div className="flex flex-col h-screen w-full bg-[#f0f2f5] font-sans overflow-hidden relative">
        <TopBar />
        
        <div className="flex-1 flex flex-col items-center justify-center px-6 w-full max-w-md mx-auto pb-20">
          <div className="bg-white p-8 rounded-3xl shadow-lg w-full flex flex-col items-center relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-50 rounded-full mix-blend-multiply blur-xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-50 rounded-full mix-blend-multiply blur-xl"></div>
            
            <div className="bg-indigo-100 p-4 rounded-full mb-6 relative z-10">
              <Sparkles className="text-indigo-600 w-10 h-10" />
            </div>
            
            <h2 className="text-2xl font-black text-slate-800 mb-2 relative z-10 text-center">AI Deck Creator</h2>
            <p className="text-slate-500 text-center text-sm font-medium mb-8 relative z-10">
              Type any crazy topic and our AI will generate a custom deck for you instantly!
            </p>

            <input 
              type="text" 
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              disabled={isGenerating}
              placeholder="e.g. 90s Action Movies..."
              className="w-full bg-slate-100 border-2 border-slate-200 rounded-xl px-4 py-4 mb-6 text-slate-800 font-bold outline-none focus:border-indigo-400 transition-colors relative z-10 placeholder:font-medium"
              onKeyDown={(e) => e.key === 'Enter' && generateCustomDeck()}
            />

            <button 
              onClick={generateCustomDeck}
              disabled={isGenerating || !customPrompt.trim()}
              className="w-full bg-[#5c5cce] disabled:bg-slate-400 text-white font-bold text-lg py-4 rounded-xl shadow-[0_4px_0_#4343a3] disabled:shadow-[0_4px_0_#94a3b8] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 relative z-10"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Brainstorming...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Deck ✨
                </>
              )}
            </button>
          </div>
        </div>

        <BottomNav />
        
        {infoMessage && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
            <div className="bg-white p-6 rounded-3xl shadow-xl flex flex-col items-center max-w-xs w-full">
              <div className="bg-amber-100 p-3 rounded-full mb-4">
                <Settings className="text-amber-500 w-8 h-8 animate-spin-slow" />
              </div>
              <h3 className="text-xl font-black text-slate-800 mb-2">Message</h3>
              <p className="text-slate-500 mb-6 text-center font-medium">{infoMessage}</p>
              <button 
                onClick={() => setInfoMessage('')}
                className="bg-[#5c5cce] w-full text-white px-6 py-3 rounded-2xl font-bold shadow-[0_4px_0_#4343a3] active:translate-y-1 active:shadow-none transition-all"
              >
                Got it!
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}