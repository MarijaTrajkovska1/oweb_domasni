let isLoggedIn = false;

const loginModal = new bootstrap.Modal(document.getElementById("loginModal"));

document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    isLoggedIn = true;
    loginModal.hide();
    alert("Успешно се најавивте!");
});

document.addEventListener('DOMContentLoaded', () => { 
    const gallery = document.getElementById('gallery');

    gallery.querySelectorAll('.like-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          if (!isLoggedIn) {
    loginModal.show();
    return;
}

            const countEl = btn.closest('.actions').querySelector('.like-count');
            let count = parseInt(countEl.textContent) || 0;
            count++;
            countEl.textContent = count;
        });
    });

    gallery.querySelectorAll('.dislike-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          if (!isLoggedIn) {
    loginModal.show();
    return;
}
            const countEl = btn.closest('.actions').querySelector('.dislike-count');
            let count = parseInt(countEl.textContent) || 0;
            count++;
            countEl.textContent = count;
        });
    });

    gallery.querySelectorAll('.comment-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          if (!isLoggedIn) {
    loginModal.show();
    return;
}

            const input = btn.previousElementSibling;
            const comment = input.value.trim();
            if(comment !== "") {
                const ul = btn.closest('.comment-box').querySelector('.comments-list');
                const li = document.createElement('li');
                li.textContent = comment;
                li.classList.add('list-group-item');
                ul.appendChild(li);
                input.value = ""; 
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.read-more-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const article = btn.closest('.article');
      const full = article.querySelector('.full-text');
      const excerpt = article.querySelector('.excerpt');

      if (full.classList.contains('d-none')) {
        full.classList.remove('d-none');
        excerpt.classList.add('d-none');
        btn.textContent = 'Помалку...';
      } else {
        full.classList.add('d-none');
        excerpt.classList.remove('d-none');
        btn.textContent = 'Повеќе...';
      }
    });
  });

  const searchInput = document.getElementById('blog-search');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.trim().toLowerCase();
      const articles = document.querySelectorAll('#articles .article');

      articles.forEach(a => {
        const title = a.querySelector('h5').textContent.toLowerCase();
        const excerpt = a.querySelector('.excerpt').textContent.toLowerCase();
        const full = a.querySelector('.full-text').textContent.toLowerCase();

        if (title.includes(q) || excerpt.includes(q) || full.includes(q)) {
          a.style.display = '';
        } else {
          a.style.display = 'none';
        }
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("survey-form");
    const resultsDiv = document.getElementById("survey-results");

    form.addEventListener("submit", (e) => {
        e.preventDefault(); 

        const name = document.getElementById("name").value;
        const ageRange = document.getElementById("age-range").value;
        const comments = document.getElementById("comments").value;

        const impression = document.querySelector('input[name="impression"]:checked')?.value;
        const mobility = document.querySelector('input[name="mobility"]:checked')?.value;
        const duration = document.querySelector('input[name="duration"]:checked')?.value;

        const likedThings = [];
        ["sightseeing", "food", "museums", "parks"].forEach(id => {
            const cb = document.getElementById(id);
            if (cb.checked) likedThings.push(cb.value);
        });

        resultsDiv.innerHTML = `
            <h4>Резултати од анкетата</h4>
            <p><strong>Име:</strong> ${name}</p>
            <p><strong>Возраст:</strong> ${ageRange}</p>
            <p><strong>Впечатоци:</strong> ${impression}</p>
            <p><strong>Најмногу допадна:</strong> ${likedThings.join(", ") || "Ништо"}</p>
            <p><strong>Леснотија на движење:</strong> ${mobility}</p>
            <p><strong>Времетраење на посетата:</strong> ${duration}</p>
            <p><strong>Коментари:</strong> ${comments || "Нема коментари"}</p>
        `;

        form.reset();
    });
});

