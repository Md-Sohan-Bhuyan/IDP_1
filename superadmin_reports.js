// Super Admin Reports & Analytics JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeClock();
    loadReportsData();
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

function loadReportsData() {
    showLoading();
    
    setTimeout(() => {
        loadTopStudents();
        loadRecentActivity();
        loadDepartmentComparison();
        updateStatistics();
        hideLoading();
    }, 1500);
}

function loadTopStudents() {
    const topStudents = [
        {
            id: 1,
            name: "John Smith",
            department: "cse",
            avgScore: 92,
            quizzesTaken: 24,
            progress: 92
        },
        {
            id: 2,
            name: "Sarah Johnson",
            department: "bba",
            avgScore: 88,
            quizzesTaken: 18,
            progress: 88
        },
        {
            id: 3,
            name: "Michael Brown",
            department: "cse",
            avgScore: 85,
            quizzesTaken: 22,
            progress: 85
        },
        {
            id: 4,
            name: "Emily Davis",
            department: "eee",
            avgScore: 83,
            quizzesTaken: 15,
            progress: 83
        },
        {
            id: 5,
            name: "David Wilson",
            department: "cse",
            avgScore: 81,
            quizzesTaken: 20,
            progress: 81
        }
    ];
    
    const tableBody = document.getElementById('top-students-table');
    tableBody.innerHTML = '';
    
    topStudents.forEach((student, index) => {
        const row = document.createElement('tr');
        const progressClass = getProgressClass(student.progress);
        
        row.innerHTML = `
            <td>
                <div class="flex items-center gap-2">
                    <div class="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                        ${index + 1}
                    </div>
                    <span>${index + 1}</span>
                </div>
            </td>
            <td>
                <div class="font-semibold">${student.name}</div>
            </td>
            <td>
                <span class="department-badge department-${student.department}">
                    ${getDepartmentName(student.department)}
                </span>
            </td>
            <td>
                <span class="font-bold text-lg">${student.avgScore}%</span>
            </td>
            <td>
                <span class="text-gray-600">${student.quizzesTaken}</span>
            </td>
            <td class="progress-cell">
                <div class="flex items-center gap-2">
                    <div class="progress-bar">
                        <div class="progress-fill ${progressClass}" style="width: ${student.progress}%"></div>
                    </div>
                    <span class="text-sm text-gray-600">${student.progress}%</span>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

function loadRecentActivity() {
    const activities = [
        {
            type: "user",
            title: "New student registration",
            description: "Sarah Johnson joined the platform",
            time: "2 hours ago",
            icon: "fa-user-plus"
        },
        {
            type: "quiz",
            title: "Quiz completed",
            description: "Data Structures Midterm by John Smith",
            time: "4 hours ago",
            icon: "fa-feather-pointed"
        },
        {
            type: "question",
            title: "Question approved",
            description: "Advanced Algorithms question by Dr. Rahman",
            time: "6 hours ago",
            icon: "fa-question-circle"
        },
        {
            type: "system",
            title: "System backup",
            description: "Automatic system backup completed",
            time: "1 day ago",
            icon: "fa-database"
        },
        {
            type: "user",
            title: "Teacher account created",
            description: "Prof. Wilson joined as teacher",
            time: "1 day ago",
            icon: "fa-chalkboard-teacher"
        }
    ];
    
    const container = document.getElementById('recent-activity-list');
    container.innerHTML = '';
    
    activities.forEach(activity => {
        const activityElement = createActivityElement(activity);
        container.appendChild(activityElement);
    });
}

function createActivityElement(activity) {
    const div = document.createElement('div');
    div.className = `activity-item activity-${activity.type}`;
    
    div.innerHTML = `
        <div class="activity-icon">
            <i class="fa-solid ${activity.icon}"></i>
        </div>
        <div class="activity-content">
            <div class="font-semibold">${activity.title}</div>
            <div class="text-sm text-gray-600">${activity.description}</div>
        </div>
        <div class="activity-time">${activity.time}</div>
    `;
    
    return div;
}

function loadDepartmentComparison() {
    const departments = [
        {
            name: "Computer Science",
            code: "cse",
            avgScore: 78,
            students: 450,
            quizzes: 1250
        },
        {
            name: "Business Administration",
            code: "bba",
            avgScore: 72,
            students: 320,
            quizzes: 680
        },
        {
            name: "Electrical Engineering",
            code: "eee",
            avgScore: 75,
            students: 280,
            quizzes: 520
        },
        {
            name: "Civil Engineering",
            code: "civil",
            avgScore: 68,
            students: 180,
            quizzes: 350
        }
    ];
    
    const container = document.getElementById('department-comparison');
    container.innerHTML = '';
    
    departments.forEach(dept => {
        const item = document.createElement('div');
        item.className = `department-comparison-item department-${dept.code}`;
        
        item.innerHTML = `
            <div class="font-semibold">${dept.name}</div>
            <div class="department-bar">
                <div class="department-fill" style="width: ${dept.avgScore}%"></div>
            </div>
            <div class="text-right">
                <div class="font-bold">${dept.avgScore}%</div>
                <div class="text-xs text-gray-500">${dept.students} students</div>
            </div>
        `;
        
        container.appendChild(item);
    });
}

function updateStatistics() {
    // Update key metrics
    const metrics = {
        'active-users': '1,247',
        'quizzes-taken': '3,458',
        'questions-added': '2,847',
        'avg-score': '76%'
    };
    
    Object.keys(metrics).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = metrics[key];
        }
    });
}

function setupEventListeners() {
    // Report generation
    document.getElementById('generate-report').addEventListener('click', showGenerateReportModal);
    document.getElementById('cancel-report').addEventListener('click', hideGenerateReportModal);
    document.getElementById('generate-report-form').addEventListener('submit', handleGenerateReport);
    
    // Quick report buttons
    document.getElementById('user-report-btn').addEventListener('click', () => generateQuickReport('user_activity'));
    document.getElementById('quiz-report-btn').addEventListener('click', () => generateQuickReport('quiz_performance'));
    document.getElementById('system-report-btn').addEventListener('click', () => generateQuickReport('system_usage'));
    document.getElementById('financial-report-btn').addEventListener('click', () => generateQuickReport('financial'));
    
    // Logout
    document.getElementById('logout-btn').addEventListener('click', logout);
    
    // Date range dropdown
    document.querySelectorAll('.dropdown-content a').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const range = this.textContent;
            updateDateRange(range);
        });
    });
}

function showGenerateReportModal() {
    // Set default dates (last 30 days)
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    
    document.getElementById('report-start-date').value = startDate.toISOString().split('T')[0];
    document.getElementById('report-end-date').value = endDate.toISOString().split('T')[0];
    
    document.getElementById('generate-report-modal').classList.add('modal-open');
}

function hideGenerateReportModal() {
    document.getElementById('generate-report-modal').classList.remove('modal-open');
    document.getElementById('generate-report-form').reset();
}

function handleGenerateReport(e) {
    e.preventDefault();
    
    const reportType = document.getElementById('report-type').value;
    const startDate = document.getElementById('report-start-date').value;
    const endDate = document.getElementById('report-end-date').value;
    const format = document.querySelector('input[name="report-format"]:checked').value;
    const includeCharts = document.getElementById('include-charts').checked;
    
    showLoading();
    
    setTimeout(() => {
        hideGenerateReportModal();
        generateReport({
            type: reportType,
            startDate,
            endDate,
            format,
            includeCharts
        });
        hideLoading();
    }, 2000);
}

function generateQuickReport(type) {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    
    showLoading();
    
    setTimeout(() => {
        generateReport({
            type: type,
            startDate: startDate.toISOString().split('T')[0],
            endDate: endDate.toISOString().split('T')[0],
            format: 'pdf',
            includeCharts: true
        });
        hideLoading();
    }, 1500);
}

function generateReport(config) {
    const reportName = getReportTypeName(config.type);
    
    showNotification(`Generating ${reportName}...`, 'info');
    
    setTimeout(() => {
        showNotification(`${reportName} generated successfully!`, 'success');
        
        // Simulate download
        console.log('Report generated with config:', config);
        
        // In a real application, this would trigger a file download
        // window.location.href = `/api/reports/generate?${new URLSearchParams(config)}`;
    }, 2000);
}

function updateDateRange(range) {
    const button = document.querySelector('.dropdown button');
    const icon = button.querySelector('i.fa-calendar');
    const text = button.querySelector('span');
    
    text.textContent = range;
    
    showNotification(`Date range updated to: ${range}`, 'info');
    
    // Reload data based on new date range
    showLoading();
    setTimeout(() => {
        loadReportsData();
    }, 1000);
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

function getProgressClass(progress) {
    if (progress >= 90) return 'progress-excellent';
    if (progress >= 80) return 'progress-good';
    if (progress >= 70) return 'progress-average';
    return 'progress-poor';
}

function getReportTypeName(type) {
    const types = {
        'user_activity': 'User Activity Report',
        'quiz_performance': 'Quiz Performance Report',
        'system_usage': 'System Usage Report',
        'financial': 'Financial Report',
        'comprehensive': 'Comprehensive Report'
    };
    return types[type] || 'Report';
}

function showLoading() {
    // Show loading state for charts
    const chartContainers = document.querySelectorAll('.chart-container');
    chartContainers.forEach(container => {
        container.innerHTML = '<div class="chart-loading w-full h-full"></div>';
    });
    
    // Show loading for tables
    const tableBody = document.getElementById('top-students-table');
    if (tableBody) {
        tableBody.innerHTML = '';
        for (let i = 0; i < 5; i++) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><div class="table-loading w-6"></div></td>
                <td><div class="table-loading w-32"></div></td>
                <td><div class="table-loading w-24"></div></td>
                <td><div class="table-loading w-16"></div></td>
                <td><div class="table-loading w-12"></div></td>
                <td><div class="table-loading w-20"></div></td>
            `;
            tableBody.appendChild(row);
        }
    }
}

function hideLoading() {
    // Loading will be replaced by actual data
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