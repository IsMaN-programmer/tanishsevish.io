document.addEventListener("DOMContentLoaded", () => {
  // Первая группа чекбоксов
  const ch1 = document.getElementById("ch1");
  const ch2 = document.getElementById("ch2");

  [ch1, ch2].forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        if (checkbox === ch1) ch2.checked = false;
        if (checkbox === ch2) ch1.checked = false;
      }
    });
  });

  // Вторая группа чекбоксов
  const sm1 = document.getElementById("sm1");
  const sm2 = document.getElementById("sm2");
  const sm3 = document.getElementById("sm3");
  const sm4 = document.getElementById("sm4");

  [sm1, sm2, sm3, sm4].forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        [sm1, sm2, sm3, sm4].forEach((otherCheckbox) => {
          if (otherCheckbox !== checkbox) {
            otherCheckbox.checked = false;
          }
        });
      }
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const ch2 = document.getElementById("ch2"); // Boyfriend
  const sm1 = document.getElementById("sm1"); // Course 1

  document.getElementById("findButton").addEventListener("click", () => {
    if (ch2.checked && sm1.checked) {
      window.location.href = "result.html"; // Укажите путь к HTML-документу
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const ch1 = document.getElementById("ch1"); // Girlfriend
  const sm1 = document.getElementById("sm1"); // Course 1

  document.getElementById("findButton").addEventListener("click", () => {
    if (ch1.checked && sm1.checked) {
      window.location.href = "resultgirl.html"; // Укажите путь к HTML-документу
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const ch1 = document.getElementById("ch1"); // Girlfriend
  const sm2 = document.getElementById("sm2"); // Course 2

  document.getElementById("findButton").addEventListener("click", () => {
    if (ch1.checked && sm2.checked) {
      window.location.href = "resultgirl2.html"; // Укажите путь к HTML-документу
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const ch2 = document.getElementById("ch2"); // Boyfriend
  const sm2 = document.getElementById("sm2"); // Course 2

  document.getElementById("findButton").addEventListener("click", () => {
    if (ch2.checked && sm2.checked) {
      window.location.href = "result2.html"; // Укажите путь к HTML-документу
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const ch1 = document.getElementById("ch1"); // Girlfriend
  const sm3 = document.getElementById("sm3"); // Course 3

  document.getElementById("findButton").addEventListener("click", () => {
    if (ch1.checked && sm3.checked) {
      window.location.href = "resultgirl3.html"; // Укажите путь к HTML-документу
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const ch2 = document.getElementById("ch2"); // Boyfriend
  const sm3 = document.getElementById("sm3"); // Course 3

  document.getElementById("findButton").addEventListener("click", () => {
    if (ch2.checked && sm3.checked) {
      window.location.href = "result3.html"; // Укажите путь к HTML-документу
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const ch2 = document.getElementById("ch2"); // Boyfriend
  const sm4 = document.getElementById("sm4"); // Course 4

  document.getElementById("findButton").addEventListener("click", () => {
    if (ch2.checked && sm4.checked) {
      window.location.href = "result4.html"; // Укажите путь к HTML-документу
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const ch1 = document.getElementById("ch1"); // Girlfriend
  const sm4 = document.getElementById("sm4"); // Course 4

  document.getElementById("findButton").addEventListener("click", () => {
    if (ch1.checked && sm4.checked) {
      window.location.href = "resultgirl4.html"; // Укажите путь к HTML-документу
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const profilesContainer = document.getElementById("profiles");
  const currentUserId = "uniqueOwnerId"; // Уникальный идентификатор текущего пользователя

  // Загрузка сохранённых профилей из LocalStorage
  function loadProfiles() {
    const savedProfiles = JSON.parse(localStorage.getItem("profiles")) || [];
    savedProfiles.sort((a, b) => a.id - b.id);
    savedProfiles.forEach((profile) => addProfileToDOM(profile, false));
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
      ${isOwner ? '<button class="delete-button">Delete Profile</button>' : ""}
    `;

    profileDiv.innerHTML = profileInfo;

    // Если владелец, добавить функционал удаления
    if (isOwner) {
      profileDiv.querySelector(".delete-button").addEventListener("click", function () {
        const profiles = JSON.parse(localStorage.getItem("profiles")) || [];
        const updatedProfiles = profiles.filter((p) => p.id !== profile.id);
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

document.addEventListener("DOMContentLoaded", function () {
  const profilesContainer = document.getElementById("profilesg");
  const currentUserId = "uniqueOwnerId"; // Уникальный идентификатор текущего пользователя

  // Загрузка сохранённых профилей из LocalStorage
  function loadProfiles() {
    const savedProfiles = JSON.parse(localStorage.getItem("profilesg")) || [];
    savedProfiles.sort((a, b) => a.id - b.id);
    savedProfiles.forEach((profile) => addProfileToDOM(profile, false));
  }

  // Сохранение профилей в LocalStorage
  function saveProfiles(profiles) {
    localStorage.setItem("profilesg", JSON.stringify(profiles));
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
      ${isOwner ? '<button class="delete-button">Delete Profile</button>' : ""}
    `;

    profileDiv.innerHTML = profileInfo;

    // Если владелец, добавить функционал удаления
    if (isOwner) {
      profileDiv.querySelector(".delete-button").addEventListener("click", function () {
        const profiles = JSON.parse(localStorage.getItem("profilesg")) || [];
        const updatedProfiles = profiles.filter((p) => p.id !== profile.id);
        saveProfiles(updatedProfiles);
        profileDiv.remove();
      });
    }

    // Профиль добавляется в начало списка
    profilesContainer.prepend(profileDiv);

    // Сохраняем профиль только при создании
    if (save) {
      const profiles = JSON.parse(localStorage.getItem("profilesg")) || [];
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

document.addEventListener("DOMContentLoaded", function () {
  const profilesContainer = document.getElementById("profilesg2");
  const currentUserId = "uniqueOwnerId"; // Уникальный идентификатор текущего пользователя

  // Загрузка сохранённых профилей из LocalStorage
  function loadProfiles() {
    const savedProfiles = JSON.parse(localStorage.getItem("profilesg2")) || [];
    savedProfiles.sort((a, b) => a.id - b.id);
    savedProfiles.forEach((profile) => addProfileToDOM(profile, false));
  }

  // Сохранение профилей в LocalStorage
  function saveProfiles(profiles) {
    localStorage.setItem("profilesg2", JSON.stringify(profiles));
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
      ${isOwner ? '<button class="delete-button">Delete Profile</button>' : ""}
    `;

    profileDiv.innerHTML = profileInfo;

    // Если владелец, добавить функционал удаления
    if (isOwner) {
      profileDiv.querySelector(".delete-button").addEventListener("click", function () {
        const profiles = JSON.parse(localStorage.getItem("profilesg2")) || [];
        const updatedProfiles = profiles.filter((p) => p.id !== profile.id);
        saveProfiles(updatedProfiles);
        profileDiv.remove();
      });
    }

    // Профиль добавляется в начало списка
    profilesContainer.prepend(profileDiv);

    // Сохраняем профиль только при создании
    if (save) {
      const profiles = JSON.parse(localStorage.getItem("profilesg2")) || [];
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

document.addEventListener("DOMContentLoaded", function () {
  const profilesContainer = document.getElementById("profilesg3");
  const currentUserId = "uniqueOwnerId"; // Уникальный идентификатор текущего пользователя

  // Загрузка сохранённых профилей из LocalStorage
  function loadProfiles() {
    const savedProfiles = JSON.parse(localStorage.getItem("profilesg3")) || [];
    savedProfiles.sort((a, b) => a.id - b.id);
    savedProfiles.forEach((profile) => addProfileToDOM(profile, false));
  }

  // Сохранение профилей в LocalStorage
  function saveProfiles(profiles) {
    localStorage.setItem("profilesg3", JSON.stringify(profiles));
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
      ${isOwner ? '<button class="delete-button">Delete Profile</button>' : ""}
    `;

    profileDiv.innerHTML = profileInfo;

    // Если владелец, добавить функционал удаления
    if (isOwner) {
      profileDiv.querySelector(".delete-button").addEventListener("click", function () {
        const profiles = JSON.parse(localStorage.getItem("profilesg3")) || [];
        const updatedProfiles = profiles.filter((p) => p.id !== profile.id);
        saveProfiles(updatedProfiles);
        profileDiv.remove();
      });
    }

    // Профиль добавляется в начало списка
    profilesContainer.prepend(profileDiv);

    // Сохраняем профиль только при создании
    if (save) {
      const profiles = JSON.parse(localStorage.getItem("profilesg3")) || [];
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

document.addEventListener("DOMContentLoaded", function () {
  const profilesContainer = document.getElementById("profilesg4");
  const currentUserId = "uniqueOwnerId"; // Уникальный идентификатор текущего пользователя

  // Загрузка сохранённых профилей из LocalStorage
  function loadProfiles() {
    const savedProfiles = JSON.parse(localStorage.getItem("profilesg4")) || [];
    savedProfiles.sort((a, b) => a.id - b.id);
    savedProfiles.forEach((profile) => addProfileToDOM(profile, false));
  }

  // Сохранение профилей в LocalStorage
  function saveProfiles(profiles) {
    localStorage.setItem("profilesg4", JSON.stringify(profiles));
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
      ${isOwner ? '<button class="delete-button">Delete Profile</button>' : ""}
    `;

    profileDiv.innerHTML = profileInfo;

    // Если владелец, добавить функционал удаления
    if (isOwner) {
      profileDiv.querySelector(".delete-button").addEventListener("click", function () {
        const profiles = JSON.parse(localStorage.getItem("profilesg4")) || [];
        const updatedProfiles = profiles.filter((p) => p.id !== profile.id);
        saveProfiles(updatedProfiles);
        profileDiv.remove();
      });
    }

    // Профиль добавляется в начало списка
    profilesContainer.prepend(profileDiv);

    // Сохраняем профиль только при создании
    if (save) {
      const profiles = JSON.parse(localStorage.getItem("profilesg4")) || [];
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

document.addEventListener("DOMContentLoaded", function () {
  const profilesContainer = document.getElementById("profiles2");
  const currentUserId = "uniqueOwnerId"; // Уникальный идентификатор текущего пользователя

  // Загрузка сохранённых профилей из LocalStorage
  function loadProfiles() {
    const savedProfiles = JSON.parse(localStorage.getItem("profiles2")) || [];
    savedProfiles.sort((a, b) => a.id - b.id);
    savedProfiles.forEach((profile) => addProfileToDOM(profile, false));
  }

  // Сохранение профилей в LocalStorage
  function saveProfiles(profiles) {
    localStorage.setItem("profiles2", JSON.stringify(profiles));
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
      ${isOwner ? '<button class="delete-button">Delete Profile</button>' : ""}
    `;

    profileDiv.innerHTML = profileInfo;

    // Если владелец, добавить функционал удаления
    if (isOwner) {
      profileDiv.querySelector(".delete-button").addEventListener("click", function () {
        const profiles = JSON.parse(localStorage.getItem("profiles2")) || [];
        const updatedProfiles = profiles.filter((p) => p.id !== profile.id);
        saveProfiles(updatedProfiles);
        profileDiv.remove();
      });
    }

    // Профиль добавляется в начало списка
    profilesContainer.prepend(profileDiv);

    // Сохраняем профиль только при создании
    if (save) {
      const profiles = JSON.parse(localStorage.getItem("profiles2")) || [];
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

document.addEventListener("DOMContentLoaded", function () {
  const profilesContainer = document.getElementById("profiles3");
  const currentUserId = "uniqueOwnerId"; // Уникальный идентификатор текущего пользователя

  // Загрузка сохранённых профилей из LocalStorage
  function loadProfiles() {
    const savedProfiles = JSON.parse(localStorage.getItem("profiles3")) || [];
    savedProfiles.sort((a, b) => a.id - b.id);
    savedProfiles.forEach((profile) => addProfileToDOM(profile, false));
  }

  // Сохранение профилей в LocalStorage
  function saveProfiles(profiles) {
    localStorage.setItem("profiles3", JSON.stringify(profiles));
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
      ${isOwner ? '<button class="delete-button">Delete Profile</button>' : ""}
    `;

    profileDiv.innerHTML = profileInfo;

    // Если владелец, добавить функционал удаления
    if (isOwner) {
      profileDiv.querySelector(".delete-button").addEventListener("click", function () {
        const profiles = JSON.parse(localStorage.getItem("profiles3")) || [];
        const updatedProfiles = profiles.filter((p) => p.id !== profile.id);
        saveProfiles(updatedProfiles);
        profileDiv.remove();
      });
    }

    // Профиль добавляется в начало списка
    profilesContainer.prepend(profileDiv);

    // Сохраняем профиль только при создании
    if (save) {
      const profiles = JSON.parse(localStorage.getItem("profiles3")) || [];
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

document.addEventListener("DOMContentLoaded", function () {
  const profilesContainer = document.getElementById("profiles4");
  const currentUserId = "uniqueOwnerId"; // Уникальный идентификатор текущего пользователя

  // Загрузка сохранённых профилей из LocalStorage
  function loadProfiles() {
    const savedProfiles = JSON.parse(localStorage.getItem("profiles4")) || [];
    savedProfiles.sort((a, b) => a.id - b.id);
    savedProfiles.forEach((profile) => addProfileToDOM(profile, false));
  }

  // Сохранение профилей в LocalStorage
  function saveProfiles(profiles) {
    localStorage.setItem("profiles4", JSON.stringify(profiles));
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
      ${isOwner ? '<button class="delete-button">Delete Profile</button>' : ""}
    `;

    profileDiv.innerHTML = profileInfo;

    // Если владелец, добавить функционал удаления
    if (isOwner) {
      profileDiv.querySelector(".delete-button").addEventListener("click", function () {
        const profiles = JSON.parse(localStorage.getItem("profiles4")) || [];
        const updatedProfiles = profiles.filter((p) => p.id !== profile.id);
        saveProfiles(updatedProfiles);
        profileDiv.remove();
      });
    }

    // Профиль добавляется в начало списка
    profilesContainer.prepend(profileDiv);

    // Сохраняем профиль только при создании
    if (save) {
      const profiles = JSON.parse(localStorage.getItem("profiles4")) || [];
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

// Объект с переводами на три языка
const translations = {
  en: {
    findButton: "FIND",
    headerText: "Find your future partner",
    questionWho: "Who are you looking for?",
    labelGirlfriend: "Girlfriend",
    labelBoyfriend: "Boyfriend",
    questionCourse: "Which course?"
  },
  ru: {
    findButton: "НАЙТИ",
    headerText: "Найдите вашего будущего партнера",
    questionWho: "Кого вы ищете?",
    labelGirlfriend: "Девушку",
    labelBoyfriend: "Парня",
    questionCourse: "Какой курс?"
  },
  uz: {
    findButton: "TOPISH",
    headerText: "Kelajakdagi hamkoringizni toping",
    questionWho: "Kimni izlayapsiz?",
    labelGirlfriend: "Qizni",
    labelBoyfriend: "Yigitni",
    questionCourse: "Qaysi kurs?"
  }
};
let currentLanguage = "en";
function toggleLanguage() {
  const languageButton = document.getElementById("languageButton");

  // Логика смены языка: циклический переход между языками
  if (currentLanguage === "en") {
    currentLanguage = "ru";
  } else if (currentLanguage === "ru") {
    currentLanguage = "uz";
  } else {
    currentLanguage = "en";
  }
  // Обновление текста на странице
  findButton.textContent = translations[currentLanguage].findButton;
  document.getElementById("headerText").textContent = translations[currentLanguage].headerText;
  document.getElementById("questionWho").textContent = translations[currentLanguage].questionWho;
  document.getElementById("labelGirlfriend").textContent = translations[currentLanguage].labelGirlfriend;
  document.getElementById("labelBoyfriend").textContent = translations[currentLanguage].labelBoyfriend;
  document.getElementById("questionCourse").textContent = translations[currentLanguage].questionCourse;
  languageButton.textContent = currentLanguage.toUpperCase();
}
document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("addProfileButton");
  const addProfileSection = document.querySelector(".add-profile");

  const cooldown = 24 * 60 * 60 * 1000; // 24 часа
  const lastSubmission = localStorage.getItem("lastProfileSubmission");
  const now = Date.now();

  function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }

  function showTimer(msRemaining) {
    const timerButton = document.createElement("button");
    timerButton.className = "find-button timer-button";
    timerButton.disabled = true;
    timerButton.textContent = `Wait: ${formatTime(msRemaining)}`;
    addButton.style.display = "none";
    addProfileSection.appendChild(timerButton);

    const interval = setInterval(() => {
      msRemaining -= 1000;
      timerButton.textContent = `Wait: ${formatTime(msRemaining)}`;
      if (msRemaining <= 0) {
        clearInterval(interval);
        timerButton.remove();
        addButton.style.display = "inline-block";
        localStorage.removeItem("lastProfileSubmission");
      }
    }, 1000);
  }

  if (lastSubmission && now - lastSubmission < cooldown) {
    const remaining = cooldown - (now - lastSubmission);
    showTimer(remaining);
  }

  addButton.addEventListener("click", function () {
  const now = Date.now();
  localStorage.setItem("lastProfileSubmission", now);
  showTimer(cooldown); // запускаем таймер сразу
});

});
