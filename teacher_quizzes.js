// Create Quiz JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeQuizzesPage();
    initializeFormSubmissions();
    loadQuestionBank();
    loadQuizzesTable();
});

function initializeQuizzesPage() {
    // Set default datetime values
    const now = new Date();
    const startTime = new Date(now.getTime() + 24 * 60 * 60 * 1000); // Tomorrow
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // 1 hour later
    
    document.getElementById('quiz-start-time').value = formatDateTimeLocal(startTime);
    document.getElementById('quiz-end-time').value = formatDateTimeLocal(endTime);
}

function initializeFormSubmissions() {
    // Quiz Form
    const quizForm = document.getElementById('quiz-form');
    if (quizForm) {
        quizForm.addEventListener('submit', function(e) {
            e.preventDefault();
            createQuiz();
        });
    }
    
    // Save Draft Button
    const saveDraftBtn = document.getElementById('save-draft-btn');
    if (saveDraftBtn) {
        saveDraftBtn.addEventListener('click', function() {
            saveQuizAsDraft();
        });
    }
}

let selectedQuestions = [];

function loadQuestionBank() {
    const questionBankList = document.getElementById('question-bank-list');
    if (!questionBankList) return;
    
    // Get approved questions from localStorage
    const questions = JSON.parse(localStorage.getItem('teacher_questions') || '[]');
    const approvedQuestions = questions.filter(q => q.status === 'approved');
    
    // Clear existing list
    questionBankList.innerHTML = '';
    
    if (approvedQuestions.length === 0) {
        questionBankList.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-question-circle"></i>
                <p class="text-sm">No approved questions found</p>
                <p class="text-xs mt-1">Add questions in Manage Questions page</p>
            </div>
        `;
        return;
    }
    
    // Add questions to bank
    approvedQuestions.forEach(question => {
        const questionItem = document.createElement('div');
        questionItem.className = 'question-item';
        questionItem.setAttribute('data-id', question.id);
        
        questionItem.innerHTML = `
            <input type="checkbox" class="checkbox checkbox-primary question-checkbox">
            <div class="question-content">
                <div class="font-medium text-sm">${question.question.substring(0, 80)}...</div>
                <div class="question-meta">
                    ${getSubjectName(question.subject)} • ${question.difficulty} • ${question.marks} marks
                </div>
            </div>
        `;
        
        questionBankList.appendChild(questionItem);
    });
    
    // Add event listeners to checkboxes
    addQuestionSelectionListeners();
}

function addQuestionSelectionListeners() {
    document.querySelectorAll('.question-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const questionItem = this.closest('.question-item');
            const questionId = questionItem.getAttribute('data-id');
            
            if (this.checked) {
                addQuestionToQuiz(questionId, questionItem);
            } else {
                removeQuestionFromQuiz(questionId);
            }
            
            updateSelectedQuestionsList();
            updateSelectedCount();
        });
    });
}

function addQuestionToQuiz(questionId, questionItem) {
    const questions = JSON.parse(localStorage.getItem('teacher_questions') || '[]');
    const question = questions.find(q => q.id === questionId);
    
    if (question && !selectedQuestions.find(q => q.id === questionId)) {
        selectedQuestions.push(question);
        questionItem.classList.add('selected');
    }
}

function removeQuestionFromQuiz(questionId) {
    selectedQuestions = selectedQuestions.filter(q => q.id !== questionId);
    
    // Update UI
    const questionItem = document.querySelector(`.question-item[data-id="${questionId}"]`);
    if (questionItem) {
        questionItem.classList.remove('selected');
        const checkbox = questionItem.querySelector('.question-checkbox');
        if (checkbox) checkbox.checked = false;
    }
}

function updateSelectedQuestionsList() {
    const selectedList = document.getElementById('selected-questions-list');
    if (!selectedList) return;
    
    // Clear existing list
    selectedList.innerHTML = '';
    
    if (selectedQuestions.length === 0) {
        selectedList.innerHTML = `
            <div class="empty-state py-4">
                <i class="fa-solid fa-list-check"></i>
                <p class="text-sm">No questions selected</p>
            </div>
        `;
        return;
    }
    
    // Add selected questions
    selectedQuestions.forEach(question => {
        const selectedItem = document.createElement('div');
        selectedItem.className = 'selected-question';
        
        selectedItem.innerHTML = `
            <div class="flex-1">
                <div class="font-medium text-sm">${question.question.substring(0, 60)}...</div>
                <div class="text-xs text-gray-500">${question.marks} marks</div>
            </div>
            <button class="btn btn-sm btn-ghost btn-remove" data-id="${question.id}">
                <i class="fa-solid fa-times"></i>
            </button>
        `;
        
        selectedList.appendChild(selectedItem);
    });
    
    // Add remove event listeners
    document.querySelectorAll('.btn-remove').forEach(btn => {
        btn.addEventListener('click', function() {
            const questionId = this.getAttribute('data-id');
            removeQuestionFromQuiz(questionId);
            updateSelectedQuestionsList();
            updateSelectedCount();
        });
    });
}

function updateSelectedCount() {
    const selectedCount = document.getElementById('selected-count');
    if (selectedCount) {
        selectedCount.textContent = selectedQuestions.length;
    }
}

function createQuiz() {
    const form = document.getElementById('quiz-form');
    const submitBtn = document.getElementById('create-quiz-btn');
    
    // Validate form
    if (!validateQuizForm()) {
        return;
    }
    
    // Validate selected questions
    if (selectedQuestions.length === 0) {
        showNotification('Please select at least one question for the quiz', 'error');
        return;
    }
    
    // Get form data
    const quizData = {
        title: document.getElementById('quiz-title').value,
        subject: document.getElementById('quiz-subject').value,
        difficulty: document.getElementById('quiz-difficulty').value,
        startTime: document.getElementById('quiz-start-time').value,
        endTime: document.getElementById('quiz-end-time').value,
        duration: document.getElementById('quiz-duration').value,
        totalMarks: document.getElementById('quiz-total-marks').value,
        passingMarks: document.getElementById('quiz-passing-marks').value,
        instructions: document.getElementById('quiz-instructions').value,
        shuffleQuestions: document.getElementById('quiz-shuffle-questions').checked,
        showResults: document.getElementById('quiz-show-results').checked,
        questions: selectedQuestions,
        status: 'scheduled',
        createdAt: new Date().toISOString(),
        participants: 0
    };
    
    // Calculate total marks from selected questions
    const calculatedTotalMarks = selectedQuestions.reduce((total, question) => total + parseInt(question.marks), 0);
    quizData.totalMarks = calculatedTotalMarks;
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Save quiz to localStorage
        saveQuiz(quizData);
        
        // Show success message
        showNotification('Quiz created successfully!', 'success');
        
        // Reset form
        resetQuizForm();
        
        // Reload quizzes table
        loadQuizzesTable();
        
        // Reset button state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }, 2000);
}

function saveQuizAsDraft() {
    const form = document.getElementById('quiz-form');
    const saveBtn = document.getElementById('save-draft-btn');
    
    // Get form data
    const quizData = {
        title: document.getElementById('quiz-title').value || 'Untitled Quiz',
        subject: document.getElementById('quiz-subject').value,
        difficulty: document.getElementById('quiz-difficulty').value,
        startTime: document.getElementById('quiz-start-time').value,
        endTime: document.getElementById('quiz-end-time').value,
        duration: document.getElementById('quiz-duration').value,
        totalMarks: document.getElementById('quiz-total-marks').value,
        passingMarks: document.getElementById('quiz-passing-marks').value,
        instructions: document.getElementById('quiz-instructions').value,
        shuffleQuestions: document.getElementById('quiz-shuffle-questions').checked,
        showResults: document.getElementById('quiz-show-results').checked,
        questions: selectedQuestions,
        status: 'draft',
        createdAt: new Date().toISOString(),
        participants: 0
    };
    
    // Show loading state
    saveBtn.classList.add('loading');
    saveBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Save quiz to localStorage
        saveQuiz(quizData);
        
        // Show success message
        showNotification('Quiz saved as draft!', 'success');
        
        // Reload quizzes table
        loadQuizzesTable();
        
        // Reset button state
        saveBtn.classList.remove('loading');
        saveBtn.disabled = false;
    }, 1500);
}

function validateQuizForm() {
    const title = document.getElementById('quiz-title').value;
    const subject = document.getElementById('quiz-subject').value;
    const startTime = document.getElementById('quiz-start-time').value;
    const endTime = document.getElementById('quiz-end-time').value;
    
    if (!title.trim()) {
        showNotification('Please enter quiz title', 'error');
        return false;
    }
    
    if (!subject) {
        showNotification('Please select a subject', 'error');
        return false;
    }
    
    if (!startTime || !endTime) {
        showNotification('Please set start and end time', 'error');
        return false;
    }
    
    const start = new Date(startTime);
    const end = new Date(endTime);
    
    if (end <= start) {
        showNotification('End time must be after start time', 'error');
        return false;
    }
    
    return true;
}

function saveQuiz(quizData) {
    const quizzes = JSON.parse(localStorage.getItem('teacher_quizzes') || '[]');
    quizData.id = Date.now().toString();
    quizzes.push(quizData);
    localStorage.setItem('teacher_quizzes', JSON.stringify(quizzes));
    return quizData.id;
}

function resetQuizForm() {
    const form = document.getElementById('quiz-form');
    if (form) {
        form.reset();
        
        // Reset selected questions
        selectedQuestions = [];
        updateSelectedQuestionsList();
        updateSelectedCount();
        
        // Reset question bank checkboxes
        document.querySelectorAll('.question-checkbox').forEach(checkbox => {
            checkbox.checked = false;
        });
        document.querySelectorAll('.question-item').forEach(item => {
            item.classList.remove('selected');
        });
        
        // Set default datetime values
        const now = new Date();
        const startTime = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);
        
        document.getElementById('quiz-start-time').value = formatDateTimeLocal(startTime);
        document.getElementById('quiz-end-time').value = formatDateTimeLocal(endTime);
        document.getElementById('quiz-duration').value = '30';
        document.getElementById('quiz-total-marks').value = '50';
        document.getElementById('quiz-passing-marks').value = '25';
        document.getElementById('quiz-difficulty').value = 'medium';
    }
}

function loadQuizzesTable() {
    const tableBody = document.getElementById('quizzes-table-body');
    if (!tableBody) return;
    
    // Get quizzes from localStorage
    const quizzes = JSON.parse(localStorage.getItem('teacher_quizzes') || '[]');
    
    // Clear existing table
    tableBody.innerHTML = '';
    
    if (quizzes.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center py-8">
                    <div class="empty-state">
                        <i class="fa-solid fa-feather-pointed"></i>
                        <h3 class="text-lg font-semibold mb-2">No Quizzes Found</h3>
                        <p class="text-gray-600">Create your first quiz to get started</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }
    
    // Add quizzes to table
    quizzes.forEach(quiz => {
        const row = document.createElement('tr');
        
        const statusClass = quiz.status === 'scheduled' ? 'status-active' :
                          quiz.status === 'draft' ? 'status-draft' : 'status-completed';
        
        const statusText = quiz.status === 'scheduled' ? 'Scheduled' :
                         quiz.status === 'draft' ? 'Draft' : 'Completed';
        
        row.innerHTML = `
            <td>
                <div class="font-semibold">${quiz.title}</div>
                <div class="text-sm text-gray-500">${quiz.questions.length} questions</div>
            </td>
            <td>
                <span class="badge badge-outline">${getSubjectName(quiz.subject)}</span>
            </td>
            <td>
                <span class="status-badge ${statusClass}">${statusText}</span>
            </td>
            <td>
                <div class="text-sm">${formatDate(quiz.startTime)}</div>
                <div class="text-xs text-gray-500">${formatTime(quiz.startTime)}</div>
            </td>
            <td>
                <div class="flex items-center gap-2">
                    <i class="fa-solid fa-users text-gray-500"></i>
                    <span>${quiz.participants}</span>
                </div>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-outline btn-primary view-quiz" data-id="${quiz.id}">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-outline btn-warning edit-quiz" data-id="${quiz.id}">
                        <i class="fa-solid fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline btn-error delete-quiz" data-id="${quiz.id}">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Add event listeners to action buttons
    addQuizEventListeners();
}

function addQuizEventListeners() {
    // View buttons
    document.querySelectorAll('.view-quiz').forEach(btn => {
        btn.addEventListener('click', function() {
            const quizId = this.getAttribute('data-id');
            viewQuiz(quizId);
        });
    });
    
    // Edit buttons
    document.querySelectorAll('.edit-quiz').forEach(btn => {
        btn.addEventListener('click', function() {
            const quizId = this.getAttribute('data-id');
            editQuiz(quizId);
        });
    });
    
    // Delete buttons
    document.querySelectorAll('.delete-quiz').forEach(btn => {
        btn.addEventListener('click', function() {
            const quizId = this.getAttribute('data-id');
            deleteQuiz(quizId);
        });
    });
}

function viewQuiz(quizId) {
    // For demo purposes
    showNotification('View quiz feature will be implemented soon!', 'info');
}

function editQuiz(quizId) {
    // For demo purposes
    showNotification('Edit quiz feature will be implemented soon!', 'info');
}

function deleteQuiz(quizId) {
    if (!confirm('Are you sure you want to delete this quiz? This action cannot be undone.')) {
        return;
    }
    
    // Delete quiz from localStorage
    const quizzes = JSON.parse(localStorage.getItem('teacher_quizzes') || '[]');
    const filteredQuizzes = quizzes.filter(q => q.id !== quizId);
    
    localStorage.setItem('teacher_quizzes', JSON.stringify(filteredQuizzes));
    
    showNotification('Quiz deleted successfully!', 'success');
    
    // Reload table
    loadQuizzesTable();
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

function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

function formatDateTimeLocal(date) {
    return date.toISOString().slice(0, 16);
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
window.TeacherQuizzes = {
    showNotification,
    loadQuizzesTable
};