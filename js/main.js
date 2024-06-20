//Выбрали все кнопки, которые ведут назад и вперед
var btnNext = document.querySelectorAll('[data-nav="next"]')
var btnPrev = document.querySelectorAll('[data-nav="prev"]')

// Отсеживаем клик кнопок. Кнопка вперед
btnNext.forEach(function (button) {
    button.addEventListener("click", function () {
        // this ссылается на ту кнопку, по которой кликнули
        var thisCard = this.closest("[data-card]")
        var thisCardNumber = parseInt(thisCard.dataset.card)
        var nextCard = thisCardNumber + 1

        // Добавление и удаление класса hidden
        thisCard.classList.add("hidden")
        document.querySelector(`[data-card="${nextCard}"]`).classList.remove("hidden")
    })
})

// Отсеживаем клик кнопок. Кнопка назад
btnPrev.forEach(function (button) {
    button.addEventListener("click", function () {
        // this ссылается на ту кнопку, по которой кликнули
        var thisCard = this.closest("[data-card]")
        var thisCardNumber = parseInt(thisCard.dataset.card)
        var nextCard = thisCardNumber - 1

        // Добавление и удаление класса hidden
        thisCard.classList.add("hidden")
        document.querySelector(`[data-card="${nextCard}"]`).classList.remove("hidden")
    })
})