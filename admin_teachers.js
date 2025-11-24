// Teachers Management JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeTeachersPage();
    initializeModals();
    initializeFormSubmissions();
    loadTeachersTable();
    updateStats();
});

function initializeTeachersPage() {
    // Initialize any page-specific functionality
}

function initializeModals() {
    // Add Teacher Modal
    const addTeacherBtn = document.getElementById('add-teacher-btn');
    const addTeacherModal = document.getElementById('add-teacher-modal');
    const cancelTeacherBtn = document.getElementById('cancel-teacher');
    
    if (addTeacherBtn && addTeacherModal) {
        addTeacherBtn.addEventListener('click', () => {
            addTeacherModal.classList.add('modal-open');
        });
        
        cancelTeacherBtn.addEventListener('click', () => {
            addTeacherModal.classList.remove('modal-open');
            resetTeacherForm();
        });
        
        addTeacherModal.addEventListener('click', (e) => {
            if (e.target === addTeacherModal) {
                addTeacherModal.classList.remove('modal-open');
                resetTeacherForm();
            }
        });
    }
    
    // Teacher Details Modal
    const teacherDetailsModal = document.getElementById('teacher-details-modal');
    const closeTeacherDetailsBtn = document.getElementById('close-teacher-details');
    
    if (closeTeacherDetailsBtn && teacherDetailsModal) {
        closeTeacherDetailsBtn.addEventListener('click', () => {
            teacherDetailsModal.classList.remove('modal-open');
        });
        
        teacherDetailsModal.addEventListener('click', (e) => {
            if (e.target === teacherDetailsModal) {
                teacherDetailsModal.classList.remove('modal-open');
            }
        });
    }
}

function initializeFormSubmissions() {
    // Add Teacher Form
    const addTeacherForm = document.getElementById('add-teacher-form');
    if (addTeacherForm) {
        addTeacherForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addNewTeacher();
        });
    }
}

function loadTeachersTable() {
    const tableBody = document.getElementById('teachers-table-body');
    if (!tableBody) return;
    
    // Sample teachers data
    const teachers = [
        {
            id: 'T2024001',
            firstName: 'Mohammad',
            lastName: 'Rahman',
            email: 'm.rahman@ius.ac.bd',
            department: 'Computer Science',
            role: 'head',
            status: 'active',
            questions: 47,
            lastLogin: '2025-01-15T10:30:00',
            joinDate: '2020-01-15'
        },
        {
            id: 'T2024002',
            firstName: 'Ahmed',
            lastName: 'Khan',
            email: 'a.khan@ius.ac.bd',
            department: 'Mathematics',
            role: 'head',
            status: 'active',
            questions: 32,
            lastLogin: '2025-01-14T14:20:00',
            joinDate: '2019-08-20'
        },
        {
            id: 'T2024003',
            firstName: 'Fatima',
            lastName: 'Begum',
            email: 'f.begum@ius.ac.bd',
            department: 'Physics',
            role: 'teacher',
            status: 'active',
            questions: 28,
            lastLogin: '2025-01-13T09:15:00',
            joinDate: '2021-03-10'
        },
        {
            id: 'T2024004',
            firstName: 'Raj',
            lastName: 'Sharma',
            email: 'r.sharma@ius.ac.bd',
            department: 'Chemistry',
            role: 'teacher',
            status: 'pending',
            questions: 0,
            lastLogin: null,
            joinDate: '2025-01-10'
        },
        {
            id: 'T2024005',
            firstName: 'Maria',
            lastName: 'Islam',
            email: 'm.islam@ius.ac.bd',
            department: 'Biology',
            role: 'teacher',
            status: 'active',
            questions: 15,
            lastLogin: '2025-01-12T11:45:00',
            joinDate: '2022-09-01'
        },
        {
            id: 'T2024006',
            firstName: 'John',
            lastName: 'Doe',
            email: 'j.doe@ius.ac.bd',
            department: 'English',
            role: 'teacher',
            status: 'inactive',
            questions: 8,
            lastLogin: '2024-12-20T08:30:00',
            joinDate: '2021-11-15'
        }
    ];
    
    // Clear existing table
    tableBody.innerHTML = '';
    
    if (teachers.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" class="text-center py-8">
                    <div class="empty-state">
                        <i class="fa-solid fa-chalkboard-teacher"></i>
                        <h3 class="text-lg font-semibold mb-2">No Teachers Found</h3>
                        <p class="text-gray-600">Add teachers to get started</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }
    
    // Add teachers to table
    teachers.forEach(teacher => {
        const row = document.createElement('tr');
        
        const initials = teacher.firstName[0] + teacher.lastName[0];
        const statusClass = teacher.status === 'active' ? 'status-active' :
                          teacher.status === 'pending' ? 'status-pending' : 'status-inactive';
        const statusText = teacher.status.charAt(0).toUpperCase() + teacher.status.slice(1);
        const roleClass = teacher.role === 'head' ? 'role-head' : 'role-teacher';
        const roleText = teacher.role === 'head' ? 'Department Head' : 'Teacher';
        
        row.innerHTML = `
            <td>
                <div class="flex items-center gap-3">
                    <div class="teacher-avatar">${initials}</div>
                    <div>
                        <div class="font-semibold">${teacher.firstName} ${teacher.lastName}</div>
                        <div class="text-sm text-gray-500">${teacher.email}</div>
                    </div>
                </div>
            </td>
            <td>
                <span class="badge badge-outline">${teacher.department}</span>
            </td>
            <td>
                <span class="role-badge ${roleClass}">${roleText}</span>
            </td>
            <td>
                <span class="status-badge ${statusClass}">${statusText}</span>
            </td>
            <td>
                <div class="text-center font-semibold">${teacher.questions}</div>
            </td>
            <td>
                <div class="text-sm">${teacher.lastLogin ? formatDate(teacher.lastLogin) : 'Never'}</div>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-outline btn-primary view-teacher" data-id="${teacher.id}">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-outline btn-warning edit-teacher" data-id="${teacher.id}">
                        <i class="fa-solid fa-edit"></i>
                    </button>
                    ${teacher.status === 'pending' ? `
                    <button class="btn btn-sm btn-outline btn-success approve-teacher" data-id="${teacher.id}">
                        <i class="fa-solid fa-check"></i>
                    </button>
                    ` : ''}
                    <button class="btn btn-sm btn-outline btn-error delete-teacher" data-id="${teacher.id}">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Add event listeners to action buttons
    addTeacherEventListeners();
}

function addTeacherEventListeners() {
    // View teacher buttons
    document.querySelectorAll('.view-teacher').forEach(btn => {
        btn.addEventListener('click', function() {
            const teacherId = this.getAttribute('data-id');
            viewTeacherDetails(teacherId);
        });
    });
    
    // Edit teacher buttons
    document.querySelectorAll('.edit-teacher').forEach(btn => {
        btn.addEventListener('click', function() {
            const teacherId = this.getAttribute('data-id');
            editTeacher(teacherId);
        });
    });
    
    // Approve teacher buttons
    document.querySelectorAll('.approve-teacher').forEach(btn => {
        btn.addEventListener('click', function() {
            const teacherId = this.getAttribute('data-id');
            approveTeacher(teacherId);
        });
    });
    
    // Delete teacher buttons
    document.querySelectorAll('.delete-teacher').forEach(btn => {
        btn.addEventListener('click', function() {
            const teacherId = this.getAttribute('data-id');
            deleteTeacher(teacherId);
        });
    });
}

function viewTeacherDetails(teacherId) {
    // For demo purposes, show sample teacher details
    const teacherDetailsContent = document.getElementById('teacher-details-content');
    if (!teacherDetailsContent) return;
    
    // Sample teacher details
    const teacherDetails = {
        id: 'T2024001',
        firstName: 'Mohammad',
        lastName: 'Rahman',
        email: 'm.rahman@ius.ac.bd',
        department: 'Computer Science',
        role: 'Department Head',
        status: 'Active',
        questions: 47,
        approvedQuestions: 35,
        pendingQuestions: 12,
        quizzesCreated: 8,
        students: 156,
        lastLogin: '2025-01-15T10:30:00',
        joinDate: '2020-01-15',
        permissions: [
            { name: 'Create Quizzes', enabled: true, description: 'Can create and manage quizzes' },
            { name: 'Manage Questions', enabled: true, description: 'Can add and edit questions' },
            { name: 'View Results', enabled: true, description: 'Can view student results' },
            { name: 'Department Management', enabled: true, description: 'Can manage department settings' },
            { name: 'Approve Questions', enabled: true, description: 'Can approve questions from other teachers' }
        ]
    };
    
    let permissionsHtml = '';
    teacherDetails.permissions.forEach(permission => {
        permissionsHtml += `
            <div class="permission-item">
                <div class="permission-info">
                    <div class="permission-name">${permission.name}</div>
                    <div class="permission-description">${permission.description}</div>
                </div>
                <div class="form-control">
                    <label class="label cursor-pointer">
                        <input type="checkbox" class="toggle toggle-primary" ${permission.enabled ? 'checked' : ''}>
                    </label>
                </div>
            </div>
        `;
    });
    
    teacherDetailsContent.innerHTML = `
        <div class="flex items-center gap-4 mb-6">
            <div class="teacher-avatar text-xl">${teacherDetails.firstName[0] + teacherDetails.lastName[0]}</div>
            <div>
                <h4 class="text-xl font-bold">${teacherDetails.firstName} ${teacherDetails.lastName}</h4>
                <p class="text-gray-600">${teacherDetails.email}</p>
            </div>
        </div>
        
        <div class="teacher-summary">
            <div class="summary-item">
                <div class="summary-value">${teacherDetails.questions}</div>
                <div class="summary-label">Total Questions</div>
            </div>
            <div class="summary-item">
                <div class="summary-value">${teacherDetails.quizzesCreated}</div>
                <div class="summary-label">Quizzes Created</div>
            </div>
            <div class="summary-item">
                <div class="summary-value">${teacherDetails.students}</div>
                <div class="summary-label">Students</div>
            </div>
            <div class="summary-item">
                <div class="summary-value text-success">${teacherDetails.status}</div>
                <div class="summary-label">Status</div>
            </div>
        </div>
        
        <div class="grid grid-cols-2 gap-4 mb-6">
            <div>
                <strong>Teacher ID:</strong> ${teacherDetails.id}
            </div>
            <div>
                <strong>Department:</strong> ${teacherDetails.department}
            </div>
            <div>
                <strong>Role:</strong> ${teacherDetails.role}
            </div>
            <div>
                <strong>Join Date:</strong> ${formatDate(teacherDetails.joinDate)}
            </div>
            <div>
                <strong>Last Login:</strong> ${formatDate(teacherDetails.lastLogin)}
            </div>
        </div>
        
        <div class="permission-section">
            <h4 class="font-semibold mb-4">Permissions</h4>
            ${permissionsHtml}
        </div>
    `;
    
    // Open modal
    document.getElementById('teacher-details-modal').classList.add('modal-open');
}

function editTeacher(teacherId) {
    // For demo purposes
    showNotification(`Opening edit form for teacher ${teacherId}...`, 'info');
}

function approveTeacher(teacherId) {
    if (!confirm('Are you sure you want to approve this teacher?')) {
        return;
    }
    
    // Simulate approval process
    showNotification('Approving teacher...', 'info');
    
    setTimeout(() => {
        showNotification('Teacher approved successfully!', 'success');
        // Reload table to reflect changes
        loadTeachersTable();
        updateStats();
    }, 1500);
}

function deleteTeacher(teacherId) {
    if (!confirm('Are you sure you want to delete this teacher? This action cannot be undone.')) {
        return;
    }
    
    // Simulate deletion process
    showNotification('Deleting teacher...', 'info');
    
    setTimeout(() => {
        showNotification('Teacher deleted successfully!', 'success');
        // Reload table to reflect changes
        loadTeachersTable();
        updateStats();
    }, 1500);
}

function addNewTeacher() {
    const form = document.getElementById('add-teacher-form');
    const submitBtn = document.getElementById('save-teacher');
    
    // Get form data
    const teacherData = {
        firstName: document.getElementById('teacher-first-name').value,
        lastName: document.getElementById('teacher-last-name').value,
        email: document.getElementById('teacher-email').value,
        department: document.getElementById('teacher-department').value,
        role: document.getElementById('teacher-role').value,
        sendInvite: document.getElementById('teacher-send-invite').checked,
        status: 'pending',
        joinDate: new Date().toISOString()
    };
    
    // Validate form
    if (!validateTeacherForm(teacherData)) {
        return;
    }
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Save teacher to localStorage (for demo purposes)
        saveTeacher(teacherData);
        
        // Show success message
        showNotification('Teacher added successfully! Invitation email sent.', 'success');
        
        // Close modal and reset form
        document.getElementById('add-teacher-modal').classList.remove('modal-open');
        resetTeacherForm();
        
        // Reload table and stats
        loadTeachersTable();
        updateStats();
        
        // Reset button state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }, 2000);
}

function validateTeacherForm(data) {
    if (!data.firstName.trim()) {
        showNotification('Please enter first name', 'error');
        return false;
    }
    
    if (!data.lastName.trim()) {
        showNotification('Please enter last name', 'error');
        return false;
    }
    
    if (!data.email.trim()) {
        showNotification('Please enter email', 'error');
        return false;
    }
    
    if (!isValidEmail(data.email)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }
    
    if (!data.department) {
        showNotification('Please select a department', 'error');
        return false;
    }
    
    return true;
}

function saveTeacher(teacherData) {
    const teachers = JSON.parse(localStorage.getItem('admin_teachers') || '[]');
    teacherData.id = 'T' + Date.now().toString();
    teachers.push(teacherData);
    localStorage.setItem('admin_teachers', JSON.stringify(teachers));
    return teacherData.id;
}

function resetTeacherForm() {
    const form = document.getElementById('add-teacher-form');
    if (form) {
        form.reset();
        document.getElementById('teacher-send-invite').checked = true;
    }
}

function updateStats() {
    // Sample stats data
    const stats = {
        totalTeachers: 47,
        activeTeachers: 42,
        pendingTeachers: 2,
        departmentHeads: 8
    };
    
    // Update DOM elements
    document.getElementById('total-teachers').textContent = stats.totalTeachers;
    document.getElementById('active-teachers').textContent = stats.activeTeachers;
    document.getElementById('pending-teachers').textContent = stats.pendingTeachers;
    document.getElementById('department-heads').textContent = stats.departmentHeads;
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
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
window.AdminTeachers = {
    showNotification,
    loadTeachersTable,
    updateStats
};