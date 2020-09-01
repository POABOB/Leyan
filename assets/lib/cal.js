{
  class Calendar {
    constructor(options, inputDate = false) {
      let defaultOptions = {
        element: null,
        startOfWeek: 0, // 1 or 0
        strings: {
          weekdays: n => {
            let map = { 0: '星期日', 1: '星期一', 2: '星期二', 3: '星期三', 4: '星期四', 5: '星期五', 6: '星期六' }
            return map[n]
          },
          days: n => `${n}`,
          dayTemplate: `
            <li>
              <span class="dayLabel">
                <span class="day"></span><span class="unit"></span>
              </span>
              <div class="shift"><span class="shift_type">早</span><span class="shift_type">午</span><span class="shift_type">晚</span></div>
              <div class="shift_n"></div>
              <div class="shift_content"></div>
            </li>
          `,
          output: d => `${d.getFullYear()}年${d.getMonth() + 1}月`,
        },
      }

      this.options = Object.assign({}, defaultOptions, options)
      if(inputDate == false){
        this.currentDate = new Date()
      } else {
        this.currentDate = new Date(inputDate)
      }
      
      this._checkOptions()
      this._generateCalendar()
    }
    nextMonth() {
      this.currentDate = new Date2(this.currentDate).nextMonth.date
      this._generateCalendar()
    }
    previousMonth() {
      this.currentDate = new Date2(this.currentDate).previousMonth.date
      this._generateCalendar()
    }
    resetMonth() {
      this.currentDate = new Date()
      this._generateCalendar()
    }
    _checkOptions() {
      if (!this.options.element) {
        throw new Error('element is required')
      }
      return this
    }
    _generateWeekdays() {
      let { startOfWeek, strings } = this.options
      let items = createArray({ length: 7, fill: startOfWeek }).map((day, i) => {
        let n = day + i >= 7 ? day + i - 7 : day + i
        let text = strings.weekdays(n)
        let li = dom.create(`<li>${text}</li>`)
        if ([0, 6].indexOf(n) >= 0) {
          li.classList.add('weekend')
        }
        return li
      })
      return dom.create(`<ol class="weekdays"></ol>`, items)
    }
    _generateCurrentMonth() {
      let current = new Date2(this.currentDate)
      let dayCount = current.monthEnding.day()
      let convert = this.options.strings.days
      return createArray({ length: dayCount }).map((_, i) => {
        let date2 = current.day(i + 1)
        let li = dom.create(this.options.strings.dayTemplate)
        li.className = 'currentMonth'
        if (date2.isSameDayAs(new Date())) {
          li.classList.add('today')
        }
        if ([0, 6].indexOf(date2.weekday()) >= 0) {
          li.classList.add('weekend')
        }
        li.querySelector('.day').textContent = convert(i + 1)
        return li
      })
    }
    _generatePreviousMonth() {
      let { startOfWeek } = this.options
      let date2 = new Date2(this.currentDate)
      let monthBeginning = date2.monthBeginning
      let startPadding = monthBeginning.weekday() >= startOfWeek
        ? monthBeginning.weekday() - startOfWeek
        : monthBeginning.weekday() + 7 - startOfWeek
      let convert = this.options.strings.days
      return createArray({ length: startPadding })
        .map((_, i) => {
          let li = dom.create(this.options.strings.dayTemplate)
          li.className = 'previousMonth'
          if ([0, 6].indexOf(date2.day(-i).weekday()) >= 0) {
            li.classList.add('weekend')
          }
          li.querySelector('.day').textContent = convert(date2.day(-i).day())
          return li
        })
        .reverse()
    }
    _generateNextMonth() {
      let { startOfWeek } = this.options
      let date2 = new Date2(this.currentDate)
      let monthEnding = date2.monthEnding
      let endPadding = monthEnding.weekday() >= startOfWeek
        ? 7 - (monthEnding.weekday() - startOfWeek + 1)
        : 7 - (monthEnding.weekday() + 7 - startOfWeek + 1)
      let convert = this.options.strings.days

      return createArray({ length: endPadding }).map((_, i) => {
        let li = dom.create(this.options.strings.dayTemplate)
        li.className = 'nextMonth'
        let data2 = new Date2(this.currentDate)
        if ([0, 6].indexOf(date2.nextMonth.day(i + 1).weekday()) >= 0) {
          li.classList.add('weekend')
        }
        li.querySelector('.day').textContent = convert(i + 1)
        return li
      })
    }
    _generateDays() {
      let { startOfWeek } = this.options
      let date2 = new Date2(this.currentDate)
      let monthBeginning = date2.monthBeginning
      let monthEnding = date2.monthEnding

      let days = this._generateCurrentMonth()
      days = this._generatePreviousMonth().concat(days)
      days = days.concat(this._generateNextMonth())
      return dom.create(`<ol class=days></ol>`, days)
    }
    _generateCalendar() {
      let { element } = this.options
      dom.removeChildren(element)
      dom.append(element, this._generateWeekdays())
      dom.append(element, this._generateDays())
      this.options.output.textContent = this.options.strings.output(this.currentDate)
      return this
    }
  }

  window.Calendar = Calendar
  
  function createArray({ length, fill }) {
    let array = Array.apply(null, { length: length })
    if (fill !== undefined) {
      array = array.map(() => fill)
    }
    return array
  }
}
