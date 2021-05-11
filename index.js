const actualYear = 2021
const locale = 'ko'

const weekDays = [...Array(7).keys()]
const months = [...Array(12).keys()]
const intlWeekDays = new Intl.DateTimeFormat(locale, { weekday: 'long' })
const intl = new Intl.DateTimeFormat(locale, { month: 'long' })

const weekDaysNames = weekDays.map((weekDayIndex) => {
    const date = new Date(actualYear, 10, weekDayIndex + 1)
    const weekDayName = intlWeekDays.format(date)
    return weekDayName
})

const renderedWeekDays = weekDaysNames.map((weekDayName) => `<li class="day-name">${weekDayName}</li>`).join('')

const calendar = months.map((monthKey) => {
    const monthName = intl.format(new Date(actualYear, monthKey))
    const nextMonthIndex = monthKey + 1
    const daysOfMonth = new Date(actualYear, nextMonthIndex, 0).getDate()
    const startsOn = new Date(actualYear, monthKey, 1).getDay()
    return { monthName, daysOfMonth, startsOn }
})

const html = calendar.map(({ daysOfMonth, monthName, startsOn }) => {
    const title = `<h1>${monthName} ${actualYear}</h1>`
    const days = [...Array(daysOfMonth).keys()]
    const firstDayAttribute = `class='first-day' style='--first-day-start: ${startsOn}'`
    const renderDays = days.map((day, index) =>
        `<li ${index === 0 ? firstDayAttribute : ''}>${day + 1}</li>`
    ).join('')

    return `${title}<ol>${renderedWeekDays}${renderDays}</ol> `
}).join('')

document.querySelector('div').innerHTML = html