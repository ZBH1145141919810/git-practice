let bookList = JSON.parse(localStorage.getItem('books')) || [];
const bookListEl = document.querySelector('#bookList');
const formTitle = document.querySelector('#formTitle');
const editIdEl = document.querySelector('#editId');
const nameEl = document.querySelector('#bookName');
const authorEl = document.querySelector('#bookAuthor');
const scoreEl = document.querySelector('#bookScore');
const errTip = document.querySelector('#errTip');
const submitBtn = document.querySelector('#submitBtn');
const searchInput = document.querySelector('#searchInput')
function saveData() {
    localStorage.setItem('books', JSON.stringify(bookList));
}

function render(list) {
    let html = '';
    list.forEach((item, index) => {
        html += `
        <div class="card p-3 mb-2" data-index="${index}">
            <h5>${item.name}</h5>
            <p>作者：${item.author}</p>
            <p>评分：${item.score}</p>
            <button class="btn btn-sm btn-warning edit-btn">编辑</button>
            <button class="btn btn-sm btn-danger del-btn">删除</button>
        </div>`;
    });
    bookListEl.innerHTML = html;
}

render(bookList);
searchInput.addEventListener('input', () => {
    const keyword = searchInput.value.trim().toLowerCase();
    const filterData = bookList.filter(item => item.name.toLowerCase().includes(keyword));
    render(filterData);
});
submitBtn.addEventListener('click', () => {
    errTip.textContent = '';
    const name = nameEl.value.trim();
    const author = authorEl.value.trim();
    const score = Number(scoreEl.value);
    const editIndex = editIdEl.value;
    if (!name) {
        errTip.textContent = '错误：书名不能为空！';
        return;
    }
    if (!author) {
        errTip.textContent = '错误：作者不能为空！';
        return;
    }
    if(isNaN(score) || score <0 || score>10){
        errTip.textContent = '错误：评分必须是0~10之间数字';
        return;
    }

    if(editIndex !== ""){
        bookList[editIndex] = {name, author, score};
    }else{
        bookList.push({name, author, score});
    }
    saveData();
    render(bookList);
    resetForm();
});

function resetForm(){
    formTitle.textContent = "新增图书";
    editIdEl.value = "";
    nameEl.value = "";
    authorEl.value = "";
    scoreEl.value = "";
}

bookListEl.addEventListener('click', (e)=>{
    const card = e.target.closest('.card');
    if(!card) return;
    const idx = Number(card.dataset.index);

    if(e.target.classList.contains('del-btn')){
        bookList.splice(idx,1);
        saveData();
        render(bookList);
    }
    if(e.target.classList.contains('edit-btn')){
        const item = bookList[idx];
        formTitle.textContent = "编辑图书";
        editIdEl.value = idx;
        nameEl.value = item.name;
        authorEl.value = item.author;
        scoreEl.value = item.score;
    }
});