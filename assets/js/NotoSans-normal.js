﻿(function (jsPDFAPI) {
var callAddFont = function () {
this.addFileToVFS("NotoSans-normal.ttf", font);
this.addFont("NotoSans-normal.ttf", "NotoSans", "normal");
};
jsPDFAPI.events.push(['addFonts', callAddFont])
 })(jsPDF.API);