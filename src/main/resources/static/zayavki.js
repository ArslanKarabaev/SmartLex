document.addEventListener("DOMContentLoaded", () => {
    const applicationContainer = document.getElementById("application-container");

    // Функция загрузки заявок с сервера
    async function loadApplications() {
        try {
            const response = await fetch("api/v1/SmartLex/AdMiNbAkYt1/getContacts");
            if (!response.ok) throw new Error("Ошибка загрузки данных");

            const applications = await response.json();
            applicationContainer.innerHTML = ""; // Очищаем контейнер перед загрузкой новых данных

            console.log("Заявки:", applications); // Логируем полученные заявки
            applications.forEach(application => {
                const applicationItem = document.createElement("div");
                applicationItem.classList.add("application-item");
                applicationItem.dataset.id = application.contactId; // Сохраняем ID заявки

                applicationItem.innerHTML = `
                    <p class="client-name">${application.contactFio}</p>
                    <p class="service-name">${application.services.map(service => service.name).join(", ")}</p>
                    <p class="client-phone">${application.mobNum}</p>
                    <div class="contacted-container">
                        <p>Связались</p>
                        <input type="checkbox" class="contacted-checkbox" ${application.contacted ? "checked" : ""} />
                    </div>
                `;

                // Добавляем обработчик события для чекбокса
                const contactedCheckbox = applicationItem.querySelector(".contacted-checkbox");
                contactedCheckbox.addEventListener("change", updateApplicationStatus);

                applicationContainer.appendChild(applicationItem);
            });
        } catch (error) {
            console.error("Ошибка при загрузке данных:", error);
        }
    }

    //функция обновления статуса
    async function updateApplicationStatus(event) {
        const checkbox = event.target;
        const applicationItem = checkbox.closest(".application-item");

        // Получаем ID заявки из атрибута data-id
        const applicationId = applicationItem ? applicationItem.dataset.id : 0;

        if (!applicationId || isNaN(applicationId)) {
            console.error("Ошибка: ID заявки не указан или неверный");
            return;
        }

        const isChecked = checkbox.checked;

        // Логирование значений для отладки
        console.log("ID заявки:", applicationId);
        console.log("Связались:", isChecked);

        const requestData = {
            id: parseInt(applicationId, 10), // Преобразуем id в число
            contacted: isChecked // Булевое значение
        };

        console.log("Отправляемые данные:", requestData);

        try {
            const response = await fetch("api/v1/SmartLex/AdMiNbAkYt1/updateContactedStatus", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Ошибка при обновлении (код ${response.status}): ${errorText}`);
            }

            console.log(`Заявка ${applicationId} обновлена: contacted = ${isChecked}`);
        } catch (error) {
            console.error("Ошибка при обновлении статуса заявки:", error);
        }
    }





    loadApplications(); // Загрузка заявок при открытии страницы
    setInterval(loadApplications, 30000); // Обновление заявок каждые 30 секунд
});

/*document.addEventListener("DOMContentLoaded", () => {
    // Функция для обновления состояния заявки при изменении чекбокса
    function updateApplicationStatus(checkbox) {
        const applicationItem = checkbox.closest('.application-item');
        
        if (checkbox.checked) {
            // Если чекбокс отмечен, перемещаем заявку вниз
            applicationItem.style.order = 1;  // Перемещаем в конец
        } else {
            // Если чекбокс не отмечен, возвращаем заявку наверх
            applicationItem.style.order = 0;  // Перемещаем в начало
        }
    }*/

/*// Сортировка заявок по времени
function sortApplications() {
    const applications = Array.from(document.querySelectorAll('.application-item'));

    applications.sort((a, b) => {
        const timeA = new Date(a.dataset.time).getTime();
        const timeB = new Date(b.dataset.time).getTime();
        return timeA - timeB;  // Сортируем по времени от более раннего к более позднему
    });

    const container = document.getElementById("application-container");
    applications.forEach(app => container.appendChild(app));  // Добавляем отсортированные заявки обратно в контейнер
}

// Вначале отсортируем все заявки
sortApplications();*/
//});
