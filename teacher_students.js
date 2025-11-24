// Students Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeStudentsPage();
    initializeModals();
    loadStudentsTable();
    loadRecentActivity();
    updateStats();
});

function initializeStudentsPage() {
    // Initialize any page-specific functionality
}

function initializeModals() {
    // Student Details Modal
    const studentDetailsModal = document.getElementById('student-details-modal');
    const closeStudentDetailsBtn = document.getElementById('close-student-details');
    
    if (closeStudentDetailsBtn && studentDetailsModal) {
        closeStudentDetailsBtn.addEventListener('click', () => {
            studentDetailsModal.classList.remove('modal-open');
        });
        
        studentDetailsModal.addEventListener('click', (e) => {
            if (e.target === studentDetailsModal) {
                studentDetailsModal.classList.remove('modal-open');
            }
        });
    }
}

function loadStudentsTable() {
    const tableBody = document.getElementById('students-table-body');
    if (!tableBody) return;
    
    // Sample students data
    const students = [
        {
            id: 'S2024001',
            name: 'Ahmed Khan',
            email: 'ahmed.khan@ius.ac.bd',
            class: 'Class A',
            quizzesTaken: 8,
            avgScore: 85,
            status: 'active',
            lastActivity: '2025-01-15T10:30:00',
            joinDate: '2024-09-01'
        },
        {
            id: 'S2024002',
            name: 'Fatima Begum',
            email: 'fatima.begum@ius.ac.bd',
            class: 'Class B',
            quizzesTaken: 6,
            avgScore: 72,
            status: 'active',
            lastActivity: '2025-01-14T14:20:00',
            joinDate: '2024-09-01'
        },
        {
            id: 'S2024003',
            name: 'Raj Sharma',
            email: 'raj.sharma@ius.ac.bd',
            class: 'Class A',
            quizzesTaken: 10,
            avgScore: 90,
            status: 'active',
            lastActivity: '2025-01-13T09:15:00',
            joinDate: '2024-09-01'
        },
        {
            id: 'S2024004',
            name: 'Maria Islam',
            email: 'maria.islam@ius.ac.bd',
            class: 'Class C',
            quizzesTaken: 5,
            avgScore: 58,
            status: 'active',
            lastActivity: '2025-01-15T11:45:00',
            joinDate: '2024-09-15'
        },
        {
            id: 'S2024005',
            name: 'John Doe',
            email: 'john.doe@ius.ac.bd',
            class: 'Class B',
            quizzesTaken: 7,
            avgScore: 91,
            status: 'active',
            lastActivity: '2025-01-14T16:00:00',
            joinDate: '2024-09-01'
        },
        {
            id: 'S2024006',
            name: 'Sarah Johnson',
            email: 'sarah.johnson@ius.ac.bd',
            class: 'Class A',
            quizzesTaken: 3,
            avgScore: 65,
            status: 'inactive',
            lastActivity: '2024-12-20T08:30:00',
            joinDate: '2024-09-01'
        }
    ];
    
    // Clear existing table
    tableBody.innerHTML = '';
    
    if (students.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" class="text-center py-8">
                    <div class="empty-state">
                        <i class="fa-solid fa-users"></i>
                        <h3 class="text-lg font-semibold mb-2">No Students Found</h3>
                        <p class="text-gray-600">Student data will appear here once students register</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }
    
    // Add students to table
    students.forEach(student => {
        const row = document.createElement('tr');
        
        const initials = student.name.split(' ').map(n => n[0]).join('');
        const scoreClass = getScoreClass(student.avgScore);
        const statusClass = student.status === 'active' ? 'status-active' : 
                          student.status === 'inactive' ? 'status-inactive' : 'status-pending';
        const statusText = student.status.charAt(0).toUpperCase() + student.status.slice(1);
        
        row.innerHTML = `
            <td>
                <div class="flex items-center gap-3">
                    <div class="student-avatar">${initials}</div>
                    <div>
                        <div class="font-semibold">${student.name}</div>
                        <div class="text-sm text-gray-500">${student.email}</div>
                    </div>
                </div>
            </td>
            <td>
                <span class="badge badge-outline">${student.class}</span>
            </td>
            <td>
                <div class="text-center font-semibold">${student.quizzesTaken}</div>
            </td>
            <td>
                <span class="score-badge ${scoreClass}">${student.avgScore}%</span>
            </td>
            <td>
                <span class="status-badge ${statusClass}">${statusText}</span>
            </td>
            <td>
                <div class="text-sm">${formatDate(student.lastActivity)}</div>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-outline btn-primary view-student" data-id="${student.id}">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-outline btn-info message-student" data-id="${student.id}">
                        <i class="fa-solid fa-envelope"></i>
                    </button>
                    <button class="btn btn-sm btn-outline btn-warning edit-student" data-id="${student.id}">
                        <i class="fa-solid fa-edit"></i>
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Add event listeners to action buttons
    addStudentEventListeners();
}

function addStudentEventListeners() {
    // View student buttons
    document.querySelectorAll('.view-student').forEach(btn => {
        btn.addEventListener('click', function() {
            const studentId = this.getAttribute('data-id');
            viewStudentDetails(studentId);
        });
    });
    
    // Message student buttons
    document.querySelectorAll('.message-student').forEach(btn => {
        btn.addEventListener('click', function() {
            const studentId = this.getAttribute('data-id');
            messageStudent(studentId);
        });
    });
    
    // Edit student buttons
    document.querySelectorAll('.edit-student').forEach(btn => {
        btn.addEventListener('click', function() {
            const studentId = this.getAttribute('data-id');
            editStudent(studentId);
        });
    });
}

function viewStudentDetails(studentId) {
    // For demo purposes, show sample student details
    const studentDetailsContent = document.getElementById('student-details-content');
    if (!studentDetailsContent) return;
    
    // Sample student details
    const studentDetails = {
        id: 'S2024001',
        name: 'Ahmed Khan',
        email: 'ahmed.khan@ius.ac.bd',
        class: 'Class A',
        joinDate: '2024-09-01',
        status: 'Active',
        quizzesTaken: 8,
        avgScore: 85,
        totalQuizzes: 12,
        completionRate: '67%',
        performance: [
            { quiz: 'Math Quiz 1', score: 90, date: '2025-01-10' },
            { quiz: 'Physics Test', score: 85, date: '2025-01-12' },
            { quiz: 'Chemistry Exam', score: 88, date: '2025-01-15' },
            { quiz: 'Math Quiz 2', score: 82, date: '2025-01-18' },
            { quiz: 'Biology Test', score: 80, date: '2025-01-20' }
        ]
    };
    
    let performanceHtml = '';
    studentDetails.performance.forEach(quiz => {
        const percentage = quiz.score;
        performanceHtml += `
            <div class="flex justify-between items-center mb-2">
                <span class="text-sm">${quiz.quiz}</span>
                <div class="flex items-center gap-2">
                    <div class="w-24 bg-base-300 rounded-full h-2">
                        <div class="bg-primary h-2 rounded-full" style="width: ${percentage}%"></div>
                    </div>
                    <span class="text-sm font-semibold w-8">${quiz.score}%</span>
                </div>
            </div>
        `;
    });
    
    studentDetailsContent.innerHTML = `
        <div class="flex items-center gap-4 mb-6">
            <div class="student-avatar text-xl">${studentDetails.name.split(' ').map(n => n[0]).join('')}</div>
            <div>
                <h4 class="text-xl font-bold">${studentDetails.name}</h4>
                <p class="text-gray-600">${studentDetails.email}</p>
            </div>
        </div>
        
        <div class="student-summary">
            <div class="summary-item">
                <div class="summary-value">${studentDetails.quizzesTaken}/${studentDetails.totalQuizzes}</div>
                <div class="summary-label">Quizzes Taken</div>
            </div>
            <div class="summary-item">
                <div class="summary-value">${studentDetails.avgScore}%</div>
                <div class="summary-label">Average Score</div>
            </div>
            <div class="summary-item">
                <div class="summary-value">${studentDetails.completionRate}</div>
                <div class="summary-label">Completion Rate</div>
            </div>
            <div class="summary-item">
                <div class="summary-value text-success">${studentDetails.status}</div>
                <div class="summary-label">Status</div>
            </div>
        </div>
        
        <div class="grid grid-cols-2 gap-4 mb-6">
            <div>
                <strong>Student ID:</strong> ${studentDetails.id}
            </div>
            <div>
                <strong>Class:</strong> ${studentDetails.class}
            </div>
            <div>
                <strong>Join Date:</strong> ${formatDate(studentDetails.joinDate)}
            </div>
            <div>
                <strong>Last Activity:</strong> ${formatDate(studentDetails.performance[0].date)}
            </div>
        </div>
        
        <div class="performance-chart">
            <h4 class="font-semibold mb-4">Recent Performance</h4>
            ${performanceHtml}
        </div>
    `;
    
    // Open modal
    document.getElementById('student-details-modal').classList.add('modal-open');
}

function messageStudent(studentId) {
    // For demo purposes
    showNotification(`Opening message composer for student ${studentId}...`, 'info');
}

function editStudent(studentId) {
    // For demo purposes
    showNotification(`Opening edit form for student ${studentId}...`, 'info');
}

function loadRecentActivity() {
    const activityList = document.getElementById('recent-activity-list');
    if (!activityList) return;
    
    // Sample activity data
    const activities = [
        {
            icon: 'fa-user-plus',
            color: 'text-success',
            bgColor: 'bg-success/10',
            text: 'New student registered: John Smith',
            time: '2 hours ago'
        },
        {
            icon: 'fa-chart-line',
            color: 'text-primary',
            bgColor: 'bg-primary/10',
            text: 'Ahmed Khan scored 95% in Physics Quiz',
            time: '1 day ago'
        },
        {
            icon: 'fa-trophy',
            color: 'text-warning',
            bgColor: 'bg-warning/10',
            text: 'Fatima Begum completed 10 quizzes',
            time: '2 days ago'
        },
        {
            icon: 'fa-envelope',
            color: 'text-info',
            bgColor: 'bg-info/10',
            text: 'Sent announcement to Class A',
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
                <div class="font-medium text-sm">${activity.text}</div>
                <div class="activity-time">${activity.time}</div>
            </div>
        `;
        
        activityList.appendChild(activityItem);
    });
}

function updateStats() {
    // Sample stats data
    const stats = {
        totalStudents: 156,
        activeStudents: 142,
        avgPerformance: 78,
        completionRate: 92
    };
    
    // Update DOM elements
    document.getElementById('total-students').textContent = stats.totalStudents;
    document.getElementById('active-students').textContent = stats.activeStudents;
    document.getElementById('avg-performance').textContent = stats.avgPerformance + '%';
    document.getElementById('completion-rate').textContent = stats.completionRate + '%';
}

// Utility Functions
function getScoreClass(percentage) {
    if (percentage >= 90) return 'score-excellent';
    if (percentage >= 75) return 'score-good';
    if (percentage >= 50) return 'score-average';
    return 'score-poor';
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
window.TeacherStudents = {
    showNotification,
    loadStudentsTable,
    updateStats
};