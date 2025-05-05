document.addEventListener('DOMContentLoaded', () => {
    fetchExperience();
});

async function fetchExperience() {
    try {
        const response = await fetch('api/v1/SmartLex/Experience/getAllExperience'); // Укажи свой API
        const data = await response.json();

        const experienceContainer = document.getElementById('experience-list');
        experienceContainer.innerHTML = ''; // Очищаем перед загрузкой

        data.forEach(exp => {
            const card = document.createElement('div');
            card.className = 'experience-card';
            card.innerHTML = `
                <h2>${exp.name}</h2>
                <p>${exp.expDesc}</p>
            `;

            // Добавляем обработчик клика для переключения состояния
            card.querySelector('h2').addEventListener('click', () => {
                card.classList.toggle('active'); // Переключаем активный класс, чтобы показать/скрыть описание
            });

            experienceContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Ошибка загрузки опыта:', error);
    }
}

//для бургера
document.addEventListener('DOMContentLoaded', function () {
    const burger = document.querySelector('.burger-menu');
    const nav = document.querySelector('nav ul');

    burger.addEventListener('click', function () {
        nav.classList.toggle('active');
    });
});
