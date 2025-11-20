
const unassignedList = document.getElementById("unassigned-list");
const addWorkerBtn = document.getElementById("add-worker-btn");
const addBtns = document.querySelectorAll(".add-btn");


function createEmployee(name, role) {
  const div = document.createElement("div");
  div.className = "employee";
  div.textContent = `${name} - ${role}`;


  const removeBtn = document.createElement("button");
  removeBtn.textContent = "X";
  removeBtn.style.marginLeft = "5px";
  removeBtn.onclick = () => {
    div.remove();
    unassignedList.appendChild(createEmployee(name, role));
  };

  div.appendChild(removeBtn);
  return div;
}


addWorkerBtn.addEventListener("click", () => {
  const name = prompt("Nom de l'employé :");
  const role = prompt("Rôle de l'employé :");
  if (name && role) {
    unassignedList.appendChild(createEmployee(name, role));
  }
});


addBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const room = btn.closest(".room");
    const roomId = room.id.toLowerCase();

 
    const employees = Array.from(unassignedList.children);
    if (employees.length === 0) return alert("Aucun employé disponible !");

    const names = employees.map(e => e.textContent.replace("X", "").trim());
    const selectedName = prompt("Tapez le nom exact de l'employé :\n" + names.join("\n"));
    const employeeDiv = employees.find(e => e.textContent.includes(selectedName));

    if (!employeeDiv) return alert("Employé introuvable !");

    const role = employeeDiv.textContent.split(" - ")[1];

    if (
      (roomId === "reception" && role !== "Réceptionniste") ||
      (roomId === "server" && role !== "IT Technician") ||
      (roomId === "security" && role !== "Security")
    ) {
      return alert("Cet employé ne peut pas aller ici !");
    }

  
    const roomBody = room.querySelector(".room-body");
    if (roomBody.classList.contains("empty-room")) roomBody.textContent = "";
    roomBody.appendChild(employeeDiv);
  });
});
