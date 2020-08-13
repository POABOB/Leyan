{
    class Shift {
      constructor(data) {
        this.data = data
        this._generateShiftByClass()
      }

      //生成排班
      _generateShiftByClass() {
          this.data.forEach(item => {
              item.data.forEach(item2 => {
                if(item2.shift.time !== 0) {
                    let _class = ""
                    let day = parseInt(item2.date.slice(-2)) - 1
                    if(item2.shift.shift_name.indexOf("早") !== -1) {_class += " morning"}
                    if(item2.shift.shift_name.indexOf("午") !== -1) {_class += " afternoon"}
                    if(item2.shift.shift_name.indexOf("晚") !== -1) {_class += " night"}
                    if(item2.shift.shift_name.indexOf("全天") !== -1) {_class = " morning afternoon night"}

                    $(`.days > .currentMonth:eq(${day}) > .shift_n`).append(
                        `
                            <div class="shift_name">
                                <span>${item2.position.name}</span>
                            </div>    
                        `
                    )
                    if(_class === " morning night") {
                        console.log(1)
                        $(`.days > .currentMonth:eq(${day}) > .shift_content`).append(
                            `
                                <div class="employee${_class}">
                                    <div class="m">
                                        <span>${item.nickname}</span>
                                    </div>    
                                    <div class="n">
                                        <span>${item.nickname}</span>
                                    </div>
                                </div>
                            `
                        )
                    } else {
                        $(`.days > .currentMonth:eq(${day}) > .shift_content`).append(
                            `
                                <div class="employee${_class}">
                                    <span>${item.nickname}</span>
                                </div>    
                            `
                        )
                    }
                }
              })
          })
      }
  }
  window.Shift = Shift
}
  