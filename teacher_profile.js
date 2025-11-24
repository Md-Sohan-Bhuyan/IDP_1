// Profile Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeProfilePage();
    initializeFormSubmissions();
    loadProfileData();
});

function initializeProfilePage() {
    // Initialize any page-specific functionality
}

function initializeFormSubmissions() {
    // Profile Form
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updateProfile();
        });
    }
    
    // Password Update
    const passwordForm = document.querySelector('.card-body .space-y-6');
    if (passwordForm) {
        const updatePasswordBtn = passwordForm.querySelector('.btn-primary');
        if (updatePasswordBtn) {
            updatePasswordBtn.addEventListener('click', function(e) {
                e.preventDefault();
                updatePassword();
            });
        }
    }
    
    // Notification Preferences
    initializeNotificationPreferences();
}

function initializeNotificationPreferences() {
    // Add change event listeners to notification checkboxes
    const checkboxes = document.querySelectorAll('.notification-preferences input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            saveNotificationPreferences();
        });
    });
}

function loadProfileData() {
    // Load profile data from localStorage or use default data
    const profileData = JSON.parse(localStorage.getItem('teacher_profile')) || {
        firstName: 'Mohammad',
        lastName: 'Rahman',
        email: 'm.rahman@ius.ac.bd',
        phone: '+880 1XXX-XXXXXX',
        department: 'Computer Science',
        bio: 'Senior Lecturer with 8+ years of experience in Computer Science education. Specialized in Algorithms, Data Structures, and Web Development.',
        joinDate: '2020-01-15',
        stats: {
            totalQuestions: 47,
            activeQuizzes: 8,
            totalStudents: 156
        },
        notifications: {
            email: true,
            quizResults: true,
            questionApprovals: false,
            systemUpdates: true
        }
    };
    
    // Populate form fields
    document.querySelector('input[value="Mohammad"]').value = profileData.firstName;
    document.querySelector('input[value="Rahman"]').value = profileData.lastName;
    document.querySelector('input[value="m.rahman@ius.ac.bd"]').value = profileData.email;
    document.querySelector('input[value="+880 1XXX-XXXXXX"]').value = profileData.phone;
    document.querySelector('select').value = profileData.department;
    document.querySelector('textarea').value = profileData.bio;
    
    // Update stats
    updateProfileStats(profileData.stats);
    
    // Update notification preferences
    updateNotificationPreferences(profileData.notifications);
}

function updateProfileStats(stats) {
    const statElements = {
        totalQuestions: document.querySelector('.stats-grid .text-primary'),
        activeQuizzes: document.querySelector('.stats-grid .text-secondary'),
        totalStudents: document.querySelector('.stats-grid .text-accent')
    };
    
    if (statElements.totalQuestions) {
        statElements.totalQuestions.textContent = stats.totalQuestions;
    }
    if (statElements.activeQuizzes) {
        statElements.activeQuizzes.textContent = stats.activeQuizzes;
    }
    if (statElements.totalStudents) {
        statElements.totalStudents.textContent = stats.totalStudents;
    }
}

function updateNotificationPreferences(notifications) {
    const checkboxes = {
        email: document.querySelector('input[type="checkbox"]:nth-child(1)'),
        quizResults: document.querySelector('input[type="checkbox"]:nth-child(2)'),
        questionApprovals: document.querySelector('input[type="checkbox"]:nth-child(3)'),
        systemUpdates: document.querySelector('input[type="checkbox"]:nth-child(4)')
    };
    
    if (checkboxes.email) checkboxes.email.checked = notifications.email;
    if (checkboxes.quizResults) checkboxes.quizResults.checked = notifications.quizResults;
    if (checkboxes.questionApprovals) checkboxes.questionApprovals.checked = notifications.questionApprovals;
    if (checkboxes.systemUpdates) checkboxes.systemUpdates.checked = notifications.systemUpdates;
}

function updateProfile() {
    const form = document.getElementById('profile-form');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Get form data
    const profileData = {
        firstName: form.querySelector('input[value="Mohammad"]').value,
        lastName: form.querySelector('input[value="Rahman"]').value,
        email: form.querySelector('input[value="m.rahman@ius.ac.bd"]').value,
        phone: form.querySelector('input[value="+880 1XXX-XXXXXX"]').value,
        department: form.querySelector('select').value,
        bio: form.querySelector('textarea').value,
        updatedAt: new Date().toISOString()
    };
    
    // Validate form
    if (!validateProfileForm(profileData)) {
        return;
    }
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Save profile to localStorage
        const existingData = JSON.parse(localStorage.getItem('teacher_profile')) || {};
        const updatedData = { ...existingData, ...profileData };
        localStorage.setItem('teacher_profile', JSON.stringify(updatedData));
        
        // Show success message
        showNotification('Profile updated successfully!', 'success');
        
        // Reset button state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }, 1500);
}

function updatePassword() {
    const passwordSection = document.querySelector('.card-body .space-y-6');
    const currentPassword = passwordSection.querySelector('input[type="password"]:nth-child(1)');
    const newPassword = passwordSection.querySelector('input[type="password"]:nth-child(2)');
    const confirmPassword = passwordSection.querySelector('input[type="password"]:nth-child(3)');
    const updateBtn = passwordSection.querySelector('.btn-primary');
    
    // Validate passwords
    if (!currentPassword.value) {
        showNotification('Please enter your current password', 'error');
        return;
    }
    
    if (!newPassword.value) {
        showNotification('Please enter a new password', 'error');
        return;
    }
    
    if (newPassword.value.length < 6) {
        showNotification('Password must be at least 6 characters long', 'error');
        return;
    }
    
    if (newPassword.value !== confirmPassword.value) {
        showNotification('New passwords do not match', 'error');
        return;
    }
    
    // Show loading state
    updateBtn.classList.add('loading');
    updateBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        showNotification('Password updated successfully!', 'success');
        
        // Clear password fields
        currentPassword.value = '';
        newPassword.value = '';
        confirmPassword.value = '';
        
        // Reset button state
        updateBtn.classList.remove('loading');
        updateBtn.disabled = false;
    }, 1500);
}

function saveNotificationPreferences() {
    const checkboxes = document.querySelectorAll('.notification-preferences input[type="checkbox"]');
    const preferences = {
        email: checkboxes[0]?.checked || false,
        quizResults: checkboxes[1]?.checked || false,
        questionApprovals: checkboxes[2]?.checked || false,
        systemUpdates: checkboxes[3]?.checked || false
    };
    
    // Save to localStorage
    const existingData = JSON.parse(localStorage.getItem('teacher_profile')) || {};
    const updatedData = { ...existingData, notifications: preferences };
    localStorage.setItem('teacher_profile', JSON.stringify(updatedData));
    
    showNotification('Notification preferences saved!', 'success');
}

function validateProfileForm(data) {
    if (!data.firstName.trim()) {
        showNotification('Please enter your first name', 'error');
        return false;
    }
    
    if (!data.lastName.trim()) {
        showNotification('Please enter your last name', 'error');
        return false;
    }
    
    if (!data.email.trim()) {
        showNotification('Please enter your email', 'error');
        return false;
    }
    
    if (!isValidEmail(data.email)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }
    
    if (!data.department) {
        showNotification('Please select your department', 'error');
        return false;
    }
    
    return true;
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
window.TeacherProfile = {
    showNotification,
    loadProfileData,
    updateProfile
};