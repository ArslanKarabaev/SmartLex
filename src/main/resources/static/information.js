document.addEventListener('DOMContentLoaded', () => {
    fetchLegalInfo(); // Вызываем функцию при загрузке страницы
});

// Функция загрузки правовой информации
async function fetchLegalInfo() {
    try {
        const response = await fetch('api/v1/SmartLex/LegalInfo'); // Замените на свой URL
        const data = await response.json(); // Преобразуем ответ в JSON

        const container = document.getElementById('legal-info-container');
        container.innerHTML = ''; // Очищаем контейнер перед добавлением новых данных

        if (data.length === 0) {
            container.innerHTML = "<p>Данные не найдены.</p>"; // Если данных нет, показываем сообщение
        } else {
            data.forEach(info => {
                const section = document.createElement('div');
                section.classList.add('legal-info');
                section.innerHTML = `
                    <h2>${info.name}</h2>
                    <p>${info.legalInfoDesc}</p>
                `;

                // Добавляем обработчик клика для раскрытия описания
                toggleDescriptionOnClick(section);

                container.appendChild(section);
            });
        }
    } catch (error) {
        console.error("Ошибка загрузки данных:", error);
        document.getElementById('legal-info-container').innerHTML = '<p>Ошибка при загрузке информации.</p>';
    }
}

// Функция для добавления обработчика клика и раскрытия текста
function toggleDescriptionOnClick(section) {
    const title = section.querySelector('h2'); // Находим название (h2)

    title.addEventListener('click', (event) => {
        event.stopPropagation(); // Останавливаем распространение события по дереву
        section.classList.toggle('active');
    });

    const description = section.querySelector('p'); // Находим описание (p)
    description.addEventListener('click', (event) => {
        event.stopPropagation(); // Останавливаем распространение события по дереву
    });
}
//для бургера
document.addEventListener('DOMContentLoaded', function () {
    const burger = document.querySelector('.burger-menu');
    const nav = document.querySelector('nav ul');

    burger.addEventListener('click', function () {
        nav.classList.toggle('active');
    });
});