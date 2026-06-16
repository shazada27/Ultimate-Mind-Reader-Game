# Ultimate Mind Reader - Magical Binary Experience

📌 **Live Web Version**: [Play Ultimate Mind Reader Online](https://shazada27.github.io/Ultimate-Mind-Reader-Game/)

---

## 📌 Project Overview
The **Ultimate Mind Reader** is a feature-rich, interactive game utilizing bitwise operations and binary search logic to "read the user's mind." It deduces the user's chosen numbers, letters, or dates through a series of interactive, card-based questions.

Originally developed as a C++ console application, this repository has been upgraded to feature a **premium, responsive web-based version** using modern HTML5, CSS3, and JavaScript, while keeping the original C++ project intact.

---

## 🚀 Key Features
*   **Multiple Game Modes**: Guess numbers (1-100), alphabets (A-Z), ages, birth dates, birth months, or the first letter of a user's crush.
*   **Bitwise Guessing Algorithm**: Uses binary logic and bit manipulation (`num & (1 << i)`) to accurately deduce user choices in minimal steps.
*   **Zodiac Sign Calculator**: Calculates the user's astrological sign based on birth date and month inputs.
*   **Mystery Mode**: A randomized gameplay mode that selects a surprise category.
*   **Last Guesses History**: Automatically records the player's name, game mode, and results with timestamps, saved locally in `localStorage` (web) and `results.txt` (C++ console).
*   **Premium Web UI**: Features a modern cosmic dark theme with glassmorphism, glowing accents, pulsing components, scanner animations, suspenseful loading delays, and celebratory confetti.
*   **Fully Responsive**: Optimised for mobile, tablet, and desktop viewports.

---

## 💻 Technical Stack

### Web Version (Frontend SPA)
*   **Structure**: Semantic HTML5
*   **Styling**: Modern CSS3 (Variables, flexbox/grid layout, custom animations, keyframe glow effects)
*   **Logic**: Vanilla JavaScript ES6 (Bitwise logic, dynamic DOM generation, LocalStorage history, state controllers)

### Console Version (C++)
*   **Core Concepts**: Object-Oriented Programming (Classes, Encapsulation)
*   **File Handling**: `<fstream>` for output logs
*   **Robust Exception Handling**: Custom `InputException` handling
*   **Threading**: `<chrono>` & `<thread>` for animated slow prints

---

## 🛠️ How to Play & Run

### 🌐 Play the Web Version (GitHub Pages)
Simply open the live URL in your web browser:
👉 **[https://shazada27.github.io/Ultimate-Mind-Reader-Game/](https://shazada27.github.io/Ultimate-Mind-Reader-Game/)**

### 🖥️ Run the Web Version Locally
1. Clone this repository.
2. Open `index.html` directly in any web browser, or host it using a local development server (e.g., Live Server in VS Code).

### ⌨️ Run the C++ Console Version
1. Compile the source code using any standard C++ compiler:
   ```bash
   g++ Mind_Reader_Game.cpp -o MindReader
   ```
2. Run the executable:
   * **Windows**:
     ```bash
     MindReader.exe
     ```
   * **Mac/Linux**:
     ```bash
     ./MindReader
     ```

---

## 👤 Author
*   **Developed By**: Muhammad Ahmad
*   **Portfolio Showcase**: Designed as a demonstration of C++ OOP, binary logic, and modern responsive web design.
