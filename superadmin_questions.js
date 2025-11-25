// Super Admin Questions Management JavaScript

let allQuestions = [];
let currentPage = 1;
const questionsPerPage = 5;
let filteredQuestions = [];
let selectedQuestions = new Set();

document.addEventListener('DOMContentLoaded', function() {
    initializeClock();
    loadQuestionsData();
    setupEventListeners();
    document.getElementById('current-year').textContent = new Date().getFullYear();
});

function initializeClock() {
    const clockElement = document.getElementById('navbar-clock');
    
    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit',
            hour12: true 
        });
        const dateString = now.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        
        clockElement.innerHTML = `<i class="fa-regular fa-clock mr-1"></i> ${dateString} | ${timeString}`;
    }
    
    updateClock();
    setInterval(updateClock, 1000);
}

function loadQuestionsData() {
    showLoading();
    
    setTimeout(() => {
        allQuestions = [
            {
                id: 1,
                question: "What is the time complexity of binary search?",
                options: [
                    { text: "O(n)", correct: false },
                    { text: "O(log n)", correct: true },
                    { text: "O(n log n)", correct: false },
                    { text: "O(1)", correct: false }
                ],
                explanation: "Binary search divides the search space in half each time, resulting in logarithmic time complexity.",
                department: "cse",
                subject: "Algorithms",
                difficulty: "medium",
                marks: 5,
                timeLimit: 60,
                status: "pending",
                teacher: {
                    id: 2,
                    name: "Dr. Rahman Ahmed",
                    avatar: "RA"
                },
                createdAt: "2024-01-15 10:30:00",
                stats: {
                    usage: 0,
                    successRate: 0,
                    avgTime: 0
                }
            },
            {
                id: 2,
                question: "Which data structure uses LIFO principle?",
                options: [
                    { text: "Queue", correct: false },
                    { text: "Stack", correct: true },
                    { text: "Array", correct: false },
                    { text: "Linked List", correct: false }
                ],
                explanation: "Stack follows Last-In-First-Out (LIFO) principle.",
                department: "cse",
                subject: "Data Structures",
                difficulty: "easy",
                marks: 3,
                timeLimit: 45,
                status: "pending",
                teacher: {
                    id: 5,
                    name: "Prof. David Wilson",
                    avatar: "DW"
                },
                createdAt: "2024-01-15 09:15:00",
                stats: {
                    usage: 0,
                    successRate: 0,
                    avgTime: 0
                }
            },
            {
                id: 3,
                question: "What is the capital of Bangladesh?",
                options: [
                    { text: "Chittagong", correct: false },
                    { text: "Dhaka", correct: true },
                    { text: "Khulna", correct: false },
                    { text: "Rajshahi", correct: false }
                ],
                explanation: "Dhaka is the capital and largest city of Bangladesh.",
                department: "bba",
                subject: "General Knowledge",
                difficulty: "easy",
                marks: 2,
                timeLimit: 30,
                status: "approved",
                teacher: {
                    id: 8,
                    name: "Dr. Lisa Chen",
                    avatar: "LC"
                },
                createdAt: "2024-01-14 14:20:00",
                approvedAt: "2024-01-15 08:45:00",
                stats: {
                    usage: 156,
                    successRate: 92,
                    avgTime: 12
                }
            },
            {
                id: 4,
                question: "Solve the equation: 2x + 5 = 15",
                options: [
                    { text: "x = 5", correct: true },
                    { text: "x = 10", correct: false },
                    { text: "x = 7.5", correct: false },
                    { text: "x = 8", correct: false }
                ],
                explanation: "2x + 5 = 15 → 2x = 10 → x = 5",
                department: "cse",
                subject: "Mathematics",
                difficulty: "easy",
                marks: 4,
                timeLimit: 45,
                status: "rejected",
                teacher: {
                    id: 2,
                    name: "Dr. Rahman Ahmed",
                    avatar: "RA"
                },
                createdAt: "2024-01-14 11:45:00",
                rejectedAt: "2024-01-14 16:30:00",
                rejectionReason: "Duplicate question already exists in the database.",
                stats: {
                    usage: 0,
                    successRate: 0,
                    avgTime: 0
                }
            },
            {
                id: 5,
                question: "What is the time complexity of bubble sort in worst case?",
                options: [
                    { text: "O(n)", correct: false },
                    { text: "O(n log n)", correct: false },
                    { text: "O(n²)", correct: true },
                    { text: "O(log n)", correct: false }
                ],
                explanation: "Bubble sort has O(n²) time complexity in worst case due to nested loops.",
                department: "cse",
                subject: "Algorithms",
                difficulty: "medium",
                marks: 5,
                timeLimit: 60,
                status: "pending",
                teacher: {
                    id: 5,
                    name: "Prof. David Wilson",
                    avatar: "DW"
                },
                createdAt: "2024-01-15 13:20:00",
                stats: {
                    usage: 0,
                    successRate: 0,
                    avgTime: 0
                }
            }
        ];
        
        filteredQuestions = [...allQuestions];
        renderQuestionsList();
        updateStatistics();
        hideLoading();
    }, 1000);
}

function renderQuestionsList() {
    const container = document.getElementById('questions-list');
    const startIndex = (currentPage - 1) * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const questionsToShow = filteredQuestions.slice(startIndex, endIndex);
    
    container.innerHTML = '';
    
    if (questionsToShow.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-question-circle empty-state-icon"></i>
                <h3 class="text-xl font-semibold mb-2">No Questions Found</h3>
                <p class="text-gray-600">No questions match your current filters</p>
            </div>
        `;
        return;
    }
    
    questionsToShow.forEach(question => {
        const card = createQuestionCard(question);
        container.appendChild(card);
    });
    
    updatePagination();
    updateBulkActions();
}

function createQuestionCard(question) {
    const card = document.createElement('div');
    card.className = `question-card ${question.status}`;
    card.dataset.questionId = question.id;
    
    const difficultyClass = `difficulty-${question.difficulty}`;
    const statusClass = `status-${question.status}`;
    
    card.innerHTML = `
        <div class="question-header">
            <div class="flex justify-between items-start mb-3">
                <div class="flex items-center gap-3">
                    <input type="checkbox" class="checkbox bulk-select" data-question-id="${question.id}">
                    <span class="status-badge ${statusClass}">
                        ${question.status.charAt(0).toUpperCase() + question.status.slice(1)}
                    </span>
                    <span class="difficulty-badge ${difficultyClass}">
                        ${question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                    </span>
                </div>
                <div class="text-sm text-gray-500">
                    ${formatDate(question.createdAt)}
                </div>
            </div>
            
            <div class="question-content">
                <div class="question-text">${question.question}</div>
                
                <div class="options-grid">
                    ${question.options.map((option, index) => `
                        <div class="option-item ${option.correct ? 'correct' : 'incorrect'}">
                            <span class="option-label">${String.fromCharCode(65 + index)}</span>
                            ${option.text}
                        </div>
                    `).join('')}
                </div>
                
                ${question.explanation ? `
                    <div class="text-sm text-gray-600">
                        <strong>Explanation:</strong> ${question.explanation}
                    </div>
                ` : ''}
            </div>
            
            <div class="question-meta">
                <div class="meta-item">
                    <i class="fa-solid fa-building"></i>
                    ${getDepartmentName(question.department)}
                </div>
                <div class="meta-item">
                    <i class="fa-solid fa-book"></i>
                    ${question.subject}
                </div>
                <div class="meta-item">
                    <i class="fa-solid fa-clock"></i>
                    ${question.timeLimit}s
                </div>
                <div class="meta-item">
                    <i class="fa-solid fa-star"></i>
                    ${question.marks} marks
                </div>
            </div>
            
            <div class="teacher-info mt-3">
                <div class="teacher-avatar">${question.teacher.avatar}</div>
                <div>
                    <div class="font-medium">${question.teacher.name}</div>
                    <div class="text-sm text-gray-500">Teacher</div>
                </div>
            </div>
            
            ${question.status === 'approved' && question.stats.usage > 0 ? `
                <div class="question-stats">
                    <div class="stat-item usage-count">
                        <div class="font-bold">${question.stats.usage}</div>
                        <div class="text-xs">Usage</div>
                    </div>
                    <div class="stat-item success-rate">
                        <div class="font-bold">${question.stats.successRate}%</div>
                        <div class="text-xs">Success Rate</div>
                    </div>
                    <div class="stat-item avg-time">
                        <div class="font-bold">${question.stats.avgTime}s</div>
                        <div class="text-xs">Avg Time</div>
                    </div>
                </div>
            ` : ''}
        </div>
        
        <div class="question-actions p-4 pt-0">
            <button class="btn btn-sm btn-outline view-question" data-question-id="${question.id}">
                <i class="fa-solid fa-eye mr-1"></i>
                View Details
            </button>
            ${question.status === 'pending' ? `
                <button class="btn btn-sm btn-error reject-question" data-question-id="${question.id}">
                    <i class="fa-solid fa-times mr-1"></i>
                    Reject
                </button>
                <button class="btn btn-sm btn-success approve-question" data-question-id="${question.id}">
                    <i class="fa-solid fa-check mr-1"></i>
                    Approve
                </button>
            ` : ''}
        </div>
    `;
    
    return card;
}

function setupEventListeners() {
    // Filters
    document.getElementById('search-questions').addEventListener('input', filterQuestions);
    document.getElementById('filter-department').addEventListener('change', filterQuestions);
    document.getElementById('filter-difficulty').addEventListener('change', filterQuestions);
    document.getElementById('filter-status').addEventListener('change', filterQuestions);
    document.getElementById('filter-teacher').addEventListener('change', filterQuestions);
    
    // Pagination
    document.getElementById('prev-page').addEventListener('click', goToPrevPage);
    document.getElementById('next-page').addEventListener('click', goToNextPage);
    
    // Modals
    document.getElementById('close-detail-modal').addEventListener('click', hideQuestionDetailModal);
    document.getElementById('cancel-reject').addEventListener('click', hideRejectReasonModal);
    document.getElementById('reject-reason-form').addEventListener('submit', handleRejectQuestion);
    
    // Actions
    document.getElementById('approve-question').addEventListener('click', handleApproveQuestion);
    document.getElementById('export-questions').addEventListener('click', exportQuestions);
    document.getElementById('bulk-approve').addEventListener('click', handleBulkApprove);
    
    // Logout
    document.getElementById('logout-btn').addEventListener('click', logout);
    
    // Delegate events for dynamic elements
    document.addEventListener('click', function(e) {
        if (e.target.closest('.view-question')) {
            const questionId = e.target.closest('.view-question').dataset.questionId;
            showQuestionDetailModal(questionId);
        }
        
        if (e.target.closest('.approve-question')) {
            const questionId = e.target.closest('.approve-question').dataset.questionId;
            approveQuestion(questionId);
        }
        
        if (e.target.closest('.reject-question')) {
            const questionId = e.target.closest('.reject-question').dataset.questionId;
            showRejectReasonModal(questionId);
        }
        
        if (e.target.type === 'checkbox' && e.target.classList.contains('bulk-select')) {
            const questionId = e.target.dataset.questionId;
            toggleQuestionSelection(questionId, e.target.checked);
        }
    });
}

function filterQuestions() {
    const searchTerm = document.getElementById('search-questions').value.toLowerCase();
    const departmentFilter = document.getElementById('filter-department').value;
    const difficultyFilter = document.getElementById('filter-difficulty').value;
    const statusFilter = document.getElementById('filter-status').value;
    const teacherFilter = document.getElementById('filter-teacher').value;
    
    filteredQuestions = allQuestions.filter(question => {
        const matchesSearch = !searchTerm || 
            question.question.toLowerCase().includes(searchTerm) ||
            question.subject.toLowerCase().includes(searchTerm);
        
        const matchesDepartment = !departmentFilter || question.department === departmentFilter;
        const matchesDifficulty = !difficultyFilter || question.difficulty === difficultyFilter;
        const matchesStatus = question.status === statusFilter;
        const matchesTeacher = !teacherFilter || question.teacher.id == teacherFilter;
        
        return matchesSearch && matchesDepartment && matchesDifficulty && matchesStatus && matchesTeacher;
    });
    
    currentPage = 1;
    selectedQuestions.clear();
    renderQuestionsList();
}

function goToPrevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderQuestionsList();
    }
}

function goToNextPage() {
    const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderQuestionsList();
    }
}

function updatePagination() {
    const totalQuestions = filteredQuestions.length;
    const startQuestion = (currentPage - 1) * questionsPerPage + 1;
    const endQuestion = Math.min(currentPage * questionsPerPage, totalQuestions);
    
    document.getElementById('showing-start').textContent = startQuestion;
    document.getElementById('showing-end').textContent = endQuestion;
    document.getElementById('total-questions').textContent = totalQuestions;
}

function showQuestionDetailModal(questionId) {
    const question = allQuestions.find(q => q.id == questionId);
    if (!question) return;
    
    const content = document.getElementById('question-detail-content');
    content.innerHTML = `
        <div class="preview-section">
            <div class="preview-title">Question</div>
            <div class="text-lg">${question.question}</div>
        </div>
        
        <div class="preview-section">
            <div class="preview-title">Options</div>
            <div class="space-y-2">
                ${question.options.map((option, index) => `
                    <div class="option-item ${option.correct ? 'correct' : 'incorrect'}">
                        <span class="option-label">${String.fromCharCode(65 + index)}</span>
                        ${option.text}
                        ${option.correct ? '<span class="badge badge-success ml-2">Correct</span>' : ''}
                    </div>
                `).join('')}
            </div>
        </div>
        
        ${question.explanation ? `
            <div class="preview-section">
                <div class="preview-title">Explanation</div>
                <div>${question.explanation}</div>
            </div>
        ` : ''}
        
        <div class="grid grid-cols-2 gap-4">
            <div class="preview-section">
                <div class="preview-title">Question Details</div>
                <div class="space-y-2">
                    <div><strong>Department:</strong> ${getDepartmentName(question.department)}</div>
                    <div><strong>Subject:</strong> ${question.subject}</div>
                    <div><strong>Difficulty:</strong> <span class="difficulty-badge difficulty-${question.difficulty}">${question.difficulty}</span></div>
                    <div><strong>Marks:</strong> ${question.marks}</div>
                    <div><strong>Time Limit:</strong> ${question.timeLimit} seconds</div>
                </div>
            </div>
            
            <div class="preview-section">
                <div class="preview-title">Teacher Information</div>
                <div class="teacher-info">
                    <div class="teacher-avatar">${question.teacher.avatar}</div>
                    <div>
                        <div class="font-medium">${question.teacher.name}</div>
                        <div class="text-sm text-gray-500">${question.teacher.email || 'Teacher'}</div>
                    </div>
                </div>
                <div class="mt-2 text-sm">
                    <div><strong>Submitted:</strong> ${formatDate(question.createdAt)}</div>
                    ${question.approvedAt ? `<div><strong>Approved:</strong> ${formatDate(question.approvedAt)}</div>` : ''}
                    ${question.rejectedAt ? `<div><strong>Rejected:</strong> ${formatDate(question.rejectedAt)}</div>` : ''}
                </div>
            </div>
        </div>
        
        ${question.rejectionReason ? `
            <div class="preview-section bg-error/10">
                <div class="preview-title text-error">Rejection Reason</div>
                <div>${question.rejectionReason}</div>
            </div>
        ` : ''}
    `;
    
    // Store current question ID for actions
    content.dataset.currentQuestionId = questionId;
    
    document.getElementById('question-detail-modal').classList.add('modal-open');
}

function hideQuestionDetailModal() {
    document.getElementById('question-detail-modal').classList.remove('modal-open');
}

function showRejectReasonModal(questionId) {
    document.getElementById('reject-question-id').value = questionId;
    document.getElementById('reject-reason-modal').classList.add('modal-open');
}

function hideRejectReasonModal() {
    document.getElementById('reject-reason-modal').classList.remove('modal-open');
    document.getElementById('reject-reason-form').reset();
}

function handleApproveQuestion() {
    const questionId = document.getElementById('question-detail-content').dataset.currentQuestionId;
    approveQuestion(questionId);
    hideQuestionDetailModal();
}

function approveQuestion(questionId) {
    const question = allQuestions.find(q => q.id == questionId);
    if (!question) return;
    
    showLoading();
    
    setTimeout(() => {
        question.status = 'approved';
        question.approvedAt = new Date().toISOString();
        
        renderQuestionsList();
        updateStatistics();
        showNotification(`Question "${question.question.substring(0, 50)}..." approved successfully!`, 'success');
        hideLoading();
        
        // Notify teacher
        notifyTeacher(question.teacher.id, 'question_approved', {
            questionId: question.id,
            questionText: question.question
        });
    }, 1000);
}

function handleRejectQuestion(e) {
    e.preventDefault();
    
    const questionId = document.getElementById('reject-question-id').value;
    const reason = document.getElementById('reject-reason').value;
    const comments = document.getElementById('reject-comments').value;
    
    const question = allQuestions.find(q => q.id == questionId);
    if (!question) return;
    
    showLoading();
    
    setTimeout(() => {
        question.status = 'rejected';
        question.rejectedAt = new Date().toISOString();
        question.rejectionReason = `${reason}${comments ? `: ${comments}` : ''}`;
        
        hideRejectReasonModal();
        renderQuestionsList();
        updateStatistics();
        showNotification(`Question rejected successfully!`, 'success');
        hideLoading();
        
        // Notify teacher
        notifyTeacher(question.teacher.id, 'question_rejected', {
            questionId: question.id,
            questionText: question.question,
            reason: reason,
            comments: comments
        });
    }, 1000);
}

function toggleQuestionSelection(questionId, isSelected) {
    if (isSelected) {
        selectedQuestions.add(questionId);
    } else {
        selectedQuestions.delete(questionId);
    }
    updateBulkActions();
}

function updateBulkActions() {
    const bulkApproveBtn = document.getElementById('bulk-approve');
    if (selectedQuestions.size > 0) {
        bulkApproveBtn.style.display = 'flex';
        bulkApproveBtn.innerHTML = `<i class="fa-solid fa-check-double mr-2"></i> Approve ${selectedQuestions.size} Questions`;
    } else {
        bulkApproveBtn.style.display = 'none';
    }
}

function handleBulkApprove() {
    if (selectedQuestions.size === 0) return;
    
    if (!confirm(`Are you sure you want to approve ${selectedQuestions.size} questions?`)) {
        return;
    }
    
    showLoading();
    
    setTimeout(() => {
        selectedQuestions.forEach(questionId => {
            const question = allQuestions.find(q => q.id == questionId);
            if (question && question.status === 'pending') {
                question.status = 'approved';
                question.approvedAt = new Date().toISOString();
                
                // Notify teacher
                notifyTeacher(question.teacher.id, 'question_approved', {
                    questionId: question.id,
                    questionText: question.question
                });
            }
        });
        
        selectedQuestions.clear();
        renderQuestionsList();
        updateStatistics();
        showNotification(`Approved ${selectedQuestions.size} questions successfully!`, 'success');
        hideLoading();
    }, 1000);
}

function exportQuestions() {
    const questionsToExport = filteredQuestions.map(q => ({
        Question: q.question,
        Department: getDepartmentName(q.department),
        Subject: q.subject,
        Difficulty: q.difficulty,
        Status: q.status,
        Teacher: q.teacher.name,
        'Created At': formatDate(q.createdAt)
    }));
    
    // Simulate export
    showNotification('Exporting questions data...', 'info');
    setTimeout(() => {
        showNotification('Questions exported successfully!', 'success');
    }, 1500);
}

function updateStatistics() {
    const pendingCount = allQuestions.filter(q => q.status === 'pending').length;
    const approvedToday = allQuestions.filter(q => 
        q.status === 'approved' && 
        new Date(q.approvedAt).toDateString() === new Date().toDateString()
    ).length;
    const rejectedToday = allQuestions.filter(q => 
        q.status === 'rejected' && 
        new Date(q.rejectedAt).toDateString() === new Date().toDateString()
    ).length;
    
    const totalProcessed = approvedToday + rejectedToday;
    const approvalRate = totalProcessed > 0 ? Math.round((approvedToday / totalProcessed) * 100) : 0;
    
    document.getElementById('pending-count').textContent = pendingCount;
    document.getElementById('approved-today').textContent = approvedToday;
    document.getElementById('rejected-today').textContent = rejectedToday;
    document.getElementById('approval-rate').textContent = `${approvalRate}%`;
}

function notifyTeacher(teacherId, type, data) {
    // Simulate notification to teacher
    console.log('Notifying teacher:', { teacherId, type, data });
}

// Utility functions
function getDepartmentName(deptCode) {
    const departments = {
        'cse': 'Computer Science',
        'bba': 'Business Administration',
        'eee': 'Electrical Engineering',
        'civil': 'Civil Engineering'
    };
    return departments[deptCode] || deptCode;
}

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

function showLoading() {
    const container = document.getElementById('questions-list');
    container.innerHTML = '';
    
    for (let i = 0; i < 3; i++) {
        const loadingCard = document.createElement('div');
        loadingCard.className = 'question-loading';
        container.appendChild(loadingCard);
    }
}

function hideLoading() {
    // Loading hidden by renderQuestionsList
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `toast toast-top toast-end`;
    notification.innerHTML = `
        <div class="alert alert-${type}">
            <div>
                <span>${message}</span>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (document.body.contains(notification)) {
            document.body.removeChild(notification);
        }
    }, 3000);
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        showNotification('Logging out...', 'info');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }
}