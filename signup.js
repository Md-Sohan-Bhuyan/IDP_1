// Enhanced Signup Page JavaScript
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
    
    // Initialize enhanced particle background
    createEnhancedParticles();
    
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
    
    // Real-time password strength indicator with enhanced validation
    document.getElementById('password').addEventListener('input', function() {
        updatePasswordStrength(this.value);
        updateProgress();
    });
    
    // Real-time form validation
    const formInputs = document.querySelectorAll('#signup-form input, #signup-form select');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this.id);
            updateProgress();
        });
        
        input.addEventListener('input', function() {
            clearFieldValidation(this.id);
            updateProgress();
        });
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
        
        // Initialize progress indicator
        updateProgress();
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
    
    // Enhanced password strength calculator
    function updatePasswordStrength(password) {
        const strengthBar = document.getElementById('password-strength-bar');
        const strengthText = document.getElementById('password-strength-text');
        
        let strength = 0;
        let color = 'bg-red-500';
        let text = 'Weak';
        
        // Check password requirements
        const hasMinLength = password.length >= 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[^a-zA-Z\d]/.test(password);
        
        // Update requirement indicators
        updateRequirementIndicator('req-length', hasMinLength);
        updateRequirementIndicator('req-uppercase', hasUpperCase && hasLowerCase);
        updateRequirementIndicator('req-number', hasNumber);
        updateRequirementIndicator('req-special', hasSpecialChar);
        
        // Calculate strength
        if (hasMinLength) strength += 25;
        if (hasUpperCase && hasLowerCase) strength += 25;
        if (hasNumber) strength += 25;
        if (hasSpecialChar) strength += 25;
        
        // Determine strength level
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
        
        strengthBar.className = `password-strength-bar ${color} h-2 rounded-full transition-all duration-500`;
        strengthBar.style.width = `${strength}%`;
        strengthText.textContent = text;
    }
    
    // Update requirement indicator
    function updateRequirementIndicator(elementId, isMet) {
        const element = document.getElementById(elementId);
        if (element) {
            const icon = element.querySelector('i');
            if (isMet) {
                icon.className = 'fa-solid fa-check text-green-500';
                element.classList.add('text-green-600');
                element.classList.remove('text-gray-600');
            } else {
                icon.className = 'fa-solid fa-circle text-gray-300';
                element.classList.remove('text-green-600');
                element.classList.add('text-gray-600');
            }
        }
    }
    
    // Update progress indicator
    function updateProgress() {
        const inputs = [
            'first-name', 'last-name', 'email', 'student-id', 
            'department', 'password', 'confirm-password', 'terms'
        ];
        
        let completed = 0;
        
        inputs.forEach(inputId => {
            const element = document.getElementById(inputId);
            if (element) {
                if (element.type === 'checkbox') {
                    if (element.checked) completed++;
                } else if (element.type === 'select-one') {
                    if (element.value) completed++;
                } else {
                    if (element.value.trim() && validateField(inputId, true)) {
                        completed++;
                    }
                }
            }
        });
        
        const progress = Math.round((completed / inputs.length) * 100);
        const progressBar = document.getElementById('signup-progress');
        const progressPercentage = document.getElementById('progress-percentage');
        
        if (progressBar && progressPercentage) {
            progressBar.style.width = `${progress}%`;
            progressPercentage.textContent = `${progress}%`;
            
            // Change color based on progress
            if (progress >= 75) {
                progressBar.className = 'signup-progress bg-green-500 h-2 rounded-full transition-all duration-500';
            } else if (progress >= 50) {
                progressBar.className = 'signup-progress bg-yellow-500 h-2 rounded-full transition-all duration-500';
            } else {
                progressBar.className = 'signup-progress bg-primary h-2 rounded-full transition-all duration-500';
            }
        }
    }
    
    // Real-time field validation
    function validateField(fieldId, silent = false) {
        const element = document.getElementById(fieldId);
        let isValid = true;
        let message = '';
        
        if (!element) return true;
        
        switch(fieldId) {
            case 'first-name':
            case 'last-name':
                if (!element.value.trim()) {
                    isValid = false;
                    message = 'This field is required';
                } else if (element.value.trim().length < 2) {
                    isValid = false;
                    message = 'Must be at least 2 characters';
                }
                break;
                
            case 'email':
                if (!element.value.trim()) {
                    isValid = false;
                    message = 'Email is required';
                } else if (!isValidEmail(element.value)) {
                    isValid = false;
                    message = 'Please enter a valid email address';
                }
                break;
                
            case 'student-id':
                if (!element.value.trim()) {
                    isValid = false;
                    message = 'Student ID is required';
                } else if (!isValidStudentId(element.value)) {
                    isValid = false;
                    message = 'Please enter a valid student ID (e.g., IUS-2024-001)';
                }
                break;
                
            case 'department':
                if (!element.value) {
                    isValid = false;
                    message = 'Please select your department';
                }
                break;
                
            case 'password':
                if (!element.value) {
                    isValid = false;
                    message = 'Password is required';
                } else if (element.value.length < 8) {
                    isValid = false;
                    message = 'Password must be at least 8 characters long';
                }
                break;
                
            case 'confirm-password':
                const password = document.getElementById('password').value;
                if (!element.value) {
                    isValid = false;
                    message = 'Please confirm your password';
                } else if (element.value !== password) {
                    isValid = false;
                    message = 'Passwords do not match';
                }
                break;
        }
        
        if (!silent) {
            if (!isValid) {
                showValidationError(fieldId, message);
            } else {
                showValidationSuccess(fieldId);
            }
        }
        
        return isValid;
    }
    
    // Clear field validation
    function clearFieldValidation(fieldId) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        const inputElement = document.getElementById(fieldId);
        
        if (errorElement) {
            errorElement.classList.add('hidden');
        }
        
        if (inputElement) {
            inputElement.classList.remove('validation-error', 'validation-success');
        }
    }
    
    // Show validation success
    function showValidationSuccess(fieldId) {
        const inputElement = document.getElementById(fieldId);
        if (inputElement) {
            inputElement.classList.add('validation-success');
            inputElement.classList.remove('validation-error');
        }
    }
    
    // Form validation and submission
    function handleSignup() {
        const form = document.getElementById('signup-form');
        const submitButton = document.getElementById('signup-submit');
        const loadingSpinner = document.getElementById('submit-loading');
        
        // Clear previous errors
        clearValidationErrors();
        
        // Validate all fields
        const isValid = validateForm();
        
        if (isValid) {
            // Show loading state with enhanced security animation
            submitButton.disabled = true;
            loadingSpinner.classList.remove('hidden');
            submitButton.innerHTML = `
                <i class="fa-solid fa-shield-halved mr-2"></i>
                Securing Your Account
                <span class="loading loading-spinner loading-sm"></span>
            `;
            
            // Simulate secure registration process
            simulateSecureRegistration()
                .then(() => {
                    // Hide loading state
                    submitButton.disabled = false;
                    loadingSpinner.classList.add('hidden');
                    submitButton.innerHTML = `
                        <i class="fa-solid fa-user-plus mr-2"></i>
                        Create Account
                    `;
                    
                    // Show success modal
                    document.getElementById('success-modal').classList.add('modal-open');
                    
                    // Reset form
                    form.reset();
                    updateProgress();
                })
                .catch(error => {
                    console.error('Registration failed:', error);
                    // Handle registration failure
                    submitButton.disabled = false;
                    loadingSpinner.classList.add('hidden');
                    submitButton.innerHTML = `
                        <i class="fa-solid fa-user-plus mr-2"></i>
                        Create Account
                    `;
                    
                    alert('Registration failed. Please try again.');
                });
        }
    }
    
    // Simulate secure registration process
    function simulateSecureRegistration() {
        return new Promise((resolve, reject) => {
            const steps = [
                { name: 'Validating credentials', duration: 800 },
                { name: 'Encrypting data', duration: 1000 },
                { name: 'Creating secure session', duration: 700 },
                { name: 'Setting up profile', duration: 600 }
            ];
            
            let currentStep = 0;
            
            function processNextStep() {
                if (currentStep < steps.length) {
                    const step = steps[currentStep];
                    console.log(`Security Step: ${step.name}`);
                    
                    // Update button text to show current security step
                    const submitButton = document.getElementById('signup-submit');
                    if (submitButton) {
                        submitButton.innerHTML = `
                            <i class="fa-solid fa-shield-halved mr-2"></i>
                            ${step.name}
                            <span class="loading loading-spinner loading-sm"></span>
                        `;
                    }
                    
                    setTimeout(() => {
                        currentStep++;
                        processNextStep();
                    }, step.duration);
                } else {
                    resolve();
                }
            }
            
            processNextStep();
        });
    }
    
    // Clear all validation errors
    function clearValidationErrors() {
        const errorElements = document.querySelectorAll('.validation-message');
        errorElements.forEach(element => {
            element.classList.add('hidden');
        });
        
        const inputs = document.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.classList.remove('input-error', 'validation-error', 'validation-success');
        });
    }
    
    // Form validation
    function validateForm() {
        let isValid = true;
        
        // Validate all fields
        const fields = [
            'first-name', 'last-name', 'email', 'student-id', 
            'department', 'password', 'confirm-password', 'terms'
        ];
        
        fields.forEach(fieldId => {
            if (!validateField(fieldId)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    // Show validation error
    function showValidationError(fieldId, message) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        const inputElement = document.getElementById(fieldId);
        
        if (errorElement && inputElement) {
            errorElement.textContent = message;
            errorElement.classList.remove('hidden');
            inputElement.classList.add('validation-error');
            inputElement.classList.remove('validation-success');
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
    
    // Create enhanced particle background
    function createEnhancedParticles() {
        const container = document.getElementById('particles-container');
        if (!container) return;
        
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random size between 2px and 6px
            const size = Math.random() * 4 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random position
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Random animation duration between 15s and 25s
            const duration = Math.random() * 10 + 15;
            particle.style.animationDuration = `${duration}s`;
            
            // Random delay
            particle.style.animationDelay = `${Math.random() * 10}s`;
            
            // Random opacity
            particle.style.opacity = Math.random() * 0.6 + 0.4;
            
            container.appendChild(particle);
        }
    }
    
    // Set current year in copyright
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Initialize security features
    initializeSecurityFeatures();
    
    function initializeSecurityFeatures() {
        // Add security event listeners
        document.addEventListener('copy', function(e) {
            if (e.target.type === 'password') {
                e.preventDefault();
                showSecurityAlert('Password copying is disabled for security reasons.');
            }
        });
        
        document.addEventListener('contextmenu', function(e) {
            if (e.target.type === 'password') {
                e.preventDefault();
                showSecurityAlert('Right-click is disabled on password fields.');
            }
        });
    }
    
    function showSecurityAlert(message) {
        // Create a temporary security alert
        const alert = document.createElement('div');
        alert.className = 'alert alert-warning fixed top-4 right-4 z-50 max-w-sm';
        alert.innerHTML = `
            <i class="fa-solid fa-shield-exclamation"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(alert);
        
        setTimeout(() => {
            alert.remove();
        }, 3000);
    }
});