// Teacher Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all dashboard functionality
    initializeDashboard();
    initializeModals();
    initializeQuickActions();
    initializeData();
    initializeClock();
    initializeLogout();
});

function initializeDashboard() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Load initial data
    loadDashboardData();
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
        
        // Close modal when clicking outside
        addQuestionModal.addEventListener('click', (e) => {
            if (e.target === addQuestionModal) {
                addQuestionModal.classList.remove('modal-open');
                resetQuestionForm();
            }
        });
    }
    
    // Contact Admin Modal
    const contactAdminBtn = document.getElementById('contact-admin-btn');
    const contactAdminModal = document.getElementById('contact-admin-modal');
    const cancelAdminMessageBtn = document.getElementById('cancel-admin-message');
    
    if (contactAdminBtn && contactAdminModal) {
        contactAdminBtn.addEventListener('click', () => {
            contactAdminModal.classList.add('modal-open');
        });
        
        cancelAdminMessageBtn.addEventListener('click', () => {
            contactAdminModal.classList.remove('modal-open');
            resetAdminMessageForm();
        });
        
        // Close modal when clicking outside
        contactAdminModal.addEventListener('click', (e) => {
            if (e.target === contactAdminModal) {
                contactAdminModal.classList.remove('modal-open');
                resetAdminMessageForm();
            }
        });
    }
}

function initializeQuickActions() {
    // Quick action buttons
    const createQuizBtn = document.getElementById('create-quiz-btn');
    const manageQuestionsBtn = document.getElementById('manage-questions-btn');
    const viewResultsBtn = document.getElementById('view-results-btn');
    
    if (createQuizBtn) {
        createQuizBtn.addEventListener('click', () => {
            window.location.href = 'teacher_quizzes.html';
        });
    }
    
    if (manageQuestionsBtn) {
        manageQuestionsBtn.addEventListener('click', () => {
            window.location.href = 'teacher_questions.html';
        });
    }
    
    if (viewResultsBtn) {
        viewResultsBtn.addEventListener('click', () => {
            window.location.href = 'teacher_results.html';
        });
    }
}

function initializeData() {
    // Initialize form submissions
    initializeFormSubmissions();
    
    // Load sample data
    loadSampleData();
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
    
    // Contact Admin Form
    const contactAdminForm = document.getElementById('contact-admin-form');
    if (contactAdminForm) {
        contactAdminForm.addEventListener('submit', function(e) {
            e.preventDefault();
            sendAdminMessage();
        });
    }
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
        
        // Update dashboard data
        updateDashboardStats();
        loadSampleData();
        
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
    // Get existing questions from localStorage
    const questions = JSON.parse(localStorage.getItem('teacher_questions') || '[]');
    
    // Add new question with ID
    questionData.id = Date.now().toString();
    questions.push(questionData);
    
    // Save back to localStorage
    localStorage.setItem('teacher_questions', JSON.stringify(questions));
    
    return questionData.id;
}

function sendAdminMessage() {
    const form = document.getElementById('contact-admin-form');
    const submitBtn = document.getElementById('send-admin-message');
    
    const messageData = {
        subject: document.getElementById('message-subject').value,
        message: document.getElementById('admin-message').value,
        timestamp: new Date().toISOString(),
        status: 'sent'
    };
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simulate sending message
    setTimeout(() => {
        // Save message to localStorage (for demo purposes)
        const messages = JSON.parse(localStorage.getItem('admin_messages') || '[]');
        messages.push(messageData);
        localStorage.setItem('admin_messages', JSON.stringify(messages));
        
        // Show success message
        showNotification('Message sent to admin successfully!', 'success');
        
        // Close modal and reset form
        document.getElementById('contact-admin-modal').classList.remove('modal-open');
        resetAdminMessageForm();
        
        // Reset button state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }, 1500);
}

function resetQuestionForm() {
    const form = document.getElementById('add-question-form');
    if (form) {
        form.reset();
        // Set default values
        document.getElementById('question-time').value = '60';
        document.getElementById('question-marks').value = '5';
        document.getElementById('question-difficulty').value = 'medium';
    }
}

function resetAdminMessageForm() {
    const form = document.getElementById('contact-admin-form');
    if (form) {
        form.reset();
    }
}

function loadDashboardData() {
    // Load questions from localStorage
    const questions = JSON.parse(localStorage.getItem('teacher_questions') || '[]');
    
    // Update stats
    updateQuestionStats(questions);
}

function updateQuestionStats(questions) {
    const totalQuestions = questions.length;
    const approvedQuestions = questions.filter(q => q.status === 'approved').length;
    const pendingQuestions = questions.filter(q => q.status === 'pending').length;
    const rejectedQuestions = questions.filter(q => q.status === 'rejected').length;
    
    // Update display
    document.getElementById('total-questions').textContent = totalQuestions;
    document.getElementById('approved-questions').textContent = approvedQuestions;
    document.getElementById('pending-questions').textContent = pendingQuestions;
    document.getElementById('rejected-questions').textContent = rejectedQuestions;
    document.getElementById('total-questions-side').textContent = totalQuestions;
    
    // Update questions status
    const questionsStatus = document.getElementById('questions-status');
    if (pendingQuestions > 0) {
        questionsStatus.textContent = `${pendingQuestions} pending approval`;
        questionsStatus.className = 'stat-desc text-warning';
    } else {
        questionsStatus.textContent = 'All questions approved';
        questionsStatus.className = 'stat-desc text-success';
    }
}

function loadSampleData() {
    loadPendingApprovals();
    loadRecentActivity();
    loadUpcomingQuizzes();
}

function loadPendingApprovals() {
    const pendingList = document.getElementById('pending-approvals-list');
    const pendingCount = document.getElementById('pending-count');
    
    if (!pendingList) return;
    
    // Get pending questions from localStorage
    const questions = JSON.parse(localStorage.getItem('teacher_questions') || '[]');
    const pendingQuestions = questions.filter(q => q.status === 'pending');
    
    // Update count
    if (pendingCount) {
        pendingCount.textContent = `${pendingQuestions.length} pending`;
    }
    
    // Clear existing list
    pendingList.innerHTML = '';
    
    if (pendingQuestions.length === 0) {
        pendingList.innerHTML = `
            <div class="text-center py-4 text-gray-500">
                <i class="fa-solid fa-check-circle text-2xl mb-2 text-success"></i>
                <p>No pending approvals</p>
            </div>
        `;
        return;
    }
    
    // Add pending items
    pendingQuestions.slice(0, 3).forEach(question => {
        const pendingItem = document.createElement('div');
        pendingItem.className = 'pending-item';
        
        pendingItem.innerHTML = `
            <div class="flex-1">
                <div class="font-medium truncate">${question.question.substring(0, 60)}...</div>
                <div class="text-sm text-gray-500">
                    ${question.subject} • ${question.difficulty} • ${question.timeLimit}s
                </div>
            </div>
            <div class="pending-status">Pending</div>
        `;
        
        pendingList.appendChild(pendingItem);
    });
    
    // Show "View All" if there are more than 3
    if (pendingQuestions.length > 3) {
        const viewAllBtn = document.createElement('button');
        viewAllBtn.className = 'btn btn-sm btn-outline btn-block mt-4';
        viewAllBtn.innerHTML = `<i class="fa-solid fa-eye mr-2"></i>View All (${pendingQuestions.length})`;
        viewAllBtn.addEventListener('click', () => {
            window.location.href = 'teacher_questions.html';
        });
        pendingList.appendChild(viewAllBtn);
    }
}

function loadRecentActivity() {
    const activityList = document.getElementById('recent-activity-list');
    
    if (!activityList) return;
    
    // Sample activity data
    const activities = [
        {
            icon: 'fa-question-circle',
            color: 'text-primary',
            bgColor: 'bg-primary/10',
            text: 'New question added: Mathematics - Algebra',
            time: '2 hours ago'
        },
        {
            icon: 'fa-check-circle',
            color: 'text-success',
            bgColor: 'bg-success/10',
            text: 'Question approved by admin: Physics - Mechanics',
            time: '1 day ago'
        },
        {
            icon: 'fa-chart-line',
            color: 'text-info',
            bgColor: 'bg-info/10',
            text: 'Quiz results published: Chemistry Basics',
            time: '2 days ago'
        },
        {
            icon: 'fa-users',
            color: 'text-accent',
            bgColor: 'bg-accent/10',
            text: '15 new students joined your course',
            time: '3 days ago'
        }
    ];
    
    // Clear existing list
    activityList.innerHTML = '';
    
    // Add activity items
    activities.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        
        activityItem.innerHTML = `
            <div class="activity-icon ${activity.bgColor}">
                <i class="fa-solid ${activity.icon} ${activity.color}"></i>
            </div>
            <div class="activity-content">
                <div class="font-medium">${activity.text}</div>
                <div class="activity-time">${activity.time}</div>
            </div>
        `;
        
        activityList.appendChild(activityItem);
    });
}

function loadUpcomingQuizzes() {
    const quizzesList = document.getElementById('upcoming-quizzes-list');
    
    if (!quizzesList) return;
    
    // Sample quiz data
    const quizzes = [
        {
            title: 'Mathematics Midterm',
            date: '2025-02-15',
            time: '10:00 AM',
            duration: '60 min',
            students: 45,
            status: 'scheduled'
        },
        {
            title: 'Physics Quiz - Unit 2',
            date: '2025-02-18',
            time: '02:00 PM',
            duration: '45 min',
            students: 38,
            status: 'scheduled'
        },
        {
            title: 'Chemistry Basics',
            date: '2025-02-20',
            time: '11:30 AM',
            duration: '30 min',
            students: 52,
            status: 'draft'
        }
    ];
    
    // Clear existing list
    quizzesList.innerHTML = '';
    
    // Add quiz items
    quizzes.forEach(quiz => {
        const quizCard = document.createElement('div');
        quizCard.className = 'quiz-card';
        
        const statusClass = quiz.status === 'scheduled' ? 'badge-success' : 'badge-warning';
        const statusText = quiz.status === 'scheduled' ? 'Scheduled' : 'Draft';
        
        quizCard.innerHTML = `
            <div class="flex justify-between items-start mb-2">
                <h4 class="font-semibold">${quiz.title}</h4>
                <span class="quiz-status ${statusClass}">${statusText}</span>
            </div>
            <div class="quiz-date mb-2">
                <i class="fa-regular fa-calendar mr-1"></i>
                ${quiz.date} at ${quiz.time}
            </div>
            <div class="flex justify-between text-sm">
                <span><i class="fa-regular fa-clock mr-1"></i> ${quiz.duration}</span>
                <span><i class="fa-solid fa-users mr-1"></i> ${quiz.students} students</span>
            </div>
        `;
        
        quizzesList.appendChild(quizCard);
    });
}

function updateDashboardStats() {
    // Update the main stats cards with latest data
    const questions = JSON.parse(localStorage.getItem('teacher_questions') || '[]');
    
    // Update question counts
    const totalQuestions = questions.length;
    const approvedQuestions = questions.filter(q => q.status === 'approved').length;
    
    document.getElementById('total-questions').textContent = totalQuestions;
    
    // Update notification count
    const pendingCount = questions.filter(q => q.status === 'pending').length;
    const notificationCount = document.getElementById('notification-count');
    if (notificationCount) {
        notificationCount.textContent = pendingCount > 0 ? pendingCount : '';
    }
}

function initializeClock() {
    const clockElement = document.getElementById('navbar-clock');
    
    if (clockElement) {
        function updateClock() {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', { 
                hour12: true, 
                hour: '2-digit', 
                minute: '2-digit',
                second: '2-digit'
            });
            clockElement.innerHTML = `<i class="fa-regular fa-clock mr-1"></i> ${timeString}`;
        }
        
        updateClock();
        setInterval(updateClock, 1000);
    }
}

function initializeLogout() {
    const logoutBtn = document.getElementById('logout-btn');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (confirm('Are you sure you want to logout?')) {
                showNotification('Logging out...', 'info');
                
                // Simulate logout process
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            }
        });
    }
}

// Utility Functions
function showNotification(message, type = 'info', duration = 3000) {
    // Create notification element
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
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after duration
    setTimeout(() => {
        notification.remove();
    }, duration);
}

// Export functions for potential use in other files
window.TeacherDashboard = {
    showNotification,
    updateDashboardStats,
    loadSampleData
};

// Initialize when page loads
window.addEventListener('load', initializeDashboard);