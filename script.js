document.addEventListener("DOMContentLoaded", () => {
  const browserInfo = {
    os: navigator.platform,
    browser: navigator.userAgent,
    screen: `${window.screen.width}x${window.screen.height}`,
    language: navigator.language,
  };

  localStorage.setItem("user_env_data", JSON.stringify(browserInfo));

  const storageDiv = document.getElementById("storage-info");
  const data = JSON.parse(localStorage.getItem("user_env_data"));
  storageDiv.innerHTML = `Система: ${data.os} | Мова: ${data.language} | Роздільна здатність: ${data.screen}`;

  const commentsContainer = document.getElementById("comments-container");

  fetch("https://jsonplaceholder.typicode.com/posts/10/comments")
    .then((response) => response.json())
    .then((comments) => {
      commentsContainer.innerHTML = "";
      comments.forEach((comment) => {
        const commentBox = document.createElement("div");
        commentBox.className = "project-item comment-card"; 
        commentBox.innerHTML = `
                    <h4>${comment.name}</h4>
                    <small>${comment.email}</small>
                    <p class="comment-body">"${comment.body}"</p>
                `;
        commentsContainer.appendChild(commentBox);
      });
    })
    .catch((err) => {
      commentsContainer.textContent = "Не вдалося завантажити відгуки.";
    });

  const modal = document.getElementById("contact-modal");
  const closeBtn = document.querySelector(".close-button");

  setTimeout(() => {
    modal.style.display = "block";
  }, 60000);

  closeBtn.onclick = () => (modal.style.display = "none");
  window.onclick = (e) => {
    if (e.target == modal) modal.style.display = "none";
  };

  const themeBtn = document.getElementById("theme-toggle");

  const toggleTheme = () => {
    document.body.classList.toggle("dark-mode");
  };

  themeBtn.addEventListener("click", toggleTheme);

  const applyAutoTheme = () => {
    const hour = new Date().getHours();
    if (hour >= 21 || hour < 7) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  };

  applyAutoTheme();
});
