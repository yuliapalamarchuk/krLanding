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
        }, 2500);
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

window.addEventListener('load', () => {
    startAutoSliding();
});
window.addEventListener('blur', stopAutoSliding);

