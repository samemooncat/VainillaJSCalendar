const actualYear = 2021
const locale = 'en'

const weekDays = [...Array(7).keys()]
const intlWeekDays = new Intl.DateTimeFormat(locale, { weekday: 'long' })
const months = [...Array(12).keys()]
const intl = new Intl.DateTimeFormat(locale, { month: 'long' })

const weekDaysNames = weekDays.map((weekDayIndex) => {
    const date = new Date(2021, 10, weekDayIndex + 1)
    const weekDayName = intlWeekDays.format(date)
    return weekDayName
})

const renderedWeekDays = weekDaysNames.map((weekDayName) => `<li class="day-name">${weekDayName}</li>`).join('')

const calendar = months.map((monthKey) => {
    const monthName = intl.format(new Date(2021, monthKey))
    const nextMonthIndex = monthKey + 1
    const daysOfMonth = new Date(2021, nextMonthIndex, 0).getDate()
    return { monthName, daysOfMonth, startsOn: 0 }
})

const html = calendar.map(({ daysOfMonth, monthName }) => {
    const title = `<h1>${monthName} ${actualYear}</h1>`
    const days = [...Array(daysOfMonth).keys()]
    const renderDays = days.map(day =>
        `<li>${day + 1}</li>`
    ).join('')

    return `${title}<ol>${renderedWeekDays} ${renderDays}</ol> `
}).join('')

document.querySelector('div').innerHTML = html