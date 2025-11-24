// Settings Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeSettingsPage();
    initializeNavigation();
    initializeFormSubmissions();
    loadSettingsData();
});

function initializeSettingsPage() {
    // Initialize any page-specific functionality
    console.log('Settings page initialized');
}

function initializeNavigation() {
    const menuItems = document.querySelectorAll('#settings-menu a');
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

function initializeFormSubmissions() {
    // Save settings buttons
    const saveButtons = document.querySelectorAll('.save-settings');
    saveButtons.forEach(button => {
        button.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            saveSettings(section);
        });
    });
    
    // Theme selection
    const themeRadios = document.querySelectorAll('.theme-radio');
    themeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                applyTheme(this.id.replace('theme-', ''));
            }
        });
    });
    
    // Backup actions
    initializeBackupActions();
}

function initializeBackupActions() {
    const backupButtons = document.querySelectorAll('.backup-actions .btn');
    backupButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent.trim();
            handleBackupAction(action);
        });
    });
}

function loadSettingsData() {
    // Load settings from localStorage or use default data
    const settings = JSON.parse(localStorage.getItem('teacher_settings')) || getDefaultSettings();
    
    // Apply loaded settings to the form
    applySettingsToForm(settings);
}

function getDefaultSettings() {
    return {
        general: {
            language: 'English',
            timeZone: '(GMT+6) Dhaka',
            dateFormat: 'DD/MM/YYYY',
            autoSave: true,
            emailConfirmations: false
        },
        quiz: {
            defaultDuration: 30,
            passingPercentage: 60,
            shuffleQuestions: true,
            showResults: false,
            allowRetakes: true,
            maxRetakes: 3
        },
        notifications: {
            email: {
                quizSubmissions: true,
                questionApprovals: false,
                systemUpdates: true,
                studentRegistrations: true
            },
            inApp: {
                newResults: true,
                pendingApprovals: true,
                systemMaintenance: false
            }
        },
        privacy: {
            twoFactor: false,
            showOnlineStatus: true,
            dataCollection: false,
            dataRetention: '1 year'
        },
        appearance: {
            theme: 'light',
            fontSize: 'Medium',
            density: 'Normal',
            animations: true
        },
        integrations: {
            googleClassroom: false,
            microsoftTeams: false,
            emailSystem: true
        },
        backup: {
            frequency: 'Weekly',
            includeStudentData: true,
            encryptBackups: false
        }
    };
}

function applySettingsToForm(settings) {
    // General Settings
    if (settings.general) {
        setSelectValue('general-settings select:nth-child(1)', settings.general.language);
        setSelectValue('general-settings select:nth-child(2)', settings.general.timeZone);
        setSelectValue('general-settings select:nth-child(3)', settings.general.dateFormat);
        setToggleState('general-settings .toggle:nth-child(1)', settings.general.autoSave);
        setToggleState('general-settings .toggle:nth-child(2)', settings.general.emailConfirmations);
    }
    
    // Quiz Settings
    if (settings.quiz) {
        setInputValue('quiz-settings input[type="number"]:nth-child(1)', settings.quiz.defaultDuration);
        setInputValue('quiz-settings input[type="number"]:nth-child(2)', settings.quiz.passingPercentage);
        setToggleState('quiz-settings .toggle:nth-child(1)', settings.quiz.shuffleQuestions);
        setToggleState('quiz-settings .toggle:nth-child(2)', settings.quiz.showResults);
        setToggleState('quiz-settings .toggle:nth-child(3)', settings.quiz.allowRetakes);
        setInputValue('quiz-settings input[type="number"]:nth-child(3)', settings.quiz.maxRetakes);
    }
    
    // Notification Settings
    if (settings.notifications) {
        setCheckboxState('notification-settings .checkbox:nth-child(1)', settings.notifications.email.quizSubmissions);
        setCheckboxState('notification-settings .checkbox:nth-child(2)', settings.notifications.email.questionApprovals);
        setCheckboxState('notification-settings .checkbox:nth-child(3)', settings.notifications.email.systemUpdates);
        setCheckboxState('notification-settings .checkbox:nth-child(4)', settings.notifications.email.studentRegistrations);
        setCheckboxState('notification-settings .checkbox:nth-child(5)', settings.notifications.inApp.newResults);
        setCheckboxState('notification-settings .checkbox:nth-child(6)', settings.notifications.inApp.pendingApprovals);
        setCheckboxState('notification-settings .checkbox:nth-child(7)', settings.notifications.inApp.systemMaintenance);
    }
    
    // Privacy Settings
    if (settings.privacy) {
        setToggleState('privacy-settings .toggle:nth-child(1)', settings.privacy.showOnlineStatus);
        setToggleState('privacy-settings .toggle:nth-child(2)', settings.privacy.dataCollection);
        setSelectValue('privacy-settings select', settings.privacy.dataRetention);
    }
    
    // Appearance Settings
    if (settings.appearance) {
        setRadioState(`#theme-${settings.appearance.theme}`, true);
        setSelectValue('appearance-settings select:nth-child(1)', settings.appearance.fontSize);
        setSelectValue('appearance-settings select:nth-child(2)', settings.appearance.density);
        setToggleState('appearance-settings .toggle', settings.appearance.animations);
    }
    
    // Backup Settings
    if (settings.backup) {
        setSelectValue('backup-settings select', settings.backup.frequency);
        setToggleState('backup-settings .toggle:nth-child(1)', settings.backup.includeStudentData);
        setToggleState('backup-settings .toggle:nth-child(2)', settings.backup.encryptBackups);
    }
}

function saveSettings(section) {
    const button = document.querySelector(`.save-settings[data-section="${section}"]`);
    
    // Show loading state
    button.classList.add('loading');
    button.disabled = true;
    
    // Get current settings
    const currentSettings = JSON.parse(localStorage.getItem('teacher_settings')) || getDefaultSettings();
    
    // Update the specific section
    switch (section) {
        case 'general':
            currentSettings.general = getGeneralSettings();
            break;
        case 'quiz':
            currentSettings.quiz = getQuizSettings();
            break;
        case 'notifications':
            currentSettings.notifications = getNotificationSettings();
            break;
        case 'privacy':
            currentSettings.privacy = getPrivacySettings();
            break;
        case 'appearance':
            currentSettings.appearance = getAppearanceSettings();
            break;
        case 'backup':
            currentSettings.backup = getBackupSettings();
            break;
    }
    
    // Simulate API call
    setTimeout(() => {
        // Save to localStorage
        localStorage.setItem('teacher_settings', JSON.stringify(currentSettings));
        
        // Show success message
        showNotification(`${section.charAt(0).toUpperCase() + section.slice(1)} settings saved successfully!`, 'success');
        
        // Reset button state
        button.classList.remove('loading');
        button.disabled = false;
    }, 1500);
}

function getGeneralSettings() {
    const panel = document.getElementById('general-settings');
    return {
        language: panel.querySelector('select:nth-child(1)').value,
        timeZone: panel.querySelector('select:nth-child(2)').value,
        dateFormat: panel.querySelector('select:nth-child(3)').value,
        autoSave: panel.querySelector('.toggle:nth-child(1)').checked,
        emailConfirmations: panel.querySelector('.toggle:nth-child(2)').checked
    };
}

function getQuizSettings() {
    const panel = document.getElementById('quiz-settings');
    return {
        defaultDuration: parseInt(panel.querySelector('input[type="number"]:nth-child(1)').value),
        passingPercentage: parseInt(panel.querySelector('input[type="number"]:nth-child(2)').value),
        shuffleQuestions: panel.querySelector('.toggle:nth-child(1)').checked,
        showResults: panel.querySelector('.toggle:nth-child(2)').checked,
        allowRetakes: panel.querySelector('.toggle:nth-child(3)').checked,
        maxRetakes: parseInt(panel.querySelector('input[type="number"]:nth-child(3)').value)
    };
}

function getNotificationSettings() {
    const panel = document.getElementById('notification-settings');
    const checkboxes = panel.querySelectorAll('.checkbox');
    return {
        email: {
            quizSubmissions: checkboxes[0].checked,
            questionApprovals: checkboxes[1].checked,
            systemUpdates: checkboxes[2].checked,
            studentRegistrations: checkboxes[3].checked
        },
        inApp: {
            newResults: checkboxes[4].checked,
            pendingApprovals: checkboxes[5].checked,
            systemMaintenance: checkboxes[6].checked
        }
    };
}

function getPrivacySettings() {
    const panel = document.getElementById('privacy-settings');
    return {
        twoFactor: false, // This would come from backend
        showOnlineStatus: panel.querySelector('.toggle:nth-child(1)').checked,
        dataCollection: panel.querySelector('.toggle:nth-child(2)').checked,
        dataRetention: panel.querySelector('select').value
    };
}

function getAppearanceSettings() {
    const panel = document.getElementById('appearance-settings');
    const selectedTheme = panel.querySelector('.theme-radio:checked');
    return {
        theme: selectedTheme ? selectedTheme.id.replace('theme-', '') : 'light',
        fontSize: panel.querySelector('select:nth-child(1)').value,
        density: panel.querySelector('select:nth-child(2)').value,
        animations: panel.querySelector('.toggle').checked
    };
}

function getBackupSettings() {
    const panel = document.getElementById('backup-settings');
    return {
        frequency: panel.querySelector('select').value,
        includeStudentData: panel.querySelector('.toggle:nth-child(1)').checked,
        encryptBackups: panel.querySelector('.toggle:nth-child(2)').checked
    };
}

function applyTheme(theme) {
    // This would typically update the CSS variables or class on the body
    document.body.setAttribute('data-theme', theme);
    showNotification(`Theme changed to ${theme}`, 'success');
}

function handleBackupAction(action) {
    switch (action) {
        case 'Export All Data':
            exportData('all');
            break;
        case 'Export Questions':
            exportData('questions');
            break;
        case 'Export Quiz Results':
            exportData('results');
            break;
        case 'Import Data':
            importData();
            break;
        default:
            showNotification(`Backup action: ${action}`, 'info');
    }
}

function exportData(type) {
    showNotification(`Exporting ${type} data...`, 'info');
    
    // Simulate export process
    setTimeout(() => {
        showNotification(`${type.charAt(0).toUpperCase() + type.slice(1)} data exported successfully!`, 'success');
    }, 2000);
}

function importData() {
    showNotification('Please select file to import...', 'info');
    
    // In a real application, this would trigger a file input dialog
    // For demo purposes, we'll simulate the import
    setTimeout(() => {
        showNotification('Data imported successfully!', 'success');
    }, 2000);
}

// Utility Functions
function setSelectValue(selector, value) {
    const element = document.querySelector(selector);
    if (element) element.value = value;
}

function setInputValue(selector, value) {
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

function setRadioState(selector, state) {
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
window.TeacherSettings = {
    showNotification,
    loadSettingsData,
    saveSettings
};