const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const filterButtons = document.querySelectorAll('.filter-btn');

let tasks = [];

// Add task
addBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (text !== '') {
    tasks.push({ text, completed: false });
    taskInput.value = '';
    renderTasks();
  }
});

// Render tasks with filter
function renderTasks(filter = 'all') {
  taskList.innerHTML = '';

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  filteredTasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.classList.toggle('completed', task.completed);

    const span = document.createElement('span');
    span.textContent = task.text;

    // ✅ Complete / Undo Button
    const completeBtn = document.createElement('button');
    completeBtn.textContent = task.completed ? '↩️' : '✅';
    completeBtn.title = task.completed ? 'Undo' : 'Mark Complete';
    completeBtn.addEventListener('click', () => {
      tasks[index].completed = !task.completed;
      renderTasks(filter);
    });

    // ✏️ Edit Button
    const editBtn = document.createElement('button');
    editBtn.textContent = '✏️';
    editBtn.title = 'Edit';
    editBtn.addEventListener('click', () => {
      enterEditMode(li, index, filter);
    });

    // ❌ Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '❌';
    deleteBtn.title = 'Delete';
    deleteBtn.addEventListener('click', () => {
      tasks.splice(index, 1); // Remove from array
      renderTasks(filter);
    });

    li.appendChild(span);
    li.appendChild(completeBtn);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}
// JavaScript snippet for toggle
document.getElementById('add-btn').addEventListener('click', () => {
  document.getElementById('spinner').style.display = 'block';
  setTimeout(() => {
    document.getElementById('spinner').style.display = 'none';
  }, 1000); // simulate delay
});

// Edit mode
function enterEditMode(listItem, index, filter) {
  const task = tasks[index];

  listItem.innerHTML = ''; // Clear list item

  const input = document.createElement('input');
  input.type = 'text';
  input.value = task.text;
  input.style.flexGrow = '1';
  input.style.marginRight = '10px';

  const saveBtn = document.createElement('button');
  saveBtn.textContent = '💾';
  saveBtn.title = 'Save';
  saveBtn.addEventListener('click', () => {
    const newText = input.value.trim();
    if (newText !== '') {
      tasks[index].text = newText;
      renderTasks(filter);
    }
  });

  listItem.appendChild(input);
  listItem.appendChild(saveBtn);
}

// Filter buttons (All, Completed, Incomplete)
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderTasks(btn.getAttribute('data-filter'));
  });
});

// Initial render
renderTasks();
