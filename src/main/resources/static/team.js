document.addEventListener("DOMContentLoaded", () => {
    // Подсвечиваем активную вкладку "Команда"
    document.querySelectorAll(".nav-link").forEach(link => {
        if (link.href.includes("team.html")) {
            link.classList.add("active");
        }
    });

    fetch("api/v1/SmartLex/Team/getAllTeam")
    .then(response => response.json())
    .then(data => {
        const teamContainer = document.querySelector(".team-container");
        teamContainer.innerHTML = ""; // Очищаем контейнер перед добавлением новых данных

        data.forEach(employee => {
            const photoUrl = `https://smart-lex-ce22f5342491.herokuapp.com/${employee.photo}`; // Добавляем полный путь к изображению

            const memberHTML = `
                <a href="employee-detail.html?id=${employee.teamId}" class="team-member">
                    <div class="inner-container">
                        <img src="${photoUrl}" alt="${employee.teamFio}">
                        <p>${employee.teamFio}</p>
                    </div>
                </a>
            `;
            teamContainer.innerHTML += memberHTML;
        });
    })
    .catch(error => console.error("Ошибка загрузки сотрудников:", error));
});

