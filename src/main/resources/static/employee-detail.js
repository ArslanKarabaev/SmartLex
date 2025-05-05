document.addEventListener("DOMContentLoaded", () => {
    // Получаем ID сотрудника из URL
    const urlParams = new URLSearchParams(window.location.search);
    const teamMemberId = urlParams.get("id");

    if (!teamMemberId) {
        console.error("ID сотрудника не найден");
        return;
    }

    // Запрашиваем данные о сотруднике с сервера
    fetch(`api/v1/SmartLex/Team/getTeamMemberById/${teamMemberId}`) // Ваш актуальный URL API
        .then(response => response.json())
        .then(employee => {
            // Получаем элементы, которые будем обновлять
            const employeeName = document.getElementById('employee-name');
            const employeeDescription = document.getElementById('employee-description');
            const employeePhoto = document.getElementById('employee-photo');

            // Формируем полный путь к фотографии
            const photoUrl = `${employee.photo}`;

            // Обновляем элементы с полученными данными
            employeeName.textContent = employee.teamFio;
            employeeDescription.textContent = employee.teamDesc;
            employeePhoto.src = photoUrl;
            employeePhoto.alt = employee.teamFio; // Задаем alt текст для фото
        })
        .catch(error => console.error("Ошибка загрузки данных сотрудника:", error));
});

//добавлен недавно
document.addEventListener("DOMContentLoaded", () => {
    // Показываем индикатор загрузки
    const loadingIndicator = document.getElementById('loading-indicator');
    loadingIndicator.style.display = 'block';

    const urlParams = new URLSearchParams(window.location.search);
    const teamMemberId = urlParams.get("id");

    if (!teamMemberId) {
        console.error("ID сотрудника не найден");
        return;
    }

    fetch(`api/v1/SmartLex/Team/getTeamMemberById/${teamMemberId}`)
        .then(response => response.json())
        .then(employee => {
            // console.log("Данные сотрудника:", employee);
            const employeeDetailContainer = document.getElementById('employee-detail-container');

            // Создаём элементы динамически
            const leftContainer = document.createElement('div');
            leftContainer.classList.add('employee-left');

            const employeeName = document.createElement('p');
            employeeName.classList.add('employee-name');
            employeeName.textContent = employee.teamFio;

            const photoContainer = document.createElement('div');
            photoContainer.classList.add('photo-container');

            const employeePhoto = document.createElement('img');
            employeePhoto.id = 'employee-photo';
            employeePhoto.src = `${employee.photo}`;
            employeePhoto.alt = employee.teamFio;

            photoContainer.appendChild(employeePhoto);

            leftContainer.appendChild(employeeName);
            leftContainer.appendChild(photoContainer);

            const rightContainer = document.createElement('div');
            rightContainer.classList.add('employee-right');

            const rightHeader = document.createElement('h3');
            rightHeader.textContent = 'Полная информация:';

            const descriptionLabel = document.createElement('p');
            descriptionLabel.innerHTML = '<strong>Описание:</strong>';

            const descriptionSpan = document.createElement('span');
            descriptionSpan.id = 'employee-description';
            descriptionSpan.textContent = employee.teamDesc;

            descriptionLabel.appendChild(descriptionSpan);

            rightContainer.appendChild(rightHeader);
            rightContainer.appendChild(descriptionLabel);

            employeeDetailContainer.appendChild(leftContainer);
            employeeDetailContainer.appendChild(rightContainer);

            // Скрываем индикатор загрузки после загрузки данных
            loadingIndicator.style.display = 'none';
        })
        .catch(error => {
            console.error("Ошибка загрузки данных сотрудника:", error);
            loadingIndicator.style.display = 'none'; // Скрыть индикатор, даже если произошла ошибка
        });
});

//для бургера
document.addEventListener('DOMContentLoaded', function () {
    const burger = document.querySelector('.burger-menu');
    const nav = document.querySelector('nav ul');

    burger.addEventListener('click', function () {
        nav.classList.toggle('active');
    });
});