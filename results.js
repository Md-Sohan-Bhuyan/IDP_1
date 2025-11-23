document.addEventListener('DOMContentLoaded', function () {
    const resultContainer = document.getElementById('result-container');
    const answersContainer = document.getElementById('answers-container');
    const historyContainer = document.getElementById('history-container');

    // Check if we should show a specific result (redirected from quiz)
    const currentResult = JSON.parse(localStorage.getItem('currentQuizResult'));

    // Clear the current result flag so refreshing or navigating back doesn't show it again?
    // Actually, keeping it might be good for "refresh". Let's keep it for now.
    // But if the user clicked "Results" from navbar, they probably want history.

    // We can check a URL parameter or just rely on the presence of 'currentQuizResult' AND a timestamp check?
    // Let's use a simple heuristic: if 'currentQuizResult' exists, show it. 
    // But we need a way to clear it when they leave.

    // Better approach: play_quiz.js sets 'showCurrentResult' = true.
    // We check that.

    const showCurrent = localStorage.getItem('showCurrentResult');

    if (showCurrent === 'true' && currentResult) {
        showResult(currentResult);
        // Clear the flag so next time they come here (e.g. via navbar) they see history
        localStorage.removeItem('showCurrentResult');
    } else {
        showHistory();
    }
});

function showResult(data) {
    document.getElementById('result-container').classList.remove('hidden');
    document.getElementById('history-container').classList.add('hidden');

    document.getElementById('quiz-title-display').textContent = data.quizTitle;

    // Animate values
    animateValue("final-score", 0, data.score * 10, 1000);
    animateValue("correct-answers", 0, data.score, 1000);
    animateValue("accuracy", 0, data.accuracy, 1000, "%");

    // Store data for "View Answers"
    window.currentQuizData = data;
}

function showHistory(filterDept = 'all') {
    document.getElementById('result-container').classList.add('hidden');
    document.getElementById('history-container').classList.remove('hidden');

    const history = JSON.parse(localStorage.getItem('quizHistory')) || [];
    const historyList = document.getElementById('history-list');
    const noHistory = document.getElementById('no-history');

    // Filter history based on department
    let filteredHistory = history;
    if (filterDept !== 'all') {
        filteredHistory = history.filter(item => (item.category || 'General') === filterDept);
    }

    if (filteredHistory.length === 0) {
        noHistory.classList.remove('hidden');
        document.querySelector('table').classList.add('hidden');
        // If we have history but filtered result is empty, show a different message?
        // For now, standard no history message is fine or we could update text.
        if (history.length > 0) {
            document.querySelector('#no-history h3').textContent = `No ${filterDept} quizzes found`;
            document.querySelector('#no-history p').textContent = "Try taking a quiz in this department!";
        } else {
            document.querySelector('#no-history h3').textContent = "No quiz history found";
            document.querySelector('#no-history p').textContent = "Start taking quizzes to see your results here!";
        }
        return;
    }

    noHistory.classList.add('hidden');
    document.querySelector('table').classList.remove('hidden');
    historyList.innerHTML = '';

    // Sort by date descending
    filteredHistory.reverse().forEach(item => {
        const row = document.createElement('tr');
        const date = new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
        const time = new Date(item.date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

        const dept = item.category || 'General';
        const deptClass = dept.toLowerCase();
        const scorePercent = item.accuracy;
        const isPass = scorePercent >= 60;
        const statusClass = isPass ? 'status-pass' : 'status-fail';
        const statusText = isPass ? 'Pass' : 'Fail';

        row.innerHTML = `
            <td>
                <div class="font-medium text-gray-900">${date}</div>
                <div class="text-xs text-gray-500">${time}</div>
            </td>
            <td>
                <div class="font-bold text-gray-800">${item.quizTitle}</div>
            </td>
            <td>
                <span class="dept-badge ${deptClass}">${dept}</span>
            </td>
            <td>
                <div class="font-bold text-primary text-lg">${item.score * 10}</div>
            </td>
            <td>
                <div class="flex items-center">
                    <div class="radial-progress text-primary text-xs mr-2" style="--value:${scorePercent}; --size:2rem;">${scorePercent}%</div>
                </div>
            </td>
            <td>
                <div class="flex items-center">
                    <span class="status-indicator ${statusClass}"></span>
                    <span class="text-sm font-medium ${isPass ? 'text-green-700' : 'text-red-700'}">${statusText}</span>
                </div>
            </td>
            <td class="text-right">
                <button class="btn btn-sm btn-ghost btn-circle" onclick='viewHistoryDetails(${JSON.stringify(item)})' title="View Details">
                    <i class="fa-solid fa-chevron-right"></i>
                </button>
            </td>
        `;
        historyList.appendChild(row);
    });
}

// Add event listeners for history tabs
document.addEventListener('DOMContentLoaded', function () {
    const historyTabs = document.querySelectorAll('.history-tab');
    historyTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            // Remove active class from all tabs
            historyTabs.forEach(t => t.classList.remove('tab-active'));
            // Add active class to clicked tab
            this.classList.add('tab-active');

            const filter = this.getAttribute('data-filter');
            showHistory(filter);
        });
    });
});

function getAccuracyBadge(accuracy) {
    if (accuracy >= 80) return 'badge-success';
    if (accuracy >= 60) return 'badge-warning';
    return 'badge-error';
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

// View Answers Logic
function viewAnswers() {
    const data = window.currentQuizData;
    if (!data) return;

    renderReview(data);
}

function viewHistoryDetails(item) {
    // Load the item as current data and show answers
    window.currentQuizData = item;
    renderReview(item);
}

function renderReview(data) {
    document.getElementById('result-container').classList.add('hidden');
    document.getElementById('history-container').classList.add('hidden');
    document.getElementById('answers-container').classList.remove('hidden');

    const reviewList = document.getElementById('review-list');
    reviewList.innerHTML = '';

    // We need the questions and user answers.
    // The 'data' object from localStorage should contain:
    // quizTitle, score, accuracy, questions (array of {text, options, correct}), userAnswers (array of indices)

    if (!data.questions || !data.userAnswers) {
        reviewList.innerHTML = '<p class="text-center text-error">Detailed data not available for this quiz.</p>';
        return;
    }

    data.questions.forEach((q, index) => {
        const userAnswer = data.userAnswers[index];
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
            </div>
        `;

        reviewList.appendChild(reviewItem);
    });
}

function closeAnswers() {
    document.getElementById('answers-container').classList.add('hidden');

    // Return to where we came from
    // If we have 'showCurrentResult' in localStorage (or we just showed it), go back to result container
    // But we cleared 'showCurrentResult'.
    // We can check if history-container was hidden before?
    // Simpler: if we are viewing a history item, go back to history. If current result, go back to result.

    // Let's just check if we are in "history mode" or "result mode" based on what was visible.
    // Actually, we hid them.

    // Let's use a flag or just default to result if we have it in memory?

    // If we came from history, we want to go back to history.
    // If we came from result, we want to go back to result.

    // Let's check if the current data matches the 'currentQuizResult' in localStorage AND we just finished it?
    // A simple way: check if 'result-container' was the one we hid.
    // But we can't check that now.

    // Let's just show history if we are not in "fresh result" mode.
    // But wait, if I just finished a quiz, viewed answers, and close, I want to see my score again.

    // Re-check the logic in DOMContentLoaded.
    // If I am viewing a history item, 'showCurrentResult' is definitely null.
    // So if I reload, I go to history.

    // Let's just toggle based on a variable we set when opening.
    // But for now, let's just show history if we don't have a "fresh" result active.

    // Actually, let's just show the result container if window.currentQuizData matches the fresh result.
    const currentResult = JSON.parse(localStorage.getItem('currentQuizResult'));
    const isFresh = currentResult && window.currentQuizData && currentResult.id === window.currentQuizData.id && currentResult.date === window.currentQuizData.date;

    // Wait, checking equality of objects is hard.
    // Let's just use a global flag.

    if (document.getElementById('result-container').getAttribute('data-active') === 'true') {
        document.getElementById('result-container').classList.remove('hidden');
    } else {
        document.getElementById('history-container').classList.remove('hidden');
    }
}

// Patch showResult/showHistory to set the flag
const originalShowResult = showResult;
showResult = function (data) {
    document.getElementById('result-container').setAttribute('data-active', 'true');
    originalShowResult(data);
}

const originalShowHistory = showHistory;
showHistory = function () {
    document.getElementById('result-container').setAttribute('data-active', 'false');
    originalShowHistory();
}
