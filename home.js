// Real-time data simulation and dynamic functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize real-time data
    initializeRealTimeData();
    
    // Update active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });
    
    // Simulate user authentication state (for demo purposes)
    const isLoggedIn = false; // Change to true to see logged-in state
    
    // Update navbar based on authentication state
    updateNavbarForAuth(isLoggedIn);
    
    // Add click handlers for auth buttons
    document.getElementById('desktop-signin').addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'signin.html';
    });
    
    document.getElementById('desktop-signup').addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'signup.html';
    });
    
    document.getElementById('mobile-signin').addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'signin.html';
    });
    
    document.getElementById('mobile-signup').addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'signup.html';
    });
    
    // Quiz interaction handlers
    document.getElementById('start-quiz-btn').addEventListener('click', function() {
        alert('Starting a new quiz! This would navigate to the quiz selection page.');
    });
    
    document.getElementById('leaderboard-btn').addEventListener('click', function() {
        document.getElementById('view-full-leaderboard').scrollIntoView({ behavior: 'smooth' });
    });
    
    document.getElementById('join-quiz-btn').addEventListener('click', function() {
        alert('Joining the active quiz: ' + document.getElementById('active-quiz-title').textContent);
    });
    
    document.getElementById('view-full-leaderboard').addEventListener('click', function() {
        alert('This would navigate to the full leaderboard page.');
    });
    
    // Dark mode toggle
    document.getElementById('dark-mode-toggle').addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const icon = this.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
    
    // Initialize particle background
    createParticles();
    
    // Function to update navbar based on authentication state
    function updateNavbarForAuth(loggedIn) {
        if (loggedIn) {
            // User is logged in - show profile and logout options
            const desktopAuthSection = document.querySelector('.navbar-end');
            desktopAuthSection.innerHTML = `
                <div id="navbar-clock" class="hidden md:flex items-center text-sm bg-base-300 px-3 py-1 rounded-full mr-2">
                    <i class="fa-regular fa-clock mr-1"></i> Loading...
                </div>
                
                <!-- Dark Mode Toggle -->
                <button id="dark-mode-toggle" class="btn btn-sm btn-ghost" aria-label="Toggle dark mode">
                    <i class="fa-solid fa-moon"></i>
                </button>
                
                <!-- Notification Bell -->
                <div class="dropdown dropdown-end">
                    <button class="btn btn-sm btn-ghost relative" aria-label="Notifications">
                        <i class="fa-solid fa-bell"></i>
                        <span class="notification-badge">3</span>
                    </button>
                    <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-80 mt-4">
                        <li class="menu-title">Notifications</li>
                        <li><a><i class="fa-solid fa-trophy text-yellow-500"></i> You've moved up to 3rd place!</a></li>
                        <li><a><i class="fa-solid fa-clock text-blue-500"></i> New quiz available: "Advanced Algorithms"</a></li>
                        <li><a><i class="fa-solid fa-users text-green-500"></i> 5 new students joined your course</a></li>
                    </ul>
                </div>
                
                <div class="dropdown dropdown-end">
                    <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                        <div class="w-8 rounded-full bg-primary text-white flex items-center justify-center">
                            <i class="fa-solid fa-user"></i>
                        </div>
                    </label>
                    <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li><a><i class="fa-solid fa-user"></i> Profile</a></li>
                        <li><a><i class="fa-solid fa-gear"></i> Settings</a></li>
                        <li><a href="index.html"><i class="fa-solid fa-arrow-right-from-bracket"></i> Logout</a></li>
                    </ul>
                </div>
            `;
            
            const mobileAuthSection = document.querySelector('#mobile-menu');
            const authLinks = mobileAuthSection.querySelectorAll('li:last-child, li:nth-last-child(2)');
            authLinks.forEach(link => link.remove());
            
            const mobileProfileItem = document.createElement('li');
            mobileProfileItem.innerHTML = `
                <details>
                    <summary><i class="fa-solid fa-user" aria-hidden="true"></i> My Account</summary>
                    <ul class="p-2">
                        <li><a href="#"><i class="fa-solid fa-user" aria-hidden="true"></i> Profile</a></li>
                        <li><a href="#"><i class="fa-solid fa-gear" aria-hidden="true"></i> Settings</a></li>
                        <li><a href="index.html"><i class="fa-solid fa-arrow-right-from-bracket" aria-hidden="true"></i> Logout</a></li>
                    </ul>
                </details>
            `;
            mobileAuthSection.appendChild(mobileProfileItem);
            
            // Reinitialize clock after DOM update
            updateClock();
            
            // Reinitialize dark mode toggle
            document.getElementById('dark-mode-toggle').addEventListener('click', function() {
                document.body.classList.toggle('dark-mode');
                const icon = this.querySelector('i');
                if (document.body.classList.contains('dark-mode')) {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                } else {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                }
            });
            
            // Reinitialize logout functionality
            document.querySelectorAll('a[href="index.html"]').forEach(link => {
                if (link.textContent.includes('Logout')) {
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        // Reset to logged out state
                        location.reload();
                    });
                }
            });
        }
    }
    
    // Real-time clock in navbar
    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        const clockElement = document.getElementById('navbar-clock');
        if (clockElement) {
            clockElement.innerHTML = `<i class="fa-regular fa-clock mr-1"></i> ${timeString}`;
        }
    }
    
    // Initialize and update all real-time data
    function initializeRealTimeData() {
        // Update clock immediately and then every minute
        updateClock();
        setInterval(updateClock, 60000);
        
        // Simulate real-time data updates
        updateRealTimeStats();
        setInterval(updateRealTimeStats, 5000);
        
        // Initialize leaderboard
        updateLeaderboard();
        setInterval(updateLeaderboard, 10000);
        
        // Initialize active quiz data
        updateActiveQuiz();
        setInterval(updateActiveQuiz, 8000);
        
        // Initialize recent activity
        updateRecentActivity();
        setInterval(updateRecentActivity, 15000);
        
        // Initialize about page statistics
        updateAboutPageStats();
        setInterval(updateAboutPageStats, 6000);
    }
    
    // Update real-time statistics
    function updateRealTimeStats() {
        // Simulate data changes
        const totalQuizzes = document.getElementById('total-quizzes');
        const activeUsers = document.getElementById('active-users');
        const questionsAnswered = document.getElementById('questions-answered');
        const avgScore = document.getElementById('avg-score');
        const totalStudents = document.getElementById('total-students');
        const footerActiveUsers = document.getElementById('footer-active-users');
        const footerUpdateTime = document.getElementById('footer-update-time');
        
        // Update values with slight random variations
        if (totalQuizzes) {
            const current = parseInt(totalQuizzes.textContent.replace(',', ''));
            totalQuizzes.textContent = (current + Math.floor(Math.random() * 3)).toLocaleString();
        }
        
        if (activeUsers) {
            const baseUsers = 340;
            const randomVariation = Math.floor(Math.random() * 20) - 10;
            const newValue = Math.max(300, baseUsers + randomVariation);
            activeUsers.textContent = newValue.toLocaleString();
            
            // Also update footer
            if (footerActiveUsers) {
                footerActiveUsers.textContent = newValue.toLocaleString();
            }
        }
        
        if (questionsAnswered) {
            const current = parseInt(questionsAnswered.textContent.replace(',', ''));
            questionsAnswered.textContent = (current + Math.floor(Math.random() * 50)).toLocaleString();
        }
        
        if (avgScore) {
            const baseScore = 78;
            const randomVariation = Math.floor(Math.random() * 4) - 2;
            avgScore.textContent = Math.max(70, Math.min(85, baseScore + randomVariation)) + '%';
        }
        
        if (totalStudents) {
            const baseStudents = 2500;
            const randomVariation = Math.floor(Math.random() * 10);
            totalStudents.textContent = (baseStudents + randomVariation).toLocaleString() + '+';
        }
        
        // Update footer timestamp
        if (footerUpdateTime) {
            const now = new Date();
            footerUpdateTime.textContent = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        }
    }
    
    // Update leaderboard with simulated data
    function updateLeaderboard() {
        const leaderboardData = [
            { name: "Rahim Ahmed", course: "CSE", score: "98%", quizzes: 42 },
            { name: "Fatima Begum", course: "BBA", score: "96%", quizzes: 38 },
            { name: "Karim Khan", course: "EEE", score: "95%", quizzes: 35 },
            { name: "Ayesha Siddiqua", course: "English", score: "94%", quizzes: 28 },
            { name: "Jamil Hossain", course: "Textile", score: "92%", quizzes: 24 }
        ];
        
        const leaderboardBody = document.getElementById('leaderboard-body');
        if (leaderboardBody) {
            leaderboardBody.innerHTML = '';
            
            leaderboardData.forEach((student, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>
                        <div class="flex items-center">
                            <span class="font-bold mr-2">${index + 1}</span>
                            ${index < 3 ? '<i class="fa-solid fa-crown text-yellow-500"></i>' : ''}
                        </div>
                    </td>
                    <td>${student.name}</td>
                    <td>${student.course}</td>
                    <td>
                        <div class="flex items-center">
                            <div class="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                                <div class="bg-green-600 h-2.5 rounded-full" style="width: ${student.score}"></div>
                            </div>
                            <span>${student.score}</span>
                        </div>
                    </td>
                    <td>${student.quizzes}</td>
                `;
                leaderboardBody.appendChild(row);
            });
        }
    }
    
    // Update active quiz information
    function updateActiveQuiz() {
        const quizzes = [
            { title: "Computer Science Fundamentals", questions: "10 questions", time: "15 minutes" },
            { title: "Business Management Principles", questions: "12 questions", time: "20 minutes" },
            { title: "Electrical Circuit Analysis", questions: "8 questions", time: "12 minutes" },
            { title: "English Literature Review", questions: "15 questions", time: "25 minutes" },
            { title: "Textile Manufacturing Process", questions: "10 questions", time: "15 minutes" }
        ];
        
        const activeQuizTitle = document.getElementById('active-quiz-title');
        const activeQuizDetails = document.getElementById('active-quiz-details');
        const activeQuizParticipants = document.getElementById('active-quiz-participants');
        
        if (activeQuizTitle && activeQuizDetails && activeQuizParticipants) {
            const randomQuiz = quizzes[Math.floor(Math.random() * quizzes.length)];
            activeQuizTitle.textContent = randomQuiz.title;
            activeQuizDetails.textContent = `${randomQuiz.questions} • ${randomQuiz.time}`;
            
            // Randomize participant count
            const baseParticipants = 240;
            const randomVariation = Math.floor(Math.random() * 20) - 10;
            activeQuizParticipants.textContent = Math.max(200, baseParticipants + randomVariation);
        }
    }
    
    // Update recent activity
    function updateRecentActivity() {
        const recentCompletions = document.getElementById('recent-completions');
        const newQuizzes = document.getElementById('new-quizzes');
        
        if (recentCompletions) {
            const completions = [
                { user: "Sara Khan", quiz: "Data Structures", score: "95%", time: "5 min ago" },
                { user: "Ahmed Rahman", quiz: "Marketing Principles", score: "88%", time: "12 min ago" },
                { user: "Fatima Islam", quiz: "Circuit Analysis", score: "92%", time: "18 min ago" },
                { user: "Jamil Hossain", quiz: "Textile Design", score: "85%", time: "25 min ago" }
            ];
            
            recentCompletions.innerHTML = '';
            completions.forEach(completion => {
                const completionElement = document.createElement('div');
                completionElement.className = 'flex justify-between items-center p-2 bg-base-200 rounded-lg';
                completionElement.innerHTML = `
                    <div>
                        <div class="font-semibold">${completion.user}</div>
                        <div class="text-sm">${completion.quiz}</div>
                    </div>
                    <div class="text-right">
                        <div class="font-bold text-primary">${completion.score}</div>
                        <div class="text-xs">${completion.time}</div>
                    </div>
                `;
                recentCompletions.appendChild(completionElement);
            });
        }
        
        if (newQuizzes) {
            const quizzes = [
                { title: "Advanced Algorithms", course: "CSE", questions: 15, duration: "20 min" },
                { title: "Financial Accounting", course: "BBA", questions: 12, duration: "15 min" },
                { title: "Digital Electronics", course: "EEE", questions: 10, duration: "12 min" },
                { title: "Modern Poetry", course: "English", questions: 8, duration: "10 min" }
            ];
            
            newQuizzes.innerHTML = '';
            quizzes.forEach(quiz => {
                const quizElement = document.createElement('div');
                quizElement.className = 'flex justify-between items-center p-2 bg-base-200 rounded-lg';
                quizElement.innerHTML = `
                    <div>
                        <div class="font-semibold">${quiz.title}</div>
                        <div class="text-sm">${quiz.course} • ${quiz.questions} questions</div>
                    </div>
                    <div class="text-right">
                        <div class="text-sm">${quiz.duration}</div>
                        <button class="btn btn-xs btn-primary mt-1">Take Quiz</button>
                    </div>
                `;
                newQuizzes.appendChild(quizElement);
            });
        }
    }
    
    // Create particle background
    function createParticles() {
        const container = document.getElementById('particles-container');
        if (!container) return;
        
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random size between 3px and 8px
            const size = Math.random() * 5 + 3;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random position
            particle.style.left = `${Math.random() * 100}%`;
            
            // Random animation duration between 10s and 20s
            const duration = Math.random() * 10 + 10;
            particle.style.animationDuration = `${duration}s`;
            
            // Random delay
            particle.style.animationDelay = `${Math.random() * 5}s`;
            
            container.appendChild(particle);
        }
    }
    
    // Update about page statistics
    function updateAboutPageStats() {
        const aboutTotalStudents = document.getElementById('about-total-students');
        const aboutTotalQuizzes = document.getElementById('about-total-quizzes');
        const aboutQuestions = document.getElementById('about-questions');
        const aboutAvgScore = document.getElementById('about-avg-score');
        
        if (aboutTotalStudents) {
            const baseStudents = 2500;
            const randomVariation = Math.floor(Math.random() * 10);
            aboutTotalStudents.textContent = (baseStudents + randomVariation).toLocaleString() + '+';
        }
        
        if (aboutTotalQuizzes) {
            const baseQuizzes = 1250;
            const randomVariation = Math.floor(Math.random() * 5);
            aboutTotalQuizzes.textContent = (baseQuizzes + randomVariation).toLocaleString() + '+';
        }
        
        if (aboutQuestions) {
            const current = parseInt(aboutQuestions.textContent.replace(',', '').replace('+', '')) || 58420;
            aboutQuestions.textContent = (current + Math.floor(Math.random() * 50)).toLocaleString() + '+';
        }
        
        if (aboutAvgScore) {
            const baseScore = 78;
            const randomVariation = Math.floor(Math.random() * 4) - 2;
            aboutAvgScore.textContent = Math.max(70, Math.min(85, baseScore + randomVariation)) + '%';
        }
    }
});

// Footer-specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize footer functionality
    initializeFooter();
    
    // Set current year in copyright
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Back to top button
    document.getElementById('back-to-top').addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Newsletter subscription
    document.getElementById('subscribe-btn').addEventListener('click', function() {
        const email = document.getElementById('newsletter-email').value;
        if (email && validateEmail(email)) {
            const successMsg = document.getElementById('subscription-success');
            successMsg.classList.remove('hidden');
            setTimeout(() => {
                successMsg.classList.add('hidden');
            }, 3000);
            document.getElementById('newsletter-email').value = '';
        } else {
            alert('Please enter a valid email address');
        }
    });
    
    // Feedback modal
    document.getElementById('feedback-btn').addEventListener('click', function() {
        document.getElementById('feedback-modal').classList.add('modal-open');
    });
    
    document.getElementById('cancel-feedback').addEventListener('click', function() {
        document.getElementById('feedback-modal').classList.remove('modal-open');
    });
    
    document.getElementById('submit-feedback').addEventListener('click', function() {
        alert('Thank you for your feedback!');
        document.getElementById('feedback-modal').classList.remove('modal-open');
    });
    
    // Location tooltip
    const locationElement = document.getElementById('location-tooltip');
    const tooltipContent = document.getElementById('location-tooltip-content');
    
    locationElement.addEventListener('mouseenter', function(e) {
        const rect = locationElement.getBoundingClientRect();
        tooltipContent.style.left = `${rect.left}px`;
        tooltipContent.style.top = `${rect.bottom + window.scrollY + 10}px`;
        tooltipContent.classList.remove('hidden');
    });
    
    locationElement.addEventListener('mouseleave', function() {
        tooltipContent.classList.add('hidden');
    });
    
    // Email validation function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});

// Initialize footer with dynamic data
function initializeFooter() {
    // Update real-time stats
    updateFooterStats();
    setInterval(updateFooterStats, 8000);
    
    // Update trending quiz
    updateTrendingQuiz();
    setInterval(updateTrendingQuiz, 15000);
    
    // Update today's activity
    updateTodaysActivity();
    setInterval(updateTodaysActivity, 12000);
}

// Update footer statistics
function updateFooterStats() {
    const activeUsers = document.getElementById('footer-active-users');
    const updateTime = document.getElementById('footer-update-time');
    const systemStatus = document.getElementById('system-status');
    
    if (activeUsers) {
        const baseUsers = 340;
        const randomVariation = Math.floor(Math.random() * 30) - 15;
        const newValue = Math.max(300, baseUsers + randomVariation);
        activeUsers.textContent = newValue.toLocaleString();
    }
    
    if (updateTime) {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        updateTime.textContent = timeString;
    }
    
    // Occasionally simulate system status change (for demo purposes)
    if (Math.random() < 0.1) { // 10% chance
        systemStatus.textContent = "High Load";
        systemStatus.classList.remove('text-accent');
        systemStatus.classList.add('text-warning');
    } else {
        systemStatus.textContent = "Operational";
        systemStatus.classList.remove('text-warning');
        systemStatus.classList.add('text-accent');
    }
}

// Update trending quiz
function updateTrendingQuiz() {
    const trendingQuiz = document.getElementById('trending-quiz');
    const quizzes = [
        "Data Structures",
        "Business Ethics",
        "Circuit Theory",
        "English Literature",
        "Textile Chemistry",
        "Database Management",
        "Marketing Principles",
        "Power Systems"
    ];
    
    if (trendingQuiz) {
        const randomQuiz = quizzes[Math.floor(Math.random() * quizzes.length)];
        trendingQuiz.textContent = randomQuiz;
    }
}

// Update today's activity
function updateTodaysActivity() {
    const todayQuizzes = document.getElementById('today-quizzes');
    const todayUsers = document.getElementById('today-users');
    
    if (todayQuizzes) {
        const baseQuizzes = 140;
        const randomVariation = Math.floor(Math.random() * 10);
        todayQuizzes.textContent = (baseQuizzes + randomVariation).toLocaleString();
    }
    
    if (todayUsers) {
        const baseUsers = 25;
        const randomVariation = Math.floor(Math.random() * 8);
        todayUsers.textContent = (baseUsers + randomVariation).toLocaleString();
    }
}