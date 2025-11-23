let employees = [];

const maxPerZone = {
  reception: 1,
  server: 2,
  security: 2,
  archives: 2,
  conference: Infinity,
  staff: Infinity
};

const addBtn = document.getElementById("add-worker-btn");
const modal = document.getElementById("add-modal");
const closeBtn = document.querySelector(".close-btn");
const form = document.getElementById("add-worker-form");
let unassignedList = document.getElementById("unassigned-list");

addBtn.onclick = () => (modal.style.display = "flex");
closeBtn.onclick = () => (modal.style.display = "none");
document.getElementById("cancel-btn").onclick = () => {
  modal.style.display = "none";
  form.reset();
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const worker = {
    name: document.getElementById("name").value,
    role: document.getElementById("role").value,
    photo: document.getElementById("photo").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    experiences: [],
    location: "unassigned"
  };

  document.querySelectorAll(".experience-item").forEach(exp => {
    worker.experiences.push({
      role: exp.querySelector(".exp-role").value,
      company: exp.querySelector(".exp-company").value,
      duration: exp.querySelector(".exp-duration").value
    });
  });

  employees.push(worker);
  renderUnassigned();
  modal.style.display = "none";
  form.reset();
  document.getElementById("experiences-container").innerHTML = "";
});

function renderUnassigned() {
  unassignedList.innerHTML = "";
  employees.filter(e => e.location === "unassigned").forEach((emp, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="worker-info">
        <img src="${emp.photo || 'https://via.placeholder.com/40'}" class="worker-photo">
        <span>${emp.name} - ${emp.role}</span>
      </div>
      <button onclick="removeEmp(${i})">x</button>
    `;
    li.onclick = ev => {
      if (ev.target.tagName === "BUTTON") return;
      openEmployeeDetail(i);
    };
    unassignedList.appendChild(li);
  });
}

function removeEmp(i) {
  employees.splice(i, 1);
  renderUnassigned();
  renderZones();
}

const zones = document.querySelectorAll(".zone");
zones.forEach(zone => {
  const btn = zone.querySelector(".add-btn");
  const zoneId = zone.dataset.zone;
  btn.onclick = () => openAssignForm(zoneId, zone);
});

function openAssignForm(zoneId, zone) {
  const currentCount = employees.filter(e => e.location === zoneId).length;
  const maxCount = maxPerZone[zoneId];
  
  if (currentCount >= maxCount) {
    alert("Cannot add more employees to this zone!");
    return;
  }

  const eligible = employees.filter(e => e.location === "unassigned" && checkRules(zoneId, e.role));
  if (eligible.length === 0) return alert("Aucun employé éligible.");

  const formDiv = document.createElement("div");
  formDiv.className = "assign-form";
  formDiv.style.padding = "10px";
  formDiv.style.marginTop = "10px";
  formDiv.style.background = "#232836";
  formDiv.style.borderRadius = "10px";

  formDiv.innerHTML = `
    <select class="assign-select">
      ${eligible.map((e,i) => `<option value="${i}">${e.name} - ${e.role}</option>`).join('')}
    </select>
    <button class="assign-btn">Add</button>
    <button class="assign-cancel">Cancel</button>
  `;

  formDiv.querySelector(".assign-cancel").onclick = () => formDiv.remove();
  formDiv.querySelector(".assign-btn").onclick = () => {
    const select = formDiv.querySelector(".assign-select");
    const emp = eligible[parseInt(select.value)];

    const countNow = employees.filter(e => e.location === zoneId).length;
    if (countNow >= maxCount) {
      alert("Cannot add more employees to this zone!");
      formDiv.remove();
      return;
    }

    emp.location = zoneId;
    renderZones();
    renderUnassigned();
    formDiv.remove();
  };

  zone.appendChild(formDiv);
}

function renderZones() {
  zones.forEach(zone => {
    const zoneId = zone.dataset.zone;
    const body = zone.querySelector(".zone-body");
    body.innerHTML = "";

    const list = employees.filter(e => e.location === zoneId);

    let counter = zone.querySelector(".zone-counter");
    if (!counter) {
      counter = document.createElement("div");
      counter.className = "zone-counter";
      counter.style.marginBottom = "8px";
      zone.insertBefore(counter, body);
    }
    counter.textContent = `(${list.length} / ${maxPerZone[zoneId] === Infinity ? "∞" : maxPerZone[zoneId]})`;
    counter.style.color = (list.length >= maxPerZone[zoneId] && maxPerZone[zoneId] !== Infinity) ? "#ff4444" : "#aaa";

    list.forEach(emp => {
      const div = document.createElement("div");
      div.className = "employee";
      div.innerHTML = `
        <div class="worker-info">
          <img src="${emp.photo || 'https://via.placeholder.com/40'}" class="worker-photo">
          <span>${emp.name} - ${emp.role}</span>
        </div>
        <button onclick="unassign('${emp.name}')">x</button>
      `;
      div.onclick = ev => {
        if (ev.target.tagName === "BUTTON") return;
        openEmployeeDetail(employees.findIndex(e => e.name === emp.name));
      };
      body.appendChild(div);
    });

    if (list.length === 0 && isMandatoryEmpty(zoneId)) zone.classList.add("empty");
    else zone.classList.remove("empty");
  });
}

function unassign(name) {
  const emp = employees.find(e => e.name === name);
  if (emp) {
    emp.location = "unassigned";
    renderZones();
    renderUnassigned();
  }
}

function checkRules(zone, role) {
  switch(zone) {
    case "reception": return role === "Réceptionniste" || role === "Manager";
    case "server": return role === "Technicien IT" || role === "Manager";
    case "security": return role === "Agent de sécurité" || role === "Manager";
    case "archives": return role !== "Nettoyage";
    default: return true;
  }
}

function isMandatoryEmpty(zone) {
  return ["reception","server","security","archives"].includes(zone);
}

const expContainer = document.getElementById("experiences-container");
document.getElementById("add-experience-btn").addEventListener("click", () => {
  const div = document.createElement("div");
  div.className = "experience-item";
  div.innerHTML = `
    <input type="text" placeholder="Poste occupé" class="exp-role" required />
    <input type="text" placeholder="Entreprise" class="exp-company" required />
    <input type="text" placeholder="Durée (ex: 2021-2023)" class="exp-duration" required />
    <button type="button" class="remove-exp">🗑</button>
  `;
  expContainer.appendChild(div);
  div.querySelector(".remove-exp").onclick = () => div.remove();
});

const photoInput = document.getElementById("photo");
const photoPreview = document.getElementById("photo-preview");
photoInput.addEventListener("input", () => {
  if(photoInput.value.trim() !== "") {
    photoPreview.src = photoInput.value;
    photoPreview.style.display = "block";
  } else photoPreview.style.display = "none";
});

const detailModal = document.createElement("div");
detailModal.className = "modal";
detailModal.id = "detail-modal";
detailModal.innerHTML = `
  <div class="modal-content">
    <span class="close-btn" id="detail-close">×</span>
    <div id="detail-body"></div>
  </div>
`;
document.body.appendChild(detailModal);
const detailBody = document.getElementById("detail-body");
document.getElementById("detail-close").onclick = () => detailModal.style.display = "none";

function openEmployeeDetail(index) {
  const emp = employees[index];
  if(!emp) return;
  const expHTML = emp.experiences.map(e => `<li>${e.role} @ ${e.company} (${e.duration})</li>`).join("");
  detailBody.innerHTML = `
    <div style="text-align:center;">
      <img src="${emp.photo || 'https://via.placeholder.com/120'}" style="width:120px;height:120px;border-radius:50%;margin-bottom:10px;">
      <h2>${emp.name}</h2>
      <p><strong>Rôle:</strong> ${emp.role}</p>
      ${emp.email ? `<p><strong>Email:</strong> ${emp.email}</p>` : ""}
      ${emp.phone ? `<p><strong>Téléphone:</strong> ${emp.phone}</p>` : ""}
      <p><strong>Localisation actuelle:</strong> ${emp.location}</p>
      ${expHTML ? `<div><strong>Expériences:</strong><ul>${expHTML}</ul></div>` : ""}
    </div>
  `;
  detailModal.style.display = "flex";
}

renderUnassigned();
renderZones();
