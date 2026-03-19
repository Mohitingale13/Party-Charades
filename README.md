Charades Party
A vibrant, mobile-first, interactive party game built with React and Tailwind CSS.
Charades Party turns your smartphone into a classic guessing game! Players hold the phone against their forehead and try to guess the word on the screen based on clues from their friends. Just tilt the phone DOWN for a correct guess, or tilt UP to pass.

Developed by Mohit Ingale.

✨ Features
•	📱 Mobile-First Gyroscope Controls: Built-in device orientation tracking perfectly calibrated for forehead-placement gameplay.
•	💻 Cross-Platform Support: Invisible tap zones fallback for playing manually on laptops or devices without gyroscope sensors.
•	🎭 Multiple Categories: Includes fully-stocked default decks: Superstars, Indian Food, Animals, Hindi Movies, Hindi Songs, Objects, Cartoons, and Fruits.
•	🤖 AI Custom Decks: Powered by the Gemini API! Type any crazy topic and instantly generate a 20-word custom charades deck.
•	⏱️ Custom Game Modes: Adjustable timers (10s to 300s) and a special "1 Movie (90s)" hardcore mode.
•	🏆 End-of-Round Summary: Tracks your score and lists exactly which words you successfully guessed during the round.
•	🎨 Immersive UI: Beautiful, smooth, color-changing interface that forces landscape orientation dynamically.

🛠️ Tech Stack
•	Frontend Framework: React (via Vite)
•	Styling: Tailwind CSS (v3)
•	Icons: lucide-react
•	AI Integration: Gemini 2.5 Flash API

📋 Prerequisites
To run this project locally, ensure you have the following installed:
•	Node.js: Version 20.19.0 or higher (or >=22.12.0). Note: Older versions of Node 20 (like 20.17.0) will fail with the latest Vite builds.
•	npm: Node Package Manager (comes with Node.js).

🚀 Getting Started
Follow these steps to set up and run the game on your local machine:
1.	Clone the repository (or create a new Vite project):
2.	git clone [https://github.com/YourUsername/party-charades.git](https://github.com/YourUsername/party-charades.git)
3.	cd party-charades
(If you are setting this up from scratch instead of cloning, run npm create vite@5 . -- --template react)
4.	Install the dependencies:
5.	npm install
6.	Install Tailwind v3 and required plugins:
7.	npm install -D tailwindcss@3 postcss autoprefixer
8.	npm install lucide-react
9.	Start the development server:
10.	npm run dev
Open http://localhost:5173/ in your browser to play on your computer.

📲 Testing on your Mobile Phone
Because the game relies on gyroscope tilt controls, the best way to test it during development is on your actual smartphone.
1.	Ensure your laptop and your mobile phone are connected to the same Wi-Fi network.
2.	Run the development server with the host flag:
3.	npm run dev -- --host
4.	Your terminal will display a Network: URL (e.g., http://192.168.1.X:5173/).
5.	Type that exact address into your mobile phone's web browser.
Note: For the gyroscope to work over local Wi-Fi on iOS, you may temporarily need to enable "Motion & Orientation Access" in Safari settings, or rely on the tap-controls until the app is fully deployed via HTTPS.

🌍 Deployment
This project is optimized for deployment on Vercel:
1.	Push your code to a public or private GitHub repository.
2.	Go to Vercel.com and log in.
3.	Click Add New Project and select Import Project.
4.	Connect your GitHub account and import the party-charades repository.
5.	Click Deploy. Vercel will automatically detect the Vite/React settings and build your app.
Once deployed, your game will have a secure HTTPS URL, which is required for mobile browsers to allow full Gyroscope/Tilt access!