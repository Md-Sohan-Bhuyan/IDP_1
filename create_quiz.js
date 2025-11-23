document.addEventListener('DOMContentLoaded', function () {
    const questionsContainer = document.getElementById('questions-container');
    const addQuestionBtn = document.getElementById('add-question-btn');
    const form = document.getElementById('create-quiz-form');
    let questionCount = 0;

    // Add initial question
    addQuestion();

    addQuestionBtn.addEventListener('click', addQuestion);

    function addQuestion() {
        questionCount++;
        const questionCard = document.createElement('div');
        questionCard.className = 'card bg-base-100 shadow-xl border border-base-200 question-card animate-fadeIn';
        questionCard.innerHTML = `
            <div class="card-body">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="font-bold">Question ${questionCount}</h3>
                    ${questionCount > 1 ? `<button type="button" class="btn btn-ghost btn-xs text-error delete-btn"><i class="fa-solid fa-trash"></i></button>` : ''}
                </div>
                
                <div class="form-control mb-4">
                    <input type="text" placeholder="Enter question text..." class="input input-bordered w-full question-text" required />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="form-control">
                        <div class="input-group">
                            <input type="radio" name="correct-${questionCount}" value="0" class="radio radio-primary mr-2" checked />
                            <input type="text" placeholder="Option A" class="input input-bordered input-sm w-full option-input" required />
                        </div>
                    </div>
                    <div class="form-control">
                        <div class="input-group">
                            <input type="radio" name="correct-${questionCount}" value="1" class="radio radio-primary mr-2" />
                            <input type="text" placeholder="Option B" class="input input-bordered input-sm w-full option-input" required />
                        </div>
                    </div>
                    <div class="form-control">
                        <div class="input-group">
                            <input type="radio" name="correct-${questionCount}" value="2" class="radio radio-primary mr-2" />
                            <input type="text" placeholder="Option C" class="input input-bordered input-sm w-full option-input" required />
                        </div>
                    </div>
                    <div class="form-control">
                        <div class="input-group">
                            <input type="radio" name="correct-${questionCount}" value="3" class="radio radio-primary mr-2" />
                            <input type="text" placeholder="Option D" class="input input-bordered input-sm w-full option-input" required />
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Delete functionality
        if (questionCount > 1) {
            const deleteBtn = questionCard.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => {
                questionCard.remove();
                updateQuestionNumbers();
            });
        }

        questionsContainer.appendChild(questionCard);
    }

    function updateQuestionNumbers() {
        const cards = questionsContainer.querySelectorAll('.question-card');
        questionCount = 0;
        cards.forEach((card) => {
            questionCount++;
            card.querySelector('h3').textContent = `Question ${questionCount}`;
            const radios = card.querySelectorAll('input[type="radio"]');
            radios.forEach(radio => radio.name = `correct-${questionCount}`);
        });
    }

    // Form Submission
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const title = document.getElementById('quiz-title').value;
        const category = document.getElementById('quiz-category').value;
        const time = document.getElementById('quiz-time').value;
        const difficulty = document.getElementById('quiz-difficulty').value;

        const questions = [];
        const cards = questionsContainer.querySelectorAll('.question-card');

        cards.forEach((card, index) => {
            const qText = card.querySelector('.question-text').value;
            const optionsInputs = card.querySelectorAll('.option-input');
            const options = Array.from(optionsInputs).map(input => input.value);

            // Find checked radio index
            const radios = card.querySelectorAll('input[type="radio"]');
            let correctIndex = 0;
            radios.forEach((radio, i) => {
                if (radio.checked) correctIndex = i;
            });

            questions.push({
                id: index + 1,
                text: qText,
                options: options,
                correct: correctIndex
            });
        });

        const newQuiz = {
            id: Date.now(), // Simple ID generation
            title: title,
            category: category,
            time: time,
            questionsCount: questions.length,
            questions: questions,
            difficulty: difficulty,
            image: "https://img.icons8.com/color/96/exam.png" // Default image
        };

        // Save to localStorage
        let storedQuizzes = JSON.parse(localStorage.getItem('ius_quizzes')) || [];
        storedQuizzes.push(newQuiz);
        localStorage.setItem('ius_quizzes', JSON.stringify(storedQuizzes));

        alert('Quiz Created Successfully!');
        window.location.href = 'quizzes.html';
    });
});
