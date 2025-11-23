// Settings Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all settings functionality
    initializeSettings();
    initializeNavigation();
    initializeModals();
    initializeThemeSelector();
    initializeFontSizeControls();
    initializePasswordStrength();
    initializeSecurityLog();
    initializeAutoSave();
    initializeFormSubmissions();
    initializeClock();
    initializeLogout();
});

function initializeSettings() {
    // Load saved settings from localStorage
    loadSavedSettings();
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
}

function initializeNavigation() {
    // Settings menu navigation
    const menuItems = document.querySelectorAll('.settings-menu-item');
    const sections = document.querySelectorAll('.settings-section');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items and sections
            menuItems.forEach(i => i.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Show corresponding section
            const target = this.getAttribute('data-target');
            const targetSection = document.getElementById(`${target}-section`);
            if (targetSection) {
                targetSection.classList.add('active');
            }
            
            // Update URL hash
            window.location.hash = target;
        });
    });
    
    // Handle URL hash on page load
    if (window.location.hash) {
        const target = window.location.hash.replace('#', '');
        const menuItem = document.querySelector(`[data-target="${target}"]`);
        if (menuItem) {
            menuItem.click();
        }
    }
}

function initializeModals() {
    // Change Email Modal
    const changeEmailBtn = document.getElementById('change-email-btn');
    const changeEmailModal = document.getElementById('change-email-modal');
    const cancelEmailBtn = document.getElementById('cancel-email');
    
    if (changeEmailBtn && changeEmailModal) {
        changeEmailBtn.addEventListener('click', () => {
            changeEmailModal.classList.add('modal-open');
        });
        
        cancelEmailBtn.addEventListener('click', () => {
            changeEmailModal.classList.remove('modal-open');
        });
        
        // Close modal when clicking outside
        changeEmailModal.addEventListener('click', (e) => {
            if (e.target === changeEmailModal) {
                changeEmailModal.classList.remove('modal-open');
            }
        });
    }
    
    // Change Password Modal
    const changePasswordBtn = document.getElementById('change-password-btn');
    const changePasswordModal = document.getElementById('change-password-modal');
    const cancelPasswordBtn = document.getElementById('cancel-password');
    
    if (changePasswordBtn && changePasswordModal) {
        changePasswordBtn.addEventListener('click', () => {
            changePasswordModal.classList.add('modal-open');
        });
        
        cancelPasswordBtn.addEventListener('click', () => {
            changePasswordModal.classList.remove('modal-open');
        });
        
        // Close modal when clicking outside
        changePasswordModal.addEventListener('click', (e) => {
            if (e.target === changePasswordModal) {
                changePasswordModal.classList.remove('modal-open');
            }
        });
    }
    
    // Danger zone buttons
    const deleteAccountBtn = document.getElementById('delete-account-btn');
    const exportDataBtn = document.getElementById('export-data-btn');
    const clearDataBtn = document.getElementById('clear-data-btn');
    
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                showNotification('Account deletion request sent. You will receive a confirmation email.', 'error');
            }
        });
    }
    
    if (exportDataBtn) {
        exportDataBtn.addEventListener('click', () => {
            showNotification('Preparing your data export...', 'info');
            // Simulate export process
            setTimeout(() => {
                showNotification('Your data has been exported successfully!', 'success');
            }, 2000);
        });
    }
    
    if (clearDataBtn) {
        clearDataBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all your data? This will reset all your progress and settings.')) {
                showNotification('All data has been cleared successfully.', 'info');
                // Reset settings to default
                resetToDefaultSettings();
            }
        });
    }
}

function initializeThemeSelector() {
    const themeOptions = document.querySelectorAll('.theme-option');
    
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            
            // Remove active class from all options
            themeOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Apply theme
            applyTheme(theme);
            
            // Save theme preference
            saveSetting('theme', theme);
        });
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedThemeOption = document.querySelector(`[data-theme="${savedTheme}"]`);
    if (savedThemeOption) {
        savedThemeOption.click();
    }
}

function applyTheme(theme) {
    const html = document.documentElement;
    
    // Remove existing theme classes
    html.classList.remove('light', 'dark');
    
    if (theme === 'auto') {
        // Use system preference
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            html.classList.add('dark');
        } else {
            html.classList.add('light');
        }
    } else {
        html.classList.add(theme);
    }
    
    // Update theme in DaisyUI
    html.setAttribute('data-theme', theme === 'auto' ? 'light' : theme);
}

function initializeFontSizeControls() {
    const fontDecreaseBtn = document.getElementById('font-decrease');
    const fontIncreaseBtn = document.getElementById('font-increase');
    const fontSizeDisplay = document.getElementById('font-size-display');
    
    if (fontDecreaseBtn && fontIncreaseBtn && fontSizeDisplay) {
        let currentSize = parseInt(localStorage.getItem('fontSize') || 16);
        updateFontSize(currentSize);
        
        fontDecreaseBtn.addEventListener('click', () => {
            if (currentSize > 12) {
                currentSize -= 2;
                updateFontSize(currentSize);
                saveSetting('fontSize', currentSize);
            }
        });
        
        fontIncreaseBtn.addEventListener('click', () => {
            if (currentSize < 24) {
                currentSize += 2;
                updateFontSize(currentSize);
                saveSetting('fontSize', currentSize);
            }
        });
    }
}

function updateFontSize(size) {
    const fontSizeDisplay = document.getElementById('font-size-display');
    const root = document.documentElement;
    
    fontSizeDisplay.textContent = `${size}px`;
    root.style.fontSize = `${size}px`;
}

function initializePasswordStrength() {
    const newPasswordInput = document.getElementById('new-password');
    const strengthBar = document.getElementById('password-strength-bar');
    const strengthText = document.getElementById('password-strength-text');
    
    if (newPasswordInput && strengthBar && strengthText) {
        newPasswordInput.addEventListener('input', function() {
            const password = this.value;
            const strength = calculatePasswordStrength(password);
            
            // Update strength bar and text
            strengthBar.style.width = `${strength.percentage}%`;
            strengthBar.className = `h-2 rounded-full transition-all duration-300 ${strength.color}`;
            strengthText.textContent = strength.text;
        });
    }
}

function calculatePasswordStrength(password) {
    let score = 0;
    
    if (password.length >= 8) score++;
    if (password.match(/[a-z]/)) score++;
    if (password.match(/[A-Z]/)) score++;
    if (password.match(/[0-9]/)) score++;
    if (password.match(/[^a-zA-Z0-9]/)) score++;
    
    const strengthLevels = [
        { percentage: 20, text: 'Very Weak', color: 'bg-red-500' },
        { percentage: 40, text: 'Weak', color: 'bg-orange-500' },
        { percentage: 60, text: 'Fair', color: 'bg-yellow-500' },
        { percentage: 80, text: 'Strong', color: 'bg-green-500' },
        { percentage: 100, text: 'Very Strong', color: 'bg-green-600' }
    ];
    
    return strengthLevels[Math.min(score, strengthLevels.length - 1)];
}

function initializeSecurityLog() {
    const securityLog = document.getElementById('security-log');
    
    if (securityLog) {
        const logEntries = [
            { icon: 'fa-sign-in', text: 'Login from new device', time: '2 hours ago', type: 'info' },
            { icon: 'fa-key', text: 'Password changed', time: '1 week ago', type: 'success' },
            { icon: 'fa-user', text: 'Profile updated', time: '2 weeks ago', type: 'info' },
            { icon: 'fa-shield', text: 'Two-factor authentication disabled', time: '1 month ago', type: 'warning' }
        ];
        
        logEntries.forEach(entry => {
            const logItem = document.createElement('div');
            logItem.className = 'security-log-item';
            
            const iconColor = entry.type === 'success' ? 'text-success' : 
                            entry.type === 'warning' ? 'text-warning' : 'text-info';
            
            logItem.innerHTML = `
                <div class="security-log-icon bg-base-200">
                    <i class="fa-solid ${entry.icon} ${iconColor}"></i>
                </div>
                <div class="flex-1">
                    <div class="font-medium">${entry.text}</div>
                    <div class="text-sm text-gray-500">${entry.time}</div>
                </div>
            `;
            
            securityLog.appendChild(logItem);
        });
    }
}

function initializeAutoSave() {
    const autoSaveToggle = document.getElementById('auto-save-toggle');
    const autoSaveStatus = document.getElementById('auto-save-status');
    
    if (autoSaveToggle && autoSaveStatus) {
        autoSaveToggle.addEventListener('change', function() {
            const isEnabled = this.checked;
            autoSaveStatus.textContent = isEnabled ? 'ON' : 'OFF';
            saveSetting('autoSave', isEnabled);
            
            if (isEnabled) {
                showNotification('Auto-save enabled', 'success');
            }
        });
        
        // Load saved auto-save setting
        const savedAutoSave = localStorage.getItem('autoSave') !== 'false';
        autoSaveToggle.checked = savedAutoSave;
        autoSaveStatus.textContent = savedAutoSave ? 'ON' : 'OFF';
    }
    
    // Auto-save functionality for all settings
    const settingElements = document.querySelectorAll('input, select, textarea');
    settingElements.forEach(element => {
        element.addEventListener('change', function() {
            if (autoSaveToggle?.checked) {
                saveSetting(this.id, this.type === 'checkbox' ? this.checked : this.value);
                showNotification('Setting saved', 'success', 1000);
            }
        });
    });
}

function initializeFormSubmissions() {
    // Change Email Form
    const changeEmailForm = document.getElementById('change-email-form');
    if (changeEmailForm) {
        changeEmailForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const newEmail = document.getElementById('new-email').value;
            const password = document.getElementById('confirm-password-email').value;
            
            // Simulate API call
            showNotification('Updating email address...', 'info');
            
            setTimeout(() => {
                document.getElementById('current-email-display').textContent = newEmail;
                document.getElementById('change-email-modal').classList.remove('modal-open');
                showNotification('Email updated successfully!', 'success');
                this.reset();
            }, 1500);
        });
    }
    
    // Change Password Form
    const changePasswordForm = document.getElementById('change-password-form');
    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-new-password').value;
            
            if (newPassword !== confirmPassword) {
                showNotification('New passwords do not match!', 'error');
                return;
            }
            
            // Simulate API call
            showNotification('Updating password...', 'info');
            
            setTimeout(() => {
                document.getElementById('change-password-modal').classList.remove('modal-open');
                showNotification('Password updated successfully!', 'success');
                this.reset();
            }, 1500);
        });
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
function loadSavedSettings() {
    // Load all saved settings from localStorage and apply them
    const settings = [
        'language', 'timezone', 'autoSave', 'soundEffects', 'autoStart',
        'emailNotifications', 'pushNotifications', 'quizReminders',
        'resultsNotifications', 'leaderboardNotifications', 'theme',
        'animationSpeed', 'highContrast', 'reduceMotion', 'profileVisibility',
        'leaderboardVisibility', 'dataSharing', 'sessionTimeout', 'quizDuration',
        'questionsPerPage', 'showExplanations', 'instantFeedback', 'studyReminders',
        'fontSize', 'twoFactorAuth'
    ];
    
    settings.forEach(setting => {
        const savedValue = localStorage.getItem(setting);
        if (savedValue !== null) {
            const element = document.getElementById(`${setting}-toggle`) || 
                           document.getElementById(`${setting}-select`) ||
                           document.getElementById(setting);
            
            if (element) {
                if (element.type === 'checkbox') {
                    element.checked = savedValue === 'true';
                } else {
                    element.value = savedValue;
                }
                
                // Trigger change event to update UI
                element.dispatchEvent(new Event('change'));
            }
        }
    });
    
    // Update settings status
    updateSettingsStatus();
}

function saveSetting(key, value) {
    localStorage.setItem(key, value);
    updateSettingsStatus();
}

function updateSettingsStatus() {
    const appliedSettings = document.getElementById('applied-settings');
    const lastUpdated = document.getElementById('last-updated');
    
    if (appliedSettings) {
        // Count number of non-default settings
        const totalSettings = 28; // Approximate total settings
        const appliedCount = Object.keys(localStorage).length;
        appliedSettings.textContent = `${appliedCount}/${totalSettings}`;
    }
    
    if (lastUpdated) {
        lastUpdated.textContent = 'Just now';
    }
}

function resetToDefaultSettings() {
    // Clear all settings
    localStorage.clear();
    
    // Reload page to reset all controls
    setTimeout(() => {
        window.location.reload();
    }, 1000);
}

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

// System preference detection
function detectSystemPreferences() {
    // Detect prefers-reduced-motion
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
        const reduceMotionToggle = document.getElementById('reduce-motion-toggle');
        if (reduceMotionToggle) {
            reduceMotionToggle.checked = true;
            saveSetting('reduceMotion', true);
        }
    }
}

// Initialize system preference detection
detectSystemPreferences();

// Export functions for potential use in other files
window.SettingsManager = {
    saveSetting,
    loadSavedSettings,
    showNotification,
    resetToDefaultSettings
};