// Manage Questions JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeQuestionsPage();
    initializeModals();
    initializeFormSubmissions();
    loadQuestionsTable();
});

function initializeQuestionsPage() {
    // Set current year if needed
    updateQuestionStats();
}

function initializeModals() {
    // Add Question Modal
    const addQuestionBtn = document.getElementById('add-question-btn');
    const addQuestionModal = document.getElementById('add-question-modal');
    const cancelQuestionBtn = document.getElementById('cancel-question');
    
    if (addQuestionBtn && addQuestionModal) {
        addQuestionBtn.addEventListener('click', () => {
            addQuestionModal.classList.add('modal-open');
        });
        
        cancelQuestionBtn.addEventListener('click', () => {
            addQuestionModal.classList.remove('modal-open');
            resetQuestionForm();
        });
        
        addQuestionModal.addEventListener('click', (e) => {
            if (e.target === addQuestionModal) {
                addQuestionModal.classList.remove('modal-open');
                resetQuestionForm();
            }
        });
    }
    
    // Edit Question Modal
    const editQuestionModal = document.getElementById('edit-question-modal');
    const cancelEditQuestionBtn = document.getElementById('cancel-edit-question');
    
    if (cancelEditQuestionBtn && editQuestionModal) {
        cancelEditQuestionBtn.addEventListener('click', () => {
            editQuestionModal.classList.remove('modal-open');
        });
        
        editQuestionModal.addEventListener('click', (e) => {
            if (e.target === editQuestionModal) {
                editQuestionModal.classList.remove('modal-open');
            }
        });
    }
}

function initializeFormSubmissions() {
    // Add Question Form
    const addQuestionForm = document.getElementById('add-question-form');
    if (addQuestionForm) {
        addQuestionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitNewQuestion();
        });
    }
    
    // Edit Question Form
    const editQuestionForm = document.getElementById('edit-question-form');
    if (editQuestionForm) {
        editQuestionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updateQuestion();
        });
    }
}

function loadQuestionsTable() {
    const tableBody = document.getElementById('questions-table-body');
    if (!tableBody) return;
    
    // Get questions from localStorage
    const questions = JSON.parse(localStorage.getItem('teacher_questions') || '[]');
    
    // Clear existing table
    tableBody.innerHTML = '';
    
    if (questions.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center py-8">
                    <div class="empty-state">
                        <i class="fa-solid fa-question-circle"></i>
                        <h3 class="text-lg font-semibold mb-2">No Questions Found</h3>
                        <p class="text-gray-600 mb-4">Start by adding your first question</p>
                        <button class="btn btn-primary" id="add-first-question">
                            <i class="fa-solid fa-plus mr-2"></i>
                            Add First Question
                        </button>
                    </div>
                </td>
            </tr>
        `;
        
        document.getElementById('add-first-question')?.addEventListener('click', () => {
            document.getElementById('add-question-modal').classList.add('modal-open');
        });
        return;
    }
    
    // Add questions to table
    questions.forEach(question => {
        const row = document.createElement('tr');
        
        const statusClass = question.status === 'approved' ? 'status-approved' :
                          question.status === 'pending' ? 'status-pending' : 'status-rejected';
        
        const statusText = question.status === 'approved' ? 'Approved' :
                         question.status === 'pending' ? 'Pending' : 'Rejected';
        
        const difficultyClass = `difficulty-${question.difficulty}`;
        
        row.innerHTML = `
            <td>
                <div class="question-text" title="${question.question}">
                    ${question.question.substring(0, 80)}...
                </div>
            </td>
            <td>
                <span class="badge badge-outline">${getSubjectName(question.subject)}</span>
            </td>
            <td>
                <span class="badge ${difficultyClass}">${question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}</span>
            </td>
            <td>
                <span class="status-badge ${statusClass}">${statusText}</span>
            </td>
            <td>
                <div class="text-sm">${formatDate(question.createdAt)}</div>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-outline btn-primary edit-question" data-id="${question.id}">
                        <i class="fa-solid fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline btn-error delete-question" data-id="${question.id}">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                    ${question.status === 'pending' ? `
                    <button class="btn btn-sm btn-outline btn-warning view-feedback" data-id="${question.id}">
                        <i class="fa-solid fa-comment"></i>
                    </button>
                    ` : ''}
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Add event listeners to action buttons
    addQuestionEventListeners();
}

function addQuestionEventListeners() {
    // Edit buttons
    document.querySelectorAll('.edit-question').forEach(btn => {
        btn.addEventListener('click', function() {
            const questionId = this.getAttribute('data-id');
            openEditModal(questionId);
        });
    });
    
    // Delete buttons
    document.querySelectorAll('.delete-question').forEach(btn => {
        btn.addEventListener('click', function() {
            const questionId = this.getAttribute('data-id');
            deleteQuestion(questionId);
        });
    });
    
    // View feedback buttons
    document.querySelectorAll('.view-feedback').forEach(btn => {
        btn.addEventListener('click', function() {
            const questionId = this.getAttribute('data-id');
            viewFeedback(questionId);
        });
    });
}

function openEditModal(questionId) {
    const questions = JSON.parse(localStorage.getItem('teacher_questions') || '[]');
    const question = questions.find(q => q.id === questionId);
    
    if (!question) {
        showNotification('Question not found!', 'error');
        return;
    }
    
    // Populate edit form
    document.getElementById('edit-question-id').value = question.id;
    document.getElementById('edit-question-subject').value = question.subject;
    document.getElementById('edit-question-difficulty').value = question.difficulty;
    document.getElementById('edit-question-text').value = question.question;
    document.getElementById('edit-option-a').value = question.options.A;
    document.getElementById('edit-option-b').value = question.options.B;
    document.getElementById('edit-option-c').value = question.options.C;
    document.getElementById('edit-option-d').value = question.options.D;
    document.querySelector(`input[name="edit-correct-answer"][value="${question.correctAnswer}"]`).checked = true;
    document.getElementById('edit-question-explanation').value = question.explanation || '';
    document.getElementById('edit-question-time').value = question.timeLimit;
    document.getElementById('edit-question-marks').value = question.marks;
    
    // Open modal
    document.getElementById('edit-question-modal').classList.add('modal-open');
}

function updateQuestion() {
    const questionId = document.getElementById('edit-question-id').value;
    const submitBtn = document.getElementById('update-question');
    
    const questionData = {
        subject: document.getElementById('edit-question-subject').value,
        difficulty: document.getElementById('edit-question-difficulty').value,
        question: document.getElementById('edit-question-text').value,
        options: {
            A: document.getElementById('edit-option-a').value,
            B: document.getElementById('edit-option-b').value,
            C: document.getElementById('edit-option-c').value,
            D: document.getElementById('edit-option-d').value
        },
        correctAnswer: document.querySelector('input[name="edit-correct-answer"]:checked').value,
        explanation: document.getElementById('edit-question-explanation').value,
        timeLimit: document.getElementById('edit-question-time').value,
        marks: document.getElementById('edit-question-marks').value,
        updatedAt: new Date().toISOString()
    };
    
    // Validate form
    if (!validateQuestionForm(questionData)) {
        return;
    }
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Update question in localStorage
        const questions = JSON.parse(localStorage.getItem('teacher_questions') || '[]');
        const questionIndex = questions.findIndex(q => q.id === questionId);
        
        if (questionIndex !== -1) {
            // Keep original status and creation date
            questionData.status = questions[questionIndex].status;
            questionData.createdAt = questions[questionIndex].createdAt;
            questionData.id = questionId;
            
            questions[questionIndex] = questionData;
            localStorage.setItem('teacher_questions', JSON.stringify(questions));
            
            showNotification('Question updated successfully!', 'success');
            
            // Close modal
            document.getElementById('edit-question-modal').classList.remove('modal-open');
            
            // Reload table and stats
            loadQuestionsTable();
            updateQuestionStats();
        } else {
            showNotification('Question not found!', 'error');
        }
        
        // Reset button state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }, 1500);
}

function deleteQuestion(questionId) {
    if (!confirm('Are you sure you want to delete this question? This action cannot be undone.')) {
        return;
    }
    
    // Delete question from localStorage
    const questions = JSON.parse(localStorage.getItem('teacher_questions') || '[]');
    const filteredQuestions = questions.filter(q => q.id !== questionId);
    
    localStorage.setItem('teacher_questions', JSON.stringify(filteredQuestions));
    
    showNotification('Question deleted successfully!', 'success');
    
    // Reload table and stats
    loadQuestionsTable();
    updateQuestionStats();
}

function viewFeedback(questionId) {
    // For demo purposes, show a simple alert
    alert('Feedback feature will be implemented soon!');
}

function submitNewQuestion() {
    const form = document.getElementById('add-question-form');
    const submitBtn = document.getElementById('save-question');
    
    // Get form data
    const questionData = {
        subject: document.getElementById('question-subject').value,
        difficulty: document.getElementById('question-difficulty').value,
        question: document.getElementById('question-text').value,
        options: {
            A: document.getElementById('option-a').value,
            B: document.getElementById('option-b').value,
            C: document.getElementById('option-c').value,
            D: document.getElementById('option-d').value
        },
        correctAnswer: document.querySelector('input[name="correct-answer"]:checked').value,
        explanation: document.getElementById('question-explanation').value,
        timeLimit: document.getElementById('question-time').value,
        marks: document.getElementById('question-marks').value,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    // Validate form
    if (!validateQuestionForm(questionData)) {
        return;
    }
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Save question to localStorage
        saveQuestion(questionData);
        
        // Show success message
        showNotification('Question submitted for admin approval!', 'success');
        
        // Close modal and reset form
        document.getElementById('add-question-modal').classList.remove('modal-open');
        resetQuestionForm();
        
        // Reload table and stats
        loadQuestionsTable();
        updateQuestionStats();
        
        // Reset button state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }, 2000);
}

function validateQuestionForm(data) {
    if (!data.subject) {
        showNotification('Please select a subject', 'error');
        return false;
    }
    
    if (!data.question.trim()) {
        showNotification('Please enter question text', 'error');
        return false;
    }
    
    if (!data.options.A.trim() || !data.options.B.trim() || 
        !data.options.C.trim() || !data.options.D.trim()) {
        showNotification('Please fill all options', 'error');
        return false;
    }
    
    if (!data.correctAnswer) {
        showNotification('Please select the correct answer', 'error');
        return false;
    }
    
    return true;
}

function saveQuestion(questionData) {
    const questions = JSON.parse(localStorage.getItem('teacher_questions') || '[]');
    questionData.id = Date.now().toString();
    questions.push(questionData);
    localStorage.setItem('teacher_questions', JSON.stringify(questions));
    return questionData.id;
}

function resetQuestionForm() {
    const form = document.getElementById('add-question-form');
    if (form) {
        form.reset();
        document.getElementById('question-time').value = '60';
        document.getElementById('question-marks').value = '5';
        document.getElementById('question-difficulty').value = 'medium';
    }
}

function updateQuestionStats() {
    const questions = JSON.parse(localStorage.getItem('teacher_questions') || '[]');
    const totalQuestions = questions.length;
    const approvedQuestions = questions.filter(q => q.status === 'approved').length;
    const pendingQuestions = questions.filter(q => q.status === 'pending').length;
    const rejectedQuestions = questions.filter(q => q.status === 'rejected').length;
    
    // Update display
    const totalEl = document.getElementById('total-questions');
    const approvedEl = document.getElementById('approved-questions');
    const pendingEl = document.getElementById('pending-questions');
    const rejectedEl = document.getElementById('rejected-questions');
    
    if (totalEl) totalEl.textContent = totalQuestions;
    if (approvedEl) approvedEl.textContent = approvedQuestions;
    if (pendingEl) pendingEl.textContent = pendingQuestions;
    if (rejectedEl) rejectedEl.textContent = rejectedQuestions;
}

// Utility Functions
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
window.TeacherQuestions = {
    showNotification,
    updateQuestionStats,
    loadQuestionsTable
};