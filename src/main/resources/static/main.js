document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section, .about-container, .services-container');
  const offset = 150;

  function updateActiveLink() {
      let currentActive = null;

      sections.forEach(section => {
          const sectionTop = section.offsetTop - offset;
          const sectionHeight = section.clientHeight;

          if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
              currentActive = section.getAttribute('id');
          }
      });

      // Проверяем, если в самом верху — активна только "Главная"
      if (window.scrollY < 2000) {
          currentActive = "main";
      }

      links.forEach(link => {
          link.classList.remove('active');
          if (currentActive && link.getAttribute('href').endsWith(`#${currentActive}`)) {
              link.classList.add('active');
          }
      });
  }

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink();
});



document.addEventListener('DOMContentLoaded', () => {
  fetchServices();  // Вызов функции для загрузки услуг при загрузке страницы
});

// Функция для загрузки услуг
async function fetchServices() {
  try {
      const response = await fetch('api/v1/SmartLex/Services'); // Ваш API
      const data = await response.json(); // Получаем данные в формате JSON
      
      const servicesContainer = document.querySelector('.services-list'); // Контейнер для услуг
      servicesContainer.innerHTML = ''; // Очищаем контейнер перед загрузкой новых данных

      // Динамически добавляем услуги
      data.forEach(service => {
          const serviceItem = document.createElement('div');
          serviceItem.classList.add('service-item');
          serviceItem.innerHTML = service.name; // Изменяем, чтобы отображать название услуги
          servicesContainer.appendChild(serviceItem);
      });
  } catch (error) {
      console.error('Ошибка загрузки услуг:', error);
  }
}

//animation
// Функция для активации анимации при достижении элемента
function animateOnScroll(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Активируем анимацию, добавляя классы
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('logo-container')) {
                entry.target.classList.add('visible-logo');
            }
            if (entry.target.classList.contains('about-image')) {
                entry.target.classList.add('visible-image');
            }
            if (entry.target.classList.contains('about-description')) {
                entry.target.classList.add('visible-description');
            }
            if (entry.target.classList.contains('about-content')) {
                entry.target.classList.add('visible-content');
            }
            observer.unobserve(entry.target); // Останавливаем отслеживание после активации
        }
    });
}

// Создаем новый observer
const observer = new IntersectionObserver(animateOnScroll, {
    threshold: 0.5 // 50% элемента должно быть видно
});

// Все элементы, для которых будем отслеживать появление
const elementsToAnimate = document.querySelectorAll('.about-container, .logo-container, .about-text, .about-content, .about-image, .about-description');

// Наблюдаем за этими элементами
elementsToAnimate.forEach(element => {
    observer.observe(element);
});

//для бургера
document.addEventListener('DOMContentLoaded', function () {
    const burger = document.querySelector('.burger-menu');
    const nav = document.querySelector('nav ul');

    burger.addEventListener('click', function () {
        nav.classList.toggle('active');
    });
});

