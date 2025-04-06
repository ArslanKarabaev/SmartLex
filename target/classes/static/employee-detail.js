/*document.addEventListener("DOMContentLoaded", () => {
    // Получаем ID сотрудника из URL
    const urlParams = new URLSearchParams(window.location.search);
    const teamMemberId = urlParams.get("id");

    if (!teamMemberId) {
        console.error("ID сотрудника не найден");
        return;
    }

    // Запрашиваем данные о сотруднике с сервера
    fetch(`http://localhost:8080/api/v1/SmartLex/Team/getTeamMemberById/${teamMemberId}`) // Ваш актуальный URL API
    .then(response => response.json())
    .then(employee => {
        const employeeContainer = document.querySelector(".employee-detail-container");

        // Очищаем контейнер перед добавлением новых данных
        employeeContainer.innerHTML = ""; 

        const photoUrl = `http://localhost:8080${employee.photo}`; // Создаём полный путь к фотографии

        // Формируем HTML с данными сотрудника
        const memberHTML = `
            <div class="employee-detail-container">
                <img src="${photoUrl}" alt="${employee.teamFio}" id="employee-photo">
                <h2 id="employee-name">${employee.teamFio}</h2>
                <p id="employee-description">${employee.teamDesc}</p> <!-- Показываем описание -->
            </div>
        `;

        // Добавляем сформированный HTML в контейнер
        employeeContainer.innerHTML = memberHTML;
    })
    .catch(error => console.error("Ошибка загрузки данных сотрудника:", error));
});*/

//если не получится, то этот попробовать
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

