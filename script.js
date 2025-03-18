document.addEventListener('DOMContentLoaded', () => {
    // Первая группа чекбоксов
    const ch1 = document.getElementById('ch1');
    const ch2 = document.getElementById('ch2');

    [ch1, ch2].forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                if (checkbox === ch1) ch2.checked = false;
                if (checkbox === ch2) ch1.checked = false;
            }
        });
    });

    // Вторая группа чекбоксов
    const sm1 = document.getElementById('sm1');
    const sm2 = document.getElementById('sm2');
    const sm3 = document.getElementById('sm3');
    const sm4 = document.getElementById('sm4');

    [sm1, sm2, sm3, sm4].forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                [sm1, sm2, sm3, sm4].forEach(otherCheckbox => {
                    if (otherCheckbox !== checkbox) {
                        otherCheckbox.checked = false;
                    }
                });
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const ch2 = document.getElementById('ch2'); // Boyfriend
    const sm1 = document.getElementById('sm1'); // Course 1

    document.getElementById('findButton').addEventListener('click', () => {
        if (ch2.checked && sm1.checked) {
            window.location.href = 'result.html'; // Укажите путь к HTML-документу
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const ch1 = document.getElementById('ch1'); // Girlfriend
    const sm1 = document.getElementById('sm1'); // Course 1

    document.getElementById('findButton').addEventListener('click', () => {
        if (ch1.checked && sm1.checked) {
            window.location.href = 'resultgirl.html'; // Укажите путь к HTML-документу
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const ch1 = document.getElementById('ch1'); // Girlfriend
    const sm2 = document.getElementById('sm2'); // Course 2

    document.getElementById('findButton').addEventListener('click', () => {
        if (ch1.checked && sm2.checked) {
            window.location.href = 'resultgirl2.html'; // Укажите путь к HTML-документу
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const ch2 = document.getElementById('ch2'); // Boyfriend
    const sm2 = document.getElementById('sm2'); // Course 2

    document.getElementById('findButton').addEventListener('click', () => {
        if (ch2.checked && sm2.checked) {
            window.location.href = 'result2.html'; // Укажите путь к HTML-документу
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const ch1 = document.getElementById('ch1'); // Girlfriend
    const sm3 = document.getElementById('sm3'); // Course 3

    document.getElementById('findButton').addEventListener('click', () => {
        if (ch1.checked && sm3.checked) {
            window.location.href = 'resultgirl3.html'; // Укажите путь к HTML-документу
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const ch2 = document.getElementById('ch2'); // Boyfriend
    const sm3 = document.getElementById('sm3'); // Course 3

    document.getElementById('findButton').addEventListener('click', () => {
        if (ch2.checked && sm3.checked) {
            window.location.href = 'result3.html'; // Укажите путь к HTML-документу
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const ch2 = document.getElementById('ch2'); // Boyfriend
    const sm4 = document.getElementById('sm4'); // Course 4

    document.getElementById('findButton').addEventListener('click', () => {
        if (ch2.checked && sm4.checked) {
            window.location.href = 'result4.html'; // Укажите путь к HTML-документу
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const ch1 = document.getElementById('ch1'); // Girlfriend
    const sm4 = document.getElementById('sm4'); // Course 4

    document.getElementById('findButton').addEventListener('click', () => {
        if (ch1.checked && sm4.checked) {
            window.location.href = 'resultgirl4.html'; // Укажите путь к HTML-документу
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
  const profilesContainer = document.getElementById("profiles");
  const currentUserId = "uniqueOwnerId"; // Уникальный идентификатор текущего пользователя

  // Загрузка сохранённых профилей из LocalStorage
  function loadProfiles() {
    const savedProfiles = JSON.parse(localStorage.getItem("profiles")) || [];
    savedProfiles.forEach(profile => addProfileToDOM(profile, false));
  }

  // Сохранение профилей в LocalStorage
  function saveProfiles(profiles) {
    localStorage.setItem("profiles", JSON.stringify(profiles));
  }

  // Добавление профиля в DOM
  function addProfileToDOM(profile, save = true) {
    const profileDiv = document.createElement("div");
    profileDiv.className = "profile";

    const isOwner = profile.ownerId === currentUserId;

    const profileInfo = `
      <div class="info-profile">
        <img src="${profile.image}" alt="Profile Picture" />
        <h3>${profile.name}</h3>
        <p>Course: ${profile.course}</p>
        <p>Status: ${profile.status}</p>
      </div>
      <div class="talk-button">
        <button onclick="window.open('${profile.telegram}', '_blank')">Talk</button>
      </div>
      ${isOwner ? '<button class="delete-button">Delete Profile</button>' : ''}
    `;

    profileDiv.innerHTML = profileInfo;

    // Если владелец, добавить функционал удаления
    if (isOwner) {
      profileDiv.querySelector(".delete-button").addEventListener("click", function () {
        const profiles = JSON.parse(localStorage.getItem("profiles")) || [];
        const updatedProfiles = profiles.filter(p => p.id !== profile.id);
        saveProfiles(updatedProfiles);
        profileDiv.remove();
      });
    }

    // Профиль добавляется в начало списка
    profilesContainer.prepend(profileDiv);

    // Сохраняем профиль только при создании
    if (save) {
      const profiles = JSON.parse(localStorage.getItem("profiles")) || [];
      profiles.unshift(profile); // Новый профиль добавляется в начало массива
      saveProfiles(profiles);
    }
  }

  // Добавление нового профиля
  document.getElementById("addProfileButton").addEventListener("click", function () {
    const name = document.getElementById("nameInput").value;
    const telegram = document.getElementById("telegramInput").value;
    const course = document.getElementById("courseInput").value;
    const status = document.getElementById("statusInput").value;
    const imageInput = document.getElementById("imageInput").files[0];

    if (!name || !telegram || !course || !status || !imageInput) {
      alert("Please fill out all fields and upload a photo!");
      return;
    }

    const reader = new FileReader();
    reader.onload = function () {
      const profile = {
        id: Date.now(), // Уникальный идентификатор профиля
        ownerId: currentUserId, // Идентификатор владельца
        name: name,
        telegram: telegram,
        course: course,
        status: status,
        image: reader.result // Сохранение изображения в формате Data URL
      };

      addProfileToDOM(profile, true);

      // Очистка полей ввода
      document.getElementById("nameInput").value = "";
      document.getElementById("telegramInput").value = "";
      document.getElementById("courseInput").value = "";
      document.getElementById("statusInput").value = "";
      document.getElementById("imageInput").value = "";
    };

    reader.readAsDataURL(imageInput);
  });

  // Загрузка профилей при загрузке страницы
  loadProfiles();
});
