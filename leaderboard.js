document.addEventListener('DOMContentLoaded', function () {
    // Mock Data Generation
    const departments = ['CSE', 'BBA', 'MBA', 'EEE', 'English'];
    const names = [
        "Aarav Rahman", "Sadia Islam", "Tanvir Ahmed", "Nusrat Jahan", "Karim Uddin",
        "Farhana Akter", "Rafiqul Islam", "Tasnim Begum", "Imran Hossain", "Meherun Nesa",
        "Zahid Hasan", "Rubina Yeasmin", "Kamal Hossain", "Fariha Sultana", "Jamal Uddin",
        "Nasrin Akter", "Mizanur Rahman", "Salma Khatun", "Arif Hossain", "Sharmin Akter",
        "Rashedul Islam", "Jannatul Ferdous", "Sojib Ahmed", "Mousumi Akter", "Al Amin",
        "Rina Begum", "Shahidul Islam", "Fatema Khatun", "Hasan Mahmud", "Ayesha Siddiqua"
    ];

    function generateMockData() {
        const data = [];
        for (let i = 0; i < 50; i++) {
            const name = names[Math.floor(Math.random() * names.length)];
            const dept = departments[Math.floor(Math.random() * departments.length)];
            const quizzesTaken = Math.floor(Math.random() * 20) + 5;
            // Score roughly correlates with quizzes taken but with variation
            const avgScorePerQuiz = Math.floor(Math.random() * 30) + 70; // 70-100
            const totalScore = quizzesTaken * avgScorePerQuiz;

            data.push({
                id: `student-${i}`,
                name: name,
                department: dept,
                quizzes: quizzesTaken,
                score: totalScore,
                isUser: false
            });
        }
        return data;
    }

    // Get User Data from LocalStorage
    function getUserData() {
        const history = JSON.parse(localStorage.getItem('quizHistory')) || [];
        if (history.length === 0) return null;

        const totalScore = history.reduce((sum, item) => sum + (item.score * 10), 0);
        const quizzesTaken = history.length;

        // Assume user is from CSE for now, or get from profile if exists
        // Since we don't have a profile page with dept yet, default to 'CSE'
        const userDept = localStorage.getItem('userDepartment') || 'CSE';
        const userName = localStorage.getItem('userName') || 'You';

        return {
            id: 'current-user',
            name: userName,
            department: userDept,
            quizzes: quizzesTaken,
            score: totalScore,
            isUser: true
        };
    }

    // Initialize
    let allData = generateMockData();
    const userData = getUserData();

    if (userData) {
        allData.push(userData);
    }

    // Initial Render
    renderLeaderboard(allData);
    updateUserRankCard(userData, allData);

    // Event Listeners for Filters
    document.getElementById('time-filter').addEventListener('change', function (e) {
        // For simplicity, we'll just reshuffle scores slightly to simulate time periods
        reshuffleScores();
        const currentDept = document.querySelector('.tab-active').getAttribute('data-filter');
        filterAndRender(currentDept);
    });

    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            tabs.forEach(t => t.classList.remove('tab-active'));
            this.classList.add('tab-active');
            const dept = this.getAttribute('data-filter');
            filterAndRender(dept);
        });
    });

    function reshuffleScores() {
        allData.forEach(student => {
            if (!student.isUser) {
                // Randomize slightly
                const variation = Math.floor(Math.random() * 500) - 250;
                student.score = Math.max(0, student.score + variation);
            }
        });
    }

    function filterAndRender(dept) {
        let filteredData = allData;
        if (dept !== 'all') {
            filteredData = allData.filter(item => item.department === dept);
        }
        renderLeaderboard(filteredData);
    }

    function renderLeaderboard(data) {
        // Sort by score descending
        data.sort((a, b) => b.score - a.score);

        const tbody = document.getElementById('leaderboard-body');
        tbody.innerHTML = '';

        data.forEach((student, index) => {
            const rank = index + 1;
            const row = document.createElement('tr');
            if (student.isUser) {
                row.classList.add('user-row');
            }

            // Rank Badge Logic
            let rankBadge = `<div class="rank-badge rank-other">${rank}</div>`;
            if (rank === 1) rankBadge = `<div class="rank-badge rank-1">1</div>`;
            if (rank === 2) rankBadge = `<div class="rank-badge rank-2">2</div>`;
            if (rank === 3) rankBadge = `<div class="rank-badge rank-3">3</div>`;

            // Avatar Color
            const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500'];
            const colorClass = colors[index % colors.length];
            const initial = student.name.charAt(0);

            row.innerHTML = `
                <td class="text-center">${rankBadge}</td>
                <td>
                    <div class="flex items-center gap-3">
                        <div class="student-avatar ${colorClass}">
                            ${initial}
                        </div>
                        <div>
                            <div class="font-bold">${student.name} ${student.isUser ? '(You)' : ''}</div>
                            <div class="text-sm opacity-50">ID: ${student.id.split('-')[1] || '###'}</div>
                        </div>
                    </div>
                </td>
                <td>
                    <span class="badge badge-ghost badge-sm">${student.department}</span>
                </td>
                <td class="text-center font-mono">${student.quizzes}</td>
                <td class="text-right font-bold text-primary text-lg">${student.score.toLocaleString()}</td>
            `;
            tbody.appendChild(row);
        });
    }

    function updateUserRankCard(user, allData) {
        if (!user) return;

        const card = document.getElementById('user-rank-card');
        card.classList.remove('hidden');

        // Calculate Rank
        // Sort all data first to find user's index
        const sorted = [...allData].sort((a, b) => b.score - a.score);
        const rank = sorted.findIndex(item => item.isUser) + 1;

        document.getElementById('user-rank').textContent = '#' + rank;
        document.getElementById('user-score').textContent = user.score.toLocaleString();
        document.getElementById('user-quizzes').textContent = user.quizzes;
    }
});
