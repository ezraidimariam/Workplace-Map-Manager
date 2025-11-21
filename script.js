const unassignedList = document.getElementById("unassigned-list");
const employeeForm = document.getElementById("employee-form");
const addEmployeeModal = new bootstrap.Modal(
  document.getElementById("addEmployeeModal")
);
const addBtns = document.querySelectorAll(".add-btn");
const empPhotoInput = document.getElementById("emp-photo");
const empPhotoPreview = document.getElementById("emp-photo-preview");

empPhotoInput.addEventListener("input", () => {
  const url = empPhotoInput.value.trim();
  if (url) {
    empPhotoPreview.src = url;
    empPhotoPreview.style.display = "block";
  } else {
    empPhotoPreview.style.display = "none";
  }
});

function createEmployeeElement(name, role, photo = "", email = "", phone = "", exp = "") {
  const li = document.createElement("li");
  li.setAttribute("data-role", role);
  li.innerHTML = `
    ${photo ? `<img src="${photo}" alt="${name}" class="emp-img">` : ""}
    ${name} - ${role}
    <button class="remove-btn">X</button>
  `;

  li.querySelector(".remove-btn").onclick = (e) => {
    e.stopPropagation();
    li.remove();
    unassignedList.appendChild(createEmployeeElement(name, role, photo, email, phone, exp));
    updateEmptyRoomColors();
  };

  li.onclick = (e) => {
    if (e.target.tagName !== "BUTTON") {
      alert(`Profil:\nNom: ${name}\nRôle: ${role}\nEmail: ${email}\nTéléphone: ${phone}\nExp: ${exp}`);
    }
  };

  return li;
}

employeeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("emp-name").value.trim();
  const role = document.getElementById("emp-role").value;
  const photo = document.getElementById("emp-photo").value;
  const email = document.getElementById("emp-email").value;
  const phone = document.getElementById("emp-phone").value;
  const exp = document.getElementById("emp-exp").value;

  if (name && role) {
    const employeeLi = createEmployeeElement(name, role, photo, email, phone, exp);
    unassignedList.appendChild(employeeLi);
    addEmployeeModal.hide();
    employeeForm.reset();
    empPhotoPreview.style.display = "none";
  }
});

const maxCapacityPerRoom = {
  reception: 2,
  server: 3,
  security: 2,
  archives: 2,
  conference: 5,
  staff: 5
};

function updateEmptyRoomColors() {
  document.querySelectorAll(".room").forEach(room => {
    const roomBody = room.querySelector(".room-body");
    const roomId = room.id.toLowerCase();
    if (roomBody.children.length === 0 && !["conference","staff"].includes(roomId)) {
      roomBody.style.backgroundColor = "#ffe6e6";
    } else {
      roomBody.style.backgroundColor = "transparent";
    }
  });
}

addBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const room = btn.closest(".room");
    const roomId = room.id.toLowerCase();
    const roomBody = room.querySelector(".room-body");
    const employees = Array.from(unassignedList.children);

    if (employees.length === 0) return alert("Aucun employé disponible !");

    const maxCapacity = maxCapacityPerRoom[roomId] || Infinity;
    if (roomBody.children.length >= maxCapacity) return alert("الغرفة ممتلئة !");

    const eligibleEmployees = employees.filter((e) => {
      const role = e.getAttribute("data-role");
      if (roomId === "reception") return role === "Réceptionniste" || role === "Manager";
      if (roomId === "server") return role === "IT Technician" || role === "Manager";
      if (roomId === "security") return role === "Security" || role === "Manager";
      if (roomId === "archives") return role !== "Nettoyage";
      return true;
    });

    if (eligibleEmployees.length === 0) return alert("Aucun employé éligible pour cette salle !");

    const selectedEmployee = eligibleEmployees[0];
    if (roomBody.classList.contains("empty-room")) roomBody.textContent = "";
    roomBody.appendChild(selectedEmployee);

    updateEmptyRoomColors();
  });
});

updateEmptyRoomColors();
