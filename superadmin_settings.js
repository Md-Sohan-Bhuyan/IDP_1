// Super Admin Settings JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeClock();
    loadSettingsData();
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

function loadSettingsData() {
    // Load user settings from localStorage or default values
    const settings = {
        theme: 'light',
        colorScheme: 'blue',
        compactMode: false,
        sidebarCollapse: true,
        animations: true,
        fontFamily: 'inter',
        fontSize: 'medium',
        language: 'en',
        region: 'bd',
        timezone: 'Asia/Dhaka',
        dateFormat: 'dd/mm/yyyy',
        timeFormat: '12h',
        autoDetectLanguage: true
    };
    
    // Apply settings to form
    applySettingsToForm(settings);
}

function applySettingsToForm(settings) {
    // Theme
    document.querySelector(`input[name="theme"][value="${settings.theme}"]`).checked = true;
    document.querySelector(`input[name="color-scheme"][value="${settings.colorScheme}"]`).checked = true;
    
    // Layout
    document.getElementById('compact-mode').checked = settings.compactMode;
    document.getElementById('sidebar-collapse').checked = settings.sidebarCollapse;
    document.getElementById('animations').checked = settings.animations;
    
    // Font
    document.getElementById('font-family').value = settings.fontFamily;
    document.getElementById('font-size').value = settings.fontSize;
    
    // Language
    document.getElementById('language').value = settings.language;
    document.getElementById('region').value = settings.region;
    document.getElementById('timezone').value = settings.timezone;
    document.querySelector(`input[name="date-format"][value="${settings.dateFormat}"]`).checked = true;
    document.querySelector(`input[name="time-format"][value="${settings.timeFormat}"]`).checked = true;
    document.getElementById('auto-detect-language').checked = settings.autoDetectLanguage;
}

function setupEventListeners() {
    // Settings menu tabs
    document.querySelectorAll('#settings-menu a').forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            switchSettingsTab(this.dataset.tab);
        });
    });
    
    // Form submissions
    document.getElementById('appearance-form').addEventListener('submit', handleAppearanceSettings);
    document.getElementById('language-form').addEventListener('submit', handleLanguageSettings);
    
    // Reset buttons
    document.getElementById('reset-appearance').addEventListener('click', resetAppearanceSettings);
    document.getElementById('reset-language').addEventListener('click', resetLanguageSettings);
    
    // Danger zone actions
    document.getElementById('delete-account-btn').addEventListener('click', showDeleteAccountModal);
    document.getElementById('export-data-btn').addEventListener('click', handleExportData);
    document.getElementById('clear-data-btn').addEventListener('click', handleClearData);
    
    // Delete account modal
    document.getElementById('cancel-delete').addEventListener('click', hideDeleteAccountModal);
    document.getElementById('delete-confirm').addEventListener('input', updateDeleteButton);
    document.getElementById('confirm-delete').addEventListener('click', handleDeleteAccount);
    
    // Live preview for theme changes
    setupThemePreviews();
    
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

function setupThemePreviews() {
    // Add live preview for theme changes
    document.querySelectorAll('input[name="theme"]').forEach(radio => {
        radio.addEventListener('change', function() {
            previewTheme(this.value);
        });
    });
    
    document.querySelectorAll('input[name="color-scheme"]').forEach(radio => {
        radio.addEventListener('change', function() {
            previewColorScheme(this.value);
        });
    });
}

function previewTheme(theme) {
    const html = document.documentElement;
    
    // Remove existing theme classes
    html.classList.remove('theme-light', 'theme-dark', 'theme-auto');
    
    // Add new theme class
    html.classList.add(`theme-${theme}`);
    
    // In a real application, you would update the actual theme
    console.log('Theme preview:', theme);
}

function previewColorScheme(scheme) {
    const html = document.documentElement;
    
    // Remove existing color scheme classes
    html.classList.remove('scheme-blue', 'scheme-green', 'scheme-purple', 'scheme-orange');
    
    // Add new color scheme class
    html.classList.add(`scheme-${scheme}`);
    
    // In a real application, you would update the actual color scheme
    console.log('Color scheme preview:', scheme);
}

function handleAppearanceSettings(e) {
    e.preventDefault();
    
    const settings = {
        theme: document.querySelector('input[name="theme"]:checked').value,
        colorScheme: document.querySelector('input[name="color-scheme"]:checked').value,
        compactMode: document.getElementById('compact-mode').checked,
        sidebarCollapse: document.getElementById('sidebar-collapse').checked,
        animations: document.getElementById('animations').checked,
        fontFamily: document.getElementById('font-family').value,
        fontSize: document.getElementById('font-size').value
    };
    
    showNotification('Saving appearance settings...', 'info');
    
    // Simulate API call
    setTimeout(() => {
        // Save to localStorage (in a real app, this would be an API call)
        localStorage.setItem('superadmin_appearance_settings', JSON.stringify(settings));
        
        showNotification('Appearance settings saved successfully!', 'success');
        console.log('Saved appearance settings:', settings);
    }, 1500);
}

function handleLanguageSettings(e) {
    e.preventDefault();
    
    const settings = {
        language: document.getElementById('language').value,
        region: document.getElementById('region').value,
        timezone: document.getElementById('timezone').value,
        dateFormat: document.querySelector('input[name="date-format"]:checked').value,
        timeFormat: document.querySelector('input[name="time-format"]:checked').value,
        autoDetectLanguage: document.getElementById('auto-detect-language').checked
    };
    
    showNotification('Saving language settings...', 'info');
    
    // Simulate API call
    setTimeout(() => {
        // Save to localStorage (in a real app, this would be an API call)
        localStorage.setItem('superadmin_language_settings', JSON.stringify(settings));
        
        showNotification('Language settings saved successfully!', 'success');
        console.log('Saved language settings:', settings);
    }, 1500);
}

function resetAppearanceSettings() {
    if (!confirm('Are you sure you want to reset all appearance settings to defaults?')) {
        return;
    }
    
    const defaultSettings = {
        theme: 'light',
        colorScheme: 'blue',
        compactMode: false,
        sidebarCollapse: true,
        animations: true,
        fontFamily: 'inter',
        fontSize: 'medium'
    };
    
    applySettingsToForm({ ...loadSettingsData(), ...defaultSettings });
    showNotification('Appearance settings reset to defaults!', 'success');
}

function resetLanguageSettings() {
    if (!confirm('Are you sure you want to reset all language settings to defaults?')) {
        return;
    }
    
    const defaultSettings = {
        language: 'en',
        region: 'bd',
        timezone: 'Asia/Dhaka',
        dateFormat: 'dd/mm/yyyy',
        timeFormat: '12h',
        autoDetectLanguage: true
    };
    
    applySettingsToForm({ ...loadSettingsData(), ...defaultSettings });
    showNotification('Language settings reset to defaults!', 'success');
}

function showDeleteAccountModal() {
    document.getElementById('delete-account-modal').classList.add('modal-open');
}

function hideDeleteAccountModal() {
    document.getElementById('delete-account-modal').classList.remove('modal-open');
    document.getElementById('delete-confirm').value = '';
    document.getElementById('confirm-delete').disabled = true;
}

function updateDeleteButton() {
    const input = document.getElementById('delete-confirm');
    const button = document.getElementById('confirm-delete');
    button.disabled = input.value !== 'DELETE';
}

function handleDeleteAccount() {
    showNotification('Deleting account...', 'error');
    
    // Simulate API call
    setTimeout(() => {
        hideDeleteAccountModal();
        showNotification('Your account has been permanently deleted.', 'success');
        
        // Redirect to login page
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }, 3000);
}

function handleExportData() {
    showNotification('Preparing your data export...', 'info');
    
    // Simulate data preparation
    setTimeout(() => {
        showNotification('Your data export is ready!', 'success');
        
        // In a real application, this would trigger a file download
        // const data = prepareExportData();
        // downloadFile(data, 'superadmin_data_export.zip');
        
        console.log('Data export prepared');
    }, 2000);
}

function handleClearData() {
    if (!confirm('Are you sure you want to clear all your personal data? This action cannot be undone.')) {
        return;
    }
    
    showNotification('Clearing all personal data...', 'warning');
    
    // Simulate API call
    setTimeout(() => {
        showNotification('All personal data has been cleared!', 'success');
        
        // In a real application, this would clear user data from the server
        console.log('User data cleared');
    }, 2000);
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