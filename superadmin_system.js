// Super Admin System Settings JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeClock();
    loadSystemData();
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

function loadSystemData() {
    loadSystemLogs();
}

function loadSystemLogs() {
    const logs = [
        {
            timestamp: '2024-01-15 14:30:15',
            level: 'info',
            module: 'Authentication',
            message: 'User Super Admin logged in successfully',
            user: 'Super Admin'
        },
        {
            timestamp: '2024-01-15 14:25:30',
            level: 'warning',
            module: 'Database',
            message: 'High database load detected',
            user: 'System'
        },
        {
            timestamp: '2024-01-15 14:20:45',
            level: 'info',
            module: 'Backup',
            message: 'Automatic backup completed successfully',
            user: 'System'
        },
        {
            timestamp: '2024-01-15 14:15:20',
            level: 'error',
            module: 'Email',
            message: 'Failed to send notification email',
            user: 'System'
        },
        {
            timestamp: '2024-01-15 14:10:35',
            level: 'info',
            module: 'Quiz',
            message: 'Quiz "Data Structures Midterm" started',
            user: 'Dr. Rahman Ahmed'
        },
        {
            timestamp: '2024-01-15 14:05:50',
            level: 'debug',
            module: 'API',
            message: 'API request processed: /api/questions/pending',
            user: 'System'
        },
        {
            timestamp: '2024-01-15 14:00:15',
            level: 'info',
            module: 'User',
            message: 'New student registration: Sarah Johnson',
            user: 'System'
        }
    ];
    
    renderSystemLogs(logs);
}

function renderSystemLogs(logs) {
    const tableBody = document.getElementById('system-logs-table');
    tableBody.innerHTML = '';
    
    if (logs.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center py-8 text-gray-500">
                    <i class="fa-solid fa-file-lines text-4xl mb-4 block"></i>
                    No log entries found
                </td>
            </tr>
        `;
        return;
    }
    
    logs.forEach(log => {
        const row = document.createElement('tr');
        const levelClass = `log-${log.level}`;
        
        row.innerHTML = `
            <td>
                <div class="log-timestamp">${log.timestamp}</div>
            </td>
            <td>
                <span class="log-level ${levelClass}">
                    ${log.level.charAt(0).toUpperCase() + log.level.slice(1)}
                </span>
            </td>
            <td>
                <span class="font-mono text-sm">${log.module}</span>
            </td>
            <td>
                <div class="log-message" title="${log.message}">${log.message}</div>
            </td>
            <td>
                <span class="text-sm">${log.user}</span>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

function setupEventListeners() {
    // Settings menu tabs
    document.querySelectorAll('#settings-menu a').forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            switchSettingsTab(this.dataset.tab);
        });
    });
    
    // Backup buttons
    document.getElementById('backup-database').addEventListener('click', () => showBackupModal('database'));
    document.getElementById('backup-system').addEventListener('click', () => showBackupModal('system'));
    
    // Restore functionality
    document.getElementById('backup-files').addEventListener('change', updateRestoreButton);
    document.getElementById('restore-backup').addEventListener('click', showRestoreModal);
    
    // Log actions
    document.getElementById('refresh-logs').addEventListener('click', refreshLogs);
    document.getElementById('clear-logs').addEventListener('click', clearLogs);
    document.getElementById('export-logs').addEventListener('click', exportLogs);
    
    // Log filters
    document.getElementById('log-level').addEventListener('change', filterLogs);
    document.getElementById('log-date').addEventListener('change', filterLogs);
    document.getElementById('log-search').addEventListener('input', filterLogs);
    
    // Modal actions
    document.getElementById('cancel-backup').addEventListener('click', hideBackupModal);
    document.getElementById('confirm-backup').addEventListener('click', handleBackup);
    document.getElementById('cancel-restore').addEventListener('click', hideRestoreModal);
    document.getElementById('confirm-restore').addEventListener('click', handleRestore);
    
    // Form submissions
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });
    
    // Logout
    document.getElementById('logout-btn').addEventListener('click', logout);
}

function switchSettingsTab(tabName) {
    // Update active menu item
    document.querySelectorAll('#settings-menu a').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Show corresponding tab content
    document.querySelectorAll('.settings-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

function showBackupModal(type) {
    const modal = document.getElementById('backup-confirm-modal');
    modal.dataset.backupType = type;
    
    const title = type === 'database' ? 'Database Backup' : 'Full System Backup';
    modal.querySelector('h3').textContent = `Confirm ${title}`;
    
    modal.classList.add('modal-open');
}

function hideBackupModal() {
    document.getElementById('backup-confirm-modal').classList.remove('modal-open');
}

function showRestoreModal() {
    document.getElementById('restore-confirm-modal').classList.add('modal-open');
}

function hideRestoreModal() {
    document.getElementById('restore-confirm-modal').classList.remove('modal-open');
}

function updateRestoreButton() {
    const select = document.getElementById('backup-files');
    const button = document.getElementById('restore-backup');
    button.disabled = !select.value;
}

function handleBackup() {
    const type = document.getElementById('backup-confirm-modal').dataset.backupType;
    const backupType = type === 'database' ? 'Database' : 'System';
    
    hideBackupModal();
    showNotification(`Starting ${backupType} backup...`, 'info');
    
    // Simulate backup process
    simulateBackupProgress(type);
}

function handleRestore() {
    const selectedFile = document.getElementById('backup-files').value;
    
    hideRestoreModal();
    showNotification(`Restoring system from ${selectedFile}...`, 'warning');
    
    // Simulate restore process
    setTimeout(() => {
        showNotification('System restore completed successfully!', 'success');
        
        // Reload the page to reflect changes
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }, 3000);
}

function simulateBackupProgress(type) {
    const backupType = type === 'database' ? 'Database' : 'System';
    let progress = 0;
    
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            showNotification(`${backupType} backup completed successfully!`, 'success');
        }
        
        // In a real application, you would update a progress bar here
        console.log(`${backupType} backup progress: ${Math.round(progress)}%`);
    }, 500);
}

function refreshLogs() {
    showNotification('Refreshing system logs...', 'info');
    setTimeout(() => {
        loadSystemLogs();
        showNotification('Logs refreshed successfully!', 'success');
    }, 1000);
}

function clearLogs() {
    if (!confirm('Are you sure you want to clear all system logs? This action cannot be undone.')) {
        return;
    }
    
    showNotification('Clearing system logs...', 'warning');
    setTimeout(() => {
        const tableBody = document.getElementById('system-logs-table');
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center py-8 text-gray-500">
                    <i class="fa-solid fa-broom text-4xl mb-4 block"></i>
                    Logs have been cleared
                </td>
            </tr>
        `;
        showNotification('System logs cleared successfully!', 'success');
    }, 1500);
}

function exportLogs() {
    showNotification('Exporting system logs...', 'info');
    setTimeout(() => {
        showNotification('Logs exported successfully!', 'success');
        
        // In a real application, this would trigger a file download
        // window.location.href = '/api/system/logs/export';
    }, 1500);
}

function filterLogs() {
    const levelFilter = document.getElementById('log-level').value;
    const dateFilter = document.getElementById('log-date').value;
    const searchFilter = document.getElementById('log-search').value.toLowerCase();
    
    showNotification('Filtering logs...', 'info');
    
    // In a real application, this would make an API call
    setTimeout(() => {
        loadSystemLogs(); // Reload with filtered data
        showNotification('Logs filtered successfully!', 'success');
    }, 500);
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const tab = form.closest('.settings-tab').id.replace('-tab', '');
    
    showNotification(`Saving ${getTabName(tab)} settings...`, 'info');
    
    // Simulate API call
    setTimeout(() => {
        showNotification(`${getTabName(tab)} settings saved successfully!`, 'success');
        
        // In a real application, you would send the form data to the server
        const formData = new FormData(form);
        console.log('Form data:', Object.fromEntries(formData));
    }, 1500);
}

function getTabName(tabId) {
    const names = {
        'general': 'General',
        'security': 'Security',
        'notifications': 'Notification',
        'backup': 'Backup',
        'maintenance': 'Maintenance',
        'api': 'API',
        'logs': 'Log'
    };
    return names[tabId] || 'Settings';
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