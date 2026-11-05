import { useState, useEffect, useRef } from 'react';
import { LayoutGrid, Lightbulb, Send, CheckCircle2, Play, RotateCcw, Check, X, Loader2, ArrowUp, ArrowDown, HelpCircle, Smartphone } from 'lucide-react';

// --- SHABDKOSH (DICTIONARIES) ---
const WORD_LISTS = {
  superstars: [
    "Virat Kohli", "Shah Rukh Khan", "Salman Khan", "MS Dhoni", "Amitabh Bachchan", 
    "Deepika Padukone", "Priyanka Chopra", "Ranveer Singh", "Alia Bhatt", "Sachin Tendulkar",
    "Rajinikanth", "Akshay Kumar", "Hrithik Roshan", "Aamir Khan", "Kareena Kapoor",
    "Rohit Sharma", "Allu Arjun", "Ram Charan", "Jr NTR", "Yash", "Katrina Kaif", 
    "Anushka Sharma", "Arijit Singh", "Shreya Ghoshal", "Hardik Pandya", "Neeraj Chopra",
    "Ayushmann Khurrana", "Vicky Kaushal", "Prabhas", "Suriya", "Ajay Devgn", "Kajol", 
    "Madhuri Dixit", "Saif Ali Khan", "Varun Dhawan", "Tiger Shroff", "Shraddha Kapoor", 
    "Kartik Aaryan", "Rashmika Mandanna", "Mahesh Babu", "Rajkummar Rao", "Pankaj Tripathi", 
    "Nawazuddin Siddiqui", "Manoj Bajpayee", "Diljit Dosanjh", "Taapsee Pannu", "Vidya Balan", 
    "AR Rahman", "Sonu Nigam", "Shaan", "Udit Narayan", "Kumar Sanu", "Alka Yagnik", 
    "Sunidhi Chauhan", "Neha Kakkar", "Badshah", "Yo Yo Honey Singh", "Guru Randhawa"
  ],
  food: [
    "Samosa", "Dosa", "Biryani", "Vada Pav", "Pav Bhaji", "Pani Puri", "Chole Bhature", "Idli", 
    "Gulab Jamun", "Rasgulla", "Jalebi", "Palak Paneer", "Butter Chicken", "Naan", "Aloo Paratha", 
    "Dhokla", "Poha", "Misal Pav", "Bhel Puri", "Lassi", "Dal Makhani", "Kachori",
    "Rajma Chawal", "Mutter Paneer", "Kheer", "Gajar Ka Halwa", "Malai Kofta", "Momos",
    "Soya Chaap", "Sev Puri", "Dahi Bhalla", "Aloo Tikki", "Kathi Roll", "Rabri", "Kulfi",
    "Jhalmuri", "Litti Chokha", "Thepla", "Khandvi", "Fafda", "Khakhra", "Puran Poli", 
    "Modak", "Shrikhand", "Dal Bati Churma", "Ghevar", "Kaju Katli", "Barfi", "Rasmalai", 
    "Chamcham", "Sandesh", "Chicken Tikka", "Seekh Kebab", "Tandoori Chicken", "Keema Pav", 
    "Medu Vada", "Rava Dosa", "Paneer Tikka", "Gobi Manchurian", "Hakka Noodles", "Spring Roll"
  ],
  movies: [
    "Sholay", "Dangal", "3 Idiots", "Lagaan", "PK", "Dilwale Dulhania Le Jayenge", "Baahubali", 
    "Kabhi Khushi Kabhie Gham", "Munna Bhai M.B.B.S.", "Zindagi Na Milegi Dobara", "Queen", 
    "Taare Zameen Par", "Chak De! India", "Bajrangi Bhaijaan", "Swades", "Andhadhun", "Drishyam", 
    "Hera Pheri", "Gully Boy", "Kahaani", "Pushpa", "KGF", "RRR", "Jawan", "Pathaan", 
    "Animal", "Kabir Singh", "Ludo", "Stree", "Bhool Bhulaiyaa", "Yeh Jawaani Hai Deewani",
    "Om Shanti Om", "Chennai Express", "Gadar", "Border", "Welcome", "Zanjeer", "Deewaar", 
    "Don", "Mr India", "Maine Pyar Kiya", "Hum Aapke Hain Koun", "Kuch Kuch Hota Hai", 
    "Dil To Pagal Hai", "Devdas", "Kal Ho Naa Ho", "Veer-Zaara", "Rang De Basanti", "Jab We Met", 
    "My Name Is Khan", "Barfi", "Bajirao Mastani", "Padmaavat", "Sanju", "Uri", "Tanhaji", 
    "Kantara", "Salaar", "Kalki", "Article 15", "Chhichhore", "Super 30", "Gangs of Wasseypur"
  ],
  animals: [
    "Tiger", "Elephant", "Lion", "Leopard", "Monkey", "Dog", "Cat", "Cow", "Horse", "Bear", 
    "Wolf", "Fox", "Deer", "Rabbit", "Snake", "Crocodile", "Rhinoceros", "Hippopotamus", 
    "Giraffe", "Zebra", "Cheetah", "Kangaroo", "Penguin", "Dolphin", "Whale", "Shark", 
    "Octopus", "Eagle", "Peacock", "Parrot", "Owl", "Camel", "Goat", "Sheep", "Pig",
    "Frog", "Turtle", "Gorilla", "Panda", "Koala", "Chimpanzee", "Orangutan", "Sloth", 
    "Armadillo", "Porcupine", "Hedgehog", "Squirrel", "Raccoon", "Meerkat", "Lemur", 
    "Hyena", "Walrus", "Seal", "Otter", "Beaver", "Moose", "Reindeer", "Bison", "Yak", 
    "Antelope", "Gazelle", "Flamingo", "Ostrich", "Swan", "Woodpecker"
  ],
  objects: [
    "Chair", "Table", "Laptop", "Mobile Phone", "Bottle", "Pen", "Notebook", "Spectacles",
    "Watch", "Shoes", "Backpack", "Television", "Refrigerator", "Washing Machine", "Mirror",
    "Toothbrush", "Soap", "Towel", "Pillow", "Blanket", "Umbrella", "Keys", "Wallet",
    "Headphones", "Camera", "Scissors", "Comb", "Spoon", "Fork", "Plate", "Cup", 
    "Clock", "Bicycle", "Car", "Iron", "Hairdryer", "Perfume", "Lipstick", "Ring",
    "Remote", "Charger", "Earphones", "Keyboard", "Mouse", "Printer", "Suitcase", 
    "Helmet", "Sunglasses", "Belt", "Tie", "Socks", "Gloves", "Scarf", "Necklace", 
    "Bracelet", "Earrings", "Deodorant", "Shampoo", "Toilet Paper", "Broom", "Mop", 
    "Dustpan", "Vacuum Cleaner"
  ],
  disney: [
    "Doraemon", "Chhota Bheem", "Shin Chan", "Tom and Jerry", "Motu Patlu", 
    "Ben 10", "Pokemon", "Oggy", "Ninja Hattori", "Aladdin", 
    "Cinderella", "Mickey Mouse", "Peppa Pig", "Mr. Bean", "SpongeBob", 
    "Scooby-Doo", "Mowgli", "Oswald", "Noddy", "Phineas and Ferb",
    "Roll No 21", "Little Krishna", "Bal Hanuman", "Spider-Man", "Batman",
    "Power Rangers", "Mr. Maker", "Bob the Builder", "Thomas the Tank Engine",
    "Teletubbies", "Pink Panther", "Popeye", "Donald Duck", "Snow White",
    "Little Singham", "Gattu Battu", "Pakdam Pakdai", "Shiva", "Mighty Raju", 
    "Winnie the Pooh", "Mulan", "Pocahontas", "Rapunzel", "Elsa", "Anna", "Olaf", 
    "Buzz Lightyear", "Woody", "Nemo", "Dory", "Simba", "Timon", "Pumbaa", 
    "Powerpuff Girls", "Johnny Bravo", "Dexter", "Courage the Cowardly Dog", "Ed Edd n Eddy"
  ],
  songs: [
    "Tum Hi Ho", "Chaiyya Chaiyya", "Kal Ho Naa Ho", "Kabira", "Pehla Nasha", 
    "Tujh Mein Rab Dikhta Hai", "Channa Mereya", "Desi Girl", "Kajra Re", "Jai Ho", 
    "Lungi Dance", "Munni Badnaam Hui", "Senorita", "Gerua", "Dil Diyan Gallan", 
    "Aankh Marey", "Apna Time Aayega", "Kar Gayi Chull", "Kala Chashma", "Ghungroo",
    "Jhoome Jo Pathaan", "Kesariya", "Raabta", "Balam Pichkari", "Tum Se Hi",
    "Tujhe Dekha Toh", "Didi Tera Devar Deewana", "Mehndi Laga Ke Rakhna", "Ek Do Teen", 
    "Choli Ke Peeche", "Bole Chudiyan", "Maahi Ve", "Beedi", "Sheila Ki Jawani", 
    "Chikni Chameli", "Fevicol Se", "Kamli", "Afghan Jalebi", "Let's Nacho", "Bom Diggy Diggy", 
    "O Saki Saki", "Garmi", "Nadiyon Paar", "Besharam Rang", "Chaleya", "Tere Hawaale", 
    "Apna Bana Le", "Rasiya", "Deva Deva", "Kun Faya Kun", "Nadaan Parindey", "Sadda Haq", "Agar Tum Saath Ho"
  ],
  fruits: [
    "Apple", "Banana", "Mango", "Orange", "Angoor (Grapes)", "Tarbooz (Watermelon)", "Ananas (Pineapple)", 
    "Strawberry", "Papita (Papaya)", "Amrood (Guava)", "Anar (Pomegranate)", "Kiwi", "Cherry", "Nashpati (Pear)", 
    "Lychee", "Dragonfruit", "Nariyal (Coconut)", "Anjeer (Fig)", "Kharbuja (Muskmelon)", 
    "Avocado", "Mosambi (Sweet Lime)", "Sitaphal (Custard Apple)", "Chikoo", 
    "Katahal (Jackfruit)", "Kamrakh (Starfruit)", "Khajoor (Dates)", "Kishmish (Raisins)", 
    "Amla", "Shahtoot (Mulberry)", "Nimbu (Lemon)", "Imli (Tamarind)", "Jamun", 
    "Ganna (Sugarcane)", "Ber", "Kacchi Kairi (Raw Mango)", "Tadgola (Ice Apple)", 
    "Singhara (Water Chestnut)", "Nariyal Pani", "Aloo Bukhara (Plum)", "Peach"
  ],
  sports: [
    "Cricket", "Football", "Basketball", "Tennis", "Badminton", "Kabaddi", "Kho Kho", 
    "Swimming", "Cycling", "Running", "Gym workout", "Push-ups", "Yoga", "Skipping rope", 
    "Bowling", "Dhoni finishing shot", "Ronaldo celebration", "Catch drop 😂", "Diving save", 
    "Umpire signal", "Boxing", "Wrestling", "Archery", "Table Tennis", "Volleyball", 
    "Gymnastics", "Weightlifting", "Chess", "Carrom", "Ludo", "Golf", "Marathon", 
    "Long jump", "High jump", "Pull-ups", "Planks", "Fencing", "Skating", "Karate", "Judo"
  ],
  actions: [
    "Sleeping", "Eating", "Drinking", "Crying", "Laughing", "Dancing", "Singing", "Running", 
    "Jumping", "Fighting", "Studying", "Writing exam", "Copying in exam 😂", "Scrolling phone", 
    "Taking selfie", "Driving car", "Cooking", "Shopping", "Calling someone", "Ignoring message", 
    "Brushing teeth", "Taking a shower", "Washing clothes", "Sweeping the floor", "Ironing clothes", 
    "Sneezing", "Coughing", "Yawning", "Hiccuping", "Snoring", "Waving hand", "Pointing finger", 
    "Tying shoelaces", "Combing hair", "Putting on makeup", "Shaving", "Cutting vegetables", 
    "Reading a book", "Painting", "Typing on keyboard"
  ],
  memes: [
    "Sigma male walk", "Cringe dance", "Overacting crying", "Slow-motion entry", "Kya karu main mar jaun?", 
    "Reel shooting", "Influencer pose", "Gym flex", "Angry girlfriend", "Mom scolding", 
    "Teacher shouting", "Student sleeping in class", "Late to class panic", "Phone falling reaction", 
    "Buffering internet", "Fake laughing", "Dramatic breakup", "Jealous friend", "Winning celebration", 
    "Losing frustration", "Babu Rao pose", "Chacha Vidhayak Hai", "Control Uday Control", "Aurat ka chakkar", 
    "Jal lijiye", "Paisa hi paisa hoga", "Yeh baburao ka style hai", "Khopdi tod saale ka", "O bhai maaro mujhe", 
    "Gajab beizzati hai", "Samajh rahe ho", "Cheating cheating cheating", "Main madarchod hu", 
    "Ganja peeke aaya hai", "Aap convince ho gaye", "Aao kabhi haveli pe", "Bulao police ko", "Humko maaro", 
    "Shaant gadadhari bheem", "Mera toh itna life kharab ho gaya"
  ],
  desi: [
    "Auto rickshaw bargaining", "Indian mom shouting", "Touching feet (namaste)", "Eating with hands", 
    "Wedding dance", "Baraat entry", "Temple prayer", "Festival celebration", "Holi playing", 
    "Diwali crackers", "Power cut reaction", "Water tanker fight 😂", "Standing in queue", "Train travel rush", 
    "Street shopping", "Golgappa eating contest", "Chai pe charcha", "Window seat fight", "Pushing in bus", 
    "Aunties gossiping", "Asking for free dhaniya", "Traffic jam horn", "Riding triple seat", "Jugaad fix", 
    "Scolding kid in public", "Waiting for tatkal ticket", "Bargaining with sabziwala", "Chappal se pitayi", 
    "Mummy's flying chappal", "Papa ka taana", "Relatives asking salary", "Checking result tension", 
    "Baraat naagin dance", "Shaadi mein khana", "Gali cricket fight", "Maa ki mamta", "Dost se udhaar", 
    "Gali ka kutta bhonkna", "Bijli ka bill dekhna", "Free wifi dhoondhna"
  ],
  relationships: [
    "Proposing", "Heartbreak", "Hugging", "Fighting couple", "Ignoring partner", "Calling crush", 
    "First date", "Blushing", "Cheating suspicion 😂", "Apologizing", "Secret texting", "Parents catching you", 
    "Ex calling", "Jealousy looking at phone", "Romantic walk", "Hiding face", "Throwing water on face", 
    "Slapping scene", "Packing bags to leave", "Fake crying for attention", "Surprise gift reaction", 
    "Forgetting anniversary", "Checking phone secretly", "Begging to stay", "Eye contact", "Holding hands", 
    "Giving flowers", "Kneeling down", "Crying in rain", "Tearing old photos", "Listening to sad songs", 
    "Waiting for reply", "Blocked on WhatsApp", "Stalking on Instagram", "Making jealous", "Late night calls", 
    "Forehead kiss", "Feeding each other", "Angry walking away", "Running to hug"
  ]
};

const DECKS = [
  { id: 'superstars', title: 'Superstars', icon: '⭐', color: 'bg-slate-600' },
  { id: 'food', title: 'Food', icon: '🍔', color: 'bg-amber-500' },
  { id: 'animals', title: 'Animals', icon: '🦁', color: 'bg-teal-400' },
  { id: 'movies', title: 'Hindi Movies', icon: '🎬', color: 'bg-blue-400' },
  { id: 'songs', title: 'Hindi Songs', icon: '🎵', color: 'bg-pink-500' },
  { id: 'actions', title: 'Actions', icon: '🏃', color: 'bg-cyan-500' },
  { id: 'memes', title: 'Memes & Funny', icon: '😂', color: 'bg-yellow-400' },
  { id: 'desi', title: 'Desi Life', icon: '🇮🇳', color: 'bg-orange-500' },
  { id: 'relationships', title: 'Drama', icon: '💔', color: 'bg-rose-500' },
  { id: 'objects', title: 'Objects', icon: '🖍️', color: 'bg-purple-500' },
  { id: 'disney', title: 'Cartoons', icon: '🐭', color: 'bg-amber-400' },
  { id: 'fruits', title: 'Fruits', icon: '🍎', color: 'bg-red-400' }
];

export default function App() {
  // Start on 'tutorial' so it is the very first thing the user sees when opening the link
  const [gameState, setGameState] = useState('tutorial'); 
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [timeLimit, setTimeLimit] = useState(60);
  const [playMode, setPlayMode] = useState('standard'); 
  
  // Khel ki State
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentWords, setCurrentWords] = useState([]);
  const [currentWord, setCurrentWord] = useState('');
  const [correctWords, setCorrectWords] = useState([]); 
  const [score, setScore] = useState(0);
  const [cardStatus, setCardStatus] = useState('neutral'); 
  const [isCooldown, setIsCooldown] = useState(false);
  
  // Deck Suggestion State
  const [suggestionName, setSuggestionName] = useState('');
  const [suggestionExamples, setSuggestionExamples] = useState('');
  const [suggesterContact, setSuggesterContact] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const timerRef = useRef(null);
  
  // Refs to fix gyro multi-triggering, swing delays, and state closures
  const isCooldownRef = useRef(false); 
  const hasStartedCountdownRef = useRef(false);
  const gyroActiveRef = useRef(false); 
  const foreheadLockRef = useRef(false); 
  const currentWordRef = useRef(''); 

  // Touch screen detect karein taaki PC wale buttons hide/show ho sakein
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  // --- KEEP REF UPDATED FOR GYRO LISTENER ---
  useEffect(() => {
    currentWordRef.current = currentWord;
  }, [currentWord]);

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
      // Prevent multiple triggers
      if (gameState !== 'waiting-forehead' || hasStartedCountdownRef.current || foreheadLockRef.current) return;
      
      const tilt = event.gamma || 0;
      const beta = event.beta || 0;
      const absTilt = Math.abs(tilt);
      const absBeta = Math.abs(beta);
      
      // Neutral position (upright on forehead)
      if (absTilt > 50 || (absBeta > 50 && absBeta < 130)) {
        hasStartedCountdownRef.current = true; 
        startCountdown();
      }
    };

    if (gameState === 'waiting-forehead') {
      window.addEventListener('deviceorientation', handleForeheadDetection);
    }
    return () => window.removeEventListener('deviceorientation', handleForeheadDetection);
  }, [gameState]);
  
  // --- PERFECTLY BALANCED GYROSCOPE HANDLING ---
  useEffect(() => {
    const handleOrientation = (event) => {
      if (gameState !== 'playing' || !gyroActiveRef.current) return;

      const tilt = event.gamma || 0; 
      const beta = event.beta || 0;
      
      let isLandscapeOS = false;
      if (typeof window.orientation !== 'undefined') {
          isLandscapeOS = Math.abs(window.orientation) === 90;
      } else if (window.innerWidth > window.innerHeight) {
          isLandscapeOS = true;
      }

      let isNeutral = false;
      let isTiltingDown = false; // Sahi (Niche)
      let isTiltingUp = false;   // Pass (Upar)

      if (isLandscapeOS) {
          const absBeta = Math.abs(beta);
          isNeutral = absBeta > 50 && absBeta < 130;
          isTiltingUp = absBeta <= 50;    
          isTiltingDown = absBeta >= 130; 
      } else {
          const absGamma = Math.abs(tilt);
          const absBeta = Math.abs(beta);

          isNeutral = absGamma > 45;

          if (!isNeutral) {
              if (absBeta > 90) {
                  isTiltingDown = true; 
              } else {
                  isTiltingUp = true;   
              }
          }
      }

      // --- KHEL KI LOGIC ---
      if (isCooldownRef.current) {
        if (isNeutral) {
          proceedToNextWord();
        }
      } else {
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
    enterFullscreen();
    hasStartedCountdownRef.current = false; 
    
    foreheadLockRef.current = true;
    setTimeout(() => {
        foreheadLockRef.current = false;
    }, 1500);

    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then(permissionState => {
          if (permissionState === 'granted') {
            setGameState('waiting-forehead');
          } else {
            alert("Tilt controls disable ho gaye hain. Aap manual button ka use kar sakte hain.");
            setGameState('waiting-forehead');
          }
        })
        .catch(console.error);
    } else {
      setGameState('waiting-forehead');
    }
  };

  // --- DECK SUGGESTION HANDLER (FORMSUBMIT) ---
  const handleSuggestionSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!suggestionName.trim() || !suggestionExamples.trim()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch("https://formsubmit.co/ajax/mohitpraviningale13@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `New Charades Deck Suggestion: ${suggestionName.trim()}`,
          "Deck Name": suggestionName.trim(),
          "Example Words / Clues": suggestionExamples.trim(),
          "Suggested By": suggesterContact.trim() || "Anonymous Player",
          _template: "table",
          _captcha: "false"
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
        setSuggestionName('');
        setSuggestionExamples('');
        setSuggesterContact('');
      } else {
        const data = await response.json().catch(() => null);
        throw new Error(data?.message || "Failed to submit");
      }
    } catch (err) {
      console.error("FormSubmit error:", err);
      setSubmitError("Could not send suggestion right now. Please try again or check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const startCountdown = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    hasStartedCountdownRef.current = true;

    const currentDeckWords = WORD_LISTS[selectedDeck.id] || [];
    let shuffled = [...currentDeckWords].sort(() => Math.random() - 0.5);
    setCurrentWords(shuffled);
    setCurrentWord(shuffled[0]);
    setScore(0);
    setCorrectWords([]); 
    setGameState('countdown');
    setTimeLeft(3); 

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
    if (timerRef.current) clearInterval(timerRef.current);

    setGameState('playing');
    setTimeLeft(timeLimit);
    setCardStatus('neutral');
    setIsCooldown(false);
    isCooldownRef.current = false;
    
    gyroActiveRef.current = false;
    setTimeout(() => {
        gyroActiveRef.current = true;
    }, 1000);

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
      setCorrectWords(prev => [...prev, currentWordRef.current]);
    }

    if (window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(isCorrect ? [50, 50, 50] : 100);
    }

    if (isManual) {
      setTimeout(() => {
        proceedToNextWord();
      }, 1000);
    }
  };

  const proceedToNextWord = () => {
    if (playMode === 'single') {
        setTimeout(() => setGameState('results'), 100);
        return;
    }

    setCurrentWords(prev => {
      const nextWords = [...prev.slice(1)];
      if (nextWords.length > 0) {
        setCurrentWord(nextWords[0]);
      } else {
        setCurrentWord("OUT OF WORDS!");
        setTimeout(() => {
           clearInterval(timerRef.current);
           setGameState('results');
        }, 1000);
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

  const LandscapeWrapper = ({ children, bgClass = "bg-[#5c5cce]" }) => (
    <div className={`fixed inset-0 ${bgClass} overflow-hidden z-50 transition-colors duration-300`}>
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
      <div 
        className="bg-white rounded-full p-1.5 cursor-pointer active:scale-95 transition-transform"
        onClick={() => setGameState('tutorial')}
        title="How to Play"
      >
        <HelpCircle className="text-[#5c5cce] w-5 h-5" />
      </div>
    </div>
  );

  const BottomNav = () => (
    <div className="bg-white h-16 flex justify-around items-center px-4 fixed bottom-0 left-0 right-0 w-full z-10 rounded-t-2xl shadow-[0_-4px_16px_rgba(0,0,0,0.06)] shrink-0 select-none">
      <div 
        className={`flex flex-col items-center cursor-pointer transition-all duration-200 py-1 ${
          gameState === 'home' ? 'text-[#5c5cce]' : 'text-slate-400 hover:text-[#5c5cce]'
        }`}
        onClick={() => setGameState('home')}
      >
        <div 
          className={`flex items-center justify-center rounded-full transition-all duration-200 ${
            gameState === 'home' 
              ? '-translate-y-1.5 bg-[#edeefc] text-[#5c5cce] p-2 shadow-sm border border-indigo-100 ring-2 ring-indigo-50/60' 
              : 'translate-y-0 bg-transparent text-slate-400 p-2 hover:bg-slate-50'
          }`}
        >
          <LayoutGrid className={`w-5 h-5 sm:w-6 sm:h-6 ${gameState === 'home' ? 'fill-[#5c5cce]' : ''}`} />
        </div>
        <span className={`text-[11px] sm:text-xs font-bold leading-tight transition-colors mt-0.5 ${
          gameState === 'home' ? 'text-[#5c5cce] font-extrabold' : 'text-slate-400'
        }`}>
          Decks
        </span>
      </div>

      <div 
        className={`flex flex-col items-center cursor-pointer transition-all duration-200 py-1 ${
          gameState === 'suggest' ? 'text-[#5c5cce]' : 'text-slate-400 hover:text-[#5c5cce]'
        }`}
        onClick={() => setGameState('suggest')}
      >
        <div 
          className={`flex items-center justify-center rounded-full transition-all duration-200 ${
            gameState === 'suggest' 
              ? '-translate-y-1.5 bg-[#edeefc] text-[#5c5cce] p-2 shadow-sm border border-indigo-100 ring-2 ring-indigo-50/60' 
              : 'translate-y-0 bg-transparent text-slate-400 p-2 hover:bg-slate-50'
          }`}
        >
          <Lightbulb className={`w-5 h-5 sm:w-6 sm:h-6 ${gameState === 'suggest' ? 'fill-amber-400 text-amber-500' : ''}`} />
        </div>
        <span className={`text-[11px] sm:text-xs font-bold leading-tight transition-colors mt-0.5 ${
          gameState === 'suggest' ? 'text-[#5c5cce] font-extrabold' : 'text-slate-400'
        }`}>
          Suggest a Deck 💡
        </span>
      </div>
    </div>
  );

  // --- RENDER SCREENS ---

  if (gameState === 'tutorial') {
    return (
      <div className="fixed inset-0 h-[100dvh] w-full bg-white sm:bg-[#f0f2f5] font-sans overflow-hidden flex flex-col items-center justify-center sm:p-4 md:p-6 z-50 select-none">
        <div className="bg-white sm:rounded-3xl sm:shadow-2xl w-full h-full sm:h-auto sm:max-h-[92dvh] max-w-lg flex flex-col justify-between p-5 sm:p-8 relative animate-in fade-in zoom-in duration-200">
          
          {/* Header */}
          <div className="relative pt-2 sm:pt-0">
            <button 
              onClick={() => setGameState('home')}
              className="absolute top-0 right-0 text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full p-2 transition-colors cursor-pointer"
              aria-label="Close tutorial"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl sm:text-4xl font-black text-[#1e2338] text-center uppercase tracking-wide">
              How to Play
            </h2>
            <p className="text-slate-400 text-center text-xs sm:text-sm font-semibold mt-1">
              Follow these simple steps with your friends!
            </p>
          </div>

          {/* 3 Steps - adapts proportionally with flex-1 and justify-evenly */}
          <div className="flex-1 flex flex-col justify-evenly py-4 sm:py-6 w-full gap-3 sm:gap-4 my-auto">
            {/* Step 1 */}
            <div className="flex items-center gap-4 sm:gap-5 bg-slate-50 border border-slate-100 p-3.5 sm:p-4 rounded-2xl shadow-xs">
              <div className="bg-indigo-100 p-3 sm:p-3.5 rounded-2xl shrink-0 shadow-sm text-indigo-600">
                <Smartphone className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-black text-slate-800 text-base sm:text-lg mb-0.5 leading-snug">
                  1. Place on your forehead
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                  Hold the phone facing friends without looking at the screen so they see the word.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-4 sm:gap-5 bg-slate-50 border border-slate-100 p-3.5 sm:p-4 rounded-2xl shadow-xs">
              <div className="bg-emerald-100 p-3 sm:p-3.5 rounded-2xl shrink-0 shadow-sm text-emerald-600">
                <ArrowDown className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-black text-slate-800 text-base sm:text-lg mb-0.5 leading-snug">
                  2. Tilt Down = Correct!
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                  When your friends guess correctly, tilt the phone forward (down) for 1 point.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-4 sm:gap-5 bg-slate-50 border border-slate-100 p-3.5 sm:p-4 rounded-2xl shadow-xs">
              <div className="bg-rose-100 p-3 sm:p-3.5 rounded-2xl shrink-0 shadow-sm text-rose-600">
                <ArrowUp className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-black text-slate-800 text-base sm:text-lg mb-0.5 leading-snug">
                  3. Tilt Up = Pass
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                  Don&apos;t know the word? Tilt the phone backward (up) to pass to the next word.
                </p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="w-full pt-2">
            <button 
              onClick={() => setGameState('home')}
              className="w-full bg-[#5c5cce] hover:bg-[#4f4fb8] text-white font-black text-lg sm:text-xl py-3.5 sm:py-4 rounded-2xl shadow-[0_5px_0_#4343a3] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Check className="w-6 h-6 stroke-[3]" /> Got it! Let’s play!
            </button>
          </div>

        </div>
      </div>
    );
  }

  if (gameState === 'home') {
    return (
      <div className="flex flex-col h-[100dvh] w-full bg-[#f0f2f5] font-sans overflow-hidden relative">
        <TopBar />
        
        <div className="flex-1 overflow-y-auto pb-24 pt-4 px-4 w-full max-w-md mx-auto relative">
          <h1 className="text-center font-black text-2xl text-[#1e2338] mb-6 tracking-wide">
            CHARADES PARTY
          </h1>
          
          <div className="grid grid-cols-2 gap-4">
            {DECKS.map((deck) => (
              <div 
                key={deck.id}
                onClick={() => {
                  setPlayMode('standard'); 
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
              </div>
            ))}
          </div>
          <div className="mt-8 mb-4 text-center">
            <p className="text-slate-400 font-bold text-sm tracking-wide">Developed by Mohit Ingale</p>
          </div>
        </div>

        <BottomNav />
      </div>
    );
  }

  if (gameState === 'setup') {
    return (
      <div className="flex flex-col h-[100dvh] w-full bg-[#f0f2f5] font-sans items-center justify-center p-6 relative">
        <button 
          onClick={() => setGameState('home')}
          className="absolute top-6 left-6 text-slate-500 bg-white p-2 rounded-full shadow-sm"
        >
          <X className="w-6 h-6" />
        </button>

        <div className={`${selectedDeck.color} w-32 h-32 rounded-2xl flex items-center justify-center text-6xl shadow-lg mb-6`}>
          {selectedDeck.icon}
        </div>
        <h2 className="text-3xl font-black text-slate-800 mb-6">{selectedDeck.title}</h2>
        
        {selectedDeck.id === 'movies' && (
          <div className="bg-white p-2 rounded-2xl shadow-sm w-full max-w-sm mb-4 flex gap-2">
            <button 
              onClick={() => { setPlayMode('standard'); setTimeLimit(60); }}
              className={`flex-1 py-3 rounded-xl font-bold transition-colors ${playMode === 'standard' ? 'bg-[#5c5cce] text-white' : 'bg-transparent text-slate-500 hover:bg-slate-50'}`}
            >
              Standard
            </button>
            <button 
              onClick={() => { setPlayMode('single'); setTimeLimit(90); }}
              className={`flex-1 py-3 rounded-xl font-bold transition-colors ${playMode === 'single' ? 'bg-[#5c5cce] text-white' : 'bg-transparent text-slate-500 hover:bg-slate-50'}`}
            >
              1 Movie (90s)
            </button>
          </div>
        )}

        {playMode === 'standard' && (
          <div className="bg-white p-6 rounded-2xl shadow-sm w-full max-w-sm mb-8 animate-in fade-in zoom-in duration-300">
            <label className="block text-slate-600 font-bold mb-4 text-center">Round Duration (Seconds)</label>
            <div className="flex items-center justify-between bg-slate-100 rounded-xl p-2">
              <button onClick={() => setTimeLimit(Math.max(10, timeLimit - 10))} className="p-3 bg-white rounded-lg shadow-sm text-slate-800 font-bold">-</button>
              <span className="text-2xl font-black text-[#5c5cce]">{timeLimit}s</span>
              <button onClick={() => setTimeLimit(Math.min(300, timeLimit + 10))} className="p-3 bg-white rounded-lg shadow-sm text-slate-800 font-bold">+</button>
            </div>
          </div>
        )}

        {playMode === 'single' && (
          <div className="bg-white p-6 rounded-2xl shadow-sm w-full max-w-sm mb-8 animate-in fade-in zoom-in duration-300 flex flex-col items-center">
            <div className="text-slate-500 font-bold text-center mb-2">You have 90 seconds to guess</div>
            <div className="text-2xl font-black text-[#5c5cce]">1 MOVIE</div>
          </div>
        )}

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
          onClick={() => {
              hasStartedCountdownRef.current = true;
              startCountdown();
          }} 
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white text-center leading-snug tracking-wide">
            Place the phone on your forehead<br/>and proceed
          </h1>
          <p className="absolute bottom-6 text-white/50 text-sm md:text-base font-semibold">
            (Tap the screen to skip detection on PC)
          </p>
        </div>
      </LandscapeWrapper>
    );
  }

  if (gameState === 'countdown') {
    return (
      <LandscapeWrapper bgClass={selectedDeck.color}>
        <div className="flex-1 flex items-center justify-center w-full h-full">
          <div className="text-[25vh] font-black text-white drop-shadow-xl">{timeLeft}</div>
        </div>
      </LandscapeWrapper>
    );
  }

  if (gameState === 'playing') {
    let currentBgClass = 'bg-[#5c5cce]'; 
    if (cardStatus === 'correct') currentBgClass = 'bg-green-500'; 
    if (cardStatus === 'pass') currentBgClass = 'bg-red-500'; 

    return (
      <LandscapeWrapper bgClass={currentBgClass}>
        <button 
          onClick={quitGame}
          className="absolute top-6 right-6 z-50 bg-white rounded-full p-2 active:scale-95 transition-transform"
        >
          <ArrowUp className="w-8 h-8 text-[#5c5cce]" />
        </button>

        <div className="flex w-full h-full relative z-10">
          <div className="w-24 md:w-32 flex justify-center items-center h-full pointer-events-none">
            <span className="-rotate-90 origin-center text-white font-bold tracking-[0.3em] text-xl whitespace-nowrap opacity-90">
              {score} Correct Answer
            </span>
          </div>

          <div className="flex-1 flex flex-col justify-center items-center h-full px-4 pointer-events-none">
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

            <h1 className="text-[10vh] md:text-[14vh] leading-none font-black text-white text-center drop-shadow-md break-words max-w-full uppercase">
              {currentWord}
            </h1>
          </div>

          <div className="w-24 md:w-32 h-full pointer-events-none"></div>
        </div>

        {!isTouchDevice && (
          <div className="absolute inset-0 flex z-30">
             <div 
               className="flex-1 flex flex-col justify-end p-8 cursor-pointer group hover:bg-black/10 transition-colors"
               onClick={() => handleAnswer(false, true)}
             >
               <div className="text-white/60 font-bold text-2xl flex items-center gap-2 group-hover:text-white transition-colors">
                  <RotateCcw className="w-6 h-6" /> Tap to Pass
               </div>
             </div>
             <div 
               className="flex-1 flex flex-col justify-end items-end p-8 cursor-pointer group hover:bg-white/10 transition-colors"
               onClick={() => handleAnswer(true, true)}
             >
               <div className="text-white/60 font-bold text-2xl flex items-center gap-2 group-hover:text-white transition-colors">
                  Tap to see the correct answer! <Check className="w-6 h-6" />
               </div>
             </div>
          </div>
        )}
      </LandscapeWrapper>
    );
  }

  if (gameState === 'results') {
    return (
      <div className="flex flex-col h-[100dvh] w-full bg-[#f0f2f5] font-sans items-center justify-center p-6 text-center">
        <h2 className="text-4xl font-black text-[#1e2338] mb-2 uppercase">Time's Up!</h2>
        <p className="text-slate-500 font-bold mb-6">Category: {selectedDeck.title} {playMode === 'single' ? '(Single Mode)' : ''}</p>

        <div className="bg-white p-6 rounded-3xl shadow-lg w-full max-w-sm mb-10 flex flex-col items-center">
           <div className="text-6xl mb-2">🏆</div>
           <p className="text-slate-500 font-bold uppercase tracking-wider text-sm mb-1">Your Score</p>
           <h1 className="text-7xl font-black text-[#5c5cce] mb-4">{score}</h1>
           <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden mb-4">
              <div 
                className="bg-[#5c5cce] h-full" 
                style={{ width: playMode === 'single' ? (score > 0 ? '100%' : '0%') : `${Math.min(100, (score / 15) * 100)}%` }}
              ></div>
           </div>
           
           {correctWords.length > 0 && (
             <div className="w-full mt-2 border-t border-slate-100 pt-4 flex flex-col items-center">
                <p className="text-slate-400 font-bold uppercase tracking-wider text-xs mb-3">Correctly Guessed Words</p>
                <div className="flex flex-wrap gap-2 justify-center max-h-32 overflow-y-auto w-full p-1 custom-scrollbar">
                   {correctWords.map((word, i) => (
                     <span key={i} className="bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-sm font-bold border border-green-200 shadow-sm">
                       {word}
                     </span>
                   ))}
                </div>
             </div>
           )}

           {correctWords.length === 0 && (
             <p className="text-xs text-slate-400 font-semibold mt-2">Try better next time!</p>
           )}
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

  if (gameState === 'suggest') {
    return (
      <div className="flex flex-col h-[100dvh] w-full bg-[#f0f2f5] font-sans overflow-hidden relative">
        <TopBar />
        
        <div className="flex-1 overflow-y-auto pb-24 pt-4 px-4 w-full max-w-md mx-auto relative flex flex-col items-center justify-center">
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl w-full flex flex-col items-center relative overflow-hidden my-auto">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-50 rounded-full mix-blend-multiply blur-xl pointer-events-none"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-50 rounded-full mix-blend-multiply blur-xl pointer-events-none"></div>

            {isSubmitted ? (
              <div className="flex flex-col items-center text-center py-4 relative z-10 animate-in fade-in zoom-in duration-300 w-full">
                <div className="bg-emerald-100 p-4 rounded-full mb-4 text-emerald-600 shadow-sm">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h2 className="text-2xl font-black text-slate-800 mb-2">Suggestion Sent! 🎉</h2>
                <p className="text-slate-500 text-sm font-medium mb-2 leading-relaxed">
                  Thank you! Your deck suggestion has been sent directly to Mohit (<span className="font-semibold text-slate-700">mohitpraviningale13@gmail.com</span>).
                </p>
                <p className="text-slate-400 text-xs mb-6 font-medium">
                  We will review your idea and work on adding it to the game!
                </p>

                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <button 
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setSuggestionName('');
                      setSuggestionExamples('');
                      setSuggesterContact('');
                      setSubmitError('');
                    }}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-4 rounded-xl transition-colors cursor-pointer text-sm"
                  >
                    Suggest Another
                  </button>
                  <button 
                    type="button"
                    onClick={() => setGameState('home')}
                    className="flex-1 bg-[#5c5cce] hover:bg-[#4f4fb8] text-white font-bold py-3 px-4 rounded-xl shadow-[0_4px_0_#4343a3] active:translate-y-1 active:shadow-none transition-all cursor-pointer text-sm"
                  >
                    Back to Decks
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSuggestionSubmit} className="w-full relative z-10 flex flex-col">
                <div className="flex flex-col items-center mb-5">
                  <div className="bg-amber-100 p-3.5 rounded-full mb-3 shadow-sm text-amber-600">
                    <Lightbulb className="w-8 h-8 fill-amber-400" />
                  </div>
                  <h2 className="text-2xl font-black text-slate-800 mb-1 text-center">
                    Suggest a New Deck
                  </h2>
                  <p className="text-slate-500 text-center text-xs sm:text-sm font-medium leading-relaxed">
                    Have a fun category idea? Share the deck name and some example words directly with Mohit!
                  </p>
                </div>

                {submitError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs font-semibold text-center">
                    {submitError}
                  </div>
                )}

                <div className="mb-3.5">
                  <label className="block text-slate-700 text-xs font-extrabold uppercase tracking-wider mb-1.5">
                    Deck Name / Category <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    value={suggestionName}
                    onChange={(e) => setSuggestionName(e.target.value)}
                    disabled={isSubmitting}
                    placeholder="e.g. 90s Cartoons, Anime, TV Shows..."
                    className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 font-semibold text-sm outline-none focus:border-indigo-500 focus:bg-white transition-colors placeholder:text-slate-400 placeholder:font-normal"
                    required
                  />
                </div>

                <div className="mb-3.5">
                  <label className="block text-slate-700 text-xs font-extrabold uppercase tracking-wider mb-1.5">
                    Example Words / Prompts <span className="text-red-500">*</span>
                  </label>
                  <textarea 
                    value={suggestionExamples}
                    onChange={(e) => setSuggestionExamples(e.target.value)}
                    disabled={isSubmitting}
                    rows={3}
                    placeholder="e.g. Tom and Jerry, Dexter, Courage, Popeye..."
                    className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 font-semibold text-sm outline-none focus:border-indigo-500 focus:bg-white transition-colors placeholder:text-slate-400 placeholder:font-normal resize-none"
                    required
                  />
                </div>

                <div className="mb-5">
                  <label className="block text-slate-700 text-xs font-extrabold uppercase tracking-wider mb-1.5">
                    Your Name or Contact <span className="text-slate-400 font-normal lowercase">(optional)</span>
                  </label>
                  <input 
                    type="text" 
                    value={suggesterContact}
                    onChange={(e) => setSuggesterContact(e.target.value)}
                    disabled={isSubmitting}
                    placeholder="So Mohit knows who suggested it!"
                    className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 font-semibold text-sm outline-none focus:border-indigo-500 focus:bg-white transition-colors placeholder:text-slate-400 placeholder:font-normal"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting || !suggestionName.trim() || !suggestionExamples.trim()}
                  className="w-full bg-[#5c5cce] hover:bg-[#4d4db8] disabled:bg-slate-300 disabled:shadow-none text-white font-bold text-base py-3.5 rounded-xl shadow-[0_4px_0_#4343a3] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending to Mohit...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Suggestion</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-slate-400 text-center mt-3 font-medium">
                  Sent directly via FormSubmit to mohitpraviningale13@gmail.com
                </p>
              </form>
            )}
          </div>
        </div>

        <BottomNav />
      </div>
    );
  }

  return null;
}