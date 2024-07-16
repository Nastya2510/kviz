//Выбрали все кнопки, которые ведут назад и вперед
var btnNext = document.querySelectorAll('[data-nav="next"]')
var btnPrev = document.querySelectorAll('[data-nav="prev"]')

// Отсеживаем клик кнопок. Кнопка вперед
btnNext.forEach(function (button) {
    button.addEventListener("click", function () {
        // this ссылается на ту кнопку, по которой кликнули
        var thisCard = this.closest("[data-card]")
        var thisCardNumber = parseInt(thisCard.dataset.card)

        if (thisCard.dataset.validate == "novalidate") {
            navigate("next", thisCard)
            updateProgressBar("next", thisCardNumber)
        } else {
            // При движении вперед вопрос и ответ сохраняются в объект
            saveAnswer(thisCardNumber, gatherCardData(thisCardNumber))

            // Валидация на заполненность
            if (isFilled(thisCardNumber) && checkOnRequired(thisCardNumber)) {
                navigate("next", thisCard)
                updateProgressBar("next", thisCardNumber)
            } else {
                alert("Обязательно нужно ответить ! ")
            }
        }
    })
})

// Отсеживаем клик кнопок. Кнопка назад
btnPrev.forEach(function (button) {
    button.addEventListener("click", function () {
        // this ссылается на ту кнопку, по которой кликнули
        var thisCard = this.closest("[data-card]")
        var thisCardNumber = parseInt(thisCard.dataset.card)
        navigate("prev", thisCard)
        updateProgressBar("prev", thisCardNumber)
    })
})

function navigate(direction, thisCard) {
    var thisCardNumber = parseInt(thisCard.dataset.card)
    var nextCard

    if (direction == "next") {
        nextCard = thisCardNumber + 1
    } else if (direction == "prev") {
        nextCard = thisCardNumber - 1
    }

    // Добавление и удаление класса hidden
    thisCard.classList.add("hidden")
    document.querySelector(`[data-card="${nextCard}"]`).classList.remove("hidden")
}

// объект с ответами на все карточки
var answers = {
    2: null,
    3: null,
    4: null,
    5: null

}

// сбор данных с текущей карточки
function gatherCardData(number) {
    var question
    var result = []

    // находим карточку по номеру и data-атрибуту
    var currentCard = document.querySelector(`[data-card = "${number}"]`)

    // находим главный вопрос карточки
    question = currentCard.querySelector("[data-question]").innerHTML

    // найдем все заполненные значения
    // радиокнопки в пределах текущей карточки
    var radioValues = currentCard.querySelectorAll('[type="radio"]')
    radioValues.forEach(function (item) {
        // сбор значений радиокнопок
        if (item.checked) {
            result.push({
                name: item.name,
                value: item.value
            })
        }
    })

    // находим все чекбоксы
    var checkBoxValues = currentCard.querySelectorAll('[type="checkbox"]')
    checkBoxValues.forEach(function (item) {
        if (item.checked) {
            result.push({
                name: item.name,
                value: item.value
            })
        }
    })

    //находим все инпуты
    var inputValues = currentCard.querySelectorAll('[type="email"],[type="email"], [type="number"]')
    inputValues.forEach(function (item) {
        itemValue = item.value
        if (itemValue.trim() != "") {
            result.push({
                name: item.name,
                value: item.value
            })
        }
    })

    var data = {
        question: question,
        answer: result
    }

    return data

}

// Функция записи ответа в объект с ответами
function saveAnswer(number, data) {
    answers[number] = data
}

// Функция проверки заполненного ответа
// Обращается к объекту answers
function isFilled(number) {
    if (answers[number].answer.length > 0) {
        return true
    } else {
        return false
    }
}

// E-mail validation
function validateEmail(email) {
    var pattern = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i
    return pattern.test(email)
}

// Проверка на заполненность required чекбоксов и инпутов с e-mail
function checkOnRequired(number) {
    var currentCard = document.querySelector(`[data-card="${number}"]`)
    var requiredFields = currentCard.querySelectorAll("[required]");
    var isValidArray = []

    requiredFields.forEach(function (item) {
        if (item.type == "checkbox" && item.checked == false) {
            isValidArray.push(false)
        } else if (item.type == "email") {
            if (validateEmail(item.value)) {
                isValidArray.push(true)
            } else {
                isValidArray.push(false)
            }
        }
    })

    // По итогу проверяем массив с false
    if (isValidArray.indexOf(false) == -1) {
        return true
    } else {
        return false
    }

}

//Оформление радиокнопок. Подсветка рамки
document.querySelectorAll(".radio-group").forEach(function (item) {
    item.addEventListener("click", function (e) {
        //Проверяем клик внутри label
        var label = e.target.closest("label")
        if (label) {
            //Отменяем подсветку у всех
            label.closest(".radio-group").querySelectorAll("label").forEach(function (item) {
                item.classList.remove("radio-block--active");
            })
            //Добавляем подсветку
            label.classList.add("radio-block--active")
        }
    })
})

//Оформление чекбоксов
document.querySelectorAll('label.checkbox-block input[type="checkbox"]').forEach(function (item) {
    item.addEventListener('change', function () {
        if (item.checked) {
            item.closest("label").classList.add("checkbox-block--active")
        } else {
            item.closest("label").classList.remove("checkbox-block--active")
        }
    })
})

//Отображение прогресс бара
function updateProgressBar(direction, cardNumber) {
    var cardsTotalNumber = document.querySelectorAll("[data-card]").length

    //Проверка направления перемещения
    if (direction == "next") {
        cardNumber = cardNumber + 1
    } else if (direction == "prev") {
        cardNumber = cardNumber - 1
    }

    //Расчет процентов прогрес бара
    var progress = (cardNumber * 100) / cardsTotalNumber
    progress = progress.toFixed()


    var progressBar = document.querySelector(`[data-card="${cardNumber}"]`).querySelector(".progress")
    if (progressBar) {
        //Находим и изменяем прогресс бар в разметке (число с процентом)
        progressBar.querySelector(".progress__label strong").innerHTML = `${progress}%`
        //Изменение стиля прогресс бара
        progressBar.querySelector(".progress__line-bar").style = `width: ${progress}%`
    }

}



updateProgressBar()