const filters = document.querySelector('.filters');
let currentFilter = 'all'; // all / active / done

const render = () => {
  list.innerHTML = '';
  const shown = tasks.filter(t =>
    currentFilter === 'all' ? true :
    currentFilter === 'active' ? !t.done : t.done
  );
  if (shown.length === 0) {
    const li = document.createElement('li');
    li.textContent = '没有符合条件的任务';
    list.appendChild(li);
    return;
  }
  shown.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.text;
    if (task.done) li.classList.add('done');
    li.addEventListener('click', () => {
      task.done = !task.done;
      render();
    });
    list.appendChild(li);
  });
};

filters.addEventListener('click', (e) => {
  if (e.target.tagName !== 'BUTTON') return;
  currentFilter = e.target.dataset.filter; 
  render();
});