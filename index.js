const addButton = document.querySelector('.button1');
const deleteButton = document.querySelector('.button4');
const rowHeads = document.querySelectorAll('.wrapper-table th');

let data = [];
let checkedIds = [];

let sortDirection = 1;

const renderTable = () => {
    const tableBody = document.querySelector('.wrapper-table tbody');
    tableBody.innerHTML = '';

    data.forEach(item => {
        const tr = document.createElement('tr');
        for (let field in item) { // толкь ключ
            const td = document.createElement('td');
            td.textContent = item[field];
            tr.append(td);
        }
        const checkTd = document.createElement('td')
        const checkInput = document.createElement('input')
        checkInput.setAttribute('type', 'checkbox')
        checkInput.addEventListener('change', (e) => {
            if(e.target.checked){
                checkedIds.push(item.id);
            } else {
                checkedIds = checkedIds.filter(id => id !== item.id);
            }

            console.log(checkedIds);
        })
        checkTd.append(checkInput)
        tr.append(checkTd);
        tableBody.append(tr);
    })
}

const handleAddDate = () => {
    const inputCollection = document.querySelectorAll(".wrapper-input > input");
    const newData = {};
    newData.id = data.length + 1;

    for (let i = 0; i < inputCollection.length; i++) {
        newData[inputCollection[i].name] = inputCollection[i].value;
    }
    console.log(newData);

    data.push(newData);
    renderTable();
}

addButton.addEventListener('click', handleAddDate);

deleteButton.addEventListener('click', ()=>{
    data = data.filter(el => !checkedIds.includes(el.id));
    checkedIds = [];
    renderTable();
})

rowHeads.forEach(el => el.addEventListener('click', ()=>{
    data.sort((a,b)=>{
        if(a[el.textContent] > b[el.textContent]){
            return -1 * sortDirection;
        }else if ( a[el.textContent] < b[el.textContent]) {
            return 1 * sortDirection;
        } else {
            return 0;
        }
    })

    sortDirection = sortDirection === 1 ? -1 : 1;

    renderTable();
}));