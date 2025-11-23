// Student Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard
    initializeDashboard();
    
    // Update active nav link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === 'student_dashboard.html') {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });
    
    // Initialize real-time clock
    initializeClock();
    
    // Load dashboard data
    loadDashboardData();
    
    // Set up real-time updates
    setupRealTimeUpdates();
    
    // Event listeners
    setupEventListeners();
    
    // Initialize animations
    initializeAnimations();
});

// Initialize dashboard
function initializeDashboard() {
    console.log('Initializing Student Dashboard...');
    
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

// Load dashboard data
function loadDashboardData() {
    // Simulate API calls with timeouts
    setTimeout(() => {
        loadQuickStats();
        loadRecentActivity();
        loadUpcomingQuizzes();
        loadRecommendedQuizzes();
        hideLoadingStates();
    }, 1000);
}

// Load quick stats
function loadQuickStats() {
    const stats = {
        completedQuizzes: 24,
        currentRank: 3,
        avgScore: 85,
        streakDays: 7
    };
    
    // Update DOM with stats
    document.getElementById('completed-quizzes').textContent = stats.completedQuizzes;
    document.getElementById('current-rank').textContent = `#${stats.currentRank}`;
    document.getElementById('avg-score').textContent = `${stats.avgScore}%`;
    document.getElementById('streak-days').textContent = stats.streakDays;
    
    // Add animation
    animateStats();
}

// Load recent activity
function loadRecentActivity() {
    const activities = [
        {
            type: 'quiz',
            icon: 'fa-solid fa-check-circle',
            color: 'blue-500',
            title: 'Completed Data Structures Quiz',
            score: '92%',
            time: '2 hours ago'
        },
        {
            type: 'achievement',
            icon: 'fa-solid fa-trophy',
            color: 'yellow-500',
            title: 'Unlocked Quiz Master Achievement',
            score: '',
            time: '5 hours ago'
        },
        {
            type: 'rank',
            icon: 'fa-solid fa-chart-line',
            color: 'green-500',
            title: 'Moved up to Rank #3',
            score: '',
            time: '1 day ago'
        },
        {
            type: 'quiz',
            icon: 'fa-solid fa-check-circle',
            color: 'blue-500',
            title: 'Completed Business Ethics Quiz',
            score: '88%',
            time: '1 day ago'
        }
    ];
    
    const container = document.getElementById('recent-activity');
    container.innerHTML = '';
    
    activities.forEach((activity, index) => {
        const activityElement = document.createElement('div');
        activityElement.className = `activity-item animate-fadeInUp`;
        activityElement.style.animationDelay = `${index * 0.1}s`;
        
        activityElement.innerHTML = `
            <div class="activity-icon ${activity.type}" style="background-color: var(--${activity.color})">
                <i class="${activity.icon}"></i>
            </div>
            <div class="flex-1">
                <div class="font-semibold">${activity.title}</div>
                ${activity.score ? `<div class="text-sm text-gray-600">Score: ${activity.score}</div>` : ''}
                <div class="text-xs text-gray-500">${activity.time}</div>
            </div>
        `;
        
        container.appendChild(activityElement);
    });
}

// Load upcoming quizzes
function loadUpcomingQuizzes() {
    const upcomingQuizzes = [
        {
            title: 'Advanced Algorithms',
            course: 'CSE',
            date: 'Tomorrow, 10:00 AM',
            duration: '30 min'
        },
        {
            title: 'Financial Management',
            course: 'BBA',
            date: 'Dec 15, 2:00 PM',
            duration: '25 min'
        },
        {
            title: 'Modern Literature',
            course: 'English',
            date: 'Dec 16, 11:00 AM',
            duration: '20 min'
        }
    ];
    
    const container = document.getElementById('upcoming-quizzes');
    container.innerHTML = '';
    
    upcomingQuizzes.forEach((quiz, index) => {
        const quizElement = document.createElement('div');
        quizElement.className = `upcoming-quiz animate-fadeInUp`;
        quizElement.style.animationDelay = `${index * 0.1}s`;
        
        quizElement.innerHTML = `
            <div>
                <div class="font-semibold">${quiz.title}</div>
                <div class="text-sm text-gray-600">${quiz.course} • ${quiz.duration}</div>
            </div>
            <div class="text-right">
                <div class="text-sm font-semibold text-primary">${quiz.date}</div>
                <button class="btn btn-xs btn-primary mt-1">Remind Me</button>
            </div>
        `;
        
        container.appendChild(quizElement);
    });
}

// Load recommended quizzes
function loadRecommendedQuizzes() {
    const recommendedQuizzes = [
        {
            title: 'Object-Oriented Programming',
            course: 'CSE',
            difficulty: 'medium',
            questions: 15,
            duration: '25 min',
            participants: 1240,
            rating: 4.8
        },
        {
            title: 'Marketing Principles',
            course: 'BBA',
            difficulty: 'easy',
            questions: 12,
            duration: '20 min',
            participants: 980,
            rating: 4.6
        },
        {
            title: 'Circuit Analysis',
            course: 'EEE',
            difficulty: 'hard',
            questions: 10,
            duration: '30 min',
            participants: 760,
            rating: 4.9
        }
    ];
    
    const container = document.getElementById('recommended-quizzes');
    container.innerHTML = '';
    
    recommendedQuizzes.forEach((quiz, index) => {
        const quizElement = document.createElement('div');
        quizElement.className = `quiz-card animate-fadeInUp`;
        quizElement.style.animationDelay = `${index * 0.15}s`;
        
        quizElement.innerHTML = `
            <div class="card-body">
                <div class="flex justify-between items-start mb-2">
                    <span class="badge badge-outline">${quiz.course}</span>
                    <span class="quiz-badge ${quiz.difficulty}">${quiz.difficulty}</span>
                </div>
                <h3 class="quiz-title text-xl font-bold mb-2">${quiz.title}</h3>
                <div class="text-sm text-gray-600 mb-4">
                    <div class="flex justify-between mb-1">
                        <span><i class="fa-solid fa-list-check mr-1"></i> ${quiz.questions} questions</span>
                        <span><i class="fa-solid fa-clock mr-1"></i> ${quiz.duration}</span>
                    </div>
                    <div class="flex justify-between">
                        <span><i class="fa-solid fa-users mr-1"></i> ${quiz.participants.toLocaleString()}</span>
                        <span><i class="fa-solid fa-star mr-1 text-yellow-500"></i> ${quiz.rating}</span>
                    </div>
                </div>
                <div class="card-actions">
                    <button class="btn btn-primary btn-sm w-full" onclick="startQuiz('${quiz.title}')">
                        Start Quiz
                    </button>
                </div>
            </div>
        `;
        
        container.appendChild(quizElement);
    });
}

// Setup real-time updates
function setupRealTimeUpdates() {
    // Update stats every 30 seconds
    setInterval(() => {
        updateRealTimeStats();
    }, 30000);
    
    // Simulate live activity updates
    setInterval(() => {
        simulateLiveActivity();
    }, 45000);
    
    // Update notifications
    setInterval(() => {
        updateNotifications();
    }, 60000);
}

// Update real-time stats
function updateRealTimeStats() {
    // Simulate small changes in stats
    const completedQuizzes = document.getElementById('completed-quizzes');
    const currentRank = document.getElementById('current-rank');
    const avgScore = document.getElementById('avg-score');
    const streakDays = document.getElementById('streak-days');
    
    // Small random variations
    if (Math.random() > 0.7) {
        const current = parseInt(completedQuizzes.textContent);
        completedQuizzes.textContent = current + 1;
        animateValue(completedQuizzes, current, current + 1, 1000);
    }
    
    if (Math.random() > 0.8) {
        const currentRankNum = parseInt(currentRank.textContent.replace('#', ''));
        const newRank = Math.max(1, currentRankNum + (Math.random() > 0.5 ? -1 : 0));
        currentRank.textContent = `#${newRank}`;
    }
    
    if (Math.random() > 0.6) {
        const currentScore = parseInt(avgScore.textContent);
        const variation = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        const newScore = Math.max(70, Math.min(95, currentScore + variation));
        avgScore.textContent = `${newScore}%`;
        animateValue(avgScore, currentScore, newScore, 1000);
    }
}

// Simulate live activity
function simulateLiveActivity() {
    const activities = [
        "Ahmad just scored 95% in Data Structures",
        "New quiz available: Web Development Fundamentals",
        "Weekly leaderboard reset in 2 hours",
        "Maintenance scheduled for tonight at 2 AM"
    ];
    
    const randomActivity = activities[Math.floor(Math.random() * activities.length)];
    console.log('Live Activity:', randomActivity);
    
    // You could add this to a live activity feed
    showLiveNotification(randomActivity);
}

// Update notifications
function updateNotifications() {
    const notificationBadge = document.querySelector('.navbar-end .badge');
    if (notificationBadge) {
        const currentCount = parseInt(notificationBadge.textContent);
        const newCount = Math.max(0, currentCount + (Math.random() > 0.7 ? 1 : -1));
        notificationBadge.textContent = newCount;
        
        if (newCount > currentCount) {
            notificationBadge.classList.add('animate-pulse');
            setTimeout(() => {
                notificationBadge.classList.remove('animate-pulse');
            }, 2000);
        }
    }
}

// Show live notification
function showLiveNotification(message) {
    // Create a temporary notification
    const notification = document.createElement('div');
    notification.className = 'toast toast-top toast-end z-50';
    notification.innerHTML = `
        <div class="alert alert-info">
            <div>
                <i class="fa-solid fa-info-circle"></i>
                <span>${message}</span>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Setup event listeners
function setupEventListeners() {
    // Logout button
    document.getElementById('logout-btn').addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm('Are you sure you want to logout?')) {
            // Simulate logout
            showLogoutAnimation();
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        }
    });
    
    // Notification bell
    const notificationBell = document.querySelector('.dropdown-end button');
    if (notificationBell) {
        notificationBell.addEventListener('click', function() {
            // Mark notifications as read
            const badge = this.querySelector('.badge');
            if (badge) {
                badge.textContent = '0';
            }
        });
    }
    
    // Responsive menu
    const dropdown = document.querySelector('.dropdown');
    if (dropdown) {
        dropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
}

// Initialize animations
function initializeAnimations() {
    // Add intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all cards and stats
    document.querySelectorAll('.card, .stat-card').forEach(el => {
        observer.observe(el);
    });
}

// Animate stats
function animateStats() {
    const stats = document.querySelectorAll('.stat-value');
    stats.forEach(stat => {
        stat.classList.add('animate-pulse');
        setTimeout(() => {
            stat.classList.remove('animate-pulse');
        }, 1000);
    });
}

// Animate value changes
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = element.id === 'avg-score' ? `${value}%` : value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Show loading states
function showLoadingStates() {
    const elementsToLoad = [
        '#completed-quizzes', '#current-rank', '#avg-score', '#streak-days',
        '#recent-activity', '#upcoming-quizzes', '#recommended-quizzes'
    ];
    
    elementsToLoad.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            element.classList.add('skeleton');
            if (!selector.includes('quizzes')) {
                element.innerHTML = '<div class="skeleton-text w-1/2"></div>';
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

// Start quiz function
function startQuiz(quizTitle) {
    // Simulate quiz start
    const quizCard = event.target.closest('.quiz-card');
    quizCard.classList.add('card-hover');
    
    // Show loading state
    const button = event.target;
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Loading...';
    button.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        alert(`Starting quiz: ${quizTitle}`);
        button.innerHTML = originalText;
        button.disabled = false;
        quizCard.classList.remove('card-hover');
        
        // In a real app, this would redirect to the quiz page
        // window.location.href = `play_quiz.html?quiz=${encodeURIComponent(quizTitle)}`;
    }, 1500);
}

// Show logout animation
function showLogoutAnimation() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-base-100 z-50 flex items-center justify-center';
    overlay.innerHTML = `
        <div class="text-center">
            <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fa-solid fa-sign-out-alt text-white text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold mb-2">Logging out...</h3>
            <p>Thank you for using IUS Quiz System</p>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Add fade out animation
    setTimeout(() => {
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.5s ease';
    }, 1000);
}

// Export functions for global access
window.startQuiz = startQuiz;

// Performance monitoring
window.addEventListener('load', function() {
    console.log('Dashboard loaded successfully');
    
    // Track user engagement
    let engagementStart = Date.now();
    
    window.addEventListener('beforeunload', function() {
        const engagementTime = Math.round((Date.now() - engagementStart) / 1000);
        console.log(`User engagement time: ${engagementTime} seconds`);
    });
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('Dashboard error:', e.error);
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('SW registered: ', registration);
        }).catch(function(registrationError) {
            console.log('SW registration failed: ', registrationError);
        });
    });
}