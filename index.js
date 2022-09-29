const data = [

]

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

const AddButton = document.querySelector('.button1');

AddButton.addEventListener('click', handleAddDate);