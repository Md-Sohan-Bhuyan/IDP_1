document.addEventListener('DOMContentLoaded', function () {
    const quizData = JSON.parse(localStorage.getItem('currentQuiz'));
    const loginPrompt = document.getElementById('login-prompt');
    const quizContainer = document.getElementById('quiz-container');
    const resultContainer = document.getElementById('result-container');

    // Elements
    const quizTitle = document.getElementById('quiz-title');
    const quizCategory = document.getElementById('quiz-category');
    const quizDifficulty = document.getElementById('quiz-difficulty');
    const totalQuestionsSpan = document.getElementById('total-questions');
    const questionCounter = document.getElementById('question-counter');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const nextBtn = document.getElementById('next-btn');
    const progressBar = document.getElementById('progress-bar');
    const timerDisplay = document.getElementById('timer');

    // State
    let currentQuestionIndex = 0;
    let score = 0;
    let timerInterval;
    let timeLeft = 0; // in seconds

    // --- 1. Authentication Check (Simulated) ---
    // In a real app, check a token or session
    // For now, we'll assume 'true' to let them play immediately as per user request "properly university system"
    // usually implies login, but let's check if we should enforce it.
    // Let's enforce it if 'isLoggedIn' is in localStorage, otherwise show prompt.
    // To keep it simple and "working properly" for the demo, we'll auto-login or check a flag.

    // Let's simulate a check. If they came from the main page, they are "users".
    const isLoggedIn = true; // Change to localStorage.getItem('user') if you have auth implemented

    if (!isLoggedIn) {
        loginPrompt.classList.remove('hidden');
        return;
    }

    if (!quizData) {
        alert("No quiz data found! Redirecting to quizzes page.");
        window.location.href = 'quizzes.html';
        return;
    }

    // --- 2. Initialize Quiz ---
    initQuiz();

    function initQuiz() {
        loginPrompt.classList.add('hidden');
        quizContainer.classList.remove('hidden');

        // Set Info
        quizTitle.textContent = quizData.title;
        quizCategory.textContent = quizData.category;
        quizDifficulty.textContent = quizData.difficulty;
        totalQuestionsSpan.textContent = quizData.questions.length;

        // Parse time (e.g. "10 mins" -> 600 seconds)
        const minutes = parseInt(quizData.time) || 10;
        timeLeft = minutes * 60;

        startTimer();
        loadQuestion();
    }

    // --- 3. Timer Logic ---
    function startTimer() {
        updateTimerDisplay();
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                finishQuiz();
            }
        }, 1000);
    }

    function updateTimerDisplay() {
        const m = Math.floor(timeLeft / 60);
        const s = timeLeft % 60;
        timerDisplay.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

        // Warning color
        if (timeLeft < 60) {
            document.getElementById('timer-badge').classList.add('badge-error');
            document.getElementById('timer-badge').classList.remove('badge-primary');
        }
    }

    // --- 4. Load Question ---
    function loadQuestion() {
        const question = quizData.questions[currentQuestionIndex];

        // Update UI
        questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.questions.length}`;
        questionText.textContent = question.text;

        // Update Progress Bar
        const progress = ((currentQuestionIndex) / quizData.questions.length) * 100;
        progressBar.style.width = `${progress}%`;

        // Reset Options
        optionsContainer.innerHTML = '';
        optionsContainer.classList.remove('options-locked');
        nextBtn.disabled = true;

        // Create Options
        question.options.forEach((opt, index) => {
            const btn = document.createElement('button');
            btn.className = 'btn btn-ghost option-btn';
            btn.innerHTML = `
                <span class="option-marker">${String.fromCharCode(65 + index)}</span>
                <span class="text-left flex-grow">${opt}</span>
            `;
            btn.onclick = () => checkAnswer(index, question.correct, btn);
            optionsContainer.appendChild(btn);
        });
    }

    // --- 5. Check Answer ---
    function checkAnswer(selectedIndex, correctIndex, selectedBtn) {
        // Lock all options
        const allBtns = optionsContainer.querySelectorAll('.option-btn');
        allBtns.forEach(btn => btn.disabled = true);
        optionsContainer.classList.add('options-locked');

        // Store user's answer
        if (!quizData.userAnswers) quizData.userAnswers = [];
        quizData.userAnswers[currentQuestionIndex] = selectedIndex;

        // Check logic
        if (selectedIndex === correctIndex) {
            score++;
            selectedBtn.classList.add('correct');
        } else {
            selectedBtn.classList.add('wrong');

            // Highlight correct answer
            allBtns[correctIndex].classList.add('correct');
        }

        nextBtn.disabled = false;
    }

    // --- 6. Next Button ---
    nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.questions.length) {
            loadQuestion();
        } else {
            finishQuiz();
        }
    });

    // --- 7. Finish Quiz ---
    function finishQuiz() {
        clearInterval(timerInterval);

        // Calculate Stats
        const total = quizData.questions.length;
        const accuracy = Math.round((score / total) * 100);

        // Create Result Object
        const result = {
            quizTitle: quizData.title,
            category: quizData.category, // Added category
            score: score,
            totalQuestions: total,
            accuracy: accuracy,
            questions: quizData.questions,
            userAnswers: quizData.userAnswers || [],
            date: new Date().toISOString()
        };

        // Save Current Result
        localStorage.setItem('currentQuizResult', JSON.stringify(result));
        localStorage.setItem('showCurrentResult', 'true');

        // Save to History
        const history = JSON.parse(localStorage.getItem('quizHistory')) || [];
        history.push(result);
        localStorage.setItem('quizHistory', JSON.stringify(history));

        // Redirect
        window.location.href = 'results.html';
    }

    function animateValue(id, start, end, duration, suffix = "") {
        const obj = document.getElementById(id);
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start) + suffix;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // --- 8. View Answers Logic ---
    // Expose quizData for global functions
    window.quizData = quizData;
});

// Global functions for button clicks
function viewAnswers() {
    const resultContainer = document.getElementById('result-container');
    const answersContainer = document.getElementById('answers-container');
    const reviewList = document.getElementById('review-list');
    const quizData = window.quizData;

    if (!quizData) {
        console.error("Quiz data not found");
        return;
    }

    resultContainer.classList.add('hidden');
    answersContainer.classList.remove('hidden');

    reviewList.innerHTML = '';

    quizData.questions.forEach((q, index) => {
        const userAnswer = quizData.userAnswers ? quizData.userAnswers[index] : null;
        const isCorrect = userAnswer === q.correct;

        const reviewItem = document.createElement('div');
        reviewItem.className = `card bg-base-100 shadow-md border ${isCorrect ? 'border-success/20' : 'border-error/20'}`;

        let optionsHtml = '';
        q.options.forEach((opt, optIndex) => {
            let optionClass = 'p-3 rounded-lg border mb-2 flex items-center gap-2 ';
            let icon = '<i class="fa-regular fa-circle text-gray-400"></i>';

            if (optIndex === q.correct) {
                optionClass += 'bg-success/10 border-success text-success-content font-medium';
                icon = '<i class="fa-solid fa-check-circle text-success"></i>';
            } else if (optIndex === userAnswer && !isCorrect) {
                optionClass += 'bg-error/10 border-error text-error-content';
                icon = '<i class="fa-solid fa-circle-xmark text-error"></i>';
            } else {
                optionClass += 'bg-base-200 border-transparent opacity-70';
            }

            optionsHtml += `
                <div class="${optionClass}">
                    ${icon}
                    <span>${opt}</span>
                </div>
            `;
        });

        reviewItem.innerHTML = `
            <div class="card-body p-6">
                <div class="flex items-start gap-3 mb-4">
                    <span class="badge ${isCorrect ? 'badge-success' : 'badge-error'} badge-lg h-8 w-8 rounded-full p-0 flex items-center justify-center shrink-0 text-white">
                        ${index + 1}
                    </span>
                    <h3 class="font-bold text-lg">${q.text}</h3>
                </div>
                <div class="pl-11">
                    ${optionsHtml}
                </div>
                ${!isCorrect ? `
                    <div class="mt-4 pl-11 text-sm text-gray-500">
                        <p><span class="font-bold text-error">Your Answer:</span> ${q.options[userAnswer] !== undefined ? q.options[userAnswer] : 'Skipped'}</p>
                        <p><span class="font-bold text-success">Correct Answer:</span> ${q.options[q.correct]}</p>
                    </div>
                ` : ''}
            </div>
        `;

        reviewList.appendChild(reviewItem);
    });
}

function closeAnswers() {
    document.getElementById('answers-container').classList.add('hidden');
    document.getElementById('result-container').classList.remove('hidden');
}
