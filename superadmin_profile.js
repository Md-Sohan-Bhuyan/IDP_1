// Super Admin Profile JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeClock();
    loadProfileData();
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

function loadProfileData() {
    // Load user profile data
    const profileData = {
        firstName: 'Super',
        lastName: 'Admin',
        email: 'superadmin@ius.ac.bd',
        phone: '+880 XXXX-XXXXXX',
        department: 'Administration',
        bio: 'System administrator with full control over the IUS Quiz System platform. Responsible for managing users, departments, and system settings.',
        avatar: 'SA'
    };
    
    // Populate form fields
    document.getElementById('first-name').value = profileData.firstName;
    document.getElementById('last-name').value = profileData.lastName;
    document.getElementById('email').value = profileData.email;
    document.getElementById('phone').value = profileData.phone;
    document.getElementById('bio').value = profileData.bio;
    
    // Set up bio character counter
    setupBioCounter();
}

function setupBioCounter() {
    const bioTextarea = document.getElementById('bio');
    const maxLength = 500;
    
    bioTextarea.addEventListener('input', function() {
        const length = this.value.length;
        const counter = document.getElementById('bio-counter') || createBioCounter();
        
        counter.textContent = `${length}/${maxLength} characters`;
        
        if (length > maxLength * 0.9) {
            counter.classList.add('bio-warning');
        } else {
            counter.classList.remove('bio-warning');
        }
        
        if (length > maxLength) {
            counter.classList.add('bio-error');
        } else {
            counter.classList.remove('bio-error');
        }
    });
    
    function createBioCounter() {
        const counter = document.createElement('div');
        counter.id = 'bio-counter';
        counter.className = 'bio-counter';
        counter.textContent = `0/${maxLength} characters`;
        bioTextarea.parentNode.appendChild(counter);
        return counter;
    }
    
    // Initialize counter
    bioTextarea.dispatchEvent(new Event('input'));
}

function setupEventListeners() {
    // Profile menu tabs
    document.querySelectorAll('#profile-menu a').forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            switchProfileTab(this.dataset.tab);
        });
    });
    
    // Avatar change
    document.getElementById('change-avatar-btn').addEventListener('click', showChangeAvatarModal);
    document.getElementById('cancel-avatar').addEventListener('click', hideChangeAvatarModal);
    document.getElementById('save-avatar').addEventListener('click', handleAvatarChange);
    
    // Avatar options
    document.querySelectorAll('.avatar-option').forEach(option => {
        option.addEventListener('click', function() {
            selectAvatarOption(this);
        });
    });
    
    // Form submissions
    document.getElementById('personal-info-form').addEventListener('submit', handlePersonalInfoUpdate);
    document.getElementById('change-password-form').addEventListener('submit', handlePasswordChange);
    document.getElementById('notification-settings-form').addEventListener('submit', handleNotificationSettings);
    
    // Security actions
    document.getElementById('disable-2fa').addEventListener('click', handleDisable2FA);
    document.getElementById('change-2fa').addEventListener('click', handleChange2FA);
    document.getElementById('logout-all').addEventListener('click', handleLogoutAllSessions);
    
    // Activity
    document.getElementById('load-more-activity').addEventListener('click', loadMoreActivity);
    
    // Reset buttons
    document.getElementById('reset-personal').addEventListener('click', resetPersonalInfo);
    document.getElementById('reset-notifications').addEventListener('click', resetNotificationSettings);
    
    // Logout
    document.getElementById('logout-btn').addEventListener('click', logout);
    
    // Password strength indicator
    setupPasswordStrengthIndicator();
}

function switchProfileTab(tabName) {
    // Update active menu item
    document.querySelectorAll('#profile-menu a').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Show corresponding tab content
    document.querySelectorAll('.profile-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

function showChangeAvatarModal() {
    document.getElementById('change-avatar-modal').classList.add('modal-open');
}

function hideChangeAvatarModal() {
    document.getElementById('change-avatar-modal').classList.remove('modal-open');
}

function selectAvatarOption(option) {
    // Remove active class from all options
    document.querySelectorAll('.avatar-option').forEach(opt => {
        opt.classList.remove('active');
    });
    
    // Add active class to selected option
    option.classList.add('active');
}

function handleAvatarChange() {
    const selectedOption = document.querySelector('.avatar-option.active');
    const newAvatar = selectedOption.dataset.avatar;
    
    showNotification('Updating profile picture...', 'info');
    
    // Simulate API call
    setTimeout(() => {
        // Update avatar in UI
        const avatarElements = document.querySelectorAll('.avatar .w-24, .avatar-preview .w-32');
        avatarElements.forEach(element => {
            element.textContent = newAvatar;
        });
        
        hideChangeAvatarModal();
        showNotification('Profile picture updated successfully!', 'success');
    }, 1000);
}

function handlePersonalInfoUpdate(e) {
    e.preventDefault();
    
    const formData = {
        firstName: document.getElementById('first-name').value,
        lastName: document.getElementById('last-name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        bio: document.getElementById('bio').value
    };
    
    showNotification('Updating personal information...', 'info');
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Personal information updated successfully!', 'success');
        console.log('Updated profile data:', formData);
    }, 1500);
}

function handlePasswordChange(e) {
    e.preventDefault();
    
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    if (newPassword !== confirmPassword) {
        showNotification('New passwords do not match!', 'error');
        return;
    }
    
    if (newPassword.length < 8) {
        showNotification('Password must be at least 8 characters long!', 'error');
        return;
    }
    
    showNotification('Updating password...', 'info');
    
    // Simulate API call
    setTimeout(() => {
        // Clear password fields
        document.getElementById('current-password').value = '';
        document.getElementById('new-password').value = '';
        document.getElementById('confirm-password').value = '';
        
        showNotification('Password updated successfully!', 'success');
    }, 1500);
}

function handleNotificationSettings(e) {
    e.preventDefault();
    
    const settings = {
        emailSystem: document.getElementById('email-system').checked,
        emailSecurity: document.getElementById('email-security').checked,
        emailBackup: document.getElementById('email-backup').checked,
        emailReports: document.getElementById('email-reports').checked,
        pushUrgent: document.getElementById('push-urgent').checked,
        pushApprovals: document.getElementById('push-approvals').checked,
        pushBackup: document.getElementById('push-backup').checked,
        pushMaintenance: document.getElementById('push-maintenance').checked,
        frequency: document.getElementById('notification-frequency').value,
        quietStart: document.getElementById('quiet-start').value,
        quietEnd: document.getElementById('quiet-end').value,
        enableQuietHours: document.getElementById('enable-quiet-hours').checked
    };
    
    showNotification('Updating notification settings...', 'info');
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Notification settings updated successfully!', 'success');
        console.log('Updated notification settings:', settings);
    }, 1500);
}

function handleDisable2FA() {
    if (!confirm('Are you sure you want to disable Two-Factor Authentication? This will reduce your account security.')) {
        return;
    }
    
    showNotification('Disabling Two-Factor Authentication...', 'warning');
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Two-Factor Authentication has been disabled.', 'success');
    }, 1500);
}

function handleChange2FA() {
    showNotification('Redirecting to 2FA setup...', 'info');
    // In a real application, this would redirect to 2FA setup page
}

function handleLogoutAllSessions() {
    if (!confirm('Are you sure you want to logout all other sessions? You will remain logged in on this device.')) {
        return;
    }
    
    showNotification('Logging out all other sessions...', 'warning');
    
    // Simulate API call
    setTimeout(() => {
        showNotification('All other sessions have been logged out.', 'success');
    }, 1500);
}

function loadMoreActivity() {
    const button = document.getElementById('load-more-activity');
    const originalText = button.innerHTML;
    
    button.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Loading...';
    button.disabled = true;
    
    // Simulate loading more activity
    setTimeout(() => {
        // Add more activity items (in a real app, this would come from API)
        const timeline = document.querySelector('.activity-timeline');
        const newActivity = `
            <div class="activity-item">
                <div class="activity-icon bg-secondary">
                    <i class="fa-solid fa-database"></i>
                </div>
                <div class="activity-content">
                    <div class="font-semibold">System Backup</div>
                    <div class="text-sm text-gray-600">Completed automatic system backup</div>
                    <div class="text-xs text-gray-500">Yesterday at 02:00 AM</div>
                </div>
            </div>
            <div class="activity-item">
                <div class="activity-icon bg-warning">
                    <i class="fa-solid fa-exclamation-triangle"></i>
                </div>
                <div class="activity-content">
                    <div class="font-semibold">Security Alert</div>
                    <div class="text-sm text-gray-600">Investigated suspicious login attempt</div>
                    <div class="text-xs text-gray-500">2 days ago</div>
                </div>
            </div>
        `;
        
        timeline.innerHTML += newActivity;
        
        button.innerHTML = originalText;
        button.disabled = false;
        
        showNotification('More activity loaded!', 'success');
    }, 1500);
}

function resetPersonalInfo() {
    if (!confirm('Are you sure you want to reset all personal information to default values?')) {
        return;
    }
    
    document.getElementById('first-name').value = 'Super';
    document.getElementById('last-name').value = 'Admin';
    document.getElementById('email').value = 'superadmin@ius.ac.bd';
    document.getElementById('phone').value = '+880 XXXX-XXXXXX';
    document.getElementById('bio').value = 'System administrator with full control over the IUS Quiz System platform. Responsible for managing users, departments, and system settings.';
    
    showNotification('Personal information reset to defaults!', 'success');
}

function resetNotificationSettings() {
    if (!confirm('Are you sure you want to reset all notification settings to defaults?')) {
        return;
    }
    
    // Reset checkboxes
    document.getElementById('email-system').checked = true;
    document.getElementById('email-security').checked = true;
    document.getElementById('email-backup').checked = false;
    document.getElementById('email-reports').checked = true;
    document.getElementById('push-urgent').checked = true;
    document.getElementById('push-approvals').checked = true;
    document.getElementById('push-backup').checked = false;
    document.getElementById('push-maintenance').checked = false;
    
    // Reset selects
    document.getElementById('notification-frequency').value = 'hourly';
    document.getElementById('quiet-start').value = '22:00';
    document.getElementById('quiet-end').value = '07:00';
    document.getElementById('enable-quiet-hours').checked = false;
    
    showNotification('Notification settings reset to defaults!', 'success');
}

function setupPasswordStrengthIndicator() {
    const passwordInput = document.getElementById('new-password');
    const strengthIndicator = document.createElement('div');
    strengthIndicator.className = 'password-strength mt-1';
    strengthIndicator.style.width = '0%';
    
    passwordInput.parentNode.appendChild(strengthIndicator);
    
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        const strength = calculatePasswordStrength(password);
        
        strengthIndicator.style.width = `${strength.percentage}%`;
        strengthIndicator.className = `password-strength mt-1 ${strength.class}`;
    });
    
    function calculatePasswordStrength(password) {
        let score = 0;
        
        if (password.length >= 8) score += 25;
        if (password.length >= 12) score += 25;
        if (/[A-Z]/.test(password)) score += 15;
        if (/[a-z]/.test(password)) score += 15;
        if (/[0-9]/.test(password)) score += 10;
        if (/[^A-Za-z0-9]/.test(password)) score += 10;
        
        if (score >= 80) return { percentage: 100, class: 'strength-strong' };
        if (score >= 60) return { percentage: 75, class: 'strength-medium' };
        if (score >= 30) return { percentage: 50, class: 'strength-medium' };
        return { percentage: 25, class: 'strength-weak' };
    }
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