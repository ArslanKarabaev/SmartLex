document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("contact-modal");
    const openModalBtns = document.querySelectorAll(".contact-btn"); // Кнопки "Связаться"
    const closeModalBtn = document.querySelector(".close-btn");
    const body = document.body;

    const nameInput = document.getElementById("contact-name");
    const phoneInput = document.getElementById("contact-phone");
    const serviceSelect = document.getElementById("contact-service");
    const contactForm = document.getElementById("contact-form");

    // Открытие модалки
    openModalBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const applicationId = btn.getAttribute("data-id"); // Извлекаем ID заявки
            modal.classList.add("show");
            body.classList.add("modal-open");
            loadServices(applicationId); // Передаем ID заявки в функцию загрузки услуг
        });
    });

    // Закрытие модалки
    closeModalBtn.addEventListener("click", () => {
        modal.classList.remove("show");
        body.classList.remove("modal-open");
        contactForm.reset();
    });

    // Закрытие по клику вне формы
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.classList.remove("show");
            body.classList.remove("modal-open");
            contactForm.reset();
        }
    });

    // Загрузка услуг с бэкенда
    async function loadServices() {
        try {
            const response = await fetch('api/v1/SmartLex/Services');
            const services = await response.json();
            serviceSelect.innerHTML = '<option value="" disabled selected>Выберите услугу</option>';
            services.forEach(service => {
                const option = document.createElement("option");
                option.value = service.serviceId;
                option.textContent = service.name;
                serviceSelect.appendChild(option);
            });
        } catch (error) {
            console.error("Ошибка загрузки услуг:", error);
        }
    }

    // Отправка формы
    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const applicationId = document.querySelector(".contact-btn").getAttribute("data-id"); // Получаем ID заявки
        const requestData = {
            contactFio: nameInput.value,
            mobNum: phoneInput.value,
            services: [{ serviceId: parseInt(serviceSelect.value) }],
            contacted: false,
            applicationId: applicationId // Добавляем ID заявки в запрос
        };

        try {
            const response = await fetch("api/v1/SmartLex/Contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestData)
            });

            if (response.ok) {
                alert("Заявка успешно отправлена!");
                modal.classList.remove("show");
                body.classList.remove("modal-open");
                contactForm.reset();
            } else {
                alert("Ошибка при отправке данных!");
            }
        } catch (error) {
            console.error("Ошибка отправки запроса:", error);
            alert("Ошибка соединения с сервером!");
        }
    });
});
