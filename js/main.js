//Выбрали все кнопки, которые ведут назад и вперед
var btnNext = document.querySelectorAll('[data-nav="next"]')
var btnPrev = document.querySelectorAll('[data-nav="prev"]')

// Отсеживаем клик кнопок. Кнопка вперед
btnNext.forEach(function (button) {
    button.addEventListener("click", function () {
        // this ссылается на ту кнопку, по которой кликнули
        var thisCard = this.closest("[data-card]")


        if (thisCard.dataset.validate == "novalidate") {
            navigate("next", thisCard)
        } else {
            navigate("next", thisCard)
        }
    })
})

// Отсеживаем клик кнопок. Кнопка назад
btnPrev.forEach(function (button) {
    button.addEventListener("click", function () {
        // this ссылается на ту кнопку, по которой кликнули
        var thisCard = this.closest("[data-card]")
        navigate("prev", thisCard)
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

    var data = {
        question: question,
        answer: result
    }

    return data

}