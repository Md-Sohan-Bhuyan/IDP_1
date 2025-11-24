// System Settings JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeSystemSettings();
    initializeNavigation();
    initializeEventListeners();
    loadSystemSettings();
});

function initializeSystemSettings() {
    // Initialize any page-specific functionality
    console.log('System Settings page initialized');
}

function initializeNavigation() {
    const menuItems = document.querySelectorAll('#system-settings-menu a');
    const settingsPanels = document.querySelectorAll('.settings-panel');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all menu items
            menuItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Hide all settings panels
            settingsPanels.forEach(panel => panel.classList.remove('active'));
            
            // Show selected panel
            const targetId = this.getAttribute('data-target');
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

function initializeEventListeners() {
    // Save settings buttons
    const saveButtons = document.querySelectorAll('.save-settings');
    saveButtons.forEach(button => {
        button.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            saveSystemSettings(section);
        });
    });
    
    // Backup actions
    const backupNowBtn = document.getElementById('backup-now');
    const restoreBackupBtn = document.getElementById('restore-backup');
    
    if (backupNowBtn) {
        backupNowBtn.addEventListener('click', initiateBackup);
    }
    
    if (restoreBackupBtn) {
        restoreBackupBtn.addEventListener('click', initiateRestore);
    }
    
    // Health check
    const healthCheckBtn = document.getElementById('run-health-check');
    if (healthCheckBtn) {
        healthCheckBtn.addEventListener('click', runHealthCheck);
    }
    
    // Health check modal
    const healthCheckModal = document.getElementById('health-check-modal');
    const closeHealthCheckBtn = document.getElementById('close-health-check');
    
    if (closeHealthCheckBtn && healthCheckModal) {
        closeHealthCheckBtn.addEventListener('click', () => {
            healthCheckModal.classList.remove('modal-open');
        });
        
        healthCheckModal.addEventListener('click', (e) => {
            if (e.target === healthCheckModal) {
                healthCheckModal.classList.remove('modal-open');
            }
        });
    }
    
    // Maintenance mode toggle
    const maintenanceToggle = document.getElementById('maintenance-mode');
    if (maintenanceToggle) {
        maintenanceToggle.addEventListener('change', function() {
            toggleMaintenanceMode(this.checked);
        });
    }
}

function loadSystemSettings() {
    // Load settings from localStorage or use default data
    const settings = JSON.parse(localStorage.getItem('system_settings')) || getDefaultSystemSettings();
    
    // Apply loaded settings to the form
    applySystemSettings(settings);
}

function getDefaultSystemSettings() {
    return {
        general: {
            systemName: 'IUS Quiz System',
            defaultLanguage: 'English',
            timeZone: '(GMT+6) Dhaka',
            dateFormat: 'DD/MM/YYYY',
            maintenanceMode: false
        },
        security: {
            strongPasswords: true,
            passwordChange: false,
            preventReuse: true,
            sessionTimeout: 30,
            maxLoginAttempts: 5,
            twoFactor: 'optional'
        },
        notifications: {
            systemAlerts: true,
            newUsers: true,
            dailySummary: false,
            backupAlerts: true,
            pendingApprovals: true,
            systemUpdates: true,
            performanceAlerts: false
        },
        backup: {
            schedule: 'Weekly',
            retention: '30 days',
            encrypt: true,
            cloudUpload: false
        },
        maintenance: {
            debugMode: false,
            customCSS: ''
        }
    };
}

function applySystemSettings(settings) {
    // General Settings
    if (settings.general) {
        setInputValue('system-name', settings.general.systemName);
        setSelectValue('default-language', settings.general.defaultLanguage);
        setSelectValue('system-timezone', settings.general.timeZone);
        setSelectValue('date-format', settings.general.dateFormat);
        setToggleState('maintenance-mode', settings.general.maintenanceMode);
    }
    
    // Security Settings
    if (settings.security) {
        setCheckboxState('security-settings .checkbox:nth-child(1)', settings.security.strongPasswords);
        setCheckboxState('security-settings .checkbox:nth-child(2)', settings.security.passwordChange);
        setCheckboxState('security-settings .checkbox:nth-child(3)', settings.security.preventReuse);
        setInputValue('security-settings input[type="number"]:nth-child(1)', settings.security.sessionTimeout);
        setInputValue('security-settings input[type="number"]:nth-child(2)', settings.security.maxLoginAttempts);
    }
    
    // Notification Settings
    if (settings.notifications) {
        setCheckboxState('notification-settings .checkbox:nth-child(1)', settings.notifications.systemAlerts);
        setCheckboxState('notification-settings .checkbox:nth-child(2)', settings.notifications.newUsers);
        setCheckboxState('notification-settings .checkbox:nth-child(3)', settings.notifications.dailySummary);
        setCheckboxState('notification-settings .checkbox:nth-child(4)', settings.notifications.backupAlerts);
        setCheckboxState('notification-settings .checkbox:nth-child(5)', settings.notifications.pendingApprovals);
        setCheckboxState('notification-settings .checkbox:nth-child(6)', settings.notifications.systemUpdates);
        setCheckboxState('notification-settings .checkbox:nth-child(7)', settings.notifications.performanceAlerts);
    }
    
    // Backup Settings
    if (settings.backup) {
        setSelectValue('backup-settings select:nth-child(1)', settings.backup.schedule);
        setSelectValue('backup-settings select:nth-child(2)', settings.backup.retention);
        setToggleState('backup-settings .toggle:nth-child(1)', settings.backup.encrypt);
        setToggleState('backup-settings .toggle:nth-child(2)', settings.backup.cloudUpload);
    }
}

function saveSystemSettings(section) {
    const button = document.querySelector(`.save-settings[data-section="${section}"]`);
    
    // Show loading state
    button.classList.add('loading');
    button.disabled = true;
    
    // Get current settings
    const currentSettings = JSON.parse(localStorage.getItem('system_settings')) || getDefaultSystemSettings();
    
    // Update the specific section
    switch (section) {
        case 'general':
            currentSettings.general = getGeneralSettings();
            break;
        case 'security':
            currentSettings.security = getSecuritySettings();
            break;
        case 'notifications':
            currentSettings.notifications = getNotificationSettings();
            break;
        case 'backup':
            currentSettings.backup = getBackupSettings();
            break;
        case 'integrations':
            // Integration settings would be handled differently
            break;
        case 'maintenance':
            currentSettings.maintenance = getMaintenanceSettings();
            break;
        case 'api':
            // API settings would be handled differently
            break;
        case 'advanced':
            currentSettings.advanced = getAdvancedSettings();
            break;
    }
    
    // Simulate API call
    setTimeout(() => {
        // Save to localStorage
        localStorage.setItem('system_settings', JSON.stringify(currentSettings));
        
        // Show success message
        showNotification(`${section.charAt(0).toUpperCase() + section.slice(1)} settings saved successfully!`, 'success');
        
        // Reset button state
        button.classList.remove('loading');
        button.disabled = false;
    }, 1500);
}

function getGeneralSettings() {
    return {
        systemName: document.getElementById('system-name').value,
        defaultLanguage: document.getElementById('default-language').value,
        timeZone: document.getElementById('system-timezone').value,
        dateFormat: document.getElementById('date-format').value,
        maintenanceMode: document.getElementById('maintenance-mode').checked
    };
}

function getSecuritySettings() {
    const checkboxes = document.querySelectorAll('#security-settings .checkbox');
    return {
        strongPasswords: checkboxes[0].checked,
        passwordChange: checkboxes[1].checked,
        preventReuse: checkboxes[2].checked,
        sessionTimeout: parseInt(document.querySelector('#security-settings input[type="number"]:nth-child(1)').value),
        maxLoginAttempts: parseInt(document.querySelector('#security-settings input[type="number"]:nth-child(2)').value),
        twoFactor: 'optional'
    };
}

function getNotificationSettings() {
    const checkboxes = document.querySelectorAll('#notification-settings .checkbox');
    return {
        systemAlerts: checkboxes[0].checked,
        newUsers: checkboxes[1].checked,
        dailySummary: checkboxes[2].checked,
        backupAlerts: checkboxes[3].checked,
        pendingApprovals: checkboxes[4].checked,
        systemUpdates: checkboxes[5].checked,
        performanceAlerts: checkboxes[6].checked
    };
}

function getBackupSettings() {
    return {
        schedule: document.querySelector('#backup-settings select:nth-child(1)').value,
        retention: document.querySelector('#backup-settings select:nth-child(2)').value,
        encrypt: document.querySelector('#backup-settings .toggle:nth-child(1)').checked,
        cloudUpload: document.querySelector('#backup-settings .toggle:nth-child(2)').checked
    };
}

function getMaintenanceSettings() {
    return {
        debugMode: false, // This would come from the form
        customCSS: '' // This would come from the form
    };
}

function getAdvancedSettings() {
    return {
        // Advanced settings would be collected from the form
    };
}

function initiateBackup() {
    showNotification('Initiating system backup...', 'info');
    
    // Simulate backup process
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += 10;
        showNotification(`Backup in progress... ${progress}%`, 'info');
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
                showNotification('System backup completed successfully!', 'success');
            }, 500);
        }
    }, 500);
}

function initiateRestore() {
    showNotification('Please select backup file to restore...', 'info');
    
    // In a real application, this would trigger a file input dialog
    // For demo purposes, we'll simulate the restore process
    setTimeout(() => {
        showNotification('System restore completed successfully!', 'success');
    }, 2000);
}

function runHealthCheck() {
    // Show health check modal
    document.getElementById('health-check-modal').classList.add('modal-open');
    
    // In a real application, this would run actual health checks
    showNotification('System health check completed!', 'success');
}

function toggleMaintenanceMode(enabled) {
    if (enabled) {
        if (!confirm('Are you sure you want to enable maintenance mode? This will restrict access to all non-admin users.')) {
            document.getElementById('maintenance-mode').checked = false;
            return;
        }
        
        showNotification('Maintenance mode enabled. Only administrators can access the system.', 'warning');
    } else {
        showNotification('Maintenance mode disabled. All users can access the system.', 'success');
    }
}

// Utility Functions
function setInputValue(selector, value) {
    const element = document.getElementById(selector);
    if (element) element.value = value;
}

function setSelectValue(selector, value) {
    const element = document.querySelector(selector);
    if (element) element.value = value;
}

function setToggleState(selector, state) {
    const element = document.querySelector(selector);
    if (element) element.checked = state;
}

function setCheckboxState(selector, state) {
    const element = document.querySelector(selector);
    if (element) element.checked = state;
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
window.AdminSystem = {
    showNotification,
    loadSystemSettings,
    saveSystemSettings
};