{
    class Shift {
        constructor(data, employee) {
            this.data = data
            this.employee = employee
            this._generateShiftByClass()
        }

      //生成排班
        _generateShiftByClass() {
            //先排置頂崗位的排班
            this.data.forEach(item => {
                //搜尋color
                const e = this.employee.find(d => parseInt(d.employee_id)  === parseInt(item.employee_id))
                item.data.forEach(item2 => {
                    if(item2.shift.time !== 0) {
                        if(item2.position.pin !== undefined && parseInt(item2.position.pin) === 1) {
                            let _class = ""
                            let day = parseInt(item2.date.slice(-2)) - 1
                            if(item2.shift.shift_name.indexOf("早") !== -1) {_class += " morning"}
                            if(item2.shift.shift_name.indexOf("午") !== -1) {_class += " afternoon"}
                            if(item2.shift.shift_name.indexOf("晚") !== -1) {_class += " night"}
                            if(item2.shift.shift_name.indexOf("全天") !== -1) {_class = " morning afternoon night"}
                            if(item2.shift.shift_name.indexOf("日常") !== -1) {_class += " morning  afternoon"}
                            $(`.days > .currentMonth:eq(${day}) > .shift_n`).append(
                                `
                                    <div class="shift_name">
                                        <span>${item2.position.name}</span>
                                    </div>    
                                `
                            )
                            if(_class === " morning night") {
                                //新增color
                                $(`.days > .currentMonth:eq(${day}) > .shift_content`).append(
                                    `
                                        <div class="employee${_class}">
                                            <div class="m" style="background-color: ${e.shift_table_color}">
                                                <span>${item.nickname}</span>
                                            </div>    
                                            <div class="n" style="background-color: ${e.shift_table_color}">
                                                <span>${item.nickname}</span>
                                            </div>
                                        </div>
                                    `
                                )
                            } else {
                                $(`.days > .currentMonth:eq(${day}) > .shift_content`).append(
                                    `
                                        <div class="employee${_class}" style="background-color: ${e.shift_table_color}">
                                            <span>${item.nickname}</span>
                                        </div>    
                                    `
                                )
                            }
                        }
                    }
                })
            })
            //後排非置頂崗位的排班
            this.data.forEach(item => {
                //搜尋color
                const e = this.employee.find(d => parseInt(d.employee_id)  === parseInt(item.employee_id))
                item.data.forEach(item2 => {
                    if(item2.shift.time !== 0) {
                        if(item2.position.pin === undefined || parseInt(item2.position.pin) === 0) {
                            let _class = ""
                            let day = parseInt(item2.date.slice(-2)) - 1
                            if(item2.shift.shift_name.indexOf("早") !== -1) {_class += " morning"}
                            if(item2.shift.shift_name.indexOf("午") !== -1) {_class += " afternoon"}
                            if(item2.shift.shift_name.indexOf("晚") !== -1) {_class += " night"}
                            if(item2.shift.shift_name.indexOf("全天") !== -1) {_class = " morning afternoon night"}
                            if(item2.shift.shift_name.indexOf("日常") !== -1) {_class += " morning  afternoon"}
                            $(`.days > .currentMonth:eq(${day}) > .shift_n`).append(
                                `
                                    <div class="shift_name">
                                        <span>${item2.position.name}</span>
                                    </div>    
                                `
                            )
                            if(_class === " morning night") {
                                //新增color
                                $(`.days > .currentMonth:eq(${day}) > .shift_content`).append(
                                    `
                                        <div class="employee${_class}">
                                            <div class="m" style="background-color: ${e.shift_table_color}">
                                                <span>${item.nickname}</span>
                                            </div>    
                                            <div class="n" style="background-color: ${e.shift_table_color}">
                                                <span>${item.nickname}</span>
                                            </div>
                                        </div>
                                    `
                                )
                            } else {
                                $(`.days > .currentMonth:eq(${day}) > .shift_content`).append(
                                    `
                                        <div class="employee${_class}" style="background-color: ${e.shift_table_color}">
                                            <span>${item.nickname}</span>
                                        </div>    
                                    `
                                )
                            }
                        }
                    }
                })
            })
        }
    }
    window.Shift = Shift
}
  