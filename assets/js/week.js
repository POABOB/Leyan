{
    class Week {
        constructor(day) {
            this.currentDate = day ? day : new Date()
        }

        getCurrentWeek(now) {
            const day = now?now:this.currentDate
            var days = ["日", "一", "二", "三", "四", "五", "六"]
            var week = []
            var index = new Date(day).getDay()
            
            for (var i = 0; i < 7; i++) {
                var tmp = new Date(day)
                tmp.setDate(tmp.getDate() - index + i)
                week.push({ Date: tmp, Day: days[i] })
            }
            
            return week
        }

        nextWeek() {
            let tmp = new Date(this.currentDate)
            tmp.setDate(tmp.getDate() + 7)
            this.currentDate=tmp
            return this.getCurrentWeek()
        }

        previousWeek() {
            let tmp = new Date(this.currentDate)
            tmp.setDate(tmp.getDate() - 7)
            this.currentDate=tmp
            return this.getCurrentWeek()
        }
    }
    window.Week = Week
}