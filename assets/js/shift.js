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
                    let day = parseInt(item2.date.slice(-2)) - 1
                    console.log(day + 1, item.name)
                    $('.days > .currentMonth:eq('+day+') > .shift_content').append('<p>'+item.name+'</p>')
                }
              })
          })
      }
  }
  window.Shift = Shift
}
  