// Super Admin Departments Management JavaScript

let allDepartments = [];

document.addEventListener('DOMContentLoaded', function() {
    initializeClock();
    loadDepartmentsData();
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

function loadDepartmentsData() {
    showLoading();
    
    setTimeout(() => {
        allDepartments = [
            {
                id: 1,
                name: 'Computer Science',
                code: 'CSE',
                description: 'Department of Computer Science and Engineering',
                head: 'Dr. Rahman Ahmed',
                headId: 2,
                status: 'active',
                color: '#3b82f6',
                stats: {
                    teachers: 12,
                    students: 450,
                    questions: 1250
                },
                createdAt: '2023-01-15'
            },
            {
                id: 2,
                name: 'Business Administration',
                code: 'BBA',
                description: 'Department of Business Administration',
                head: 'Dr. Lisa Chen',
                headId: 8,
                status: 'active',
                color: '#10b981',
                stats: {
                    teachers: 8,
                    students: 320,
                    questions: 680
                },
                createdAt: '2023-02-20'
            },
            {
                id: 3,
                name: 'Electrical Engineering',
                code: 'EEE',
                description: 'Department of Electrical and Electronic Engineering',
                head: 'Prof. David Wilson',
                headId: 5,
                status: 'active',
                color: '#8b5cf6',
                stats: {
                    teachers: 10,
                    students: 280,
                    questions: 520
                },
                createdAt: '2023-01-10'
            },
            {
                id: 4,
                name: 'Civil Engineering',
                code: 'CIVIL',
                description: 'Department of Civil Engineering',
                head: '',
                headId: null,
                status: 'active',
                color: '#f59e0b',
                stats: {
                    teachers: 6,
                    students: 180,
                    questions: 350
                },
                createdAt: '2023-03-05'
            },
            {
                id: 5,
                name: 'English',
                code: 'ENG',
                description: 'Department of English Language and Literature',
                head: '',
                headId: null,
                status: 'inactive',
                color: '#ef4444',
                stats: {
                    teachers: 4,
                    students: 120,
                    questions: 210
                },
                createdAt: '2023-04-12'
            }
        ];
        
        renderDepartmentsGrid();
        updateStatistics();
        hideLoading();
    }, 1000);
}

function renderDepartmentsGrid() {
    const grid = document.getElementById('departments-grid');
    
    if (allDepartments.length === 0) {
        grid.innerHTML = `
            <div class="empty-state col-span-full">
                <i class="fa-solid fa-building empty-state-icon"></i>
                <h3 class="text-xl font-semibold mb-2">No Departments Found</h3>
                <p class="text-gray-600 mb-4">Get started by creating your first department</p>
                <button class="btn btn-primary" id="empty-add-department">
                    <i class="fa-solid fa-plus mr-2"></i>
                    Add Department
                </button>
            </div>
        `;
        
        document.getElementById('empty-add-department').addEventListener('click', showAddDepartmentModal);
        return;
    }
    
    grid.innerHTML = '';
    
    allDepartments.forEach(dept => {
        const card = createDepartmentCard(dept);
        grid.appendChild(card);
    });
}

function createDepartmentCard(department) {
    const card = document.createElement('div');
    card.className = 'department-card';
    card.style.borderLeftColor = department.color;
    
    const statusClass = `status-${department.status}`;
    
    card.innerHTML = `
        <div class="department-header">
            <div class="flex justify-between items-start mb-2">
                <div>
                    <h3 class="department-title font-bold text-lg">${department.name}</h3>
                    <div class="department-code">${department.code}</div>
                </div>
                <span class="status-badge ${statusClass}">
                    ${department.status.charAt(0).toUpperCase() + department.status.slice(1)}
                </span>
            </div>
            
            <p class="department-description text-gray-600 text-sm mb-4">
                ${department.description}
            </p>
            
            <div class="department-stats">
                <div class="stat-item teacher-count">
                    <div class="stat-value font-bold">${department.stats.teachers}</div>
                    <div class="stat-label text-xs">Teachers</div>
                </div>
                <div class="stat-item student-count">
                    <div class="stat-value font-bold">${department.stats.students}</div>
                    <div class="stat-label text-xs">Students</div>
                </div>
                <div class="stat-item question-count">
                    <div class="stat-value font-bold">${department.stats.questions}</div>
                    <div class="stat-label text-xs">Questions</div>
                </div>
            </div>
            
            ${department.head ? `
                <div class="mt-3 pt-3 border-t border-base-200">
                    <div class="flex items-center gap-2 text-sm">
                        <i class="fa-solid fa-crown text-yellow-500"></i>
                        <span class="font-medium">Head:</span>
                        <span>${department.head}</span>
                    </div>
                </div>
            ` : ''}
        </div>
        
        <div class="department-actions p-4 pt-0">
            <button class="btn btn-sm btn-outline edit-department" data-dept-id="${department.id}">
                <i class="fa-solid fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-outline btn-warning manage-department" data-dept-id="${department.id}">
                <i class="fa-solid fa-cog"></i>
            </button>
            <button class="btn btn-sm btn-outline btn-error delete-department" data-dept-id="${department.id}">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `;
    
    return card;
}

function setupEventListeners() {
    // Add department modal
    document.getElementById('add-department-btn').addEventListener('click', showAddDepartmentModal);
    document.getElementById('cancel-add-department').addEventListener('click', hideAddDepartmentModal);
    document.getElementById('add-department-form').addEventListener('submit', handleAddDepartment);
    
    // Color picker
    document.getElementById('department-color').addEventListener('input', updateColorHex);
    document.getElementById('department-color-hex').addEventListener('input', updateColorPicker);
    
    // Logout
    document.getElementById('logout-btn').addEventListener('click', logout);
    
    // Delegate events for dynamic elements
    document.addEventListener('click', function(e) {
        if (e.target.closest('.edit-department')) {
            const deptId = e.target.closest('.edit-department').dataset.deptId;
            editDepartment(deptId);
        }
        
        if (e.target.closest('.manage-department')) {
            const deptId = e.target.closest('.manage-department').dataset.deptId;
            manageDepartment(deptId);
        }
        
        if (e.target.closest('.delete-department')) {
            const deptId = e.target.closest('.delete-department').dataset.deptId;
            deleteDepartment(deptId);
        }
    });
}

function showAddDepartmentModal() {
    document.getElementById('add-department-modal').classList.add('modal-open');
}

function hideAddDepartmentModal() {
    document.getElementById('add-department-modal').classList.remove('modal-open');
    document.getElementById('add-department-form').reset();
}

function updateColorHex(e) {
    document.getElementById('department-color-hex').value = e.target.value;
}

function updateColorPicker(e) {
    const color = e.target.value;
    if (/^#[0-9A-F]{6}$/i.test(color)) {
        document.getElementById('department-color').value = color;
    }
}

function handleAddDepartment(e) {
    e.preventDefault();
    
    const deptData = {
        name: document.getElementById('department-name').value,
        code: document.getElementById('department-code').value.toUpperCase(),
        description: document.getElementById('department-description').value,
        headId: document.getElementById('department-head').value,
        status: document.getElementById('department-status').value,
        color: document.getElementById('department-color').value
    };
    
    showLoading();
    
    setTimeout(() => {
        const newDept = {
            id: allDepartments.length + 1,
            ...deptData,
            head: deptData.headId ? getHeadName(deptData.headId) : '',
            stats: {
                teachers: 0,
                students: 0,
                questions: 0
            },
            createdAt: new Date().toISOString()
        };
        
        allDepartments.unshift(newDept);
        
        hideAddDepartmentModal();
        renderDepartmentsGrid();
        updateStatistics();
        showNotification('Department added successfully!', 'success');
        hideLoading();
    }, 1000);
}

function editDepartment(deptId) {
    const department = allDepartments.find(d => d.id == deptId);
    if (!department) return;
    
    showNotification(`Editing ${department.name} department...`, 'info');
    // Implement edit functionality
}

function manageDepartment(deptId) {
    const department = allDepartments.find(d => d.id == deptId);
    if (!department) return;
    
    showNotification(`Managing ${department.name} department...`, 'info');
    // Implement management functionality
}

function deleteDepartment(deptId) {
    const department = allDepartments.find(d => d.id == deptId);
    if (!department) return;
    
    if (!confirm(`Are you sure you want to delete ${department.name} department? This action cannot be undone.`)) {
        return;
    }
    
    showLoading();
    
    setTimeout(() => {
        allDepartments = allDepartments.filter(d => d.id != deptId);
        
        renderDepartmentsGrid();
        updateStatistics();
        showNotification('Department deleted successfully!', 'success');
        hideLoading();
    }, 1000);
}

function updateStatistics() {
    const totalDepartments = allDepartments.length;
    const activeDepartments = allDepartments.filter(d => d.status === 'active').length;
    const totalStudents = allDepartments.reduce((sum, dept) => sum + dept.stats.students, 0);
    const totalTeachers = allDepartments.reduce((sum, dept) => sum + dept.stats.teachers, 0);
    const totalQuestions = allDepartments.reduce((sum, dept) => sum + dept.stats.questions, 0);
    
    document.getElementById('total-departments').textContent = totalDepartments;
    document.getElementById('total-students').textContent = totalStudents.toLocaleString();
    document.getElementById('total-teachers').textContent = totalTeachers;
    document.getElementById('total-questions').textContent = totalQuestions.toLocaleString();
}

function getHeadName(headId) {
    const heads = {
        '1': 'Dr. Rahman Ahmed',
        '2': 'Prof. David Wilson',
        '3': 'Dr. Lisa Chen'
    };
    return heads[headId] || '';
}

function showLoading() {
    const grid = document.getElementById('departments-grid');
    grid.innerHTML = '';
    
    for (let i = 0; i < 6; i++) {
        const loadingCard = document.createElement('div');
        loadingCard.className = 'department-loading';
        grid.appendChild(loadingCard);
    }
}

function hideLoading() {
    // Loading hidden by renderDepartmentsGrid
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