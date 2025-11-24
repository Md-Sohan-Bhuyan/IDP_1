// Admin Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeAdminDashboard();
    initializeQuickActions();
    loadDashboardData();
    initializeClock();
    initializeLogout();
});

function initializeAdminDashboard() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Load initial data
    loadPendingApprovals();
    loadRecentActivity();
    loadDepartmentHeads();
    updateSystemStats();
}

function initializeQuickActions() {
    // Quick action buttons
    const buttons = [
        'manage-teachers-btn',
        'approve-questions-btn',
        'department-management-btn',
        'system-reports-btn',
        'user-management-btn',
        'backup-system-btn',
        'system-logs-btn'
    ];
    
    buttons.forEach(buttonId => {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener('click', function() {
                handleQuickAction(buttonId);
            });
        }
    });
}

function handleQuickAction(actionId) {
    const actions = {
        'manage-teachers-btn': () => window.location.href = 'admin_teachers.html',
        'approve-questions-btn': () => window.location.href = 'admin_questions.html',
        'department-management-btn': () => window.location.href = 'admin_departments.html',
        'system-reports-btn': () => window.location.href = 'admin_reports.html',
        'user-management-btn': () => showNotification('Opening User Management...', 'info'),
        'backup-system-btn': () => initiateSystemBackup(),
        'system-logs-btn': () => showNotification('Opening System Logs...', 'info')
    };
    
    if (actions[actionId]) {
        actions[actionId]();
    }
}

function initiateSystemBackup() {
    showNotification('Initiating system backup...', 'info');
    
    // Simulate backup process
    setTimeout(() => {
        showNotification('System backup completed successfully!', 'success');
    }, 3000);
}

function loadDashboardData() {
    // Load data from localStorage or API
    updateNotificationCount();
}

function loadPendingApprovals() {
    const pendingList = document.getElementById('pending-approvals-list');
    const pendingCount = document.getElementById('pending-count');
    
    if (!pendingList) return;
    
    // Sample pending approvals data
    const pendingItems = [
        {
            type: 'question',
            title: 'Mathematics - Calculus Question',
            teacher: 'Dr. Ahmed',
            department: 'Mathematics',
            time: '2 hours ago'
        },
        {
            type: 'teacher',
            title: 'New Teacher Registration',
            teacher: 'Ms. Fatima',
            department: 'Physics',
            time: '5 hours ago'
        },
        {
            type: 'question',
            title: 'Physics - Thermodynamics',
            teacher: 'Dr. Rahman',
            department: 'Physics',
            time: '1 day ago'
        },
        {
            type: 'department',
            title: 'Department Update Request',
            teacher: 'Computer Science Dept',
            department: 'Computer Science',
            time: '2 days ago'
        }
    ];
    
    // Update count
    if (pendingCount) {
        pendingCount.textContent = `${pendingItems.length} pending`;
    }
    
    // Clear existing list
    pendingList.innerHTML = '';
    
    // Add pending items
    pendingItems.forEach(item => {
        const pendingItem = document.createElement('div');
        pendingItem.className = 'pending-item';
        
        const icon = item.type === 'question' ? 'fa-question-circle' :
                    item.type === 'teacher' ? 'fa-user-plus' : 'fa-building';
        
        const typeText = item.type === 'question' ? 'Question' :
                        item.type === 'teacher' ? 'Teacher' : 'Department';
        
        pendingItem.innerHTML = `
            <div class="flex-1">
                <div class="font-medium">${item.title}</div>
                <div class="text-sm text-gray-500">
                    <i class="fa-solid ${icon} mr-1"></i>
                    ${typeText} • ${item.department} • ${item.time}
                </div>
            </div>
            <div class="pending-status">Review</div>
        `;
        
        // Add click event to handle approval
        pendingItem.style.cursor = 'pointer';
        pendingItem.addEventListener('click', () => {
            handlePendingItemClick(item);
        });
        
        pendingList.appendChild(pendingItem);
    });
}

function handlePendingItemClick(item) {
    switch (item.type) {
        case 'question':
            window.location.href = 'admin_questions.html';
            break;
        case 'teacher':
            window.location.href = 'admin_teachers.html';
            break;
        case 'department':
            window.location.href = 'admin_departments.html';
            break;
    }
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
            text: 'New teacher registered: Dr. Mohammad Ali',
            time: '1 hour ago'
        },
        {
            icon: 'fa-question-circle',
            color: 'text-primary',
            bgColor: 'bg-primary/10',
            text: '15 new questions submitted for approval',
            time: '3 hours ago'
        },
        {
            icon: 'fa-check-circle',
            color: 'text-success',
            bgColor: 'bg-success/10',
            text: 'System backup completed successfully',
            time: '5 hours ago'
        },
        {
            icon: 'fa-chart-line',
            color: 'text-info',
            bgColor: 'bg-info/10',
            text: 'Monthly system report generated',
            time: '1 day ago'
        },
        {
            icon: 'fa-exclamation-triangle',
            color: 'text-warning',
            bgColor: 'bg-warning/10',
            text: 'High server load detected and resolved',
            time: '2 days ago'
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

function loadDepartmentHeads() {
    const headsList = document.getElementById('department-heads-list');
    
    if (!headsList) return;
    
    // Sample department heads data
    const departmentHeads = [
        {
            name: 'Dr. Mohammad Rahman',
            department: 'Computer Science',
            email: 'm.rahman@ius.ac.bd',
            status: 'active'
        },
        {
            name: 'Dr. Ahmed Khan',
            department: 'Mathematics',
            email: 'a.khan@ius.ac.bd',
            status: 'active'
        },
        {
            name: 'Dr. Fatima Begum',
            department: 'Physics',
            email: 'f.begum@ius.ac.bd',
            status: 'active'
        },
        {
            name: 'Dr. Raj Sharma',
            department: 'Chemistry',
            email: 'r.sharma@ius.ac.bd',
            status: 'away'
        }
    ];
    
    // Clear existing list
    headsList.innerHTML = '';
    
    // Add department heads
    departmentHeads.forEach(head => {
        const headItem = document.createElement('div');
        headItem.className = 'department-head';
        
        const initials = head.name.split(' ').map(n => n[0]).join('');
        const statusClass = head.status === 'active' ? 'badge-success' : 'badge-warning';
        const statusText = head.status === 'active' ? 'Active' : 'Away';
        
        headItem.innerHTML = `
            <div class="head-avatar">${initials}</div>
            <div class="head-info">
                <div class="font-medium text-sm">${head.name}</div>
                <div class="head-department">${head.department}</div>
            </div>
            <span class="badge ${statusClass} badge-sm">${statusText}</span>
        `;
        
        headsList.appendChild(headItem);
    });
}

function updateSystemStats() {
    // Sample system statistics
    const stats = {
        totalTeachers: 47,
        totalDepartments: 8,
        pendingQuestions: 23,
        totalStudents: 1247
    };
    
    // Update DOM elements
    document.getElementById('total-teachers').textContent = stats.totalTeachers;
    document.getElementById('total-departments').textContent = stats.totalDepartments;
    document.getElementById('pending-questions').textContent = stats.pendingQuestions;
    document.getElementById('total-students').textContent = stats.totalStudents.toLocaleString();
    
    // Update teachers status
    const teachersStatus = document.getElementById('teachers-status');
    if (teachersStatus) {
        teachersStatus.textContent = '2 pending approval';
        teachersStatus.className = 'stat-desc text-warning';
    }
}

function updateNotificationCount() {
    const notificationCount = document.getElementById('notification-count');
    if (notificationCount) {
        // Sample notification count
        const count = 5;
        notificationCount.textContent = count > 0 ? count : '';
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
window.AdminDashboard = {
    showNotification,
    updateSystemStats,
    loadPendingApprovals
};

// Initialize when page loads
window.addEventListener('load', initializeAdminDashboard);