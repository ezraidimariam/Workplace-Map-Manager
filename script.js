const unassignedList = document.getElementById("unassigned-list");
const employeeForm = document.getElementById("employee-form");
const addEmployeeModal = new bootstrap.Modal(
  document.getElementById("addEmployeeModal")
);
const addBtns = document.querySelectorAll(".add-btn");

function createEmployeeElement(
  name,
  role,
  photo = "",
  email = "",
  phone = "",
  exp = ""
) {
  const li = document.createElement("li");
  li.setAttribute("data-role", role);
  li.innerHTML = `
    ${name} - ${role} 
    <button class="remove-btn">X</button>
  `;
  li.querySelector(".remove-btn").onclick = (e) => {
    e.stopPropagation();
    li.remove();
    unassignedList.appendChild(
      createEmployeeElement(name, role, photo, email, phone, exp)
    );
  };
  li.onclick = (e) => {
    if (e.target.tagName !== "BUTTON") {
      alert(
        `Profil:\nNom: ${name}\nRôle: ${role}\nEmail: ${email}\nTéléphone: ${phone}\nExp: ${exp}`
      );
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
    const employeeLi = createEmployeeElement(
      name,
      role,
      photo,
      email,
      phone,
      exp
    );
    unassignedList.appendChild(employeeLi);

    addEmployeeModal.hide();
    employeeForm.reset();
  }
});
addBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const room = btn.closest(".room");
    const roomId = room.id.toLowerCase();
    const employees = Array.from(unassignedList.children);

    if (employees.length === 0) return alert("Aucun employé disponible !");

    const eligibleEmployees = employees.filter((e) => {
      const role = e.getAttribute("data-role");
      if (roomId === "reception")
        return role === "Réceptionniste" || role === "Manager";
      if (roomId === "server")
        return role === "IT Technician" || role === "Manager";
      if (roomId === "security")
        return role === "Security" || role === "Manager";
      if (roomId === "archives") return role !== "Nettoyage";
      return true;
    });
    if (eligibleEmployees.length === 0)
      return alert("Aucun employé éligible pour cette salle !");
    const selectedEmployee = eligibleEmployees[0];
    const roomBody = room.querySelector(".room-body");
    if (roomBody.classList.contains("empty-room")) roomBody.textContent = "";
    roomBody.appendChild(selectedEmployee);
  });
});
