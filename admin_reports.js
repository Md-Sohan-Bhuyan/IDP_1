// Reports Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeReportsPage();
    initializeEventListeners();
    loadReportsTable();
    updateStats();
});

function initializeReportsPage() {
    // Initialize any page-specific functionality
    console.log('Reports page initialized');
}

function initializeEventListeners() {
    // Generate Report Button
    const generateReportBtn = document.getElementById('generate-report');
    if (generateReportBtn) {
        generateReportBtn.addEventListener('click', generateReport);
    }
    
    // Quick Report Buttons
    const reportButtons = document.querySelectorAll('.report-btn');
    reportButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const reportType = this.getAttribute('data-report');
            generateQuickReport(reportType);
        });
    });
    
    // Export Buttons
    const exportButtons = [
        'export-pdf',
        'export-excel',
        'export-csv',
        'schedule-report'
    ];
    
    exportButtons.forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.addEventListener('click', function() {
                handleExport(this.id);
            });
        }
    });
    
    // Filter Changes
    const filters = ['time-period', 'department-filter', 'report-type'];
    filters.forEach(filterId => {
        const filter = document.getElementById(filterId);
        if (filter) {
            filter.addEventListener('change', updateReportPreview);
        }
    });
}

function generateReport() {
    const timePeriod = document.getElementById('time-period').value;
    const department = document.getElementById('department-filter').value;
    const reportType = document.getElementById('report-type').value;
    
    // Show loading modal
    const modal = document.getElementById('report-generation-modal');
    modal.classList.add('modal-open');
    
    // Simulate report generation
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += 10;
        const progressElement = document.getElementById('report-progress');
        if (progressElement) {
            progressElement.textContent = `Processing data... ${progress}%`;
        }
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
                modal.classList.remove('modal-open');
                showNotification('Report generated successfully!', 'success');
                updateCharts();
                loadReportsTable();
            }, 500);
        }
    }, 200);
}

function generateQuickReport(reportType) {
    const reportTitles = {
        'teacher-performance': 'Teacher Performance Report',
        'department-analysis': 'Department Analysis Report',
        'question-approval': 'Question Approval Statistics',
        'system-usage': 'System Usage Report',
        'student-progress': 'Student Progress Report'
    };
    
    showNotification(`Generating ${reportTitles[reportType]}...`, 'info');
    
    // Simulate quick report generation
    setTimeout(() => {
        showNotification(`${reportTitles[reportType]} generated successfully!`, 'success');
        updateChartsForReport(reportType);
    }, 1500);
}

function handleExport(exportType) {
    const exportActions = {
        'export-pdf': 'PDF',
        'export-excel': 'Excel',
        'export-csv': 'CSV',
        'schedule-report': 'Scheduled Report'
    };
    
    showNotification(`Preparing ${exportActions[exportType]} export...`, 'info');
    
    if (exportType === 'schedule-report') {
        scheduleReport();
        return;
    }
    
    // Simulate export process
    setTimeout(() => {
        showNotification(`Report exported as ${exportActions[exportType]} successfully!`, 'success');
    }, 2000);
}

function scheduleReport() {
    showNotification('Opening schedule settings...', 'info');
    
    // In a real application, this would open a scheduling modal
    setTimeout(() => {
        showNotification('Report scheduled successfully! You will receive it weekly on Monday at 9:00 AM.', 'success');
    }, 1000);
}

function updateReportPreview() {
    // Update charts and data based on current filters
    updateCharts();
    loadReportsTable();
}

function updateCharts() {
    const performanceChart = document.getElementById('performance-chart');
    if (!performanceChart) return;
    
    // Sample chart data based on filters
    const timePeriod = document.getElementById('time-period').value;
    const department = document.getElementById('department-filter').value;
    
    let chartData = '';
    
    if (department === 'all') {
        chartData = `
            <div class="chart-visualization">
                <div class="flex items-center justify-between mb-4">
                    <h4 class="font-semibold">Department Performance Comparison</h4>
                    <div class="flex gap-2 text-xs">
                        <span class="flex items-center"><span class="data-point primary"></span> Computer Science</span>
                        <span class="flex items-center"><span class="data-point secondary"></span> Mathematics</span>
                        <span class="flex items-center"><span class="data-point accent"></span> Physics</span>
                    </div>
                </div>
                <div class="space-y-3">
                    ${generateChartBars([
                        { label: 'Week 1', values: [85, 78, 72], colors: ['primary', 'secondary', 'accent'] },
                        { label: 'Week 2', values: [82, 80, 75], colors: ['primary', 'secondary', 'accent'] },
                        { label: 'Week 3', values: [88, 76, 78], colors: ['primary', 'secondary', 'accent'] },
                        { label: 'Week 4', values: [90, 82, 80], colors: ['primary', 'secondary', 'accent'] }
                    ])}
                </div>
            </div>
        `;
    } else {
        chartData = `
            <div class="chart-visualization">
                <h4 class="font-semibold mb-4">${getDepartmentName(department)} Performance Trend</h4>
                <div class="space-y-3">
                    ${generateSingleChartBars([
                        { label: 'Week 1', value: 85 },
                        { label: 'Week 2', value: 82 },
                        { label: 'Week 3', value: 88 },
                        { label: 'Week 4', value: 90 }
                    ])}
                </div>
            </div>
        `;
    }
    
    performanceChart.innerHTML = chartData;
}

function updateChartsForReport(reportType) {
    const performanceChart = document.getElementById('performance-chart');
    if (!performanceChart) return;
    
    const chartContents = {
        'teacher-performance': `
            <div class="chart-visualization">
                <h4 class="font-semibold mb-4">Teacher Performance Overview</h4>
                <div class="space-y-4">
                    ${generateTeacherPerformanceBars()}
                </div>
            </div>
        `,
        'department-analysis': `
            <div class="chart-visualization">
                <h4 class="font-semibold mb-4">Department Analysis</h4>
                <div class="space-y-3">
                    ${generateDepartmentAnalysisBars()}
                </div>
            </div>
        `,
        'question-approval': `
            <div class="chart-visualization">
                <h4 class="font-semibold mb-4">Question Approval Statistics</h4>
                <div class="grid grid-cols-3 gap-4 text-center">
                    <div class="metric-card">
                        <div class="text-2xl font-bold text-success">85%</div>
                        <div class="text-sm text-gray-600">Approval Rate</div>
                    </div>
                    <div class="metric-card">
                        <div class="text-2xl font-bold text-warning">23</div>
                        <div class="text-sm text-gray-600">Pending Review</div>
                    </div>
                    <div class="metric-card">
                        <div class="text-2xl font-bold text-error">8</div>
                        <div class="text-sm text-gray-600">Rejected This Week</div>
                    </div>
                </div>
            </div>
        `,
        'system-usage': `
            <div class="chart-visualization">
                <h4 class="font-semibold mb-4">System Usage Overview</h4>
                <div class="space-y-3">
                    ${generateSystemUsageBars()}
                </div>
            </div>
        `,
        'student-progress': `
            <div class="chart-visualization">
                <h4 class="font-semibold mb-4">Student Progress Tracking</h4>
                <div class="space-y-3">
                    ${generateStudentProgressBars()}
                </div>
            </div>
        `
    };
    
    performanceChart.innerHTML = chartContents[reportType] || '<div class="chart-placeholder"><p>Chart not available</p></div>';
}

function generateChartBars(data) {
    return data.map(item => `
        <div class="chart-bar-group">
            <div class="flex justify-between text-sm mb-1">
                <span>${item.label}</span>
            </div>
            <div class="flex gap-1 h-4 rounded-full overflow-hidden">
                ${item.values.map((value, index) => `
                    <div class="bg-${item.colors[index]} flex-1" style="width: ${value}%" title="${value}%"></div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function generateSingleChartBars(data) {
    return data.map(item => `
        <div class="chart-bar-group">
            <div class="flex justify-between text-sm mb-1">
                <span>${item.label}</span>
                <span class="font-semibold">${item.value}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-3">
                <div class="bg-primary h-3 rounded-full" style="width: ${item.value}%"></div>
            </div>
        </div>
    `).join('');
}

function generateTeacherPerformanceBars() {
    const teachers = [
        { name: 'Dr. Rahman', score: 92, students: 45 },
        { name: 'Dr. Khan', score: 88, students: 38 },
        { name: 'Dr. Begum', score: 85, students: 32 },
        { name: 'Dr. Sharma', score: 78, students: 28 }
    ];
    
    return teachers.map(teacher => `
        <div class="flex items-center justify-between p-3 bg-base-200 rounded-lg">
            <div class="flex-1">
                <div class="font-medium">${teacher.name}</div>
                <div class="text-sm text-gray-600">${teacher.students} students</div>
            </div>
            <div class="w-24 bg-gray-200 rounded-full h-3">
                <div class="bg-primary h-3 rounded-full" style="width: ${teacher.score}%"></div>
            </div>
            <div class="w-12 text-right font-semibold">${teacher.score}%</div>
        </div>
    `).join('');
}

function generateDepartmentAnalysisBars() {
    const departments = [
        { name: 'Computer Science', performance: 88, growth: 5.2 },
        { name: 'Mathematics', performance: 82, growth: 3.8 },
        { name: 'Physics', performance: 78, growth: 2.1 },
        { name: 'Chemistry', performance: 75, growth: 1.5 }
    ];
    
    return departments.map(dept => `
        <div class="chart-bar-group">
            <div class="flex justify-between text-sm mb-1">
                <span>${dept.name}</span>
                <span class="font-semibold growth-${dept.growth > 0 ? 'positive' : 'negative'}">
                    ${dept.growth > 0 ? '+' : ''}${dept.growth}%
                </span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-3">
                <div class="bg-primary h-3 rounded-full" style="width: ${dept.performance}%"></div>
            </div>
        </div>
    `).join('');
}

function generateSystemUsageBars() {
    const usageData = [
        { metric: 'Server Uptime', value: 99.8 },
        { metric: 'Response Time', value: 95 },
        { metric: 'Database Performance', value: 98 },
        { metric: 'Storage Utilization', value: 75 }
    ];
    
    return usageData.map(item => `
        <div class="chart-bar-group">
            <div class="flex justify-between text-sm mb-1">
                <span>${item.metric}</span>
                <span class="font-semibold">${item.value}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-3">
                <div class="bg-${getUsageColor(item.value)} h-3 rounded-full" style="width: ${item.value}%"></div>
            </div>
        </div>
    `).join('');
}

function generateStudentProgressBars() {
    const progressData = [
        { range: '90-100%', count: 125, color: 'success' },
        { range: '75-89%', count: 347, color: 'primary' },
        { range: '50-74%', count: 198, color: 'warning' },
        { range: 'Below 50%', count: 42, color: 'error' }
    ];
    
    const total = progressData.reduce((sum, item) => sum + item.count, 0);
    
    return progressData.map(item => {
        const percentage = ((item.count / total) * 100).toFixed(1);
        return `
            <div class="chart-bar-group">
                <div class="flex justify-between text-sm mb-1">
                    <span>${item.range}</span>
                    <span class="font-semibold">${item.count} students (${percentage}%)</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-3">
                    <div class="bg-${item.color} h-3 rounded-full" style="width: ${percentage}%"></div>
                </div>
            </div>
        `;
    }).join('');
}

function getUsageColor(value) {
    if (value >= 90) return 'success';
    if (value >= 80) return 'primary';
    if (value >= 70) return 'warning';
    return 'error';
}

function getDepartmentName(code) {
    const departments = {
        'computer': 'Computer Science',
        'mathematics': 'Mathematics',
        'physics': 'Physics',
        'chemistry': 'Chemistry',
        'all': 'All Departments'
    };
    return departments[code] || code;
}

function loadReportsTable() {
    const tableBody = document.getElementById('reports-table-body');
    if (!tableBody) return;
    
    // Sample reports data
    const reportsData = [
        {
            department: 'Computer Science',
            teachers: 12,
            students: 350,
            quizzes: 25,
            avgScore: 88,
            completionRate: 95,
            growth: 5.2,
            status: 'excellent'
        },
        {
            department: 'Mathematics',
            teachers: 8,
            students: 280,
            quizzes: 18,
            avgScore: 82,
            completionRate: 92,
            growth: 3.8,
            status: 'good'
        },
        {
            department: 'Physics',
            teachers: 6,
            students: 220,
            quizzes: 15,
            avgScore: 78,
            completionRate: 88,
            growth: 2.1,
            status: 'average'
        },
        {
            department: 'Chemistry',
            teachers: 7,
            students: 190,
            quizzes: 12,
            avgScore: 75,
            completionRate: 85,
            growth: 1.5,
            status: 'average'
        },
        {
            department: 'Biology',
            teachers: 5,
            students: 180,
            quizzes: 10,
            avgScore: 72,
            completionRate: 82,
            growth: -0.5,
            status: 'poor'
        }
    ];
    
    // Clear existing table
    tableBody.innerHTML = '';
    
    // Add reports data to table
    reportsData.forEach(report => {
        const row = document.createElement('tr');
        
        const statusClass = `status-${report.status}`;
        const statusText = report.status.charAt(0).toUpperCase() + report.status.slice(1);
        const growthClass = report.growth > 0 ? 'growth-positive' : report.growth < 0 ? 'growth-negative' : 'growth-neutral';
        const growthSymbol = report.growth > 0 ? '↗︎' : report.growth < 0 ? '↘︎' : '→';
        
        row.innerHTML = `
            <td>
                <div class="font-semibold">${report.department}</div>
            </td>
            <td>
                <div class="text-center font-semibold">${report.teachers}</div>
            </td>
            <td>
                <div class="text-center font-semibold">${report.students}</div>
            </td>
            <td>
                <div class="text-center font-semibold">${report.quizzes}</div>
            </td>
            <td>
                <div class="text-center font-semibold">${report.avgScore}%</div>
            </td>
            <td>
                <div class="text-center font-semibold">${report.completionRate}%</div>
            </td>
            <td>
                <div class="text-center font-semibold ${growthClass}">
                    ${growthSymbol} ${Math.abs(report.growth)}%
                </div>
            </td>
            <td>
                <span class="status-indicator ${statusClass}">${statusText}</span>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

function updateStats() {
    // Sample stats data
    const stats = {
        activeUsers: 1294,
        avgPerformance: 76.8,
        totalQuestions: 1247,
        completionRate: 92.5
    };
    
    // Update DOM elements
    document.getElementById('active-users').textContent = stats.activeUsers.toLocaleString();
    document.getElementById('avg-performance').textContent = stats.avgPerformance + '%';
    document.getElementById('total-questions').textContent = stats.totalQuestions.toLocaleString();
    document.getElementById('completion-rate').textContent = stats.completionRate + '%';
}

// Utility Functions
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
window.AdminReports = {
    showNotification,
    loadReportsTable,
    updateStats
};

// Initialize charts when page loads
window.addEventListener('load', function() {
    updateCharts();
});