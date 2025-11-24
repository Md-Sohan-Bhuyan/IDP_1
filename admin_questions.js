// Question Approval JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeQuestionsPage();
    initializeModals();
    loadPendingQuestions();
    updateStats();
});

function initializeQuestionsPage() {
    // Initialize any page-specific functionality
}

function initializeModals() {
    // Question Review Modal
    const questionReviewModal = document.getElementById('question-review-modal');
    const closeQuestionReviewBtn = document.getElementById('close-question-review');
    const approveQuestionBtn = document.getElementById('approve-question-btn');
    const rejectQuestionBtn = document.getElementById('reject-question-btn');
    
    if (closeQuestionReviewBtn && questionReviewModal) {
        closeQuestionReviewBtn.addEventListener('click', () => {
            questionReviewModal.classList.remove('modal-open');
        });
        
        questionReviewModal.addEventListener('click', (e) => {
            if (e.target === questionReviewModal) {
                questionReviewModal.classList.remove('modal-open');
            }
        });
    }
    
    if (approveQuestionBtn) {
        approveQuestionBtn.addEventListener('click', function() {
            const questionId = this.getAttribute('data-id');
            approveQuestion(questionId);
        });
    }
    
    if (rejectQuestionBtn) {
        rejectQuestionBtn.addEventListener('click', function() {
            const questionId = this.getAttribute('data-id');
            openRejectionModal(questionId);
        });
    }
    
    // Reject Reason Modal
    const rejectReasonModal = document.getElementById('reject-reason-modal');
    const cancelRejectionBtn = document.getElementById('cancel-rejection');
    const confirmRejectionBtn = document.getElementById('confirm-rejection');
    
    if (cancelRejectionBtn && rejectReasonModal) {
        cancelRejectionBtn.addEventListener('click', () => {
            rejectReasonModal.classList.remove('modal-open');
        });
        
        rejectReasonModal.addEventListener('click', (e) => {
            if (e.target === rejectReasonModal) {
                rejectReasonModal.classList.remove('modal-open');
            }
        });
    }
    
    if (confirmRejectionBtn) {
        confirmRejectionBtn.addEventListener('click', function() {
            const questionId = this.getAttribute('data-id');
            rejectQuestion(questionId);
        });
    }
}

function loadPendingQuestions() {
    const questionsList = document.getElementById('questions-list');
    if (!questionsList) return;
    
    // Sample pending questions data
    const pendingQuestions = [
        {
            id: 'Q2024001',
            question: 'What is the time complexity of binary search algorithm?',
            subject: 'Computer Science',
            department: 'Computer Science',
            difficulty: 'medium',
            options: [
                { letter: 'A', text: 'O(n)', correct: false },
                { letter: 'B', text: 'O(log n)', correct: true },
                { letter: 'C', text: 'O(n log n)', correct: false },
                { letter: 'D', text: 'O(1)', correct: false }
            ],
            explanation: 'Binary search divides the search space in half with each iteration, resulting in logarithmic time complexity.',
            marks: 5,
            timeLimit: 60,
            submittedBy: 'Dr. Mohammad Rahman',
            submittedDate: '2025-01-15T10:30:00',
            status: 'pending'
        },
        {
            id: 'Q2024002',
            question: 'Solve the quadratic equation: x² - 5x + 6 = 0',
            subject: 'Mathematics',
            department: 'Mathematics',
            difficulty: 'easy',
            options: [
                { letter: 'A', text: 'x = 2, 3', correct: true },
                { letter: 'B', text: 'x = 1, 6', correct: false },
                { letter: 'C', text: 'x = -2, -3', correct: false },
                { letter: 'D', text: 'x = -1, -6', correct: false }
            ],
            explanation: 'The equation factors to (x-2)(x-3)=0, so the solutions are x=2 and x=3.',
            marks: 5,
            timeLimit: 45,
            submittedBy: 'Dr. Ahmed Khan',
            submittedDate: '2025-01-14T14:20:00',
            status: 'pending'
        },
        {
            id: 'Q2024003',
            question: 'Which law states that every action has an equal and opposite reaction?',
            subject: 'Physics',
            department: 'Physics',
            difficulty: 'easy',
            options: [
                { letter: 'A', text: 'Newton\'s First Law', correct: false },
                { letter: 'B', text: 'Newton\'s Second Law', correct: false },
                { letter: 'C', text: 'Newton\'s Third Law', correct: true },
                { letter: 'D', text: 'Law of Conservation of Energy', correct: false }
            ],
            explanation: 'Newton\'s Third Law of Motion states that for every action, there is an equal and opposite reaction.',
            marks: 5,
            timeLimit: 45,
            submittedBy: 'Dr. Fatima Begum',
            submittedDate: '2025-01-13T09:15:00',
            status: 'pending'
        },
        {
            id: 'Q2024004',
            question: 'What is the pH value of pure water at 25°C?',
            subject: 'Chemistry',
            department: 'Chemistry',
            difficulty: 'medium',
            options: [
                { letter: 'A', text: '5', correct: false },
                { letter: 'B', text: '7', correct: true },
                { letter: 'C', text: '8', correct: false },
                { letter: 'D', text: '14', correct: false }
            ],
            explanation: 'Pure water at 25°C has a pH of 7, which is neutral on the pH scale.',
            marks: 5,
            timeLimit: 45,
            submittedBy: 'Dr. Raj Sharma',
            submittedDate: '2025-01-12T11:45:00',
            status: 'pending'
        }
    ];
    
    // Clear existing list
    questionsList.innerHTML = '';
    
    if (pendingQuestions.length === 0) {
        questionsList.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-check-circle"></i>
                <h3 class="text-lg font-semibold mb-2">No Pending Questions</h3>
                <p class="text-gray-600">All questions have been reviewed and approved</p>
            </div>
        `;
        return;
    }
    
    // Add pending questions
    pendingQuestions.forEach(question => {
        const questionCard = document.createElement('div');
        questionCard.className = 'question-card pending';
        
        const difficultyClass = `difficulty-${question.difficulty}`;
        const difficultyText = question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1);
        
        let optionsHtml = '';
        question.options.forEach(option => {
            const optionClass = option.correct ? 'option-item correct' : 'option-item';
            optionsHtml += `
                <div class="${optionClass}">
                    <div class="option-letter">${option.letter}</div>
                    <div class="option-text">${option.text}</div>
                </div>
            `;
        });
        
        questionCard.innerHTML = `
            <div class="question-header">
                <div class="question-meta">
                    <div class="question-text">${question.question}</div>
                    <div class="question-details">
                        <span class="department-badge">${question.department}</span>
                        <span class="difficulty-badge ${difficultyClass}">${difficultyText}</span>
                        <span><i class="fa-solid fa-user mr-1"></i> ${question.submittedBy}</span>
                        <span><i class="fa-regular fa-clock mr-1"></i> ${formatDate(question.submittedDate)}</span>
                        <span><i class="fa-solid fa-star mr-1"></i> ${question.marks} marks</span>
                        <span><i class="fa-solid fa-stopwatch mr-1"></i> ${question.timeLimit}s</span>
                    </div>
                </div>
                <div class="question-actions">
                    <span class="status-badge status-pending">Pending Review</span>
                    <div class="action-buttons">
                        <button class="btn btn-sm btn-outline btn-primary review-question" data-id="${question.id}">
                            <i class="fa-solid fa-eye mr-1"></i> Review
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="options-list">
                ${optionsHtml}
            </div>
            
            ${question.explanation ? `
            <div class="explanation-box">
                <div class="explanation-label">Explanation:</div>
                <div class="text-sm">${question.explanation}</div>
            </div>
            ` : ''}
        `;
        
        questionsList.appendChild(questionCard);
    });
    
    // Add event listeners to review buttons
    addQuestionEventListeners();
}

function addQuestionEventListeners() {
    // Review question buttons
    document.querySelectorAll('.review-question').forEach(btn => {
        btn.addEventListener('click', function() {
            const questionId = this.getAttribute('data-id');
            reviewQuestion(questionId);
        });
    });
}

function reviewQuestion(questionId) {
    // For demo purposes, show sample question details
    const questionReviewContent = document.getElementById('question-review-content');
    if (!questionReviewContent) return;
    
    // Sample question details (using the same data as pending questions)
    const questionDetails = {
        id: 'Q2024001',
        question: 'What is the time complexity of binary search algorithm?',
        subject: 'Computer Science',
        department: 'Computer Science',
        difficulty: 'medium',
        options: [
            { letter: 'A', text: 'O(n)', correct: false },
            { letter: 'B', text: 'O(log n)', correct: true },
            { letter: 'C', text: 'O(n log n)', correct: false },
            { letter: 'D', text: 'O(1)', correct: false }
        ],
        explanation: 'Binary search divides the search space in half with each iteration, resulting in logarithmic time complexity. This makes it very efficient for searching in sorted arrays.',
        marks: 5,
        timeLimit: 60,
        submittedBy: 'Dr. Mohammad Rahman',
        submittedDate: '2025-01-15T10:30:00',
        status: 'pending'
    };
    
    let optionsHtml = '';
    questionDetails.options.forEach(option => {
        const optionClass = option.correct ? 'option-item correct' : 'option-item';
        optionsHtml += `
            <div class="${optionClass}">
                <div class="option-letter">${option.letter}</div>
                <div class="option-text">${option.text}</div>
                ${option.correct ? '<i class="fa-solid fa-check text-success ml-2"></i>' : ''}
            </div>
        `;
    });
    
    const difficultyClass = `difficulty-${questionDetails.difficulty}`;
    const difficultyText = questionDetails.difficulty.charAt(0).toUpperCase() + questionDetails.difficulty.slice(1);
    
    questionReviewContent.innerHTML = `
        <div class="question-review">
            <div class="review-section">
                <div class="review-label">Question</div>
                <div class="review-content">
                    <div class="question-text">${questionDetails.question}</div>
                </div>
            </div>
            
            <div class="review-section">
                <div class="review-label">Options</div>
                <div class="review-content">
                    <div class="options-list">
                        ${optionsHtml}
                    </div>
                </div>
            </div>
            
            ${questionDetails.explanation ? `
            <div class="review-section">
                <div class="review-label">Explanation</div>
                <div class="review-content">
                    <div class="text-sm">${questionDetails.explanation}</div>
                </div>
            </div>
            ` : ''}
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div>
                    <div class="review-label">Subject</div>
                    <div>${questionDetails.subject}</div>
                </div>
                <div>
                    <div class="review-label">Difficulty</div>
                    <span class="difficulty-badge ${difficultyClass}">${difficultyText}</span>
                </div>
                <div>
                    <div class="review-label">Marks</div>
                    <div>${questionDetails.marks}</div>
                </div>
                <div>
                    <div class="review-label">Time Limit</div>
                    <div>${questionDetails.timeLimit} seconds</div>
                </div>
            </div>
        </div>
        
        <div class="review-section">
            <div class="review-label">Submission Details</div>
            <div class="review-content">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <strong>Submitted By:</strong> ${questionDetails.submittedBy}
                    </div>
                    <div>
                        <strong>Department:</strong> ${questionDetails.department}
                    </div>
                    <div>
                        <strong>Submission Date:</strong> ${formatDate(questionDetails.submittedDate)}
                    </div>
                    <div>
                        <strong>Status:</strong> <span class="status-badge status-pending">Pending Review</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Set data-id for action buttons
    document.getElementById('approve-question-btn').setAttribute('data-id', questionId);
    document.getElementById('reject-question-btn').setAttribute('data-id', questionId);
    
    // Open modal
    document.getElementById('question-review-modal').classList.add('modal-open');
}

function openRejectionModal(questionId) {
    // Close review modal
    document.getElementById('question-review-modal').classList.remove('modal-open');
    
    // Set data-id for confirm rejection button
    document.getElementById('confirm-rejection').setAttribute('data-id', questionId);
    
    // Open rejection modal
    document.getElementById('reject-reason-modal').classList.add('modal-open');
}

function approveQuestion(questionId) {
    // Show loading state
    const approveBtn = document.getElementById('approve-question-btn');
    approveBtn.classList.add('loading');
    approveBtn.disabled = true;
    
    // Simulate approval process
    setTimeout(() => {
        showNotification('Question approved successfully!', 'success');
        
        // Close modal
        document.getElementById('question-review-modal').classList.remove('modal-open');
        
        // Reload questions list
        loadPendingQuestions();
        updateStats();
        
        // Reset button state
        approveBtn.classList.remove('loading');
        approveBtn.disabled = false;
    }, 1500);
}

function rejectQuestion(questionId) {
    const reason = document.getElementById('rejection-reason').value;
    const comments = document.getElementById('rejection-comments').value;
    
    if (!reason) {
        showNotification('Please select a reason for rejection', 'error');
        return;
    }
    
    // Show loading state
    const rejectBtn = document.getElementById('confirm-rejection');
    rejectBtn.classList.add('loading');
    rejectBtn.disabled = true;
    
    // Simulate rejection process
    setTimeout(() => {
        showNotification('Question rejected successfully! Feedback sent to teacher.', 'success');
        
        // Close modal and reset form
        document.getElementById('reject-reason-modal').classList.remove('modal-open');
        document.getElementById('rejection-reason').value = '';
        document.getElementById('rejection-comments').value = '';
        
        // Reload questions list
        loadPendingQuestions();
        updateStats();
        
        // Reset button state
        rejectBtn.classList.remove('loading');
        rejectBtn.disabled = false;
    }, 1500);
}

function updateStats() {
    // Sample stats data
    const stats = {
        pendingQuestions: 23,
        approvedQuestions: 47,
        rejectedQuestions: 8,
        approvalRate: 85
    };
    
    // Update DOM elements
    document.getElementById('pending-questions').textContent = stats.pendingQuestions;
    document.getElementById('approved-questions').textContent = stats.approvedQuestions;
    document.getElementById('rejected-questions').textContent = stats.rejectedQuestions;
    document.getElementById('approval-rate').textContent = stats.approvalRate + '%';
}

// Utility Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
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
window.AdminQuestions = {
    showNotification,
    loadPendingQuestions,
    updateStats
};