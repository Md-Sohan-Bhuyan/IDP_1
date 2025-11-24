// Departments Management JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeDepartmentsPage();
    initializeModals();
    initializeFormSubmissions();
    loadDepartmentsGrid();
    loadDepartmentsTable();
    updateStats();
});

function initializeDepartmentsPage() {
    // Initialize any page-specific functionality
}

function initializeModals() {
    // Add Department Modal
    const addDepartmentBtn = document.getElementById('add-department-btn');
    const addDepartmentModal = document.getElementById('add-department-modal');
    const cancelDepartmentBtn = document.getElementById('cancel-department');
    
    if (addDepartmentBtn && addDepartmentModal) {
        addDepartmentBtn.addEventListener('click', () => {
            addDepartmentModal.classList.add('modal-open');
        });
        
        cancelDepartmentBtn.addEventListener('click', () => {
            addDepartmentModal.classList.remove('modal-open');
            resetDepartmentForm();
        });
        
        addDepartmentModal.addEventListener('click', (e) => {
            if (e.target === addDepartmentModal) {
                addDepartmentModal.classList.remove('modal-open');
                resetDepartmentForm();
            }
        });
    }
    
    // Department Details Modal
    const departmentDetailsModal = document.getElementById('department-details-modal');
    const closeDepartmentDetailsBtn = document.getElementById('close-department-details');
    const editDepartmentBtn = document.getElementById('edit-department-btn');
    
    if (closeDepartmentDetailsBtn && departmentDetailsModal) {
        closeDepartmentDetailsBtn.addEventListener('click', () => {
            departmentDetailsModal.classList.remove('modal-open');
        });
        
        departmentDetailsModal.addEventListener('click', (e) => {
            if (e.target === departmentDetailsModal) {
                departmentDetailsModal.classList.remove('modal-open');
            }
        });
    }
    
    if (editDepartmentBtn) {
        editDepartmentBtn.addEventListener('click', function() {
            const departmentId = this.getAttribute('data-id');
            editDepartment(departmentId);
        });
    }
}

function initializeFormSubmissions() {
    // Add Department Form
    const addDepartmentForm = document.getElementById('add-department-form');
    if (addDepartmentForm) {
        addDepartmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addNewDepartment();
        });
    }
}

function loadDepartmentsGrid() {
    const departmentsGrid = document.getElementById('departments-grid');
    if (!departmentsGrid) return;
    
    // Sample departments data
    const departments = [
        {
            id: 'D001',
            name: 'Computer Science',
            code: 'CS',
            description: 'Department of Computer Science and Engineering',
            head: 'Dr. Mohammad Rahman',
            headId: 'T2024001',
            teachers: 12,
            students: 350,
            questions: 420,
            quizzes: 25,
            status: 'active',
            icon: 'fa-laptop-code',
            color: 'from-blue-500 to-purple-600'
        },
        {
            id: 'D002',
            name: 'Mathematics',
            code: 'MATH',
            description: 'Department of Mathematics and Statistics',
            head: 'Dr. Ahmed Khan',
            headId: 'T2024002',
            teachers: 8,
            students: 280,
            questions: 315,
            quizzes: 18,
            status: 'active',
            icon: 'fa-calculator',
            color: 'from-green-500 to-teal-600'
        },
        {
            id: 'D003',
            name: 'Physics',
            code: 'PHY',
            description: 'Department of Physics and Astronomy',
            head: 'Dr. Fatima Begum',
            headId: 'T2024003',
            teachers: 6,
            students: 220,
            questions: 198,
            quizzes: 15,
            status: 'active',
            icon: 'fa-atom',
            color: 'from-orange-500 to-red-600'
        },
        {
            id: 'D004',
            name: 'Chemistry',
            code: 'CHEM',
            description: 'Department of Chemistry and Chemical Engineering',
            head: 'Dr. Raj Sharma',
            headId: 'T2024004',
            teachers: 7,
            students: 190,
            questions: 175,
            quizzes: 12,
            status: 'active',
            icon: 'fa-flask',
            color: 'from-purple-500 to-pink-600'
        },
        {
            id: 'D005',
            name: 'Biology',
            code: 'BIO',
            description: 'Department of Biological Sciences',
            head: 'Dr. Maria Islam',
            headId: 'T2024005',
            teachers: 5,
            students: 180,
            questions: 162,
            quizzes: 10,
            status: 'active',
            icon: 'fa-dna',
            color: 'from-emerald-500 to-cyan-600'
        },
        {
            id: 'D006',
            name: 'English',
            code: 'ENG',
            description: 'Department of English Language and Literature',
            head: 'Dr. John Doe',
            headId: 'T2024006',
            teachers: 4,
            students: 150,
            questions: 85,
            quizzes: 8,
            status: 'inactive',
            icon: 'fa-book',
            color: 'from-amber-500 to-yellow-600'
        }
    ];
    
    // Clear existing grid
    departmentsGrid.innerHTML = '';
    
    if (departments.length === 0) {
        departmentsGrid.innerHTML = `
            <div class="col-span-3">
                <div class="empty-state">
                    <i class="fa-solid fa-building"></i>
                    <h3 class="text-lg font-semibold mb-2">No Departments Found</h3>
                    <p class="text-gray-600">Add departments to get started</p>
                </div>
            </div>
        `;
        return;
    }
    
    // Add department cards
    departments.forEach(dept => {
        const deptCard = document.createElement('div');
        deptCard.className = 'department-card';
        
        const statusClass = dept.status === 'active' ? 'status-active' : 'status-inactive';
        const statusText = dept.status === 'active' ? 'Active' : 'Inactive';
        
        deptCard.innerHTML = `
            <div class="department-header">
                <div class="department-icon">
                    <i class="fa-solid ${dept.icon}"></i>
                </div>
                <div class="department-info">
                    <div class="department-name">${dept.name}</div>
                    <div class="department-code">${dept.code}</div>
                </div>
                <span class="status-badge ${statusClass}">${statusText}</span>
            </div>
            
            <p class="text-sm text-gray-600 mb-4">${dept.description}</p>
            
            <div class="department-stats">
                <div class="department-stat">
                    <div class="stat-number">${dept.teachers}</div>
                    <div class="stat-label">Teachers</div>
                </div>
                <div class="department-stat">
                    <div class="stat-number">${dept.students}</div>
                    <div class="stat-label">Students</div>
                </div>
                <div class="department-stat">
                    <div class="stat-number">${dept.questions}</div>
                    <div class="stat-label">Questions</div>
                </div>
                <div class="department-stat">
                    <div class="stat-number">${dept.quizzes}</div>
                    <div class="stat-label">Quizzes</div>
                </div>
            </div>
            
            <div class="department-footer">
                <div class="text-sm">
                    <strong>Head:</strong> ${dept.head}
                </div>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-outline btn-primary view-department" data-id="${dept.id}">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-outline btn-warning edit-department" data-id="${dept.id}">
                        <i class="fa-solid fa-edit"></i>
                    </button>
                </div>
            </div>
        `;
        
        departmentsGrid.appendChild(deptCard);
    });
    
    // Add event listeners
    addDepartmentEventListeners();
}

function loadDepartmentsTable() {
    const tableBody = document.getElementById('departments-table-body');
    if (!tableBody) return;
    
    // Use the same departments data as grid
    const departments = [
        {
            id: 'D001', name: 'Computer Science', head: 'Dr. Mohammad Rahman',
            teachers: 12, students: 350, questions: 420, quizzes: 25, status: 'active'
        },
        {
            id: 'D002', name: 'Mathematics', head: 'Dr. Ahmed Khan',
            teachers: 8, students: 280, questions: 315, quizzes: 18, status: 'active'
        },
        {
            id: 'D003', name: 'Physics', head: 'Dr. Fatima Begum',
            teachers: 6, students: 220, questions: 198, quizzes: 15, status: 'active'
        },
        {
            id: 'D004', name: 'Chemistry', head: 'Dr. Raj Sharma',
            teachers: 7, students: 190, questions: 175, quizzes: 12, status: 'active'
        },
        {
            id: 'D005', name: 'Biology', head: 'Dr. Maria Islam',
            teachers: 5, students: 180, questions: 162, quizzes: 10, status: 'active'
        },
        {
            id: 'D006', name: 'English', head: 'Dr. John Doe',
            teachers: 4, students: 150, questions: 85, quizzes: 8, status: 'inactive'
        }
    ];
    
    // Clear existing table
    tableBody.innerHTML = '';
    
    // Add departments to table
    departments.forEach(dept => {
        const row = document.createElement('tr');
        
        const statusClass = dept.status === 'active' ? 'status-active' : 'status-inactive';
        const statusText = dept.status === 'active' ? 'Active' : 'Inactive';
        
        row.innerHTML = `
            <td>
                <div class="font-semibold">${dept.name}</div>
            </td>
            <td>
                <div class="text-sm">${dept.head}</div>
            </td>
            <td>
                <div class="text-center font-semibold">${dept.teachers}</div>
            </td>
            <td>
                <div class="text-center font-semibold">${dept.students}</div>
            </td>
            <td>
                <div class="text-center font-semibold">${dept.questions}</div>
            </td>
            <td>
                <div class="text-center font-semibold">${dept.quizzes}</div>
            </td>
            <td>
                <span class="status-badge ${statusClass}">${statusText}</span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-outline btn-primary view-department" data-id="${dept.id}">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-outline btn-warning edit-department" data-id="${dept.id}">
                        <i class="fa-solid fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline btn-error delete-department" data-id="${dept.id}">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Add event listeners
    addDepartmentEventListeners();
}

function addDepartmentEventListeners() {
    // View department buttons
    document.querySelectorAll('.view-department').forEach(btn => {
        btn.addEventListener('click', function() {
            const departmentId = this.getAttribute('data-id');
            viewDepartmentDetails(departmentId);
        });
    });
    
    // Edit department buttons
    document.querySelectorAll('.edit-department').forEach(btn => {
        btn.addEventListener('click', function() {
            const departmentId = this.getAttribute('data-id');
            editDepartment(departmentId);
        });
    });
    
    // Delete department buttons
    document.querySelectorAll('.delete-department').forEach(btn => {
        btn.addEventListener('click', function() {
            const departmentId = this.getAttribute('data-id');
            deleteDepartment(departmentId);
        });
    });
}

function viewDepartmentDetails(departmentId) {
    // For demo purposes, show sample department details
    const departmentDetailsContent = document.getElementById('department-details-content');
    const departmentDetailsTitle = document.getElementById('department-details-title');
    
    if (!departmentDetailsContent) return;
    
    // Sample department details
    const departmentDetails = {
        id: 'D001',
        name: 'Computer Science',
        code: 'CS',
        description: 'The Department of Computer Science and Engineering focuses on providing comprehensive education in computer science fundamentals, software engineering, artificial intelligence, and data science. Our faculty members are dedicated to research and innovation in emerging technologies.',
        head: 'Dr. Mohammad Rahman',
        headEmail: 'm.rahman@ius.ac.bd',
        established: '2010-08-15',
        status: 'Active',
        teachers: 12,
        students: 350,
        questions: 420,
        quizzes: 25,
        activeQuizzes: 8,
        avgScore: 78,
        teachersList: [
            { name: 'Dr. Mohammad Rahman', role: 'Head', email: 'm.rahman@ius.ac.bd' },
            { name: 'Dr. Sarah Johnson', role: 'Professor', email: 's.johnson@ius.ac.bd' },
            { name: 'Dr. Michael Chen', role: 'Associate Professor', email: 'm.chen@ius.ac.bd' },
            { name: 'Ms. Emily Davis', role: 'Assistant Professor', email: 'e.davis@ius.ac.bd' },
            { name: 'Mr. Robert Wilson', role: 'Lecturer', email: 'r.wilson@ius.ac.bd' }
        ]
    };
    
    let teachersHtml = '';
    departmentDetails.teachersList.forEach(teacher => {
        const initials = teacher.name.split(' ').map(n => n[0]).join('');
        teachersHtml += `
            <div class="teacher-item">
                <div class="teacher-avatar">${initials}</div>
                <div class="teacher-info">
                    <div class="font-medium">${teacher.name}</div>
                    <div class="teacher-role">${teacher.role} • ${teacher.email}</div>
                </div>
            </div>
        `;
    });
    
    departmentDetailsTitle.textContent = departmentDetails.name + ' Department';
    departmentDetailsContent.innerHTML = `
        <div class="department-summary">
            <div class="summary-item">
                <div class="summary-value">${departmentDetails.teachers}</div>
                <div class="summary-label">Faculty Members</div>
            </div>
            <div class="summary-item">
                <div class="summary-value">${departmentDetails.students}</div>
                <div class="summary-label">Students</div>
            </div>
            <div class="summary-item">
                <div class="summary-value">${departmentDetails.questions}</div>
                <div class="summary-label">Questions</div>
            </div>
            <div class="summary-item">
                <div class="summary-value">${departmentDetails.quizzes}</div>
                <div class="summary-label">Total Quizzes</div>
            </div>
        </div>
        
        <div class="grid grid-cols-2 gap-4 mb-6">
            <div>
                <strong>Department Code:</strong> ${departmentDetails.code}
            </div>
            <div>
                <strong>Status:</strong> <span class="text-success">${departmentDetails.status}</span>
            </div>
            <div>
                <strong>Department Head:</strong> ${departmentDetails.head}
            </div>
            <div>
                <strong>Head Email:</strong> ${departmentDetails.headEmail}
            </div>
            <div>
                <strong>Established:</strong> ${formatDate(departmentDetails.established)}
            </div>
            <div>
                <strong>Active Quizzes:</strong> ${departmentDetails.activeQuizzes}
            </div>
        </div>
        
        <div>
            <h4 class="font-semibold mb-3">Description</h4>
            <p class="text-gray-700">${departmentDetails.description}</p>
        </div>
        
        <div class="teachers-section">
            <h4 class="font-semibold mb-3">Faculty Members (${departmentDetails.teachersList.length})</h4>
            <div class="teachers-list">
                ${teachersHtml}
            </div>
        </div>
    `;
    
    // Set data-id for edit button
    document.getElementById('edit-department-btn').setAttribute('data-id', departmentId);
    
    // Open modal
    document.getElementById('department-details-modal').classList.add('modal-open');
}

function editDepartment(departmentId) {
    // For demo purposes
    showNotification(`Opening edit form for department ${departmentId}...`, 'info');
}

function deleteDepartment(departmentId) {
    if (!confirm('Are you sure you want to delete this department? This action will affect all associated teachers and data.')) {
        return;
    }
    
    // Simulate deletion process
    showNotification('Deleting department...', 'info');
    
    setTimeout(() => {
        showNotification('Department deleted successfully!', 'success');
        // Reload data to reflect changes
        loadDepartmentsGrid();
        loadDepartmentsTable();
        updateStats();
    }, 1500);
}

function addNewDepartment() {
    const form = document.getElementById('add-department-form');
    const submitBtn = document.getElementById('save-department');
    
    // Get form data
    const departmentData = {
        name: document.getElementById('department-name').value,
        code: document.getElementById('department-code').value,
        description: document.getElementById('department-description').value,
        head: document.getElementById('department-head').value,
        active: document.getElementById('department-active').checked,
        created: new Date().toISOString()
    };
    
    // Validate form
    if (!validateDepartmentForm(departmentData)) {
        return;
    }
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Save department to localStorage (for demo purposes)
        saveDepartment(departmentData);
        
        // Show success message
        showNotification('Department created successfully!', 'success');
        
        // Close modal and reset form
        document.getElementById('add-department-modal').classList.remove('modal-open');
        resetDepartmentForm();
        
        // Reload data
        loadDepartmentsGrid();
        loadDepartmentsTable();
        updateStats();
        
        // Reset button state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }, 2000);
}

function validateDepartmentForm(data) {
    if (!data.name.trim()) {
        showNotification('Please enter department name', 'error');
        return false;
    }
    
    if (!data.code.trim()) {
        showNotification('Please enter department code', 'error');
        return false;
    }
    
    if (data.code.length > 10) {
        showNotification('Department code should be maximum 10 characters', 'error');
        return false;
    }
    
    return true;
}

function saveDepartment(departmentData) {
    const departments = JSON.parse(localStorage.getItem('admin_departments') || '[]');
    departmentData.id = 'D' + (departments.length + 1).toString().padStart(3, '0');
    departmentData.status = departmentData.active ? 'active' : 'inactive';
    // Add sample data for demo
    departmentData.teachers = Math.floor(Math.random() * 10) + 3;
    departmentData.students = Math.floor(Math.random() * 200) + 100;
    departmentData.questions = Math.floor(Math.random() * 300) + 100;
    departmentData.quizzes = Math.floor(Math.random() * 20) + 5;
    departmentData.icon = 'fa-building';
    departmentData.color = 'from-gray-500 to-blue-600';
    
    departments.push(departmentData);
    localStorage.setItem('admin_departments', JSON.stringify(departments));
    return departmentData.id;
}

function resetDepartmentForm() {
    const form = document.getElementById('add-department-form');
    if (form) {
        form.reset();
        document.getElementById('department-active').checked = true;
    }
}

function updateStats() {
    // Sample stats data
    const stats = {
        totalDepartments: 8,
        departmentHeads: 8,
        totalTeachers: 47,
        totalQuestions: 1247
    };
    
    // Update DOM elements
    document.getElementById('total-departments').textContent = stats.totalDepartments;
    document.getElementById('department-heads').textContent = stats.departmentHeads;
    document.getElementById('total-teachers').textContent = stats.totalTeachers;
    document.getElementById('total-questions').textContent = stats.totalQuestions.toLocaleString();
}

// Utility Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
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
window.AdminDepartments = {
    showNotification,
    loadDepartmentsGrid,
    loadDepartmentsTable,
    updateStats
};