# 🎭 Charades Party

A vibrant, mobile-first, interactive party game built with **React**, **Vite**, and **Tailwind CSS**.

Turn your smartphone into an energetic party guessing game! Hold the phone against your forehead and let your friends give you clues to guess the secret word. Tilt your phone **down** when you guess correctly, or tilt it **up** to pass.

---

## 🎮 How the Game Works

1. **Pick a Deck**: Choose from a variety of fun categories (Superstars, Hindi Movies, Animals, Food, etc.).
2. **Forehead Placement**: Hold the phone against your forehead facing your friends without looking at the screen.
3. **Tilt Down = Correct!** 🎉 Tilt the phone forward (down) when your friends confirm a right answer to earn 1 point.
4. **Tilt Up = Pass**: Tilt the phone backward (up) if you get stuck and want to skip to the next word.
5. **Score & Results**: When the round timer expires, see your total score and review all the words your team guessed correctly!

> 💻 **Playing on Laptop / PC?**  
> Don't have a gyroscope sensor? No problem! The game features a desktop fallback where you can tap the left side of the screen to Pass and the right side for Correct.

---

## ✨ Features

- **📱 Gyroscope Motion Controls**: Built-in device orientation tracking calibrated specifically for forehead-tilt gameplay.
- **🖥️ Cross-Platform Support**: Works seamlessly on mobile devices with sensors or on desktops/tablets with tap controls.
- **🎉 Ready-to-Play Decks**: Loaded with popular Indian and global categories:
  - 🌟 Superstars
  - 🍛 Indian Food
  - 🦁 Animals
  - 🎬 Hindi Movies
  - 🎵 Hindi Songs
  - 🏃 Actions
  - 🤣 Memes & Funny
  - 🪔 Desi Life
  - 🎭 Drama
  - 📦 Objects
  - 🐭 Cartoons
  - 🍎 Fruits
- **⏱️ Flexible Round Timers**: Standard round duration and special game modes (like 90s Single Movie).
- **💡 Deck Suggestion Box**: Built-in suggestion form powered by FormSubmit allowing players to submit new deck ideas directly to the creator.
- **🔄 Auto Landscape Simulation**: Smart wrapper that ensures the gameplay always renders in full-screen landscape view regardless of device lock.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Form Submissions**: [FormSubmit](https://formsubmit.co/)

---

## 🚀 How to Create Your Own Charades Game

Want to customize this game with your own decks, topics, languages, or branding? Follow these step-by-step instructions:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (v20.19.0+ or v22.12.0+ recommended).

### 2. Clone and Install
```bash
git clone https://github.com/Mohitingale13/Party-Charades.git
cd Party-Charades
npm install
```

### 3. Add or Customize Decks
All decks and word lists live in `src/App.jsx`.

1. **Add words to `WORD_LISTS`**:
   ```javascript
   const WORD_LISTS = {
     // Your new custom category
     anime: [
       "Naruto", "Goku", "Luffy", "Levi Ackerman", "Eren Yeager",
       "Zoro", "Kakashi", "Saitama", "Tanjiro", "Gojo Satoru"
     ],
     // ...existing categories
   };
   ```

2. **Register the deck in the `DECKS` array**:
   ```javascript
   const DECKS = [
     { id: 'anime', title: 'Anime Heroes', icon: '⚔️', color: 'bg-red-500' },
     // ...other decks
   ];
   ```

### 4. Set Up the Suggestion Box (Optional)
If you want to receive deck ideas from your players, update the FormSubmit recipient email in `src/App.jsx`:
```javascript
// Change to your email address:
const response = await fetch("https://formsubmit.co/ajax/your-email@example.com", {
  method: "POST",
  // ...
});
```
*Note: The first time a submission is made, FormSubmit sends a one-time activation link to your email to verify ownership.*

### 5. Run the Local Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 6. Test on Your Mobile Phone (Gyroscope Tilt)
Because motion controls require real device sensors, test it on your smartphone:
1. Connect your phone and computer to the same Wi-Fi network.
2. Start the Vite server exposing your local network:
   ```bash
   npm run dev -- --host
   ```
3. Open the `Network:` URL shown in your terminal (e.g. `http://192.168.1.X:5173`) in your mobile browser.

---

## 🌐 Deployment

This project is optimized for fast, zero-config deployment on **Vercel**:

1. Push your repository to GitHub.
2. Log in to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import your GitHub repository.
4. Click **Deploy** (Vercel automatically detects the Vite & React settings).

> 🔒 **HTTPS Requirement for Gyroscope**:  
> Modern mobile browsers (iOS Safari & Android Chrome) require a secure **HTTPS** connection to access device motion & gyroscope sensors. Deploying on Vercel provides HTTPS out of the box so tilt controls work immediately.

---

## 👨‍💻 Author

Developed with ❤️ by **Mohit Ingale**  
- Email: [mohitpraviningale13@gmail.com](mailto:mohitpraviningale13@gmail.com)
- GitHub: [@Mohitingale13](https://github.com/Mohitingale13)
