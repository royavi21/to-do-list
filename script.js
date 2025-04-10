let lastScrollTop = 0;

const taskList = document.getElementById("taskList");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const direction = window.scrollY > lastScrollTop ? 'down' : 'up';
      entry.target.classList.add(direction === 'down' ? 'fade-in-up' : 'fade-in-down');
      observer.unobserve(entry.target); // Prevents retriggering
    }
  });
}, {
  threshold: 0.1
});

document.addEventListener('scroll', () => {
  lastScrollTop = window.scrollY;
});

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const task = taskInput.value.trim();
  if (!task) return;

  const li = document.createElement("li");
  li.textContent = task;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.onclick = () => li.remove();

  li.appendChild(deleteBtn);
  taskList.prepend(li);
  taskList.scrollTo({ top: 0, behavior: 'smooth' });

  observer.observe(li); // Animate on scroll

  taskInput.value = "";
}
