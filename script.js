const main = document.getElementById('main');
const nextContent = document.getElementById('next-content');
const additionalContent = document.getElementById('additional-content');

const mainArrow = document.querySelector('.main-content__arrow');
const nextArrow = document.querySelector('.next-content__arrow');

let currentClassIndex = 0;
let isNextPage = false;
let isAdditionalVisible = false;
let autoSlideInterval;
let isAutoSliding = false;

additionalContent.style.display = 'none';
nextContent.style.display = 'none';

// Функция плавного скролла
function smoothScroll(target) {
    window.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
}

// Функция переключения классов слайдов
function updateBackground() {
    const classes = ['main-1', 'main-2', 'main-3', 'main-4'];
    main.className = '';
    main.classList.add(classes[currentClassIndex]);
}

// Автопрокрутка слайдов на мобильных устройствах
function startAutoSliding() {
    if (window.innerWidth <= 530) {
        isAutoSliding = true;
        autoSlideInterval = setInterval(() => {
            currentClassIndex = (currentClassIndex + 1) % 4;
            updateBackground();
        }, 2000);
    }
}

function stopAutoSliding() {
    clearInterval(autoSlideInterval);
    isAutoSliding = false;
}

// Обработчик колесика мыши для ПК
window.addEventListener('wheel', function (event) {
    if (window.innerWidth > 530) { // Только для ПК
        if (event.deltaY > 0) {
            if (!isNextPage) {
                if (currentClassIndex < 3) {
                    event.preventDefault();
                    currentClassIndex++;
                    updateBackground();
                } else if (currentClassIndex === 3) {
                    event.preventDefault();
                    isNextPage = true;
                    nextContent.style.display = 'block';
                    smoothScroll(nextContent);
                }
            } else if (!isAdditionalVisible && window.scrollY + window.innerHeight >= document.body.scrollHeight - 50) {
                event.preventDefault();
                additionalContent.style.display = 'block';
                smoothScroll(additionalContent);
                isAdditionalVisible = true;
            }
        } else if (event.deltaY < 0) {
            if (isAdditionalVisible && window.scrollY <= additionalContent.offsetTop + 50) {
                event.preventDefault();
                isAdditionalVisible = false;
                smoothScroll(nextContent);
                setTimeout(() => { additionalContent.style.display = 'none'; }, 500);
            } else if (isNextPage && window.scrollY <= nextContent.offsetTop + 50) {
                event.preventDefault();
                isNextPage = false;
                smoothScroll(main);
                setTimeout(() => { nextContent.style.display = 'none'; }, 500);
            } else if (!isNextPage && currentClassIndex > 0) {
                event.preventDefault();
                currentClassIndex--;
                updateBackground();
            }
        }
    }
}, { passive: false });

// Включение обычной прокрутки на мобильных устройствах
let startY = 0;

window.addEventListener('touchstart', function (event) {
    if (window.innerWidth <= 530) {
        startY = event.touches[0].clientY;
    }
}, { passive: true });


window.addEventListener('touchmove', function (event) {
    if (window.innerWidth > 530) return;

    let currentY = event.touches[0].clientY;
    let deltaY = startY - currentY;

    if (deltaY > 30) { // Скролл вниз
        if (!isNextPage) {
            isNextPage = true;
            nextContent.style.display = 'block';
            smoothScroll(nextContent);
            event.preventDefault(); // Блокируем только при переходе к следующему контенту
        } else if (!isAdditionalVisible && window.scrollY + window.innerHeight >= nextContent.offsetTop + nextContent.offsetHeight - 50) {
            additionalContent.style.display = 'block';
            smoothScroll(additionalContent);
            isAdditionalVisible = true;
            event.preventDefault(); // Блокируем только при переходе к дополнительному контенту
        }
    } else if (deltaY < -30) { // Скролл вверх
        if (isAdditionalVisible && window.scrollY <= additionalContent.offsetTop + 50) {
            isAdditionalVisible = false;
            smoothScroll(nextContent);
            setTimeout(() => { additionalContent.style.display = 'none'; }, 500);
            event.preventDefault();
        } else if (isNextPage && window.scrollY <= nextContent.offsetTop + 50) {
            isNextPage = false;
            smoothScroll(main);
            setTimeout(() => { nextContent.style.display = 'none'; }, 500);
            event.preventDefault();
        }
    }
}, { passive: false });


// Плавный переход по клику на стрелку
mainArrow.addEventListener('click', function () {
    stopAutoSliding();
    isNextPage = true;
    nextContent.style.display = 'block';
    smoothScroll(nextContent);
});

nextArrow.addEventListener('click', function () {
    stopAutoSliding();
    if (!isAdditionalVisible) {
        additionalContent.style.display = 'block';
        smoothScroll(additionalContent);
        isAdditionalVisible = true;
    }
});

// Бесконечная прокрутка текста

var text = '다른 <span class="text-blue">400,000</span>명의 플레이어와 함께 플레이하세요';
var repeatCount = 7;
var marquee = document.getElementById("marquee");

marquee.innerHTML = "";
for (var i = 0; i < repeatCount * 2; i++) {
    var span = document.createElement("span");
    span.className = "marquee-text";
    span.innerHTML = text;
    marquee.appendChild(span);
}

// Форма
const form = document.getElementById("form");

form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.reset();
});

window.addEventListener('load', startAutoSliding);
window.addEventListener('blur', stopAutoSliding);