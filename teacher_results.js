// Results Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeResultsPage();
    initializeModals();
    loadResultsTable();
    loadTopPerformers();
    updateStats();
});

function initializeResultsPage() {
    // Initialize any page-specific functionality
}

function initializeModals() {
    // Result Details Modal
    const resultDetailsModal = document.getElementById('result-details-modal');
    const closeResultDetailsBtn = document.getElementById('close-result-details');
    
    if (closeResultDetailsBtn && resultDetailsModal) {
        closeResultDetailsBtn.addEventListener('click', () => {
            resultDetailsModal.classList.remove('modal-open');
        });
        
        resultDetailsModal.addEventListener('click', (e) => {
            if (e.target === resultDetailsModal) {
                resultDetailsModal.classList.remove('modal-open');
            }
        });
    }
}

function loadResultsTable() {
    const tableBody = document.getElementById('results-table-body');
    if (!tableBody) return;
    
    // Sample results data
    const results = [
        {
            id: '1',
            studentName: 'Ahmed Khan',
            studentId: 'S2024001',
            quizTitle: 'Mathematics Midterm',
            score: 85,
            totalMarks: 100,
            percentage: 85,
            status: 'passed',
            timeTaken: '45:30',
            completedAt: '2025-01-15T10:30:00',
            subject: 'math'
        },
        {
            id: '2',
            studentName: 'Fatima Begum',
            studentId: 'S2024002',
            quizTitle: 'Physics Quiz - Unit 2',
            score: 72,
            totalMarks: 100,
            percentage: 72,
            status: 'passed',
            timeTaken: '38:15',
            completedAt: '2025-01-14T14:20:00',
            subject: 'physics'
        },
        {
            id: '3',
            studentName: 'Raj Sharma',
            studentId: 'S2024003',
            quizTitle: 'Chemistry Basics',
            score: 45,
            totalMarks: 50,
            percentage: 90,
            status: 'passed',
            timeTaken: '25:45',
            completedAt: '2025-01-13T09:15:00',
            subject: 'chemistry'
        },
        {
            id: '4',
            studentName: 'Maria Islam',
            studentId: 'S2024004',
            quizTitle: 'Mathematics Midterm',
            score: 58,
            totalMarks: 100,
            percentage: 58,
            status: 'failed',
            timeTaken: '52:10',
            completedAt: '2025-01-15T11:45:00',
            subject: 'math'
        },
        {
            id: '5',
            studentName: 'John Doe',
            studentId: 'S2024005',
            quizTitle: 'Physics Quiz - Unit 2',
            score: 91,
            totalMarks: 100,
            percentage: 91,
            status: 'passed',
            timeTaken: '42:30',
            completedAt: '2025-01-14T16:00:00',
            subject: 'physics'
        }
    ];
    
    // Clear existing table
    tableBody.innerHTML = '';
    
    if (results.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" class="text-center py-8">
                    <div class="empty-state">
                        <i class="fa-solid fa-chart-bar"></i>
                        <h3 class="text-lg font-semibold mb-2">No Results Found</h3>
                        <p class="text-gray-600">Quiz results will appear here once students complete quizzes</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }
    
    // Add results to table
    results.forEach(result => {
        const row = document.createElement('tr');
        
        const scoreClass = getScoreClass(result.percentage);
        const statusClass = result.status === 'passed' ? 'status-passed' : 'status-failed';
        const statusText = result.status === 'passed' ? 'Passed' : 'Failed';
        
        row.innerHTML = `
            <td>
                <div class="font-semibold">${result.studentName}</div>
                <div class="text-sm text-gray-500">${result.studentId}</div>
            </td>
            <td>
                <div class="font-medium">${result.quizTitle}</div>
                <div class="text-sm text-gray-500">${getSubjectName(result.subject)}</div>
            </td>
            <td>
                <span class="score-badge ${scoreClass}">
                    ${result.score}/${result.totalMarks} (${result.percentage}%)
                </span>
            </td>
            <td>
                <span class="status-badge ${statusClass}">${statusText}</span>
            </td>
            <td>
                <div class="text-sm">${result.timeTaken}</div>
            </td>
            <td>
                <div class="text-sm">${formatDate(result.completedAt)}</div>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-outline btn-primary view-result" data-id="${result.id}">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-outline btn-info download-result" data-id="${result.id}">
                        <i class="fa-solid fa-download"></i>
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Add event listeners to action buttons
    addResultEventListeners();
}

function addResultEventListeners() {
    // View result buttons
    document.querySelectorAll('.view-result').forEach(btn => {
        btn.addEventListener('click', function() {
            const resultId = this.getAttribute('data-id');
            viewResultDetails(resultId);
        });
    });
    
    // Download result buttons
    document.querySelectorAll('.download-result').forEach(btn => {
        btn.addEventListener('click', function() {
            const resultId = this.getAttribute('data-id');
            downloadResult(resultId);
        });
    });
}

function viewResultDetails(resultId) {
    // For demo purposes, show sample result details
    const resultDetailsContent = document.getElementById('result-details-content');
    if (!resultDetailsContent) return;
    
    // Sample result details
    const resultDetails = {
        studentName: 'Ahmed Khan',
        studentId: 'S2024001',
        quizTitle: 'Mathematics Midterm',
        score: 85,
        totalMarks: 100,
        percentage: 85,
        status: 'passed',
        timeTaken: '45:30',
        completedAt: '2025-01-15T10:30:00',
        subject: 'Mathematics',
        questions: [
            {
                question: 'What is the value of π (pi) approximately?',
                options: ['3.14', '2.71', '1.41', '1.61'],
                correctAnswer: 'A',
                studentAnswer: 'A',
                isCorrect: true,
                marks: 5,
                explanation: 'π (pi) is approximately 3.14159...'
            },
            {
                question: 'Solve for x: 2x + 5 = 15',
                options: ['x = 5', 'x = 10', 'x = 7.5', 'x = 20'],
                correctAnswer: 'A',
                studentAnswer: 'A',
                isCorrect: true,
                marks: 5,
                explanation: '2x + 5 = 15 → 2x = 10 → x = 5'
            },
            {
                question: 'What is the derivative of x²?',
                options: ['2x', 'x', '2', 'x³/3'],
                correctAnswer: 'A',
                studentAnswer: 'C',
                isCorrect: false,
                marks: 5,
                explanation: 'The derivative of x² is 2x'
            }
        ]
    };
    
    let questionsHtml = '';
    resultDetails.questions.forEach((q, index) => {
        const questionClass = q.isCorrect ? 'correct' : 'incorrect';
        questionsHtml += `
            <div class="question-review ${questionClass}">
                <div class="question-text">Q${index + 1}: ${q.question}</div>
                <div class="space-y-2">
                    ${q.options.map((option, optIndex) => {
                        const optionLetter = String.fromCharCode(65 + optIndex);
                        let optionClass = '';
                        if (optionLetter === q.correctAnswer) {
                            optionClass = 'correct';
                        } else if (optionLetter === q.studentAnswer && !q.isCorrect) {
                            optionClass = 'incorrect selected';
                        } else if (optionLetter === q.studentAnswer) {
                            optionClass = 'selected';
                        }
                        return `
                            <div class="option ${optionClass}">
                                ${optionLetter}. ${option}
                                ${optionLetter === q.correctAnswer ? ' <i class="fa-solid fa-check text-success ml-2"></i>' : ''}
                                ${optionLetter === q.studentAnswer && !q.isCorrect ? ' <i class="fa-solid fa-times text-error ml-2"></i>' : ''}
                            </div>
                        `;
                    }).join('')}
                </div>
                ${q.explanation ? `
                <div class="mt-3 p-2 bg-base-200 rounded text-sm">
                    <strong>Explanation:</strong> ${q.explanation}
                </div>
                ` : ''}
                <div class="mt-2 text-sm text-gray-600">
                    Marks: ${q.isCorrect ? `+${q.marks}` : '0'}/${q.marks}
                </div>
            </div>
        `;
    });
    
    resultDetailsContent.innerHTML = `
        <div class="result-summary">
            <div class="summary-item">
                <div class="summary-value">${resultDetails.score}/${resultDetails.totalMarks}</div>
                <div class="summary-label">Score</div>
            </div>
            <div class="summary-item">
                <div class="summary-value">${resultDetails.percentage}%</div>
                <div class="summary-label">Percentage</div>
            </div>
            <div class="summary-item">
                <div class="summary-value">${resultDetails.timeTaken}</div>
                <div class="summary-label">Time Taken</div>
            </div>
            <div class="summary-item">
                <div class="summary-value ${resultDetails.status === 'passed' ? 'text-success' : 'text-error'}">
                    ${resultDetails.status.charAt(0).toUpperCase() + resultDetails.status.slice(1)}
                </div>
                <div class="summary-label">Status</div>
            </div>
        </div>
        
        <div class="student-info bg-base-200 p-4 rounded-lg mb-4">
            <h4 class="font-semibold mb-2">Student Information</h4>
            <div class="grid grid-cols-2 gap-4">
                <div><strong>Name:</strong> ${resultDetails.studentName}</div>
                <div><strong>Student ID:</strong> ${resultDetails.studentId}</div>
                <div><strong>Quiz:</strong> ${resultDetails.quizTitle}</div>
                <div><strong>Subject:</strong> ${resultDetails.subject}</div>
                <div><strong>Completed:</strong> ${formatDateTime(resultDetails.completedAt)}</div>
            </div>
        </div>
        
        <div class="questions-review">
            <h4 class="font-semibold mb-4">Question-wise Review</h4>
            ${questionsHtml}
        </div>
    `;
    
    // Open modal
    document.getElementById('result-details-modal').classList.add('modal-open');
}

function downloadResult(resultId) {
    // For demo purposes
    showNotification('Downloading result report...', 'info');
    
    // Simulate download
    setTimeout(() => {
        showNotification('Result report downloaded successfully!', 'success');
    }, 1500);
}

function loadTopPerformers() {
    const performersList = document.getElementById('top-performers-list');
    if (!performersList) return;
    
    // Sample top performers data
    const topPerformers = [
        { name: 'John Doe', id: 'S2024005', score: 95, quiz: 'Physics Quiz' },
        { name: 'Ahmed Khan', id: 'S2024001', score: 92, quiz: 'Math Midterm' },
        { name: 'Raj Sharma', id: 'S2024003', score: 90, quiz: 'Chemistry Basics' },
        { name: 'Fatima Begum', id: 'S2024002', score: 88, quiz: 'Physics Quiz' },
        { name: 'Maria Islam', id: 'S2024004', score: 85, quiz: 'Math Midterm' }
    ];
    
    // Clear existing list
    performersList.innerHTML = '';
    
    // Add performers to list
    topPerformers.forEach(performer => {
        const performerItem = document.createElement('div');
        performerItem.className = 'top-performer';
        
        const initials = performer.name.split(' ').map(n => n[0]).join('');
        
        performerItem.innerHTML = `
            <div class="performer-avatar">${initials}</div>
            <div class="performer-info">
                <div class="font-medium text-sm">${performer.name}</div>
                <div class="text-xs text-gray-500">${performer.id}</div>
            </div>
            <div class="performer-score">${performer.score}%</div>
        `;
        
        performersList.appendChild(performerItem);
    });
}

function updateStats() {
    // Sample stats data
    const stats = {
        totalQuizzes: 12,
        totalParticipants: 347,
        avgScore: 78.5,
        passRate: 85
    };
    
    // Update DOM elements
    document.getElementById('total-quizzes').textContent = stats.totalQuizzes;
    document.getElementById('total-participants').textContent = stats.totalParticipants;
    document.getElementById('avg-score').textContent = stats.avgScore + '%';
    document.getElementById('pass-rate').textContent = stats.passRate + '%';
}

// Utility Functions
function getScoreClass(percentage) {
    if (percentage >= 90) return 'score-excellent';
    if (percentage >= 75) return 'score-good';
    if (percentage >= 50) return 'score-average';
    return 'score-poor';
}

function getSubjectName(subjectCode) {
    const subjects = {
        'math': 'Mathematics',
        'physics': 'Physics',
        'chemistry': 'Chemistry',
        'biology': 'Biology',
        'english': 'English',
        'computer': 'Computer Science'
    };
    return subjects[subjectCode] || subjectCode;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `toast toast-top toast-end z-50`;
    
    const alertClass = type === 'success' ? 'alert-success' :
                      type === 'error' ? 'alert-error' :
                      type === 'warning' ? 'alert-warning' : 'alert-info';
    
    notification.innerHTML = `
        <div class="alert ${alertClass} shadow-lg">
            <div>
                <i class="fa-solid ${type === 'success' ? 'fa-check' : 
                                 type === 'error' ? 'fa-exclamation' : 
                                 type === 'warning' ? 'fa-triangle-exclamation' : 'fa-info'}"></i>
                <span>${message}</span>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, duration);
}

// Export functions for potential use in other files
window.TeacherResults = {
    showNotification,
    loadResultsTable,
    updateStats
};