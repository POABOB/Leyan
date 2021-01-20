{
function getPagination(table, max) {
	const T = table.slice(1,)
    let lastPage = 1;
    const ul = document.querySelector(`.pagination.${T}`);
    const li = document.querySelectorAll(`.pagination.${T} li`);
    for(let i = 0;i < li.length;i++) {
        li[i].remove();
    }
    let trnum = 0; // reset tr counter
    let maxRows = max;
    // numbers of rows
    const totalRows = document.querySelectorAll(`${table} tbody tr`).length;
    if (totalRows > maxRows) {  // if tr total rows gt max rows option
        const pagenum = Math.ceil(totalRows / maxRows); // ceil total(rows/maxrows) to get ..
        //	numbers of pages
        ul.insertAdjacentHTML('beforeend',`<li data-page="prev" class="page-item"><span class="page-link"> < <span class="sr-only">(current)</span></span</li>`);
        for (let i = 1; i <= pagenum; i++) { // for each page append pagination li
            if(i == 1) {
                ul.insertAdjacentHTML('beforeend',`<li data-page="${i}" class="page-item active">\n<span class="page-link">${i}<span class="sr-only">(current)</span></span>\n</li>`);
            } else {
                ul.insertAdjacentHTML('beforeend',`<li data-page="${i}" class="page-item">\n<span class="page-link">${i}<span class="sr-only">(current)</span></span>\n</li>`);
            }
        }
        ul.insertAdjacentHTML('beforeend',`<li data-page="next" id="prev" class="page-item"><span class="page-link"> > <span class="sr-only">(current)</span></span></li>`);
        ul.style.display = '';
    }else{
        ul.style.display = 'none';
    }

    //一開始就顯示第一頁
    var trIndex = 0;
    limitPagging(T);
    const tr = document.querySelectorAll(`${table} tbody tr`);
    for (let i = 0; i < tr.length; i++) {
        trIndex++; 
        // if tr index gt maxRows*pageNum or lt maxRows*pageNum-maxRows fade if out
        if (
            trIndex > maxRows * 1 ||
            trIndex <= maxRows * 1 - maxRows
        ) {
            tr[i].style.display = 'none';
        } else {
            tr[i].style.display = '';
        }
    }

    document.querySelectorAll(`.pagination.${T} li`).forEach(item => {
        item.addEventListener("click", function(evt) {
            // on click each page
            evt.stopImmediatePropagation();
            evt.preventDefault();
            var pageNum = item.dataset.page; // get it's number
            var lastPage = parseInt(document.querySelector('li.page-item.active').dataset.page); 

            if (pageNum == 'prev') {
                if (lastPage == 1) {
                    return 0
                }
                pageNum = --lastPage;
            }
            if (pageNum == 'next') {
                if (lastPage == document.querySelectorAll(`.pagination.${T} li`).length - 2) {
                    return 0
                }
                pageNum = ++lastPage;
            }
            
            document.querySelectorAll(`.pagination.${T} li`).forEach(p => {
                p.classList.remove('active');
            })
            lastPage = pageNum;
            document.querySelector(`.pagination.${T} li[data-page="${lastPage}"]`).classList.add('active');

            var trIndex = 0;
            limitPagging(T);
            for (let i = 0; i < tr.length; i++) {
                trIndex++; 
                if (
                    trIndex > maxRows * pageNum ||
                    trIndex <= maxRows * pageNum - maxRows
                ) {
                    tr[i].style.display = 'none';
                } else {
                    tr[i].style.display = '';
                }
            }
        });
    });
}

function limitPagging(T){
    const li = document.querySelectorAll(`.pagination.${T} li`);
    if(li.length > 7 ){
        if(parseInt(document.querySelector(`.pagination.${T} li.page-item.active`).dataset.page) <= 3 ){
            for (let i = li.length; i > 6; i--) {
                document.querySelector(`.pagination.${T} li:nth-child(${i})`).style.display = 'none';
            }
            for (let i = 1; i < 6; i++) {
                document.querySelector(`.pagination.${T} li:nth-child(${i})`).style.display = '';
            }
            document.querySelector(`.pagination.${T} li[data-page="next"]`).style.display = '';
        }else{
            for (let i = 2; i < li.length; i++) {
                document.querySelector(`.pagination.${T} li:nth-child(${i})`).style.display = 'none';
            }
            
            document.querySelector(`.pagination.${T} li[data-page="next"]`).style.display = '';
            for(let i = (parseInt(document.querySelector(`.pagination.${T} li.page-item.active`).dataset.page) - 2)  ; i <= (parseInt(document.querySelector(`.pagination.${T} li.page-item.active`).dataset.page) + 2) ; i++ ){
                if(document.querySelector(`.pagination.${T} li[data-page="${i}"]`)) {
                    document.querySelector(`.pagination.${T} li[data-page="${i}"]`).style.display = '';
                }
            }
        }
    }else{
        return 0
    }
}
}