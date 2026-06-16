// Application State
let playerState = {
    name: "ANONYMOUS",
    currentMode: null,
    currentCardIndex: 0,
    accumulatedValue: 0,
    history: []
};

// Game Modes Configuration
const GAME_MODES = {
    number: {
        name: "Number (1-100)",
        title: "Number Guesser",
        maxValue: 100,
        bits: 7,
        isAlpha: false,
        icon: "fa-hashtag",
        instruction: "Pick a number between 1 and 100. Check if it's on this card."
    },
    alphabet: {
        name: "Alphabet(A-Z)",
        title: "Alphabet Guesser",
        maxValue: 26,
        bits: 5,
        isAlpha: true,
        icon: "fa-font",
        instruction: "Think of any letter from A to Z. Is it on this card?"
    },
    age: {
        name: "Age",
        title: "Age Guesser",
        maxValue: 100,
        bits: 7,
        isAlpha: false,
        icon: "fa-cake-candles",
        instruction: "Focus on the age. Is the correct age on this card?"
    },
    birthday: {
        name: "Birthday Date(1-31)",
        title: "Birthday Date",
        maxValue: 31,
        bits: 5,
        isAlpha: false,
        icon: "fa-calendar-day",
        instruction: "Think of your birthday date (1-31). Is it on this card?"
    },
    month: {
        name: "Birth Month(1-12)",
        title: "Birth Month",
        maxValue: 12,
        bits: 4,
        isAlpha: false,
        icon: "fa-calendar-days",
        instruction: "Think of your birth month number. Is it on this card?"
    },
    crush: {
        name: "First Letter of Your Crush Name",
        title: "Crush Initial",
        maxValue: 26,
        bits: 5,
        isAlpha: true,
        icon: "fa-heart",
        instruction: "Focus on the first letter of your crush's name. Is it here?"
    }
};

const MONTHS_NAMES = [
    "", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

// Zodiac Signs Information
const ZODIAC_SIGNS = [
    { startMonth: 1, startDay: 20, endMonth: 2, endDay: 18, name: "♒ Aquarius", desc: "Known for being progressive, original, independent, and humanitarian." },
    { startMonth: 2, startDay: 19, endMonth: 3, endDay: 20, name: "♓ Pisces", desc: "Compassionate, artistic, intuitive, gentle, and wise." },
    { startMonth: 3, startDay: 21, endMonth: 4, endDay: 19, name: "♈ Aries", desc: "Eager, dynamic, quick, and competitive." },
    { startMonth: 4, startDay: 20, endMonth: 5, endDay: 20, name: "♉ Taurus", desc: "Strong, dependable, sensual, and creative." },
    { startMonth: 5, startDay: 21, endMonth: 6, endDay: 20, name: "♊ Gemini", desc: "Versatile, expressive, curious, and kind." },
    { startMonth: 6, startDay: 21, endMonth: 7, endDay: 22, name: "♋ Cancer", desc: "Intuitive, sentimental, compassionate, and protective." },
    { startMonth: 7, startDay: 23, endMonth: 8, endDay: 22, name: "♌ Leo", desc: "Dramatic, creative, self-confident, and dominant." },
    { startMonth: 8, startDay: 23, endMonth: 9, endDay: 22, name: "♍ Virgo", desc: "Loyal, analytical, kind, and hardworking." },
    { startMonth: 9, startDay: 23, endMonth: 10, endDay: 22, name: "♎ Libra", desc: "Cooperative, diplomatic, gracious, and fair-minded." },
    { startMonth: 10, startDay: 23, endMonth: 11, endDay: 21, name: "♏ Scorpio", desc: "Passionate, stubborn, resourceful, and brave." },
    { startMonth: 11, startDay: 22, endMonth: 12, endDay: 21, name: "♐ Sagittarius", desc: "Generous, idealistic, and great sense of humor." },
    { startMonth: 12, startDay: 22, endMonth: 12, 31, name: "♑ Capricorn", desc: "Responsible, disciplined, self-controlled, and good managers." },
    { startMonth: 12, startDay: 1, endMonth: 1, endDay: 19, name: "♑ Capricorn", desc: "Responsible, disciplined, self-controlled, and good managers." } // Capricorn wraps into January
];

// Screen Navigation Controller
function showScreen(screenId) {
    document.querySelectorAll('.game-screen').forEach(screen => {
        screen.classList.remove('active');
    });
    const activeScreen = document.getElementById(screenId);
    if (activeScreen) {
        activeScreen.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Welcome Screen Setup
function startApp() {
    const nameInput = document.getElementById('player-name-input');
    let name = nameInput.value.trim();
    if (!name) return;
    
    playerState.name = name.toUpperCase();
    document.getElementById('player-name-display').innerText = playerState.name;
    
    // Load local history
    loadHistoryData();
    
    showScreen('screen-dashboard');
}

// Game Setup and Initiation
function launchGame(modeKey) {
    if (!GAME_MODES[modeKey]) return;
    
    playerState.currentMode = modeKey;
    playerState.currentCardIndex = 0;
    playerState.accumulatedValue = 0;
    
    const config = GAME_MODES[modeKey];
    
    // Set headers
    document.getElementById('game-mode-title').innerText = config.title;
    document.getElementById('game-instruction-text').innerText = config.instruction;
    
    renderCard();
    showScreen('screen-game');
}

// Render dynamic items for the current binary card
function renderCard() {
    const config = GAME_MODES[playerState.currentMode];
    const cardIndex = playerState.currentCardIndex;
    
    // Progress
    const totalCards = config.bits;
    const progressPercent = ((cardIndex) / totalCards) * 100;
    document.getElementById('card-progress-text').innerText = `Card ${cardIndex + 1} of ${totalCards}`;
    document.getElementById('game-progress-bar').style.width = `${progressPercent}%`;
    
    // Grid Container
    const gridContainer = document.getElementById('card-items-grid');
    gridContainer.innerHTML = '';
    
    // Filter numbers matching bitwise card pattern: num & (1 << cardIndex)
    let cardItems = [];
    for (let num = 1; num <= config.maxValue; num++) {
        if ((num & (1 << cardIndex)) !== 0) {
            let label = num;
            if (config.isAlpha) {
                // Convert 1-26 to A-Z
                label = String.fromCharCode(65 + num - 1);
            }
            cardItems.push(label);
        }
    }
    
    // Render Items
    cardItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = `grid-item ${config.isAlpha ? 'char-item' : ''}`;
        itemDiv.innerText = item;
        gridContainer.appendChild(itemDiv);
    });
}

// Handle Card Answer Selection
function submitCardAnswer(isYes) {
    const config = GAME_MODES[playerState.currentMode];
    
    if (isYes) {
        playerState.accumulatedValue += (1 << playerState.currentCardIndex);
    }
    
    playerState.currentCardIndex++;
    
    if (playerState.currentCardIndex < config.bits) {
        renderCard();
    } else {
        // Game Completed, trigger loader and reading result
        startMindReading();
    }
}

// Trigger Loader screen for suspense
function startMindReading() {
    showScreen('screen-loader');
    
    const loaderPhrases = [
        "Aligning cerebral frequencies...",
        "Scanning binary memory grids...",
        "Reading electrical brain patterns...",
        "Decoding computational matrices...",
        "Decrypting choices..."
    ];
    
    let phraseIndex = 0;
    const phraseElement = document.getElementById('loader-status-text');
    phraseElement.innerText = loaderPhrases[0];
    
    // Cycle phrases
    const intervalId = setInterval(() => {
        phraseIndex++;
        if (phraseIndex < loaderPhrases.length) {
            phraseElement.innerText = loaderPhrases[phraseIndex];
        }
    }, 450);
    
    // Compute result
    setTimeout(() => {
        clearInterval(intervalId);
        revealResult();
    }, 2000);
}

// Reveal final result
function revealResult() {
    const config = GAME_MODES[playerState.currentMode];
    let result = playerState.accumulatedValue;
    let displayValue = result;
    let comment = "I knew it! Math never lies. 😊";
    let iconHTML = `<i class="fa-solid ${config.icon}"></i>`;
    
    // Error cases
    if (result === 0 || result > config.maxValue) {
        showScreen('screen-dashboard');
        alert("Wait a minute! It seems you made a mistake on one of the cards, or your chosen value is out of bounds. Let's try again!");
        return;
    }
    
    // Map Month names or alphabet letters
    if (config.isAlpha) {
        displayValue = String.fromCharCode(65 + result - 1);
    } else if (playerState.currentMode === 'month') {
        displayValue = MONTHS_NAMES[result];
    }
    
    // Special customization for Crush or specific modes
    if (playerState.currentMode === 'crush') {
        comment = `Is "${displayValue}" the initial of someone special? 💌`;
        iconHTML = `<i class="fa-solid fa-heart-pulse" style="color: var(--color-danger)"></i>`;
    } else if (playerState.currentMode === 'month') {
        comment = `A wonderful month to be born in! 🌟`;
    } else if (playerState.currentMode === 'number') {
        comment = `Your chosen number is ${displayValue}! Was I right? 😊`;
    }
    
    // Update Result elements
    document.getElementById('result-value-display').innerText = displayValue;
    document.getElementById('result-icon-display').innerHTML = iconHTML;
    document.getElementById('result-message').innerText = comment;
    
    // Adjust size for longer month strings
    const valDisplay = document.getElementById('result-value-display');
    if (typeof displayValue === 'string' && displayValue.length > 3) {
        valDisplay.style.fontSize = '2.2rem';
    } else {
        valDisplay.style.fontSize = '4rem';
    }
    
    // Save to local history
    saveHistoryItem(config.title, displayValue);
    
    // Show Screen
    showScreen('screen-result');
    triggerConfetti();
}

// Play again in current mode
function replayCurrentMode() {
    launchGame(playerState.currentMode);
}

// Mystery Mode helper
function launchMysteryMode() {
    const keys = Object.keys(GAME_MODES);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    launchGame(randomKey);
}

// Abort game and return to dashboard
function abortGame() {
    if (confirm("Are you sure you want to quit this session? Your current game progress will be lost.")) {
        showScreen('screen-dashboard');
    }
}

// Zodiac Calendar Helper
function calculateZodiac() {
    const monthSelect = document.getElementById('zodiac-month');
    const daySelect = document.getElementById('zodiac-day');
    
    const month = parseInt(monthSelect.value);
    const day = parseInt(daySelect.value);
    
    if (!month || !day) return;
    
    let zodiacName = "♑ Capricorn";
    let zodiacDesc = "Responsible, disciplined, self-controlled, and good managers.";
    
    // Find matching range
    for (const z of ZODIAC_SIGNS) {
        if ((month === z.startMonth && day >= z.startDay) ||
            (month === z.endMonth && day <= z.endDay)) {
            zodiacName = z.name;
            zodiacDesc = z.desc;
            break;
        }
    }
    
    // Render Results
    document.getElementById('zodiac-sign-name').innerText = zodiacName;
    document.getElementById('zodiac-sign-desc').innerText = zodiacDesc;
    
    document.getElementById('zodiac-result-wrapper').classList.remove('hidden');
    
    // Log to history
    saveHistoryItem("Zodiac Finder", zodiacName);
}

// Set dynamic days based on selected month in Zodiac Form
function updateZodiacDays() {
    const monthSelect = document.getElementById('zodiac-month');
    const daySelect = document.getElementById('zodiac-day');
    
    const month = parseInt(monthSelect.value);
    if (!month) {
        daySelect.innerHTML = '<option value="" disabled selected>Select Day</option>';
        return;
    }
    
    const daysInMonths = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const totalDays = daysInMonths[month];
    
    const previouslySelected = daySelect.value;
    daySelect.innerHTML = '<option value="" disabled>Select Day</option>';
    
    for (let d = 1; d <= totalDays; d++) {
        const option = document.createElement('option');
        option.value = d;
        option.innerText = d;
        daySelect.appendChild(option);
    }
    
    if (previouslySelected && parseInt(previouslySelected) <= totalDays) {
        daySelect.value = previouslySelected;
    } else {
        daySelect.selectedIndex = 0;
    }
}

function resetZodiacForm() {
    document.getElementById('zodiac-form').reset();
    document.getElementById('zodiac-result-wrapper').classList.add('hidden');
    updateZodiacDays();
}

// History Management
function loadHistoryData() {
    const historyJson = localStorage.getItem(`mind_reader_history_${playerState.name}`);
    playerState.history = historyJson ? JSON.parse(historyJson) : [];
}

function saveHistoryItem(modeName, resultValue) {
    const item = {
        mode: modeName,
        result: resultValue,
        timestamp: new Date().toLocaleString()
    };
    
    playerState.history.unshift(item);
    
    // Keep max 20 entries
    if (playerState.history.length > 20) {
        playerState.history.pop();
    }
    
    localStorage.setItem(`mind_reader_history_${playerState.name}`, JSON.stringify(playerState.history));
}

function loadHistory() {
    const rowsContainer = document.getElementById('history-rows');
    const emptyState = document.getElementById('history-empty');
    
    rowsContainer.innerHTML = '';
    
    if (playerState.history.length === 0) {
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    
    playerState.history.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${item.mode}</strong></td>
            <td><span class="mode-tag" style="background: rgba(168, 85, 247, 0.1); color: var(--color-primary);">${item.result}</span></td>
            <td><small>${item.timestamp}</small></td>
        `;
        rowsContainer.appendChild(row);
    });
}

function clearAllHistory() {
    if (confirm("Are you sure you want to clear your guess history?")) {
        playerState.history = [];
        localStorage.removeItem(`mind_reader_history_${playerState.name}`);
        loadHistory();
    }
}

// Confetti Effect Helper
function triggerConfetti() {
    const container = document.getElementById('confetti-container');
    container.innerHTML = '';
    
    const colors = ['#a855f7', '#06b6d4', '#ec4899', '#10b981', '#f59e0b', '#ef4444'];
    const totalPieces = 40;
    
    for (let i = 0; i < totalPieces; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        
        piece.style.left = `${Math.random() * 100}%`;
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.width = `${Math.random() * 8 + 4}px`;
        piece.style.height = `${Math.random() * 8 + 4}px`;
        piece.style.animationDelay = `${Math.random() * 1.5}s`;
        piece.style.animationDuration = `${Math.random() * 1.5 + 1.5}s`;
        
        container.appendChild(piece);
    }
}

// Attach Event Listeners on Load
window.addEventListener('DOMContentLoaded', () => {
    // Hook up zodiac date select options on select month change
    document.getElementById('zodiac-month').addEventListener('change', updateZodiacDays);
    
    // Add mouse move glow effect listener to Mode Cards (Premium dynamic effect)
    document.addEventListener('mousemove', (e) => {
        document.querySelectorAll('.mode-card').forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });
});
