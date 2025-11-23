// Student Profile JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize profile
    initializeProfile();
    
    // Update active nav link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === 'student_profile.html') {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });
    
    // Initialize real-time clock
    initializeClock();
    
    // Load profile data
    loadProfileData();
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize tabs
    initializeTabs();
});

// Initialize profile
function initializeProfile() {
    console.log('Initializing Student Profile...');
    
    // Set current year in copyright
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Show loading states
    showLoadingStates();
}

// Initialize real-time clock
function initializeClock() {
    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        const clockElement = document.getElementById('navbar-clock');
        if (clockElement) {
            clockElement.innerHTML = `<i class="fa-regular fa-clock mr-1"></i> ${timeString}`;
        }
    }
    
    updateClock();
    setInterval(updateClock, 60000);
}

// Load profile data
function loadProfileData() {
    // Simulate API calls with timeouts
    setTimeout(() => {
        loadPersonalInfo();
        loadAcademicInfo();
        loadAchievements();
        loadCourseProgress();
        hideLoadingStates();
    }, 1500);
}

// Load personal information
function loadPersonalInfo() {
    const personalData = {
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@ius.ac.bd',
        phone: '+880 1234-567890',
        bio: 'Passionate Computer Science student with interest in web development and artificial intelligence. Always eager to learn new technologies and solve challenging problems.',
        memberSince: '2024',
        totalQuizzes: '24',
        currentRank: '#3'
    };
    
    // Update DOM with personal data
    document.getElementById('first-name').value = personalData.firstName;
    document.getElementById('last-name').value = personalData.lastName;
    document.getElementById('email').value = personalData.email;
    document.getElementById('phone').value = personalData.phone;
    document.getElementById('bio').value = personalData.bio;
    document.getElementById('member-since').textContent = personalData.memberSince;
    document.getElementById('total-quizzes-taken').textContent = personalData.totalQuizzes;
    document.getElementById('current-rank').textContent = personalData.currentRank;
    document.getElementById('profile-name').textContent = `${personalData.firstName} ${personalData.lastName}`;
}

// Load academic information
function loadAcademicInfo() {
    const academicData = {
        studentId: 'IUS-2024-001',
        department: 'cse',
        semester: '4',
        cgpa: '3.75',
        departmentName: 'Computer Science & Engineering'
    };
    
    // Update DOM with academic data
    document.getElementById('student-id').value = academicData.studentId;
    document.getElementById('department').value = academicData.department;
    document.getElementById('semester').value = academicData.semester;
    document.getElementById('cgpa').value = academicData.cgpa;
    document.getElementById('profile-department').textContent = academicData.departmentName;
}

// Load achievements
function loadAchievements() {
    const achievements = {
        unlocked: [
            {
                id: 1,
                name: 'Quiz Master',
                description: 'Complete 20 quizzes',
                icon: 'fa-solid fa-trophy',
                color: 'gold',
                points: 100
            },
            {
                id: 2,
                name: 'Speedster',
                description: 'Complete 5 quizzes under time',
                icon: 'fa-solid fa-bolt',
                color: 'silver',
                points: 75
            },
            {
                id: 3,
                name: 'Consistent Learner',
                description: '7-day streak',
                icon: 'fa-solid fa-calendar',
                color: 'bronze',
                points: 50
            },
            {
                id: 4,
                name: 'Top Performer',
                description: 'Score 90%+ in any quiz',
                icon: 'fa-solid fa-star',
                color: 'blue',
                points: 60
            },
            {
                id: 5,
                name: 'Quick Learner',
                description: 'Complete 3 quizzes in one day',
                icon: 'fa-solid fa-brain',
                color: 'green',
                points: 45
            },
            {
                id: 6,
                name: 'Subject Expert',
                description: 'Master one subject',
                icon: 'fa-solid fa-graduation-cap',
                color: 'purple',
                points: 80
            }
        ],
        locked: [
            {
                id: 7,
                name: 'Perfect Score',
                description: 'Score 100% in any quiz',
                icon: 'fa-solid fa-crown',
                color: 'gold',
                points: 150
            },
            {
                id: 8,
                name: 'Marathon Runner',
                description: '30-day streak',
                icon: 'fa-solid fa-fire',
                color: 'silver',
                points: 120
            }
        ],
        stats: {
            total: 8,
            points: 450,
            level: 3,
            nextLevel: '75%'
        }
    };
    
    // Update unlocked achievements
    const unlockedContainer = document.getElementById('unlocked-achievements');
    unlockedContainer.innerHTML = '';
    
    achievements.unlocked.forEach(achievement => {
        const achievementElement = createAchievementElement(achievement, true);
        unlockedContainer.appendChild(achievementElement);
    });
    
    // Update locked achievements
    const lockedContainer = document.getElementById('locked-achievements');
    lockedContainer.innerHTML = '';
    
    achievements.locked.forEach(achievement => {
        const achievementElement = createAchievementElement(achievement, false);
        lockedContainer.appendChild(achievementElement);
    });
    
    // Update achievement stats
    document.getElementById('total-achievements').textContent = achievements.stats.total;
    document.getElementById('achievement-points').textContent = achievements.stats.points;
    document.getElementById('achievement-level').textContent = achievements.stats.level;
    document.getElementById('next-level').textContent = achievements.stats.nextLevel;
}

// Create achievement element
function createAchievementElement(achievement, unlocked) {
    const div = document.createElement('div');
    div.className = `achievement-badge ${unlocked ? 'unlocked' : 'locked'} animate-fadeIn`;
    
    div.innerHTML = `
        <div class="badge-icon ${achievement.color}">
            <i class="${achievement.icon}"></i>
        </div>
        <h4 class="font-semibold text-sm mb-1">${achievement.name}</h4>
        <p class="text-xs text-gray-600 mb-1">${achievement.description}</p>
        <span class="text-xs font-semibold text-primary">${achievement.points} pts</span>
    `;
    
    // Add tooltip on hover
    div.title = `${achievement.name}: ${achievement.description}`;
    
    return div;
}

// Load course progress
function loadCourseProgress() {
    const courses = [
        {
            name: 'Data Structures',
            progress: 85,
            color: 'bg-blue-500'
        },
        {
            name: 'Algorithms',
            progress: 70,
            color: 'bg-green-500'
        },
        {
            name: 'Database Systems',
            progress: 60,
            color: 'bg-purple-500'
        },
        {
            name: 'Web Development',
            progress: 90,
            color: 'bg-orange-500'
        },
        {
            name: 'Software Engineering',
            progress: 45,
            color: 'bg-red-500'
        }
    ];
    
    const container = document.getElementById('course-progress-list');
    container.innerHTML = '';
    
    courses.forEach((course, index) => {
        const courseElement = document.createElement('div');
        courseElement.className = 'course-progress-item animate-slideIn';
        courseElement.style.animationDelay = `${index * 0.1}s`;
        
        courseElement.innerHTML = `
            <div class="font-semibold">${course.name}</div>
            <div class="course-progress-bar">
                <div class="course-progress-fill ${course.color}" style="width: ${course.progress}%"></div>
            </div>
            <div class="text-sm font-semibold">${course.progress}%</div>
        `;
        
        container.appendChild(courseElement);
    });
}

// Initialize tabs
function initializeTabs() {
    const tabs = document.querySelectorAll('.tabs .tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('tab-active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('tab-active');
            document.getElementById(`${targetTab}-tab`).classList.add('active');
        });
    });
}

// Setup event listeners
function setupEventListeners() {
    // Form submissions
    document.getElementById('personal-info-form').addEventListener('submit', handlePersonalInfoSubmit);
    document.getElementById('academic-info-form').addEventListener('submit', handleAcademicInfoSubmit);
    document.getElementById('change-password-form').addEventListener('submit', handlePasswordChange);
    
    // Cancel buttons
    document.getElementById('cancel-personal').addEventListener('click', resetPersonalForm);
    document.getElementById('cancel-academic').addEventListener('click', resetAcademicForm);
    document.getElementById('cancel-password').addEventListener('click', closePasswordModal);
    
    // Modal buttons
    document.getElementById('change-password-btn').addEventListener('click', openPasswordModal);
    document.getElementById('delete-account-btn').addEventListener('click', handleDeleteAccount);
    document.getElementById('export-data-btn').addEventListener('click', handleExportData);
    
    // Password strength indicator
    document.getElementById('new-password').addEventListener('input', updatePasswordStrength);
    
    // Logout button
    document.getElementById('logout-btn').addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm('Are you sure you want to logout?')) {
            window.location.href = 'index.html';
        }
    });
}

// Handle personal info form submission
function handlePersonalInfoSubmit(e) {
    e.preventDefault();
    
    const submitButton = document.getElementById('save-personal');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Saving...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Update profile name in sidebar
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        document.getElementById('profile-name').textContent = `${firstName} ${lastName}`;
        
        // Show success message
        showNotification('Profile updated successfully!', 'success');
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 1500);
}

// Handle academic info form submission
function handleAcademicInfoSubmit(e) {
    e.preventDefault();
    
    const submitButton = document.getElementById('save-academic');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Saving...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Update department in sidebar
        const departmentSelect = document.getElementById('department');
        const departmentText = departmentSelect.options[departmentSelect.selectedIndex].text;
        document.getElementById('profile-department').textContent = departmentText;
        
        // Show success message
        showNotification('Academic information updated successfully!', 'success');
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 1500);
}

// Handle password change
function handlePasswordChange(e) {
    e.preventDefault();
    
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-new-password').value;
    
    if (newPassword !== confirmPassword) {
        showNotification('New passwords do not match!', 'error');
        return;
    }
    
    if (newPassword.length < 6) {
        showNotification('Password must be at least 6 characters long!', 'error');
        return;
    }
    
    const submitButton = document.getElementById('save-password');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Updating...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        showNotification('Password updated successfully!', 'success');
        
        // Close modal and reset form
        closePasswordModal();
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 1500);
}

// Update password strength indicator
function updatePasswordStrength() {
    const password = document.getElementById('new-password').value;
    const strengthBar = document.getElementById('password-strength-bar');
    const strengthText = document.getElementById('password-strength-text');
    const strengthContainer = document.getElementById('password-strength');
    
    if (password.length === 0) {
        strengthContainer.classList.add('hidden');
        return;
    }
    
    strengthContainer.classList.remove('hidden');
    
    let strength = 0;
    let color = 'bg-red-500';
    let text = 'Weak';
    
    if (password.length >= 8) strength += 25;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 25;
    if (password.match(/\d/)) strength += 25;
    if (password.match(/[^a-zA-Z\d]/)) strength += 25;
    
    if (strength >= 75) {
        color = 'bg-green-500';
        text = 'Strong';
    } else if (strength >= 50) {
        color = 'bg-yellow-500';
        text = 'Medium';
    } else if (strength >= 25) {
        color = 'bg-orange-500';
        text = 'Fair';
    }
    
    strengthBar.className = `${color} h-2 rounded-full transition-all duration-300`;
    strengthBar.style.width = `${strength}%`;
    strengthText.textContent = text;
}

// Open password modal
function openPasswordModal() {
    document.getElementById('change-password-modal').classList.add('modal-open');
    document.getElementById('password-strength').classList.add('hidden');
}

// Close password modal
function closePasswordModal() {
    document.getElementById('change-password-modal').classList.remove('modal-open');
    document.getElementById('change-password-form').reset();
}

// Reset personal form
function resetPersonalForm() {
    loadPersonalInfo(); // Reload original data
    showNotification('Changes discarded', 'info');
}

// Reset academic form
function resetAcademicForm() {
    loadAcademicInfo(); // Reload original data
    showNotification('Changes discarded', 'info');
}

// Handle delete account
function handleDeleteAccount() {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone!')) {
        if (confirm('This will permanently delete all your data. Please type "DELETE" to confirm:')) {
            const confirmation = prompt('Type "DELETE" to confirm:');
            if (confirmation === 'DELETE') {
                // Simulate account deletion
                showNotification('Account deletion in progress...', 'warning');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 3000);
            } else {
                showNotification('Account deletion cancelled', 'info');
            }
        }
    }
}

// Handle export data
function handleExportData() {
    const button = document.getElementById('export-data-btn');
    const originalText = button.innerHTML;
    
    button.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Exporting...';
    button.disabled = true;
    
    // Simulate data export
    setTimeout(() => {
        showNotification('Data exported successfully! Check your downloads.', 'success');
        button.innerHTML = originalText;
        button.disabled = false;
        
        // In a real app, this would trigger a file download
        // simulateFileDownload();
    }, 2000);
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `toast toast-top toast-end z-50`;
    
    const alertClass = type === 'success' ? 'alert-success' : 
                      type === 'error' ? 'alert-error' :
                      type === 'warning' ? 'alert-warning' : 'alert-info';
    
    notification.innerHTML = `
        <div class="alert ${alertClass}">
            <div>
                <i class="fa-solid fa-${type === 'success' ? 'check' : type === 'error' ? 'exclamation-triangle' : type === 'warning' ? 'exclamation' : 'info'}-circle mr-2"></i>
                <span>${message}</span>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Show loading states
function showLoadingStates() {
    const elementsToLoad = [
        '#profile-name', '#profile-department', '#member-since', '#total-quizzes-taken', '#current-rank',
        '#course-completion', '#quiz-performance', '#learning-consistency',
        '#unlocked-achievements', '#locked-achievements', '#course-progress-list'
    ];
    
    elementsToLoad.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            element.classList.add('skeleton');
            if (selector.includes('achievements') || selector.includes('progress')) {
                element.innerHTML = '<div class="skeleton-text w-full h-20"></div>';
            }
        }
    });
}

// Hide loading states
function hideLoadingStates() {
    document.querySelectorAll('.skeleton').forEach(el => {
        el.classList.remove('skeleton');
    });
    
    document.querySelectorAll('.skeleton-text').forEach(el => {
        el.classList.remove('skeleton-text');
    });
}

// Simulate file download (for export data)
function simulateFileDownload() {
    const data = JSON.stringify({
        student: {
            name: 'John Smith',
            id: 'IUS-2024-001',
            department: 'Computer Science & Engineering'
        },
        quizzes: [
            { name: 'Data Structures', score: 92, date: '2024-01-15' },
            { name: 'Algorithms', score: 85, date: '2024-01-20' }
        ],
        achievements: [
            { name: 'Quiz Master', earned: '2024-01-10' },
            { name: 'Speedster', earned: '2024-01-12' }
        ]
    }, null, 2);
    
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ius_quiz_data_export.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Auto-save functionality
let autoSaveTimeout;
function setupAutoSave() {
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            clearTimeout(autoSaveTimeout);
            autoSaveTimeout = setTimeout(() => {
                showNotification('Changes auto-saved', 'info');
            }, 2000);
        });
    });
}

// Initialize auto-save
setupAutoSave();

// Export functions for global access
window.handleDeleteAccount = handleDeleteAccount;
window.handleExportData = handleExportData;