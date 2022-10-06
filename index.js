const addButton = document.querySelector('.button1');
const deleteButton = document.querySelector('.button4');
const rowHeads = document.querySelectorAll('.wrapper-table th');
const inputFilter = document.querySelector('.button3');

let data = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : [];
let checkedIds = [];
let sortDirection = 1;

const renderTable = (tableData) => {
    const tableBody = document.querySelector('.wrapper-table tbody');
    tableBody.innerHTML = '';

    tableData.forEach(item => {
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
            if (e.target.checked) {
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

if(data.length){
    renderTable(data);
};

const handleAddDate = () => {
    const inputCollection = document.querySelectorAll(".wrapper-input > input");
    const newData = {};
    newData.id = data.length + 1;

    for (let i = 0; i < inputCollection.length; i++) {
        newData[inputCollection[i].name] = inputCollection[i].value;
    }

    data.push(newData);

    renderTable(data);

    localStorage.setItem('data', JSON.stringify(data));
}

addButton.addEventListener('click', handleAddDate);

deleteButton.addEventListener('click', () => {
    data = data.filter(el => !checkedIds.includes(el.id));
    checkedIds = [];

    renderTable(data);
})

rowHeads.forEach(el => el.addEventListener('click', () => {
    data.sort((a, b) => {
        if (a[el.textContent] > b[el.textContent]) {
            return -1 * sortDirection;
        } else if (a[el.textContent] < b[el.textContent]) {
            return 1 * sortDirection;
        } else {
            return 0;
        }
    })

    sortDirection = sortDirection === 1 ? -1 : 1;

    renderTable(data);
}));

const handleFindData = (e) => {
    renderTable(data.filter(el => {
        for (let field in el) {
            if (typeof el[field] === 'string') {
                if (el[field].includes(e.target.value)) {
                    return true;
                }
            }
        }
    }));
}

inputFilter.addEventListener('input', handleFindData);