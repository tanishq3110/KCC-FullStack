const addBtn = document.getElementById("addNote");
const container = document.getElementById("notesContainer");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function saveNotes(){
  localStorage.setItem("notes", JSON.stringify(notes));
}

function createNote(text = ""){
  const note = document.createElement("div");
  note.classList.add("note");

  const textarea = document.createElement("textarea");
  textarea.value = text;

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "X";
  deleteBtn.classList.add("deleteBtn");

  note.appendChild(deleteBtn);
  note.appendChild(textarea);
  container.appendChild(note);

  textarea.addEventListener("input", () => {
    updateNotes();
  });

  deleteBtn.addEventListener("click", () => {
    note.remove();
    updateNotes();
  });
}

function updateNotes(){
  const textareas = document.querySelectorAll("textarea");
  notes = [];

  textareas.forEach(textarea => {
    notes.push(textarea.value);
  });

  saveNotes();
}

addBtn.addEventListener("click", () => createNote());

notes.forEach(note => createNote(note));