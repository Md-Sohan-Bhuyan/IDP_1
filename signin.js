// Signin Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize real-time data
    initializeRealTimeData();
    
    // Update active nav link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === 'signin.html') {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
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
    
    // Password visibility toggle
    document.getElementById('toggle-password').addEventListener('click', function() {
        const passwordInput = document.getElementById('password');
        const icon = this.querySelector('i');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });
    
    // Account type tabs
    const tabs = document.querySelectorAll('.tab');
    let currentRole = 'student';
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('tab-active'));
            // Add active class to clicked tab
            this.classList.add('tab-active');
            // Update current role
            currentRole = this.getAttribute('data-role');
            updateFormForRole(currentRole);
        });
    });
    
    // Form submission - UPDATED FOR STUDENT REDIRECT
    document.getElementById('signin-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Student hole direct redirect, other roles er jonno modal
        if (currentRole === 'student') {
            handleStudentSignin(); // Direct redirect for students
        } else {
            handleSignin(); // Modal show kore then redirect for other roles
        }
    });
    
    // Forgot password modal
    document.getElementById('forgot-password-btn').addEventListener('click', function() {
        document.getElementById('forgot-password-modal').classList.add('modal-open');
    });
    
    document.getElementById('cancel-reset').addEventListener('click', function() {
        document.getElementById('forgot-password-modal').classList.remove('modal-open');
    });
    
    // Forgot password form submission
    document.getElementById('forgot-password-form').addEventListener('submit', function(e) {
        e.preventDefault();
        handleForgotPassword();
    });
    
    // Close reset sent modal
    document.getElementById('close-reset-modal').addEventListener('click', function() {
        document.getElementById('reset-sent-modal').classList.remove('modal-open');
    });
    
    // Go to dashboard button - UPDATED FOR STUDENT DASHBOARD
    document.getElementById('go-to-dashboard').addEventListener('click', function() {
        const dashboardUrls = {
            student: 'student_dashboard.html',
            teacher: 'teacher_dashboard.html',
            admin: 'admin_dashboard.html',
            superadmin: 'superadmin_dashboard.html'
        };
        window.location.href = dashboardUrls[currentRole] || 'dashboard.html';
    });
    
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
        
        // Update signin page stats
        updateSigninStats();
        setInterval(updateSigninStats, 5000);
    }
    
    // Update signin page statistics
    function updateSigninStats() {
        const activeUsers = document.getElementById('signin-active-users');
        const quizzesToday = document.getElementById('signin-quizzes-today');
        const avgScore = document.getElementById('signin-avg-score');
        
        if (activeUsers) {
            const baseUsers = 340;
            const randomVariation = Math.floor(Math.random() * 30) - 15;
            const newValue = Math.max(300, baseUsers + randomVariation);
            activeUsers.textContent = newValue.toLocaleString();
        }
        
        if (quizzesToday) {
            const baseQuizzes = 140;
            const randomVariation = Math.floor(Math.random() * 10);
            quizzesToday.textContent = (baseQuizzes + randomVariation).toLocaleString();
        }
        
        if (avgScore) {
            const baseScore = 78;
            const randomVariation = Math.floor(Math.random() * 4) - 2;
            avgScore.textContent = Math.max(70, Math.min(85, baseScore + randomVariation)) + '%';
        }
    }
    
    // Update form based on selected role
    function updateFormForRole(role) {
        const emailInput = document.getElementById('email');
        const formTitle = document.querySelector('.text-3xl.font-bold');
        
        switch(role) {
            case 'student':
                emailInput.placeholder = 'student.id@ius.ac.bd';
                formTitle.textContent = 'Student Sign In';
                break;
            case 'teacher':
                emailInput.placeholder = 'teacher.name@ius.ac.bd';
                formTitle.textContent = 'Teacher Sign In';
                break;
            case 'admin':
                emailInput.placeholder = 'admin@ius.ac.bd';
                formTitle.textContent = 'Admin Sign In';
                break;
            case 'superadmin':
                emailInput.placeholder = 'superadmin@ius.ac.bd';
                formTitle.textContent = 'Super Admin Sign In';
                break;
        }
    }
    
    // NEW FUNCTION: Student signin with direct redirect
    function handleStudentSignin() {
        const form = document.getElementById('signin-form');
        const submitButton = document.getElementById('signin-submit');
        const loadingSpinner = document.getElementById('submit-loading');
        
        // Clear previous errors
        clearValidationErrors();
        
        // Validate form
        if (validateSigninForm()) {
            // Show loading state
            submitButton.disabled = true;
            loadingSpinner.classList.remove('hidden');
            
            // Change button text to show loading
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = `
                <i class="fa-solid fa-spinner fa-spin mr-2"></i>
                Signing In...
                <span class="loading loading-spinner loading-sm"></span>
            `;
            
            // Simulate API call
            setTimeout(() => {
                // Direct redirect to student dashboard
                window.location.href = 'student_dashboard.html';
            }, 2000);
        }
    }
    
    // Form validation and submission for non-student roles
    function handleSignin() {
        const form = document.getElementById('signin-form');
        const submitButton = document.getElementById('signin-submit');
        const loadingSpinner = document.getElementById('submit-loading');
        
        // Clear previous errors
        clearValidationErrors();
        
        // Validate form
        if (validateSigninForm()) {
            // Show loading state
            submitButton.disabled = true;
            loadingSpinner.classList.remove('hidden');
            
            // Simulate API call
            setTimeout(() => {
                // Hide loading state
                submitButton.disabled = false;
                loadingSpinner.classList.add('hidden');
                
                // Update success message based on role
                const successTitle = document.getElementById('success-title');
                const successMessage = document.getElementById('success-message');
                
                const roleMessages = {
                    student: {
                        title: 'Welcome Back, Student!',
                        message: 'You have successfully signed in to your student account.'
                    },
                    teacher: {
                        title: 'Welcome, Teacher!',
                        message: 'You have successfully signed in to your teacher account.'
                    },
                    admin: {
                        title: 'Welcome, Administrator!',
                        message: 'You have successfully signed in to the admin panel.'
                    },
                    superadmin: {
                        title: 'Welcome, Super Admin!',
                        message: 'You have successfully signed in with super admin privileges.'
                    }
                };
                
                const message = roleMessages[currentRole] || roleMessages.student;
                successTitle.textContent = message.title;
                successMessage.textContent = message.message;
                
                // Show success modal
                document.getElementById('success-modal').classList.add('modal-open');
            }, 2000);
        }
    }
    
    // Forgot password handler
    function handleForgotPassword() {
        const form = document.getElementById('forgot-password-form');
        const submitButton = document.getElementById('send-reset-link');
        const loadingSpinner = document.getElementById('reset-loading');
        const emailInput = document.getElementById('reset-email');
        
        // Clear previous errors
        clearValidationErrors();
        
        // Validate email
        if (!emailInput.value.trim()) {
            showValidationError('reset-email', 'Email is required');
            return;
        } else if (!isValidEmail(emailInput.value)) {
            showValidationError('reset-email', 'Please enter a valid email address');
            return;
        }
        
        // Show loading state
        submitButton.disabled = true;
        loadingSpinner.classList.remove('hidden');
        
        // Simulate API call
        setTimeout(() => {
            // Hide loading state
            submitButton.disabled = false;
            loadingSpinner.classList.add('hidden');
            
            // Close forgot password modal
            document.getElementById('forgot-password-modal').classList.remove('modal-open');
            
            // Show reset sent modal
            document.getElementById('reset-sent-modal').classList.add('modal-open');
            
            // Clear form
            form.reset();
        }, 1500);
    }
    
    // Clear all validation errors
    function clearValidationErrors() {
        const errorElements = document.querySelectorAll('.validation-message');
        errorElements.forEach(element => {
            element.classList.add('hidden');
        });
        
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.classList.remove('input-error');
        });
    }
    
    // Signin form validation
    function validateSigninForm() {
        let isValid = true;
        
        // Email validation
        const email = document.getElementById('email');
        if (!email.value.trim()) {
            showValidationError('email', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showValidationError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Password validation
        const password = document.getElementById('password');
        if (!password.value) {
            showValidationError('password', 'Password is required');
            isValid = false;
        } else if (password.value.length < 6) {
            showValidationError('password', 'Password must be at least 6 characters long');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Show validation error
    function showValidationError(fieldId, message) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        const inputElement = document.getElementById(fieldId);
        
        if (errorElement && inputElement) {
            errorElement.textContent = message;
            errorElement.classList.remove('hidden');
            inputElement.classList.add('input-error');
        }
    }
    
    // Email validation
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Create particle background
    function createParticles() {
        const container = document.getElementById('particles-container');
        if (!container) return;
        
        const particleCount = 20;
        
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
    
    // Set current year in copyright
    document.getElementById('current-year').textContent = new Date().getFullYear();
});