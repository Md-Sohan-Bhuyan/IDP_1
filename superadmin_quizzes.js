// Super Admin Quizzes Management JavaScript

let allQuizzes = [];
let allQuestions = [];
let currentPage = 1;
const quizzesPerPage = 10;
let filteredQuizzes = [];
let selectedQuizQuestions = new Set();

document.addEventListener('DOMContentLoaded', function() {
    initializeClock();
    loadQuizzesData();
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

function loadQuizzesData() {
    showLoading();
    
    setTimeout(() => {
        allQuizzes = [
            {
                id: 1,
                title: "Data Structures Midterm",
                description: "Comprehensive midterm exam covering basic data structures",
                department: "cse",
                teacher: {
                    id: 2,
                    name: "Dr. Rahman Ahmed",
                    avatar: "RA"
                },
                status: "active",
                duration: 60,
                totalMarks: 50,
                passingMarks: 25,
                participants: 45,
                avgScore: 78,
                startTime: "2024-01-15T10:00:00",
                endTime: "2024-01-15T11:00:00",
                questions: [1, 2, 5],
                createdAt: "2024-01-10 09:00:00",
                analytics: {
                    completionRate: 92,
                    avgTime: 48,
                    highScore: 98,
                    lowScore: 35
                }
            },
            {
                id: 2,
                title: "Business Fundamentals Quiz",
                description: "Basic business concepts and principles",
                department: "bba",
                teacher: {
                    id: 8,
                    name: "Dr. Lisa Chen",
                    avatar: "LC"
                },
                status: "upcoming",
                duration: 45,
                totalMarks: 30,
                passingMarks: 15,
                participants: 0,
                avgScore: 0,
                startTime: "2024-01-16T14:00:00",
                endTime: "2024-01-16T14:45:00",
                questions: [3],
                createdAt: "2024-01-12 11:30:00",
                analytics: {
                    completionRate: 0,
                    avgTime: 0,
                    highScore: 0,
                    lowScore: 0
                }
            },
            {
                id: 3,
                title: "Algorithms Final Exam",
                description: "Final examination for algorithms course",
                department: "cse",
                teacher: {
                    id: 5,
                    name: "Prof. David Wilson",
                    avatar: "DW"
                },
                status: "completed",
                duration: 120,
                totalMarks: 100,
                passingMarks: 50,
                participants: 38,
                avgScore: 72,
                startTime: "2024-01-14T09:00:00",
                endTime: "2024-01-14T11:00:00",
                questions: [1, 5],
                createdAt: "2024-01-05 15:20:00",
                analytics: {
                    completionRate: 100,
                    avgTime: 105,
                    highScore: 95,
                    lowScore: 42
                }
            },
            {
                id: 4,
                title: "Mathematics Quiz - Calculus",
                description: "Basic calculus concepts and problems",
                department: "cse",
                teacher: {
                    id: 2,
                    name: "Dr. Rahman Ahmed",
                    avatar: "RA"
                },
                status: "draft",
                duration: 30,
                totalMarks: 25,
                passingMarks: 12,
                participants: 0,
                avgScore: 0,
                startTime: "2024-01-20T10:00:00",
                endTime: "2024-01-20T10:30:00",
                questions: [],
                createdAt: "2024-01-13 16:45:00",
                analytics: {
                    completionRate: 0,
                    avgTime: 0,
                    highScore: 0,
                    lowScore: 0
                }
            }
        ];
        
        filteredQuizzes = [...allQuizzes];
        renderQuizzesTable();
        updateStatistics();
        hideLoading();
    }, 1000);
}

function loadQuestionsData() {
    // Load questions for the question bank
    allQuestions = [
        {
            id: 1,
            question: "What is the time complexity of binary search?",
            subject: "Algorithms",
            difficulty: "medium",
            marks: 5,
            department: "cse"
        },
        {
            id: 2,
            question: "Which data structure uses LIFO principle?",
            subject: "Data Structures",
            difficulty: "easy",
            marks: 3,
            department: "cse"
        },
        {
            id: 3,
            question: "What is the capital of Bangladesh?",
            subject: "General Knowledge",
            difficulty: "easy",
            marks: 2,
            department: "bba"
        },
        {
            id: 4,
            question: "Solve the equation: 2x + 5 = 15",
            subject: "Mathematics",
            difficulty: "easy",
            marks: 4,
            department: "cse"
        },
        {
            id: 5,
            question: "What is the time complexity of bubble sort in worst case?",
            subject: "Algorithms",
            difficulty: "medium",
            marks: 5,
            department: "cse"
        }
    ];
}

function renderQuizzesTable() {
    const tableBody = document.getElementById('quizzes-table-body');
    const startIndex = (currentPage - 1) * quizzesPerPage;
    const endIndex = startIndex + quizzesPerPage;
    const quizzesToShow = filteredQuizzes.slice(startIndex, endIndex);
    
    tableBody.innerHTML = '';
    
    if (quizzesToShow.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="8" class="text-center py-8 text-gray-500">
                    <i class="fa-solid fa-feather-pointed text-4xl mb-4 block"></i>
                    No quizzes found matching your criteria
                </td>
            </tr>
        `;
        return;
    }
    
    quizzesToShow.forEach(quiz => {
        const row = createQuizTableRow(quiz);
        tableBody.appendChild(row);
    });
    
    updatePagination();
}

function createQuizTableRow(quiz) {
    const row = document.createElement('tr');
    row.className = 'quiz-table-row';
    
    const statusClass = `status-${quiz.status}`;
    const scoreClass = getScoreClass(quiz.avgScore);
    const scheduleInfo = getScheduleInfo(quiz.startTime, quiz.endTime);
    
    row.innerHTML = `
        <td>
            <div class="font-semibold">${quiz.title}</div>
            <div class="text-sm text-gray-500">${quiz.description.substring(0, 50)}...</div>
        </td>
        <td>
            <div class="flex items-center gap-2">
                <div class="teacher-avatar">${quiz.teacher.avatar}</div>
                <div>
                    <div class="font-medium">${quiz.teacher.name}</div>
                    <div class="text-xs text-gray-500">Teacher</div>
                </div>
            </div>
        </td>
        <td>
            <span class="department-badge">${getDepartmentName(quiz.department)}</span>
        </td>
        <td>
            <span class="status-badge ${statusClass}">
                ${quiz.status.charAt(0).toUpperCase() + quiz.status.slice(1)}
            </span>
        </td>
        <td>
            <div class="participant-count">
                <i class="fa-solid fa-users"></i>
                <span>${quiz.participants}</span>
            </div>
        </td>
        <td>
            <div class="flex items-center gap-2">
                <div class="score-indicator">
                    <div class="score-fill ${scoreClass}" style="width: ${quiz.avgScore}%"></div>
                </div>
                <span class="text-sm font-medium">${quiz.avgScore}%</span>
            </div>
        </td>
        <td>
            <div class="schedule-info ${scheduleInfo.class}">
                <i class="fa-solid fa-clock"></i>
                <span>${scheduleInfo.text}</span>
            </div>
        </td>
        <td>
            <div class="quiz-actions">
                <button class="action-btn text-info view-quiz" data-quiz-id="${quiz.id}">
                    <i class="fa-solid fa-eye"></i>
                </button>
                <button class="action-btn text-warning edit-quiz" data-quiz-id="${quiz.id}">
                    <i class="fa-solid fa-edit"></i>
                </button>
                <button class="action-btn text-error delete-quiz" data-quiz-id="${quiz.id}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </td>
    `;
    
    return row;
}

function setupEventListeners() {
    // Filters
    document.getElementById('search-quizzes').addEventListener('input', filterQuizzes);
    document.getElementById('filter-department').addEventListener('change', filterQuizzes);
    document.getElementById('filter-status').addEventListener('change', filterQuizzes);
    document.getElementById('filter-teacher').addEventListener('change', filterQuizzes);
    document.getElementById('filter-date').addEventListener('change', filterQuizzes);
    
    // Pagination
    document.getElementById('prev-page').addEventListener('click', goToPrevPage);
    document.getElementById('next-page').addEventListener('click', goToNextPage);
    
    // Modals
    document.getElementById('close-detail-modal').addEventListener('click', hideQuizDetailModal);
    document.getElementById('cancel-create-quiz').addEventListener('click', hideCreateQuizModal);
    document.getElementById('cancel-add-questions').addEventListener('click', hideAddQuestionsModal);
    
    // Forms
    document.getElementById('create-quiz-form').addEventListener('submit', handleCreateQuiz);
    document.getElementById('add-questions-btn').addEventListener('click', showAddQuestionsModal);
    document.getElementById('confirm-add-questions').addEventListener('click', handleAddQuestions);
    
    // Actions
    document.getElementById('create-quiz').addEventListener('click', showCreateQuizModal);
    document.getElementById('export-quizzes').addEventListener('click', exportQuizzes);
    
    // Tabs
    document.querySelectorAll('[data-tab]').forEach(tab => {
        tab.addEventListener('click', switchTab);
    });
    
    // Logout
    document.getElementById('logout-btn').addEventListener('click', logout);
    
    // Delegate events for dynamic elements
    document.addEventListener('click', function(e) {
        if (e.target.closest('.view-quiz')) {
            const quizId = e.target.closest('.view-quiz').dataset.quizId;
            showQuizDetailModal(quizId);
        }
        
        if (e.target.closest('.edit-quiz')) {
            const quizId = e.target.closest('.edit-quiz').dataset.quizId;
            editQuiz(quizId);
        }
        
        if (e.target.closest('.delete-quiz')) {
            const quizId = e.target.closest('.delete-quiz').dataset.quizId;
            deleteQuiz(quizId);
        }
        
        if (e.target.closest('.question-bank-item')) {
            const questionId = e.target.closest('.question-bank-item').dataset.questionId;
            toggleQuestionSelection(questionId);
        }
        
        if (e.target.closest('.remove-question-btn')) {
            const questionId = e.target.closest('.remove-question-btn').dataset.questionId;
            removeSelectedQuestion(questionId);
        }
    });
}

function filterQuizzes() {
    const searchTerm = document.getElementById('search-quizzes').value.toLowerCase();
    const departmentFilter = document.getElementById('filter-department').value;
    const statusFilter = document.getElementById('filter-status').value;
    const teacherFilter = document.getElementById('filter-teacher').value;
    const dateFilter = document.getElementById('filter-date').value;
    
    filteredQuizzes = allQuizzes.filter(quiz => {
        const matchesSearch = !searchTerm || 
            quiz.title.toLowerCase().includes(searchTerm) ||
            quiz.description.toLowerCase().includes(searchTerm);
        
        const matchesDepartment = !departmentFilter || quiz.department === departmentFilter;
        const matchesStatus = !statusFilter || quiz.status === statusFilter;
        const matchesTeacher = !teacherFilter || quiz.teacher.id == teacherFilter;
        const matchesDate = !dateFilter || quiz.startTime.includes(dateFilter);
        
        return matchesSearch && matchesDepartment && matchesStatus && matchesTeacher && matchesDate;
    });
    
    currentPage = 1;
    renderQuizzesTable();
}

function goToPrevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderQuizzesTable();
    }
}

function goToNextPage() {
    const totalPages = Math.ceil(filteredQuizzes.length / quizzesPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderQuizzesTable();
    }
}

function updatePagination() {
    const totalQuizzes = filteredQuizzes.length;
    const startQuiz = (currentPage - 1) * quizzesPerPage + 1;
    const endQuiz = Math.min(currentPage * quizzesPerPage, totalQuizzes);
    
    document.getElementById('showing-start').textContent = startQuiz;
    document.getElementById('showing-end').textContent = endQuiz;
    document.getElementById('total-quizzes').textContent = totalQuizzes;
}

function showQuizDetailModal(quizId) {
    const quiz = allQuizzes.find(q => q.id == quizId);
    if (!quiz) return;
    
    const content = document.getElementById('quiz-detail-content');
    const actions = document.getElementById('quiz-action-buttons');
    
    content.innerHTML = `
        <div id="overview-tab" class="tab-content active">
            ${renderOverviewTab(quiz)}
        </div>
        <div id="questions-tab" class="tab-content">
            ${renderQuestionsTab(quiz)}
        </div>
        <div id="participants-tab" class="tab-content">
            ${renderParticipantsTab(quiz)}
        </div>
        <div id="analytics-tab" class="tab-content">
            ${renderAnalyticsTab(quiz)}
        </div>
    `;
    
    actions.innerHTML = `
        ${quiz.status === 'active' ? `
            <button class="btn btn-error" id="end-quiz-btn">
                <i class="fa-solid fa-stop mr-2"></i>
                End Quiz
            </button>
        ` : ''}
        ${quiz.status === 'upcoming' ? `
            <button class="btn btn-success" id="start-quiz-btn">
                <i class="fa-solid fa-play mr-2"></i>
                Start Quiz
            </button>
        ` : ''}
        <button class="btn btn-warning" id="edit-quiz-btn">
            <i class="fa-solid fa-edit mr-2"></i>
            Edit Quiz
        </button>
    `;
    
    // Store current quiz ID
    content.dataset.currentQuizId = quizId;
    
    document.getElementById('quiz-detail-modal').classList.add('modal-open');
}

function hideQuizDetailModal() {
    document.getElementById('quiz-detail-modal').classList.remove('modal-open');
}

function showCreateQuizModal() {
    // Set default start time to now + 1 hour
    const startTime = new Date();
    startTime.setHours(startTime.getHours() + 1);
    startTime.setMinutes(0);
    startTime.setSeconds(0);
    
    // Set default end time to start time + 1 hour
    const endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + 1);
    
    document.getElementById('quiz-start-time').value = startTime.toISOString().slice(0, 16);
    document.getElementById('quiz-end-time').value = endTime.toISOString().slice(0, 16);
    
    document.getElementById('create-quiz-modal').classList.add('modal-open');
}

function hideCreateQuizModal() {
    document.getElementById('create-quiz-modal').classList.remove('modal-open');
    document.getElementById('create-quiz-form').reset();
    selectedQuizQuestions.clear();
    updateSelectedQuestionsList();
}

function showAddQuestionsModal() {
    renderQuestionBank();
    document.getElementById('add-questions-modal').classList.add('modal-open');
}

function hideAddQuestionsModal() {
    document.getElementById('add-questions-modal').classList.remove('modal-open');
}

function switchTab(e) {
    const tabName = e.target.dataset.tab;
    
    // Update active tab
    document.querySelectorAll('[data-tab]').forEach(tab => {
        tab.classList.remove('tab-active');
    });
    e.target.classList.add('tab-active');
    
    // Show corresponding content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

function handleCreateQuiz(e) {
    e.preventDefault();
    
    const quizData = {
        title: document.getElementById('quiz-title').value,
        description: document.getElementById('quiz-description').value,
        department: document.getElementById('quiz-department').value,
        duration: parseInt(document.getElementById('quiz-duration').value),
        totalMarks: parseInt(document.getElementById('quiz-total-marks').value),
        passingMarks: parseInt(document.getElementById('quiz-passing-marks').value),
        startTime: document.getElementById('quiz-start-time').value,
        endTime: document.getElementById('quiz-end-time').value,
        teacherId: parseInt(document.getElementById('quiz-teacher').value),
        questions: Array.from(selectedQuizQuestions)
    };
    
    showLoading();
    
    setTimeout(() => {
        const newQuiz = {
            id: allQuizzes.length + 1,
            ...quizData,
            teacher: getTeacherById(quizData.teacherId),
            status: "upcoming",
            participants: 0,
            avgScore: 0,
            createdAt: new Date().toISOString(),
            analytics: {
                completionRate: 0,
                avgTime: 0,
                highScore: 0,
                lowScore: 0
            }
        };
        
        allQuizzes.unshift(newQuiz);
        
        hideCreateQuizModal();
        renderQuizzesTable();
        updateStatistics();
        showNotification('Quiz created successfully!', 'success');
        hideLoading();
        
        // Notify teacher
        notifyTeacher(quizData.teacherId, 'quiz_assigned', {
            quizId: newQuiz.id,
            quizTitle: newQuiz.title
        });
    }, 1000);
}

function handleAddQuestions() {
    updateSelectedQuestionsList();
    hideAddQuestionsModal();
}

function toggleQuestionSelection(questionId) {
    const questionElement = document.querySelector(`[data-question-id="${questionId}"]`);
    
    if (selectedQuizQuestions.has(questionId)) {
        selectedQuizQuestions.delete(questionId);
        questionElement.classList.remove('selected');
    } else {
        selectedQuizQuestions.add(questionId);
        questionElement.classList.add('selected');
    }
    
    updateSelectedQuestionsCount();
}

function removeSelectedQuestion(questionId) {
    selectedQuizQuestions.delete(questionId);
    updateSelectedQuestionsList();
}

function updateSelectedQuestionsList() {
    const container = document.getElementById('selected-questions-list');
    const countElement = document.getElementById('selected-questions-count');
    
    container.innerHTML = '';
    
    if (selectedQuizQuestions.size === 0) {
        container.innerHTML = '<div class="text-center text-gray-500 py-4">No questions selected</div>';
    } else {
        selectedQuizQuestions.forEach(questionId => {
            const question = allQuestions.find(q => q.id == questionId);
            if (question) {
                const item = document.createElement('div');
                item.className = 'selected-question-item';
                item.innerHTML = `
                    <div>
                        <div class="font-medium">${question.question}</div>
                        <div class="text-sm text-gray-500">
                            ${question.subject} • ${question.difficulty} • ${question.marks} marks
                        </div>
                    </div>
                    <button type="button" class="remove-question-btn" data-question-id="${questionId}">
                        <i class="fa-solid fa-times"></i>
                    </button>
                `;
                container.appendChild(item);
            }
        });
    }
    
    countElement.textContent = selectedQuizQuestions.size;
    updateSelectedQuestionsCount();
}

function updateSelectedQuestionsCount() {
    document.getElementById('current-selected-count').textContent = selectedQuizQuestions.size;
}

function renderQuestionBank() {
    const container = document.getElementById('question-bank-list');
    const searchTerm = document.getElementById('search-question-bank').value.toLowerCase();
    const subjectFilter = document.getElementById('filter-question-subject').value;
    const difficultyFilter = document.getElementById('filter-question-difficulty').value;
    
    const filteredQuestions = allQuestions.filter(question => {
        const matchesSearch = !searchTerm || 
            question.question.toLowerCase().includes(searchTerm) ||
            question.subject.toLowerCase().includes(searchTerm);
        
        const matchesSubject = !subjectFilter || question.subject.toLowerCase().includes(subjectFilter);
        const matchesDifficulty = !difficultyFilter || question.difficulty === difficultyFilter;
        
        return matchesSearch && matchesSubject && matchesDifficulty;
    });
    
    container.innerHTML = '';
    
    if (filteredQuestions.length === 0) {
        container.innerHTML = '<div class="text-center text-gray-500 py-8">No questions found</div>';
        return;
    }
    
    filteredQuestions.forEach(question => {
        const isSelected = selectedQuizQuestions.has(question.id);
        const item = document.createElement('div');
        item.className = `question-bank-item ${isSelected ? 'selected' : ''}`;
        item.dataset.questionId = question.id;
        item.innerHTML = `
            <div class="flex items-start gap-3">
                <input type="checkbox" class="checkbox question-checkbox" ${isSelected ? 'checked' : ''}>
                <div class="flex-1">
                    <div class="font-medium">${question.question}</div>
                    <div class="text-sm text-gray-500 mt-1">
                        <span class="badge badge-sm">${question.subject}</span>
                        <span class="badge badge-sm badge-${question.difficulty}">${question.difficulty}</span>
                        <span class="badge badge-sm badge-outline">${question.marks} marks</span>
                        <span class="badge badge-sm badge-outline">${getDepartmentName(question.department)}</span>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(item);
    });
}

function editQuiz(quizId) {
    const quiz = allQuizzes.find(q => q.id == quizId);
    if (!quiz) return;
    
    showNotification(`Editing ${quiz.title}...`, 'info');
    // Implement edit functionality
}

function deleteQuiz(quizId) {
    const quiz = allQuizzes.find(q => q.id == quizId);
    if (!quiz) return;
    
    if (!confirm(`Are you sure you want to delete "${quiz.title}"? This action cannot be undone.`)) {
        return;
    }
    
    showLoading();
    
    setTimeout(() => {
        allQuizzes = allQuizzes.filter(q => q.id != quizId);
        
        renderQuizzesTable();
        updateStatistics();
        showNotification('Quiz deleted successfully!', 'success');
        hideLoading();
    }, 1000);
}

function exportQuizzes() {
    const quizzesToExport = filteredQuizzes.map(q => ({
        Title: q.title,
        Department: getDepartmentName(q.department),
        Teacher: q.teacher.name,
        Status: q.status,
        Participants: q.participants,
        'Average Score': `${q.avgScore}%`,
        'Start Time': formatDate(q.startTime),
        'End Time': formatDate(q.endTime)
    }));
    
    showNotification('Exporting quizzes data...', 'info');
    setTimeout(() => {
        showNotification('Quizzes exported successfully!', 'success');
    }, 1500);
}

function updateStatistics() {
    const activeQuizzes = allQuizzes.filter(q => q.status === 'active').length;
    const upcomingQuizzes = allQuizzes.filter(q => q.status === 'upcoming').length;
    const participantsToday = allQuizzes
        .filter(q => q.status === 'active' || q.status === 'completed')
        .reduce((sum, q) => sum + q.participants, 0);
    
    const totalScores = allQuizzes
        .filter(q => q.avgScore > 0)
        .reduce((sum, q) => sum + q.avgScore, 0);
    const avgScore = totalScores > 0 ? Math.round(totalScores / allQuizzes.filter(q => q.avgScore > 0).length) : 0;
    
    document.getElementById('active-quizzes').textContent = activeQuizzes;
    document.getElementById('upcoming-quizzes').textContent = upcomingQuizzes;
    document.getElementById('participants-today').textContent = participantsToday;
    document.getElementById('avg-score').textContent = `${avgScore}%`;
}

// Tab rendering functions
function renderOverviewTab(quiz) {
    return `
        <div class="overview-grid">
            <div class="overview-card">
                <h4 class="font-semibold mb-2">Basic Information</h4>
                <div class="space-y-2 text-sm">
                    <div><strong>Title:</strong> ${quiz.title}</div>
                    <div><strong>Description:</strong> ${quiz.description}</div>
                    <div><strong>Department:</strong> ${getDepartmentName(quiz.department)}</div>
                    <div><strong>Teacher:</strong> ${quiz.teacher.name}</div>
                </div>
            </div>
            
            <div class="overview-card">
                <h4 class="font-semibold mb-2">Quiz Settings</h4>
                <div class="space-y-2 text-sm">
                    <div><strong>Duration:</strong> ${quiz.duration} minutes</div>
                    <div><strong>Total Marks:</strong> ${quiz.totalMarks}</div>
                    <div><strong>Passing Marks:</strong> ${quiz.passingMarks}</div>
                    <div><strong>Questions:</strong> ${quiz.questions.length}</div>
                </div>
            </div>
            
            <div class="overview-card">
                <h4 class="font-semibold mb-2">Schedule</h4>
                <div class="space-y-2 text-sm">
                    <div><strong>Start:</strong> ${formatDate(quiz.startTime)}</div>
                    <div><strong>End:</strong> ${formatDate(quiz.endTime)}</div>
                    <div><strong>Status:</strong> <span class="status-badge status-${quiz.status}">${quiz.status}</span></div>
                    <div><strong>Participants:</strong> ${quiz.participants}</div>
                </div>
            </div>
        </div>
        
        ${quiz.status === 'active' ? `
            <div class="alert alert-warning">
                <i class="fa-solid fa-clock"></i>
                <span>This quiz is currently active. ${quiz.participants} participants are taking it right now.</span>
            </div>
        ` : ''}
        
        ${quiz.status === 'completed' ? `
            <div class="alert alert-success">
                <i class="fa-solid fa-check-circle"></i>
                <span>This quiz has been completed. Average score: ${quiz.avgScore}%</span>
            </div>
        ` : ''}
    `;
}

function renderQuestionsTab(quiz) {
    const questions = allQuestions.filter(q => quiz.questions.includes(q.id));
    
    if (questions.length === 0) {
        return '<div class="text-center text-gray-500 py-8">No questions added to this quiz</div>';
    }
    
    return `
        <div class="space-y-4">
            ${questions.map((question, index) => `
                <div class="question-item">
                    <div class="flex items-start gap-3">
                        <div class="font-semibold text-lg">${index + 1}.</div>
                        <div class="flex-1">
                            <div class="font-medium">${question.question}</div>
                            <div class="text-sm text-gray-500 mt-1">
                                <span class="badge badge-sm">${question.subject}</span>
                                <span class="badge badge-sm badge-${question.difficulty}">${question.difficulty}</span>
                                <span class="badge badge-sm badge-outline">${question.marks} marks</span>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function renderParticipantsTab(quiz) {
    if (quiz.participants === 0) {
        return '<div class="text-center text-gray-500 py-8">No participants yet</div>';
    }
    
    // Simulate participant data
    const participants = Array.from({length: Math.min(quiz.participants, 10)}, (_, i) => ({
        id: i + 1,
        name: `Student ${i + 1}`,
        score: Math.floor(Math.random() * (quiz.analytics.highScore - quiz.analytics.lowScore + 1)) + quiz.analytics.lowScore,
        time: Math.floor(Math.random() * quiz.duration * 60)
    })).sort((a, b) => b.score - a.score);
    
    return `
        <div class="space-y-2">
            ${participants.map((participant, index) => `
                <div class="participant-item">
                    <div class="flex items-center gap-3">
                        <div class="participant-rank">${index + 1}</div>
                        <div>
                            <div class="font-medium">${participant.name}</div>
                            <div class="text-sm text-gray-500">ID: ${participant.id}</div>
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="font-semibold">${participant.score}/${quiz.totalMarks}</div>
                        <div class="text-sm text-gray-500">${Math.floor(participant.time / 60)}m ${participant.time % 60}s</div>
                    </div>
                </div>
            `).join('')}
        </div>
        
        ${quiz.participants > 10 ? `
            <div class="text-center mt-4">
                <button class="btn btn-sm btn-outline">View All ${quiz.participants} Participants</button>
            </div>
        ` : ''}
    `;
}

function renderAnalyticsTab(quiz) {
    if (quiz.participants === 0) {
        return '<div class="text-center text-gray-500 py-8">No analytics data available</div>';
    }
    
    return `
        <div class="analytics-grid">
            <div class="chart-container">
                <h4 class="font-semibold mb-4">Score Distribution</h4>
                <div class="text-center py-8 text-gray-500">
                    <i class="fa-solid fa-chart-bar text-4xl mb-2"></i>
                    <div>Score distribution chart would be displayed here</div>
                </div>
            </div>
            
            <div class="chart-container">
                <h4 class="font-semibold mb-4">Time Analysis</h4>
                <div class="text-center py-8 text-gray-500">
                    <i class="fa-solid fa-clock text-4xl mb-2"></i>
                    <div>Time analysis chart would be displayed here</div>
                </div>
            </div>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div class="stat bg-base-200 rounded-lg p-4 text-center">
                <div class="stat-value text-2xl">${quiz.analytics.completionRate}%</div>
                <div class="stat-title">Completion Rate</div>
            </div>
            <div class="stat bg-base-200 rounded-lg p-4 text-center">
                <div class="stat-value text-2xl">${quiz.analytics.avgTime}m</div>
                <div class="stat-title">Average Time</div>
            </div>
            <div class="stat bg-base-200 rounded-lg p-4 text-center">
                <div class="stat-value text-2xl">${quiz.analytics.highScore}%</div>
                <div class="stat-title">High Score</div>
            </div>
            <div class="stat bg-base-200 rounded-lg p-4 text-center">
                <div class="stat-value text-2xl">${quiz.analytics.lowScore}%</div>
                <div class="stat-title">Low Score</div>
            </div>
        </div>
    `;
}

// Utility functions
function getDepartmentName(deptCode) {
    const departments = {
        'cse': 'Computer Science',
        'bba': 'Business Administration',
        'eee': 'Electrical Engineering'
    };
    return departments[deptCode] || deptCode;
}

function getTeacherById(teacherId) {
    const teachers = {
        2: { id: 2, name: "Dr. Rahman Ahmed", avatar: "RA" },
        5: { id: 5, name: "Prof. David Wilson", avatar: "DW" },
        8: { id: 8, name: "Dr. Lisa Chen", avatar: "LC" }
    };
    return teachers[teacherId] || { name: "Unknown Teacher", avatar: "UT" };
}

function getScoreClass(score) {
    if (score >= 80) return 'score-high';
    if (score >= 60) return 'score-medium';
    return 'score-low';
}

function getScheduleInfo(startTime, endTime) {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);
    
    if (now < start) {
        const diff = start - now;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        return {
            class: 'schedule-future',
            text: `Starts in ${hours}h ${minutes}m`
        };
    } else if (now > end) {
        return {
            class: 'schedule-past',
            text: 'Completed'
        };
    } else {
        const diff = end - now;
        const minutes = Math.floor(diff / (1000 * 60));
        
        return {
            class: minutes < 30 ? 'schedule-now time-critical' : 'schedule-now',
            text: `Ends in ${minutes}m`
        };
    }
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

function notifyTeacher(teacherId, type, data) {
    console.log('Notifying teacher:', { teacherId, type, data });
}

function showLoading() {
    const tableBody = document.getElementById('quizzes-table-body');
    tableBody.innerHTML = '';
    
    for (let i = 0; i < 5; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><div class="quiz-loading w-3/4"></div></td>
            <td><div class="quiz-loading w-1/2"></div></td>
            <td><div class="quiz-loading w-1/3"></div></td>
            <td><div class="quiz-loading w-1/4"></div></td>
            <td><div class="quiz-loading w-1/4"></div></td>
            <td><div class="quiz-loading w-1/3"></div></td>
            <td><div class="quiz-loading w-1/2"></div></td>
            <td><div class="quiz-loading w-1/4"></div></td>
        `;
        tableBody.appendChild(row);
    }
}

function hideLoading() {
    // Loading hidden by renderQuizzesTable
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