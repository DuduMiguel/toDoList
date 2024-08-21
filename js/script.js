const toDoForm = document.querySelector('#toDo-form')
const toDoList = document.querySelector('#toDo-list')
const editForm = document.querySelector('#edit-form')
const editInput = document.querySelector('#edit-input')
const toolBar = document.querySelector('#toolbar')
const cancelEditBtn = document.querySelector('#cancel-edit-btn')
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')
const eraseButton = document.querySelector('#erase-button')
const filterSelect = document.querySelector('#filter-select')

let oldInputValue

const saveToDo = (texto) => {

    const divtoDo = document.createElement('div')
    divtoDo.className = 'toDo'

    const p = document.createElement('p')
    const toDo = document.createTextNode(texto)

    const ButtonFinish = document.createElement('button')
    const ButtonEdit = document.createElement('button')
    const ButtonRemove = document.createElement('button')
    ButtonFinish.className = 'finish-toDo'
    ButtonEdit.className = 'edit-toDo'
    ButtonRemove.className = 'remove-toDo'

    const i_finish = document.createElement('i')
    const i_edit = document.createElement('i')
    const i_remove = document.createElement('i')
    i_finish.className = 'fa-solid fa-check'
    i_edit.className = 'fa-solid fa-pen'
    i_remove.className = 'fa-solid fa-xmark'

    toDoList.appendChild(divtoDo)
    divtoDo.appendChild(p)
    divtoDo.appendChild(ButtonFinish)
    divtoDo.appendChild(ButtonEdit)
    divtoDo.appendChild(ButtonRemove)
    p.appendChild(toDo)
    ButtonFinish.appendChild(i_finish)
    ButtonEdit.appendChild(i_edit)
    ButtonRemove.appendChild(i_remove)



    toDoForm.reset()
    toDoForm.tarefa.focus()
}

const toggleForms = () => {
    toDoForm.classList.toggle('hide')
    toDoList.classList.toggle('hide')
    editForm.classList.toggle('hide')

    if (!editForm.classList.contains('hide')) {
        toolBar.style.display = 'none';
    } else {
        toolBar.style.display = 'flex';
    }

}

const uptadeToDo = (editInputValue) => {

    const toDos = document.querySelectorAll('.toDo')

    toDos.forEach((toDo) => {
        let toDoTitle = toDo.querySelector('p')

        if (toDoTitle.innerText === oldInputValue) {
            toDoTitle.innerText = editInputValue
            return
        }
    });
}

toDoForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const tarefa = toDoForm.tarefa.value

    if (tarefa) {
        saveToDo(tarefa)
    }

    console.log(tarefa)
})

document.addEventListener('click', (e) => {

    const targetEl = e.target
    const parentEl = targetEl.closest('div')
    let toDoTitle

    if (parentEl && parentEl.querySelector('p')) {
        toDoTitle = parentEl.querySelector('p').innerText
    }

    if (targetEl.classList.contains('finish-toDo')) {
        parentEl.classList.toggle('done')
    }

    if (targetEl.classList.contains('edit-toDo')) {
        toggleForms()

        editInput.value = toDoTitle
        oldInputValue = toDoTitle
    }

    if (targetEl.classList.contains('remove-toDo')) {
        parentEl.remove()
    }

})

cancelEditBtn.addEventListener('click', (e) => {
    e.preventDefault()
    toggleForms()
})

editForm.addEventListener('submit', (e) => {

    e.preventDefault()
    editInput.focus()
    const editInputValue = editInput.value


    if (editInputValue) {
        uptadeToDo(editInputValue)
    }

    toggleForms()
})

document.addEventListener('DOMContentLoaded', () => {

    const toDoList = document.querySelectorAll('.toDo');

    searchInput.addEventListener('input', () => {
        const search = searchInput.value.toLowerCase();

        toDoList.forEach((toDo) => {
            const p = toDo.querySelector('p');
            if (p) {
                const task = p.innerText.toLowerCase();
                if (!task.includes(search)) {
                    toDo.style.display = 'none';
                } else {
                    toDo.style.display = '';
                }
            }
        });
    });

    eraseButton.addEventListener('click', (e) => {
        e.preventDefault()
        searchInput.value = ''

        for (const toDo of toDoList) {
            toDo.style.display = ''
        }
    })

});

filterSelect.addEventListener('change', (e) => {

    const filterValue = e.target.value
    const toDos = document.querySelectorAll('.toDo')

    toDos.forEach((toDo) => {
        if (filterValue === 'all') {
            toDo.style.display = ''
        } else if (filterValue === 'done') {
            if (!toDo.classList.contains('done')) {
                toDo.style.display = 'none'
            } else {
                toDo.style.display = ''
            }
        } else if (filterValue === 'toDo') {
            if (toDo.classList.contains('done')) {
                toDo.style.display = 'none'
            } else {
                toDo.style.display = ''
            }
        }
    })
})

