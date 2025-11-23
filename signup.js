// Signup Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize real-time data
    initializeRealTimeData();
    
    // Update active nav link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === 'signup.html') {
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
    
    document.getElementById('toggle-confirm-password').addEventListener('click', function() {
        const confirmPasswordInput = document.getElementById('confirm-password');
        const icon = this.querySelector('i');
        
        if (confirmPasswordInput.type === 'password') {
            confirmPasswordInput.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            confirmPasswordInput.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });
    
    // Real-time password strength indicator
    document.getElementById('password').addEventListener('input', function() {
        updatePasswordStrength(this.value);
    });
    
    // Form submission
    document.getElementById('signup-form').addEventListener('submit', function(e) {
        e.preventDefault();
        handleSignup();
    });
    
    // Go to dashboard button
    document.getElementById('go-to-dashboard').addEventListener('click', function() {
        window.location.href = 'dashboard.html';
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
        
        // Update signup page stats
        updateSignupStats();
        setInterval(updateSignupStats, 5000);
    }
    
    // Update signup page statistics
    function updateSignupStats() {
        const totalUsers = document.getElementById('signup-total-users');
        const totalQuizzes = document.getElementById('signup-total-quizzes');
        const avgScore = document.getElementById('signup-avg-score');
        
        if (totalUsers) {
            const baseUsers = 2500;
            const randomVariation = Math.floor(Math.random() * 10);
            totalUsers.textContent = (baseUsers + randomVariation).toLocaleString() + '+';
        }
        
        if (totalQuizzes) {
            const baseQuizzes = 1250;
            const randomVariation = Math.floor(Math.random() * 5);
            totalQuizzes.textContent = (baseQuizzes + randomVariation).toLocaleString() + '+';
        }
        
        if (avgScore) {
            const baseScore = 78;
            const randomVariation = Math.floor(Math.random() * 4) - 2;
            avgScore.textContent = Math.max(70, Math.min(85, baseScore + randomVariation)) + '%';
        }
    }
    
    // Password strength calculator
    function updatePasswordStrength(password) {
        const strengthBar = document.getElementById('password-strength-bar');
        const strengthText = document.getElementById('password-strength-text');
        
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
    
    // Form validation and submission
    function handleSignup() {
        const form = document.getElementById('signup-form');
        const submitButton = document.getElementById('signup-submit');
        const loadingSpinner = document.getElementById('submit-loading');
        
        // Clear previous errors
        clearValidationErrors();
        
        // Validate form
        if (validateForm()) {
            // Show loading state
            submitButton.disabled = true;
            loadingSpinner.classList.remove('hidden');
            
            // Simulate API call
            setTimeout(() => {
                // Hide loading state
                submitButton.disabled = false;
                loadingSpinner.classList.add('hidden');
                
                // Show success modal
                document.getElementById('success-modal').classList.add('modal-open');
            }, 2000);
        }
    }
    
    // Clear all validation errors
    function clearValidationErrors() {
        const errorElements = document.querySelectorAll('.validation-message');
        errorElements.forEach(element => {
            element.classList.add('hidden');
        });
        
        const inputs = document.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.classList.remove('input-error');
        });
    }
    
    // Form validation
    function validateForm() {
        let isValid = true;
        
        // First Name validation
        const firstName = document.getElementById('first-name');
        if (!firstName.value.trim()) {
            showValidationError('first-name', 'First name is required');
            isValid = false;
        }
        
        // Last Name validation
        const lastName = document.getElementById('last-name');
        if (!lastName.value.trim()) {
            showValidationError('last-name', 'Last name is required');
            isValid = false;
        }
        
        // Email validation
        const email = document.getElementById('email');
        if (!email.value.trim()) {
            showValidationError('email', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showValidationError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Student ID validation
        const studentId = document.getElementById('student-id');
        if (!studentId.value.trim()) {
            showValidationError('student-id', 'Student ID is required');
            isValid = false;
        } else if (!isValidStudentId(studentId.value)) {
            showValidationError('student-id', 'Please enter a valid student ID (e.g., IUS-2024-001)');
            isValid = false;
        }
        
        // Department validation
        const department = document.getElementById('department');
        if (!department.value) {
            showValidationError('department', 'Please select your department');
            isValid = false;
        }
        
        // Password validation
        const password = document.getElementById('password');
        if (!password.value) {
            showValidationError('password', 'Password is required');
            isValid = false;
        } else if (password.value.length < 8) {
            showValidationError('password', 'Password must be at least 8 characters long');
            isValid = false;
        }
        
        // Confirm Password validation
        const confirmPassword = document.getElementById('confirm-password');
        if (!confirmPassword.value) {
            showValidationError('confirm-password', 'Please confirm your password');
            isValid = false;
        } else if (password.value !== confirmPassword.value) {
            showValidationError('confirm-password', 'Passwords do not match');
            isValid = false;
        }
        
        // Terms validation
        const terms = document.getElementById('terms');
        if (!terms.checked) {
            showValidationError('terms', 'You must agree to the terms and conditions');
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
    
    // Student ID validation
    function isValidStudentId(studentId) {
        const re = /^IUS-\d{4}-\d{3}$/;
        return re.test(studentId);
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