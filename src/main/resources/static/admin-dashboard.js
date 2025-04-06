document.getElementById('add-service').addEventListener('click', () => {
    document.getElementById('add-service-modal').style.display = 'flex';
});

document.getElementById('add-experience').addEventListener('click', () => {
    document.getElementById('add-experience-modal').style.display = 'flex';
});

document.getElementById('add-legal-info').addEventListener('click', () => {
    document.getElementById('add-legal-info-modal').style.display = 'flex';
});

document.getElementById('add-team-member').addEventListener('click', () => {
    document.getElementById('add-team-member-modal').style.display = 'flex';
});

// Закрытие модальных окон по клику за пределы окна
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
};

// Закрытие модальных окон по нажатию на крестик
document.getElementById('close-service-modal').addEventListener('click', () => {
    document.getElementById('add-service-modal').style.display = 'none';
});

document.getElementById('close-experience-modal').addEventListener('click', () => {
    document.getElementById('add-experience-modal').style.display = 'none';
});

document.getElementById('close-legal-info-modal').addEventListener('click', () => {
    document.getElementById('add-legal-info-modal').style.display = 'none';
});

document.getElementById('close-team-member-modal').addEventListener('click', () => {
    document.getElementById('add-team-member-modal').style.display = 'none';
});

// Функции для отправки данных на сервер

// Добавить услугу
document.getElementById('submit-service').addEventListener('click', () => {
    const name = document.getElementById('service-name').value;
    const data = { name };

    fetch('api/v1/SmartLex/AdMiNbAkYt1/addNewService', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Service added:', data);
        document.getElementById('add-service-modal').style.display = 'none';
    })
    .catch(error => {
        console.error('Error adding service:', error);
    });
});

// Добавить опыт
document.getElementById('submit-experience').addEventListener('click', () => {
    const name = document.getElementById('experience-name').value;
    const description = document.getElementById('experience-description').value;
    const data = { name, expDesc: description };

    fetch('api/v1/SmartLex/AdMiNbAkYt1/addNewExperience', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Experience added:', data);
        document.getElementById('add-experience-modal').style.display = 'none';
    })
    .catch(error => {
        console.error('Error adding experience:', error);
    });
});

// Добавить правовую информацию
document.getElementById('submit-legal-info').addEventListener('click', () => {
    const name = document.getElementById('legal-info-name').value;
    const description = document.getElementById('legal-info-description').value;
    const data = { name, legalInfoDesc: description };

    fetch('api/v1/SmartLex/AdMiNbAkYt1/addNewLegalInfo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Legal info added:', data);
        document.getElementById('add-legal-info-modal').style.display = 'none';
    })
    .catch(error => {
        console.error('Error adding legal info:', error);
    });
});


// Обработчик загрузки фото (предпросмотр)
document.getElementById('team-member-photo').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const preview = document.getElementById('photo-preview');
    const text = document.getElementById('photo-text');

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result; // Устанавливаем фото в контейнер
            preview.classList.remove('hidden'); 
            text.classList.add('hidden'); 
        };
        reader.readAsDataURL(file);
    }
});

// Добавить члена команды
document.getElementById('submit-team-member').addEventListener('click', () => {
    const fio = document.getElementById('team-member-fio').value;
    const description = document.getElementById('team-member-description').value;
    const photoInput = document.getElementById('team-member-photo');
    const photo = photoInput.files[0];

    if (!fio || !description || !photo) {
        alert("Заполните все поля и выберите фото!");
        return;
    }

    const formData = new FormData();
    formData.append("teamFio", fio);
    formData.append("teamDesc", description);
    formData.append("photo", photo);

    fetch('api/v1/SmartLex/AdMiNbAkYt1/addNewTeamMember', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text()) 
    .then(data => {
        console.log('Team member added:', data);
        alert("Участник успешно добавлен!");
        // Очищаем форму
        photoInput.value = "";
        document.getElementById('team-member-fio').value = "";
        document.getElementById('team-member-description').value = "";
    })
    .catch(error => {
        console.error('Error adding team member:', error);
    });
});


// Получить список всех услуг
async function getServices() {
    try {
        const response = await fetch('api/v1/SmartLex/Services');
        const services = await response.json();
        if (response.ok) {
            displayServices(services); // Отображаем услуги
        } else {
            console.error('Error fetching services:', services);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Отобразить список услуг в модальном окне
function displayServices(services) {
    const serviceListContainer = document.getElementById('service-list-container');
    serviceListContainer.innerHTML = ''; // Очищаем контейнер перед загрузкой

    services.forEach(service => {
        const serviceItem = document.createElement('div');
        serviceItem.classList.add('service-item');
        serviceItem.innerHTML = `
            <input type="text" value="${service.name}" disabled class="service-name" />
            <button class="delete-btn" onclick="deleteService(${service.serviceId})">Удалить</button>
        `;
        serviceListContainer.appendChild(serviceItem);
    });
}

// Удалить услугу
async function deleteService(serviceId) {
    try {
        const response = await fetch(`api/v1/SmartLex/AdMiNbAkYt1/deleteService/${serviceId}`, {
            method: 'DELETE', // Убедитесь, что сервер поддерживает DELETE метод
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();
        if (response.ok) {
            console.log('Service deleted:', data);
            // Получаем новый список услуг после удаления
            getServices(); // Эта функция должна перезагружать список услуг с сервера
        } else {
            console.error('Error deleting service:', data);
            alert('Ошибка при удалении услуги');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Открыть модальное окно для удаления услуги
document.getElementById('delete-service').addEventListener('click', () => {
    getServices(); // Загружаем список услуг при открытии окна
    document.getElementById('delete-service-modal').style.display = 'flex';
});

// Закрыть модальное окно
document.getElementById('close-delete-service-modal').addEventListener('click', () => {
    document.getElementById('delete-service-modal').style.display = 'none';
});

// Открыть модальное окно для удаления опыта
document.getElementById('delete-experience').addEventListener('click', () => {
    getExperiences(); // Загружаем список опыта при открытии окна
    document.getElementById('delete-experience-modal').style.display = 'flex';
});

// Закрыть модальное окно для удаления опыта
document.getElementById('close-delete-experience-modal').addEventListener('click', () => {
    document.getElementById('delete-experience-modal').style.display = 'none';
});

// Открыть модальное окно для удаления правовой информации
document.getElementById('delete-legal-info').addEventListener('click', () => {
    getLegalInfo(); // Загружаем список правовой информации при открытии окна
    document.getElementById('delete-legal-info-modal').style.display = 'flex';
});

// Закрыть модальное окно для удаления правовой информации
document.getElementById('close-delete-legal-info-modal').addEventListener('click', () => {
    document.getElementById('delete-legal-info-modal').style.display = 'none';
});

// Открыть модальное окно для удаления члена команды
document.getElementById('delete-team-member').addEventListener('click', () => {
    getTeamMembers(); // Загружаем список членов команды при открытии окна
    document.getElementById('delete-team-member-modal').style.display = 'flex';
});

// Закрыть модальное окно для удаления члена команды
document.getElementById('close-delete-team-member-modal').addEventListener('click', () => {
    document.getElementById('delete-team-member-modal').style.display = 'none';
});


// Получение данных для опыта с бэка
async function getExperiences() {
    try {
        const response = await fetch('api/v1/SmartLex/Experience/getAllExperience');
        const data = await response.json();
        const experienceListContainer = document.getElementById('experience-list-container');
        experienceListContainer.innerHTML = ''; // Очищаем контейнер перед добавлением новых данных

        data.forEach(experience => {
            const experienceItem = document.createElement('div');
            experienceItem.classList.add('experience-item');
            experienceItem.setAttribute('data-exp-id', experience.expId); // Добавляем ID в data атрибут
            console.log('Adding experience with ID:', experience.expid); // Логируем ID
            experienceItem.innerHTML = `
                <input type="text" value="${experience.name}" disabled class="experience-name" />
                <button class="delete-btn">Удалить</button>
            `;
            experienceListContainer.appendChild(experienceItem);
        });
    } catch (error) {
        console.error('Error fetching experiences:', error);
    }
}

// Получение данных для правовой информации с бэка
async function getLegalInfo() {
    try {
        const response = await fetch('api/v1/SmartLex/LegalInfo');
        const data = await response.json();
        const legalInfoListContainer = document.getElementById('legal-info-list-container');
        legalInfoListContainer.innerHTML = ''; // Очищаем контейнер перед добавлением новых данных

        data.forEach(info => {
            const infoItem = document.createElement('div');
            infoItem.classList.add('legal-info-item');
            infoItem.setAttribute('data-id', info.legalInfoId); // Добавляем id как атрибут
            infoItem.innerHTML = `
                <input type="text" value="${info.name}" disabled class="legal-info-name" />
                <button class="delete-btn" onclick="deleteLegalInfo(${info.legalInfoId})">Удалить</button>
            `;
            legalInfoListContainer.appendChild(infoItem);
        });
    } catch (error) {
        console.error('Error fetching legal information:', error);
    }
}

// Получение данных для членов команды с бэка
async function getTeamMembers() {
    try {
        const response = await fetch('api/v1/SmartLex/Team/getAllTeam');
        const data = await response.json();
        const teamMemberListContainer = document.getElementById('team-member-list-container');
        teamMemberListContainer.innerHTML = ''; // Очищаем контейнер перед добавлением новых данных

        data.forEach(member => {
            const memberItem = document.createElement('div');
            memberItem.classList.add('team-member-item');
            memberItem.setAttribute('data-id', member.teamId); // Добавляем id как атрибут
            memberItem.innerHTML = `
                <input type="text" value="${member.teamFio}" disabled class="team-member-name" />
                <button class="delete-btn" onclick="deleteTeamMember(${member.teamId})">Удалить</button>
            `;
            teamMemberListContainer.appendChild(memberItem);
        });
    } catch (error) {
        console.error('Error fetching team members:', error);
    }
}

//Удаление опыта
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#experience-list-container").addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-btn")) {
            const experienceItem = event.target.closest(".experience-item");
            if (experienceItem) {
                const expId = experienceItem.getAttribute("data-exp-id");
                deleteExperience(Number(expId)); // Преобразуем expId в число
            }
        }
    });
});

async function deleteExperience(expId) {
    if (!expId) {
        alert('Ошибка: ID опыта не указан');
        return;
    }

    console.log('Deleting experience with ID:', expId);

    const isConfirmed = confirm('Вы уверены, что хотите удалить этот опыт?');
    if (!isConfirmed) {
        return;
    }

    try {
        const response = await fetch(`api/v1/SmartLex/AdMiNbAkYt1/deleteExperience/${expId}`, {
            method: 'DELETE',
        });

        console.log('Response status:', response.status);

        if (response.ok) {
            alert('Опыт удалён');
            // Получаем сам элемент из DOM
            const experienceItem = document.querySelector(`.experience-item[data-exp-id="${expId}"]`);
            if (experienceItem) {
                experienceItem.remove(); // Удаляем элемент из DOM
            }
        } else {
            const errorData = await response.json();
            console.error('Error response:', errorData);
            alert(`Ошибка при удалении опыта: ${errorData.message || 'Неизвестная ошибка'}`);
        }
    } catch (error) {
        console.error('Error deleting experience:', error);
        alert('Произошла ошибка при удалении опыта. Проверьте консоль для подробностей.');
    }
}


// Удаление правовой информации
async function deleteLegalInfo(legalInfoId) {
    if (!legalInfoId) {
        alert('Ошибка: ID правовой информации не указан');
        return;
    }
    try {
        const response = await fetch(`api/v1/SmartLex/AdMiNbAkYt1/deleteLegalInfo/${legalInfoId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('Правовая информация удалена');
            // Удаляем элемент из DOM
            const legalInfoItem = document.querySelector(`.legal-info-item[data-id="${legalInfoId}"]`);
            if (legalInfoItem) {
                legalInfoItem.remove(); // Удаляем элемент
            }

            // Перезагружаем список
            getLegalInfo();
        } else {
            alert('Ошибка при удалении правовой информации');
        }
    } catch (error) {
        console.error('Error deleting legal information:', error);
    }
}

// Удаление члена команды
async function deleteTeamMember(teamId) {
    if (!teamId) {
        alert('Ошибка: ID члена команды не указан');
        return;
    }
    try {
        const response = await fetch(`api/v1/SmartLex/AdMiNbAkYt1/deleteTeamMember/${teamId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('Член команды удалён');
            // Удаляем элемент из DOM
            const teamMemberItem = document.querySelector(`.team-member-item[data-id="${teamId}"]`);
            if (teamMemberItem) {
                teamMemberItem.remove(); // Удаляем элемент
            }

            // Перезагружаем список членов команды
            getTeamMembers();
        } else {
            alert('Ошибка при удалении члена команды');
        }
    } catch (error) {
        console.error('Error deleting team member:', error);
    }
}
