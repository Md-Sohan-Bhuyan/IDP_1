document.addEventListener('DOMContentLoaded', function () {
    // Sample Quiz Data with Questions
    const quizzes = [
        {
            id: 1,
            title: "Introduction to C++",
            category: "CSE",
            questionsCount: 5,
            time: "10 mins",
            difficulty: "Easy",
            image: "https://img.icons8.com/color/96/c-plus-plus-logo.png",
            questions: [
                {
                    id: 1,
                    text: "Which of the following is the correct syntax to print a message in C++?",
                    options: ["cout << 'Hello';", "print('Hello');", "System.out.println('Hello');", "Console.WriteLine('Hello');"],
                    correct: 0
                },
                {
                    id: 2,
                    text: "Which data type is used to create a variable that should store text?",
                    options: ["String", "string", "Txt", "text"],
                    correct: 1
                },
                {
                    id: 3,
                    text: "How do you create a variable with the numeric value 5?",
                    options: ["num x = 5", "x = 5;", "int x = 5;", "float x = 5;"],
                    correct: 2
                },
                {
                    id: 4,
                    text: "Which operator is used to compare two values?",
                    options: ["=", "<>", "==", "><"],
                    correct: 2
                },
                {
                    id: 5,
                    text: "To declare an array in C++, define the variable type with:",
                    options: ["()", "{}", "[]", "<>"],
                    correct: 2
                }
            ]
        },
        {
            id: 2,
            title: "Marketing Fundamentals",
            category: "BBA",
            questionsCount: 5,
            time: "15 mins",
            difficulty: "Medium",
            image: "https://img.icons8.com/color/96/marketing.png",
            questions: [
                {
                    id: 1,
                    text: "The 4 Ps of marketing are:",
                    options: ["Product, Price, Place, Promotion", "Product, Price, People, Promotion", "Product, Price, Place, Process", "People, Process, Physical Evidence, Promotion"],
                    correct: 0
                },
                {
                    id: 2,
                    text: "Which of the following is NOT a stage in the product life cycle?",
                    options: ["Introduction", "Growth", "Maturity", "Expansion"],
                    correct: 3
                },
                {
                    id: 3,
                    text: "SWOT analysis stands for:",
                    options: ["Strengths, Weaknesses, Opportunities, Threats", "Strengths, Weaknesses, Operations, Threats", "Strengths, Work, Opportunities, Threats", "Sales, Weaknesses, Opportunities, Threats"],
                    correct: 0
                },
                {
                    id: 4,
                    text: "Market segmentation based on age, gender, and income is known as:",
                    options: ["Psychographic segmentation", "Demographic segmentation", "Geographic segmentation", "Behavioral segmentation"],
                    correct: 1
                },
                {
                    id: 5,
                    text: "A niche market is:",
                    options: ["A large market segment", "A small, specialized market segment", "A global market", "A mass market"],
                    correct: 1
                }
            ]
        },
        {
            id: 3,
            title: "Circuit Analysis",
            category: "EEE",
            questionsCount: 5,
            time: "20 mins",
            difficulty: "Hard",
            image: "https://img.icons8.com/color/96/electronic-circuit.png",
            questions: [
                {
                    id: 1,
                    text: "Ohm's Law is represented by the formula:",
                    options: ["V = I/R", "V = IR", "I = VR", "R = VI"],
                    correct: 1
                },
                {
                    id: 2,
                    text: "Kirchhoff's Current Law (KCL) states that:",
                    options: ["Sum of currents entering a node equals sum of currents leaving", "Sum of voltages in a loop is zero", "Voltage is proportional to current", "Power is voltage times current"],
                    correct: 0
                },
                {
                    id: 3,
                    text: "In a series circuit, which quantity remains the same across all components?",
                    options: ["Voltage", "Current", "Power", "Resistance"],
                    correct: 1
                },
                {
                    id: 4,
                    text: "The unit of capacitance is:",
                    options: ["Ohm", "Henry", "Farad", "Watt"],
                    correct: 2
                },
                {
                    id: 5,
                    text: "For a sinusoidal wave, the RMS value is equal to:",
                    options: ["Peak value / 2", "Peak value * 0.707", "Peak value * 1.414", "Average value"],
                    correct: 1
                }
            ]
        },
        {
            id: 4,
            title: "English Grammar",
            category: "English",
            questionsCount: 5,
            time: "10 mins",
            difficulty: "Easy",
            image: "https://img.icons8.com/color/96/grammar.png",
            questions: [
                {
                    id: 1,
                    text: "Identify the noun in the sentence: 'The cat sleeps.'",
                    options: ["The", "cat", "sleeps", "None"],
                    correct: 1
                },
                {
                    id: 2,
                    text: "Choose the correct past tense of 'go'.",
                    options: ["goed", "gone", "went", "going"],
                    correct: 2
                },
                {
                    id: 3,
                    text: "Which sentence is grammatically correct?",
                    options: ["She don't like apples.", "She doesn't like apples.", "She not like apples.", "She no like apples."],
                    correct: 1
                },
                {
                    id: 4,
                    text: "What is the synonym of 'Happy'?",
                    options: ["Sad", "Angry", "Joyful", "Tired"],
                    correct: 2
                },
                {
                    id: 5,
                    text: "Identify the adjective: 'He drives a red car.'",
                    options: ["He", "drives", "red", "car"],
                    correct: 2
                }
            ]
        },
        {
            id: 5,
            title: "Strategic Management",
            category: "MBA",
            questionsCount: 5,
            time: "15 mins",
            difficulty: "Medium",
            image: "https://img.icons8.com/color/96/strategy-board.png",
            questions: [
                {
                    id: 1,
                    text: "What is the first step in the strategic management process?",
                    options: ["Strategy Formulation", "Environmental Scanning", "Strategy Implementation", "Evaluation and Control"],
                    correct: 1
                },
                {
                    id: 2,
                    text: "Porter's Five Forces model is used to analyze:",
                    options: ["Internal environment", "Competitive environment", "Macro environment", "Global environment"],
                    correct: 1
                },
                {
                    id: 3,
                    text: "A vision statement describes:",
                    options: ["What the company wants to become", "The company's current business", "The company's values", "The company's history"],
                    correct: 0
                },
                {
                    id: 4,
                    text: "Which of the following is a corporate level strategy?",
                    options: ["Cost Leadership", "Differentiation", "Growth Strategy", "Focus Strategy"],
                    correct: 2
                },
                {
                    id: 5,
                    text: "BCG Matrix classifies products into:",
                    options: ["Stars, Cash Cows, Question Marks, Dogs", "Leaders, Followers, Challengers, Nichers", "Gold, Silver, Bronze, Platinum", "High, Low, Medium, Average"],
                    correct: 0
                }
            ]
        },
        {
            id: 6,
            title: "Data Structures",
            category: "CSE",
            questionsCount: 5,
            time: "20 mins",
            difficulty: "Hard",
            image: "https://img.icons8.com/color/96/data-configuration.png",
            questions: [
                {
                    id: 1,
                    text: "Which data structure is based on the LIFO principle?",
                    options: ["Queue", "Stack", "Linked List", "Tree"],
                    correct: 1
                },
                {
                    id: 2,
                    text: "The time complexity of accessing an element in an array is:",
                    options: ["O(n)", "O(log n)", "O(1)", "O(n^2)"],
                    correct: 2
                },
                {
                    id: 3,
                    text: "Which sorting algorithm has the best average case time complexity?",
                    options: ["Bubble Sort", "Insertion Sort", "Merge Sort", "Selection Sort"],
                    correct: 2
                },
                {
                    id: 4,
                    text: "A binary search tree (BST) has the property that:",
                    options: ["Left child < Parent < Right child", "Left child > Parent > Right child", "Left child = Right child", "No specific order"],
                    correct: 0
                },
                {
                    id: 5,
                    text: "Which data structure is used for Breadth First Search (BFS) of a graph?",
                    options: ["Stack", "Queue", "Heap", "Hash Table"],
                    correct: 1
                }
            ]
        }
    ];

    // Load user created quizzes from localStorage
    const storedQuizzes = JSON.parse(localStorage.getItem('ius_quizzes')) || [];

    // Merge sample quizzes and stored quizzes
    const allQuizzes = [...quizzes, ...storedQuizzes];

    const quizGrid = document.getElementById('quiz-grid');
    const filterButtons = document.querySelectorAll('[data-filter]');
    const searchInput = document.getElementById('search-input');

    // Function to render quizzes
    function renderQuizzes(quizzesToRender) {
        quizGrid.innerHTML = '';

        if (quizzesToRender.length === 0) {
            quizGrid.innerHTML = `
                <div class="col-span-full text-center py-16 animate-fadeInUp">
                    <div class="inline-block p-6 rounded-full bg-gray-100 mb-4">
                        <i class="fa-solid fa-search text-4xl text-gray-400"></i>
                    </div>
                    <h3 class="text-xl font-semibold text-gray-700 mb-2">No quizzes found</h3>
                    <p class="text-gray-500">Try adjusting your search or filter criteria.</p>
                </div>
            `;
            return;
        }

        quizzesToRender.forEach((quiz, index) => {
            const card = document.createElement('div');
            card.className = 'quiz-card animate-fadeInUp';
            card.style.animationDelay = `${index * 0.1}s`; // Staggered animation

            card.innerHTML = `
                <div class="quiz-card-header">
                    <div class="quiz-icon-wrapper">
                        <img src="images/favicon.ico" alt="${quiz.category}" class="w-12 h-12 object-contain">
                    </div>
                </div>
                <div class="quiz-card-body">
                    <div class="quiz-tags">
                        <span class="quiz-tag tag-${quiz.category.toLowerCase()}">${quiz.category}</span>
                    </div>
                    <h3 class="quiz-title">${quiz.title}</h3>
                    <div class="quiz-meta">
                        <span><i class="fa-regular fa-clock"></i> ${quiz.time}</span>
                        <span><i class="fa-solid fa-list-check"></i> ${quiz.questionsCount || (quiz.questions ? quiz.questions.length : 0)} Qs</span>
                    </div>
                    <div class="quiz-footer">
                        <span class="difficulty-badge ${getDifficultyClass(quiz.difficulty)}">
                            <i class="fa-solid fa-layer-group"></i> ${quiz.difficulty}
                        </span>
                        <button class="btn-start" onclick="startQuiz(${quiz.id})">
                            Start Quiz
                        </button>
                    </div>
                </div>
            `;
            quizGrid.appendChild(card);
        });
    }

    // Helper to get difficulty class
    function getDifficultyClass(difficulty) {
        switch (difficulty) {
            case 'Easy': return 'difficulty-easy';
            case 'Medium': return 'difficulty-medium';
            case 'Hard': return 'difficulty-hard';
            default: return '';
        }
    }

    // Initial Render
    renderQuizzes(allQuizzes);

    // Filter Logic
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('btn-active'));
            // Add active class to clicked button
            btn.classList.add('btn-active');

            const filter = btn.getAttribute('data-filter');
            if (filter === 'all') {
                renderQuizzes(allQuizzes);
            } else {
                const filtered = allQuizzes.filter(q => q.category === filter);
                renderQuizzes(filtered);
            }
        });
    });

    // Search Logic
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = allQuizzes.filter(q =>
            q.title.toLowerCase().includes(searchTerm) ||
            q.category.toLowerCase().includes(searchTerm)
        );
        renderQuizzes(filtered);
    });

    // Start Quiz Function (Global)
    window.startQuiz = function (id) {
        const quiz = allQuizzes.find(q => q.id === id);
        if (quiz) {
            // Save current quiz to localStorage to pass to play_quiz.html
            localStorage.setItem('currentQuiz', JSON.stringify(quiz));
            window.location.href = 'play_quiz.html';
        } else {
            alert('Quiz not found!');
        }
    };
});

