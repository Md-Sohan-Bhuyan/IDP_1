// Super Admin Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize clock
    initializeClock();
    
    // Load dashboard data
    loadDashboardData();
    
    // Set up event listeners
    setupEventListeners();
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
});

// Initialize real-time clock
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

// Load dashboard data
function loadDashboardData() {
    // Simulate API calls with setTimeout
    setTimeout(() => {
        loadPendingApprovals();
        loadRecentActivity();
        loadSystemStats();
    }, 1000);
}

// Load pending approvals
function loadPendingApprovals() {
    const pendingApprovals = [
        {
            type: 'question',
            title: 'New Physics Question',
            user: 'Dr. Rahman',
            time: '2 hours ago',
            priority: 'high'
        },
        {
            type: 'user',
            title: 'New Teacher Registration',
            user: 'Sarah Johnson',
            time: '4 hours ago',
            priority: 'medium'
        },
        {
            type: 'department',
            title: 'Department Update Request',
            user: 'Computer Science Dept',
            time: '1 day ago',
            priority: 'low'
        },
        {
            type: 'question',
            title: 'Mathematics Advanced Question',
            user: 'Prof. Ahmed',
            time: '1 day ago',
            priority: 'medium'
        }
    ];
    
    const container = document.getElementById('pending-approvals-list');
    container.innerHTML = '';
    
    pendingApprovals.forEach(approval => {
        const approvalElement = createPendingApprovalElement(approval);
        container.appendChild(approvalElement);
    });
}

// Create pending approval element
function createPendingApprovalElement(approval) {
    const div = document.createElement('div');
    div.className = 'flex items-center justify-between p-4 bg-base-200 rounded-lg fade-in';
    
    const iconClass = {
        'question': 'fa-question-circle text-warning',
        'user': 'fa-user-plus text-info',
        'department': 'fa-building text-accent'
    }[approval.type];
    
    const priorityClass = {
        'high': 'badge-error',
        'medium': 'badge-warning',
        'low': 'badge-info'
    }[approval.priority];
    
    div.innerHTML = `
        <div class="flex items-center gap-3">
            <i class="fa-solid ${iconClass} text-xl"></i>
            <div>
                <div class="font-semibold">${approval.title}</div>
                <div class="text-sm text-gray-600">By ${approval.user} • ${approval.time}</div>
            </div>
        </div>
        <div class="flex items-center gap-2">
            <span class="badge badge-sm ${priorityClass}">${approval.priority}</span>
            <button class="btn btn-xs btn-primary">Review</button>
        </div>
    `;
    
    return div;
}

// Load recent activity
function loadRecentActivity() {
    const activities = [
        {
            action: 'User registered',
            details: 'New teacher: Dr. Smith',
            time: '10 minutes ago',
            icon: 'fa-user-plus text-success'
        },
        {
            action: 'Question approved',
            details: 'Advanced Algorithms question',
            time: '25 minutes ago',
            icon: 'fa-check-circle text-info'
        },
        {
            action: 'Quiz created',
            details: 'Physics Midterm by Dr. Rahman',
            time: '1 hour ago',
            icon: 'fa-feather-pointed text-primary'
        },
        {
            action: 'System backup',
            details: 'Automatic backup completed',
            time: '2 hours ago',
            icon: 'fa-database text-accent'
        },
        {
            action: 'User role changed',
            details: 'John Doe promoted to Teacher',
            time: '3 hours ago',
            icon: 'fa-user-shield text-warning'
        }
    ];
    
    const container = document.getElementById('recent-activity-list');
    container.innerHTML = '';
    
    activities.forEach(activity => {
        const activityElement = createActivityElement(activity);
        container.appendChild(activityElement);
    });
}

// Create activity element
function createActivityElement(activity) {
    const div = document.createElement('div');
    div.className = 'flex items-start gap-3 p-3 hover:bg-base-200 rounded-lg transition-colors fade-in';
    
    div.innerHTML = `
        <i class="fa-solid ${activity.icon} mt-1"></i>
        <div class="flex-1">
            <div class="font-medium">${activity.action}</div>
            <div class="text-sm text-gray-600">${activity.details}</div>
        </div>
        <div class="text-xs text-gray-500 whitespace-nowrap">${activity.time}</div>
    `;
    
    return div;
}

// Load system statistics
function loadSystemStats() {
    // Update stats with simulated data
    const stats = {
        totalUsers: '1,342',
        totalDepartments: '8',
        pendingQuestions: '28',
        activeQuizzes: '15',
        usersStatus: '5 pending approval'
    };
    
    Object.keys(stats).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = stats[key];
        }
    });
}

// Set up event listeners
function setupEventListeners() {
    // Quick action buttons
    document.getElementById('manage-users-btn')?.addEventListener('click', () => {
        window.location.href = 'superadmin_users.html';
    });
    
    document.getElementById('approve-questions-btn')?.addEventListener('click', () => {
        window.location.href = 'superadmin_questions.html';
    });
    
    document.getElementById('department-management-btn')?.addEventListener('click', () => {
        window.location.href = 'superadmin_departments.html';
    });
    
    document.getElementById('system-reports-btn')?.addEventListener('click', () => {
        window.location.href = 'superadmin_reports.html';
    });
    
    document.getElementById('quiz-management-btn')?.addEventListener('click', () => {
        window.location.href = 'superadmin_quizzes.html';
    });
    
    document.getElementById('system-settings-btn')?.addEventListener('click', () => {
        window.location.href = 'superadmin_system.html';
    });
    
    // Admin tools buttons
    document.getElementById('backup-system-btn')?.addEventListener('click', () => {
        showBackupModal();
    });
    
    document.getElementById('system-logs-btn')?.addEventListener('click', () => {
        window.location.href = 'superadmin_logs.html';
    });
    
    document.getElementById('user-activity-btn')?.addEventListener('click', () => {
        window.location.href = 'superadmin_activity.html';
    });
    
    document.getElementById('security-audit-btn')?.addEventListener('click', () => {
        runSecurityAudit();
    });
    
    // System check button
    document.getElementById('run-system-check')?.addEventListener('click', () => {
        runSystemCheck();
    });
    
    // Logout button
    document.getElementById('logout-btn')?.addEventListener('click', (e) => {
        e.preventDefault();
        logout();
    });
}

// Show backup modal
function showBackupModal() {
    // Create and show backup modal
    const modal = document.createElement('div');
    modal.className = 'modal modal-open';
    modal.innerHTML = `
        <div class="modal-box">
            <h3 class="font-bold text-lg">System Backup</h3>
            <p class="py-4">Are you sure you want to create a system backup? This may take several minutes.</p>
            <div class="modal-action">
                <button class="btn btn-ghost" id="cancel-backup">Cancel</button>
                <button class="btn btn-primary" id="confirm-backup">
                    <i class="fa-solid fa-database mr-2"></i>
                    Start Backup
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners for modal buttons
    document.getElementById('cancel-backup').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    document.getElementById('confirm-backup').addEventListener('click', () => {
        startBackupProcess();
        document.body.removeChild(modal);
    });
}

// Start backup process
function startBackupProcess() {
    showNotification('System backup started... This may take a few minutes.', 'info');
    
    // Simulate backup process
    setTimeout(() => {
        showNotification('System backup completed successfully!', 'success');
    }, 3000);
}

// Run security audit
function runSecurityAudit() {
    showNotification('Security audit initiated...', 'info');
    
    // Simulate audit process
    setTimeout(() => {
        showNotification('Security audit completed. No issues found.', 'success');
    }, 2000);
}

// Run system check
function runSystemCheck() {
    const button = document.getElementById('run-system-check');
    const originalText = button.innerHTML;
    
    button.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Checking...';
    button.disabled = true;
    
    // Simulate system check
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
        showNotification('System check completed. All systems operational.', 'success');
    }, 1500);
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
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
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            document.body.removeChild(notification);
        }
    }, 3000);
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        // Simulate logout process
        showNotification('Logging out...', 'info');
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }
}

// Utility function to format numbers
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Utility function to format dates
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeClock,
        loadDashboardData,
        showNotification,
        formatNumber,
        formatDate
    };
}