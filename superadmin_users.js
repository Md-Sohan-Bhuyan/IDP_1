// Super Admin Users Management JavaScript

let allUsers = [];
let currentPage = 1;
const usersPerPage = 10;
let filteredUsers = [];

document.addEventListener('DOMContentLoaded', function() {
    initializeClock();
    loadUsersData();
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

function loadUsersData() {
    // Simulate API call
    showLoading();
    
    setTimeout(() => {
        // Sample users data
        allUsers = [
            {
                id: 1,
                firstName: 'John',
                lastName: 'Smith',
                email: 'john.smith@ius.ac.bd',
                role: 'student',
                department: 'cse',
                status: 'active',
                lastLogin: '2024-01-15 14:30:00',
                permissions: ['create', 'edit'],
                avatar: 'JS'
            },
            {
                id: 2,
                firstName: 'Dr. Rahman',
                lastName: 'Ahmed',
                email: 'rahman.ahmed@ius.ac.bd',
                role: 'teacher',
                department: 'cse',
                status: 'active',
                lastLogin: '2024-01-15 10:15:00',
                permissions: ['create', 'edit', 'delete'],
                avatar: 'RA'
            },
            {
                id: 3,
                firstName: 'Super',
                lastName: 'Admin',
                email: 'superadmin@ius.ac.bd',
                role: 'superadmin',
                department: 'admin',
                status: 'active',
                lastLogin: '2024-01-15 16:45:00',
                permissions: ['create', 'edit', 'delete', 'manage_users'],
                avatar: 'SA'
            },
            {
                id: 4,
                firstName: 'Sarah',
                lastName: 'Johnson',
                email: 'sarah.j@ius.ac.bd',
                role: 'student',
                department: 'bba',
                status: 'pending',
                lastLogin: '2024-01-14 09:20:00',
                permissions: ['create'],
                avatar: 'SJ'
            },
            {
                id: 5,
                firstName: 'Prof. David',
                lastName: 'Wilson',
                email: 'david.wilson@ius.ac.bd',
                role: 'teacher',
                department: 'eee',
                status: 'active',
                lastLogin: '2024-01-15 11:30:00',
                permissions: ['create', 'edit', 'delete'],
                avatar: 'DW'
            },
            {
                id: 6,
                firstName: 'Admin',
                lastName: 'User',
                email: 'admin@ius.ac.bd',
                role: 'admin',
                department: 'admin',
                status: 'active',
                lastLogin: '2024-01-15 13:15:00',
                permissions: ['create', 'edit', 'delete', 'manage_users'],
                avatar: 'AU'
            },
            {
                id: 7,
                firstName: 'Michael',
                lastName: 'Brown',
                email: 'michael.b@ius.ac.bd',
                role: 'student',
                department: 'civil',
                status: 'inactive',
                lastLogin: '2024-01-10 08:45:00',
                permissions: ['create'],
                avatar: 'MB'
            },
            {
                id: 8,
                firstName: 'Dr. Lisa',
                lastName: 'Chen',
                email: 'lisa.chen@ius.ac.bd',
                role: 'teacher',
                department: 'bba',
                status: 'active',
                lastLogin: '2024-01-15 15:20:00',
                permissions: ['create', 'edit', 'delete'],
                avatar: 'LC'
            }
        ];
        
        filteredUsers = [...allUsers];
        renderUsersTable();
        hideLoading();
    }, 1000);
}

function renderUsersTable() {
    const tableBody = document.getElementById('users-table-body');
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    const usersToShow = filteredUsers.slice(startIndex, endIndex);
    
    tableBody.innerHTML = '';
    
    if (usersToShow.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center py-8 text-gray-500">
                    <i class="fa-solid fa-users-slash text-4xl mb-4 block"></i>
                    No users found matching your criteria
                </td>
            </tr>
        `;
        return;
    }
    
    usersToShow.forEach(user => {
        const row = createUserTableRow(user);
        tableBody.appendChild(row);
    });
    
    updatePagination();
}

function createUserTableRow(user) {
    const row = document.createElement('tr');
    row.className = 'user-table-row';
    
    const roleClass = `role-${user.role}`;
    const statusClass = `status-${user.status}`;
    const departmentClass = `department-${user.department}`;
    
    row.innerHTML = `
        <td>
            <div class="flex items-center gap-3">
                <div class="user-avatar bg-primary">
                    ${user.avatar}
                </div>
                <div>
                    <div class="font-bold">${user.firstName} ${user.lastName}</div>
                    <div class="text-sm text-gray-500">${user.email}</div>
                </div>
            </div>
        </td>
        <td>
            <span class="role-badge ${roleClass}">
                ${user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </span>
        </td>
        <td>
            <span class="${departmentClass} font-medium">
                ${getDepartmentName(user.department)}
            </span>
        </td>
        <td>
            <span class="status-badge ${statusClass}">
                <span class="status-indicator ${user.status}"></span>
                ${user.status.charAt(0).toUpperCase() + user.status.slice(1)}
            </span>
        </td>
        <td>
            <div class="text-sm">
                ${formatDate(user.lastLogin)}
            </div>
        </td>
        <td>
            <div class="flex gap-1">
                <button class="action-btn text-info edit-user" data-user-id="${user.id}">
                    <i class="fa-solid fa-edit"></i>
                </button>
                <button class="action-btn text-warning notify-user" data-user-id="${user.id}">
                    <i class="fa-solid fa-bell"></i>
                </button>
                <button class="action-btn text-error delete-user" data-user-id="${user.id}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </td>
    `;
    
    return row;
}

function setupEventListeners() {
    // Search functionality
    document.getElementById('search-users').addEventListener('input', filterUsers);
    document.getElementById('filter-role').addEventListener('change', filterUsers);
    document.getElementById('filter-department').addEventListener('change', filterUsers);
    document.getElementById('filter-status').addEventListener('change', filterUsers);
    
    // Pagination
    document.getElementById('prev-page').addEventListener('click', goToPrevPage);
    document.getElementById('next-page').addEventListener('click', goToNextPage);
    
    // Add user modal
    document.getElementById('add-user-btn').addEventListener('click', showAddUserModal);
    document.getElementById('cancel-add-user').addEventListener('click', hideAddUserModal);
    document.getElementById('add-user-form').addEventListener('submit', handleAddUser);
    
    // Edit user modal
    document.getElementById('cancel-edit-user').addEventListener('click', hideEditUserModal);
    document.getElementById('edit-user-form').addEventListener('submit', handleEditUser);
    
    // Notification modal
    document.getElementById('cancel-notification').addEventListener('click', hideNotificationModal);
    document.getElementById('send-notification-form').addEventListener('submit', handleSendNotification);
    
    // Logout
    document.getElementById('logout-btn').addEventListener('click', logout);
    
    // Delegate events for dynamic elements
    document.addEventListener('click', function(e) {
        if (e.target.closest('.edit-user')) {
            const userId = e.target.closest('.edit-user').dataset.userId;
            showEditUserModal(userId);
        }
        
        if (e.target.closest('.notify-user')) {
            const userId = e.target.closest('.notify-user').dataset.userId;
            showNotificationModal(userId);
        }
        
        if (e.target.closest('.delete-user')) {
            const userId = e.target.closest('.delete-user').dataset.userId;
            deleteUser(userId);
        }
    });
}

function filterUsers() {
    const searchTerm = document.getElementById('search-users').value.toLowerCase();
    const roleFilter = document.getElementById('filter-role').value;
    const departmentFilter = document.getElementById('filter-department').value;
    const statusFilter = document.getElementById('filter-status').value;
    
    filteredUsers = allUsers.filter(user => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        const email = user.email.toLowerCase();
        
        const matchesSearch = !searchTerm || 
            fullName.includes(searchTerm) || 
            email.includes(searchTerm);
        
        const matchesRole = !roleFilter || user.role === roleFilter;
        const matchesDepartment = !departmentFilter || user.department === departmentFilter;
        const matchesStatus = !statusFilter || user.status === statusFilter;
        
        return matchesSearch && matchesRole && matchesDepartment && matchesStatus;
    });
    
    currentPage = 1;
    renderUsersTable();
}

function goToPrevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderUsersTable();
    }
}

function goToNextPage() {
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderUsersTable();
    }
}

function updatePagination() {
    const totalUsers = filteredUsers.length;
    const startUser = (currentPage - 1) * usersPerPage + 1;
    const endUser = Math.min(currentPage * usersPerPage, totalUsers);
    
    document.getElementById('showing-start').textContent = startUser;
    document.getElementById('showing-end').textContent = endUser;
    document.getElementById('total-users').textContent = totalUsers;
}

function showAddUserModal() {
    document.getElementById('add-user-modal').classList.add('modal-open');
}

function hideAddUserModal() {
    document.getElementById('add-user-modal').classList.remove('modal-open');
    document.getElementById('add-user-form').reset();
}

function showEditUserModal(userId) {
    const user = allUsers.find(u => u.id == userId);
    if (!user) return;
    
    document.getElementById('edit-user-id').value = user.id;
    document.getElementById('edit-first-name').value = user.firstName;
    document.getElementById('edit-last-name').value = user.lastName;
    document.getElementById('edit-user-email').value = user.email;
    document.getElementById('edit-user-role').value = user.role;
    document.getElementById('edit-user-status').value = user.status;
    document.getElementById('edit-user-department').value = user.department;
    
    // Set permissions
    const permissionsContainer = document.getElementById('edit-permissions-container');
    permissionsContainer.innerHTML = '';
    
    const permissions = [
        { value: 'create', label: 'Create Content' },
        { value: 'edit', label: 'Edit Content' },
        { value: 'delete', label: 'Delete Content' },
        { value: 'manage_users', label: 'Manage Users' }
    ];
    
    permissions.forEach(permission => {
        const isChecked = user.permissions.includes(permission.value);
        permissionsContainer.innerHTML += `
            <label class="cursor-pointer label justify-start">
                <input type="checkbox" class="checkbox checkbox-primary mr-2 permission-checkbox" 
                       value="${permission.value}" ${isChecked ? 'checked' : ''}>
                <span class="label-text">${permission.label}</span>
            </label>
        `;
    });
    
    document.getElementById('edit-user-modal').classList.add('modal-open');
}

function hideEditUserModal() {
    document.getElementById('edit-user-modal').classList.remove('modal-open');
}

function showNotificationModal(userId) {
    const user = allUsers.find(u => u.id == userId);
    if (!user) return;
    
    document.getElementById('notify-user-id').value = user.id;
    document.getElementById('notify-user-name').value = `${user.firstName} ${user.lastName} (${user.email})`;
    
    document.getElementById('send-notification-modal').classList.add('modal-open');
}

function hideNotificationModal() {
    document.getElementById('send-notification-modal').classList.remove('modal-open');
    document.getElementById('send-notification-form').reset();
}

function handleAddUser(e) {
    e.preventDefault();
    
    const userData = {
        firstName: document.getElementById('first-name').value,
        lastName: document.getElementById('last-name').value,
        email: document.getElementById('user-email').value,
        role: document.getElementById('user-role').value,
        department: document.getElementById('user-department').value,
        permissions: Array.from(document.querySelectorAll('#add-user-form input[type="checkbox"]:checked'))
            .map(cb => cb.value)
    };
    
    // Simulate API call
    showLoading();
    
    setTimeout(() => {
        // Add new user
        const newUser = {
            id: allUsers.length + 1,
            ...userData,
            status: 'active',
            lastLogin: new Date().toISOString(),
            avatar: (userData.firstName[0] + userData.lastName[0]).toUpperCase()
        };
        
        allUsers.unshift(newUser);
        filteredUsers = [...allUsers];
        
        hideAddUserModal();
        renderUsersTable();
        showNotification('User added successfully!', 'success');
        hideLoading();
    }, 1000);
}

function handleEditUser(e) {
    e.preventDefault();
    
    const userId = document.getElementById('edit-user-id').value;
    const userData = {
        firstName: document.getElementById('edit-first-name').value,
        lastName: document.getElementById('edit-last-name').value,
        email: document.getElementById('edit-user-email').value,
        role: document.getElementById('edit-user-role').value,
        status: document.getElementById('edit-user-status').value,
        department: document.getElementById('edit-user-department').value,
        permissions: Array.from(document.querySelectorAll('#edit-user-form input[type="checkbox"]:checked'))
            .map(cb => cb.value)
    };
    
    // Simulate API call
    showLoading();
    
    setTimeout(() => {
        // Update user
        const userIndex = allUsers.findIndex(u => u.id == userId);
        if (userIndex !== -1) {
            allUsers[userIndex] = { ...allUsers[userIndex], ...userData };
            filteredUsers = [...allUsers];
        }
        
        hideEditUserModal();
        renderUsersTable();
        showNotification('User updated successfully!', 'success');
        hideLoading();
    }, 1000);
}

function handleSendNotification(e) {
    e.preventDefault();
    
    const userId = document.getElementById('notify-user-id').value;
    const subject = document.getElementById('notification-subject').value;
    const message = document.getElementById('notification-message').value;
    const isUrgent = document.getElementById('urgent-notification').checked;
    
    const user = allUsers.find(u => u.id == userId);
    
    // Simulate sending notification
    showLoading();
    
    setTimeout(() => {
        hideNotificationModal();
        showNotification(`Notification sent to ${user.firstName} ${user.lastName}`, 'success');
        hideLoading();
        
        // Log the notification
        console.log('Notification sent:', {
            to: user.email,
            subject,
            message,
            urgent: isUrgent,
            timestamp: new Date().toISOString()
        });
    }, 1000);
}

function deleteUser(userId) {
    const user = allUsers.find(u => u.id == userId);
    if (!user) return;
    
    if (!confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName}?`)) {
        return;
    }
    
    showLoading();
    
    setTimeout(() => {
        allUsers = allUsers.filter(u => u.id != userId);
        filteredUsers = [...allUsers];
        
        renderUsersTable();
        showNotification('User deleted successfully!', 'success');
        hideLoading();
    }, 1000);
}

// Utility functions
function getDepartmentName(deptCode) {
    const departments = {
        'cse': 'Computer Science',
        'bba': 'Business Administration',
        'eee': 'Electrical Engineering',
        'civil': 'Civil Engineering',
        'admin': 'Administration'
    };
    return departments[deptCode] || deptCode;
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

function showLoading() {
    // Show loading state
    const tableBody = document.getElementById('users-table-body');
    tableBody.innerHTML = `
        <tr>
            <td colspan="6" class="text-center py-8">
                <div class="loading-spinner mx-auto mb-2"></div>
                <div class="text-gray-500">Loading users...</div>
            </td>
        </tr>
    `;
}

function hideLoading() {
    // Loading hidden by renderUsersTable
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

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadUsersData,
        filterUsers,
        formatDate
    };
}