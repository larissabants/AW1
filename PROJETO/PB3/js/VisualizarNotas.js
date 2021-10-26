export default class VisualizarNotas {
    constructor(root, { onSelectNota, onAddNota, onEditarNota, onDeletarNota } = {}) {
        this.root = root;
        this.onSelectNota = onSelectNota;
        this.onAddNota = onAddNota;
        this.onEditarNota = onEditarNota;
        this.onDeletarNota = onDeletarNota;
        this.root.innerHTML = `
            <div class="notes__sidebar">
                <button class="notes__add" type="button">Adicionar Nota</button>
                <div class="notes__list"></div>
            </div>
            <div class="notes__preview">
                <input class="notes__title" type="text" placeholder="New Note...">
                <textarea class="notes__body">Take Note...</textarea>
            </div>
        `;

        const btnAddNota = this.root.querySelector(".notes__add");
        const inpTitulo = this.root.querySelector(".notes__title");
        const inpCorpo = this.root.querySelector(".notes__body");

        btnAddNota.addEventListener("click", () => {
            this.onAddNota();
        });

        [inpTitulo, inpCorpo].forEach(inputField => {
            inputField.addEventListener("blur", () => {
                const updatedTitulo = inpTitulo.value.trim();
                const updatedCorpo = inpCorpo.value.trim();

                this.onEditarNota(updatedTitulo, updatedCorpo);
            });
        });

        this.updatePreviewNota(false);
    }

    _createListItemHTML(id, titulo, corpo, updated) {
        const MAX_BODY_LENGTH = 60;

        return `
            <div class="notes__list-item" data-note-id="${id}">
                <div class="notes__small-title">${titulo}</div>
                <div class="notes__small-body">
                    ${corpo.substring(0, MAX_BODY_LENGTH)}
                    ${corpo.length > MAX_BODY_LENGTH ? "..." : ""}
                </div>
                <div class="notes__small-updated">
                    ${updated.toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" })}
                </div>
            </div>
        `;
    }

    updateListaNotas(notes) {
        const notesListContainer = this.root.querySelector(".notes__list");

        // Limpar Lista
        notesListContainer.innerHTML = "";

        for (const note of notes) {
            const html = this._createListItemHTML(note.id, note.titulo, note.corpo, new Date(note.updated));

            notesListContainer.insertAdjacentHTML("beforeend", html);
        }

        // Adiciona, seleciona e deleta itens
        notesListContainer.querySelectorAll(".notes__list-item").forEach(noteListItem => {
            noteListItem.addEventListener("click", () => {
                this.onSelectNota(noteListItem.dataset.noteId);
            });

            noteListItem.addEventListener("dblclick", () => {
                const doDelete = confirm("Certeza que deseja excluir essa nota?");

                if (doDelete) {
                    this.onDeletarNota(noteListItem.dataset.noteId);
                }
            });
        });
    }

    updateNotaAtiva(note) {
        this.root.querySelector(".notes__title").value = note.titulo;
        this.root.querySelector(".notes__body").value = note.corpo;

        this.root.querySelectorAll(".notes__list-item").forEach(noteListItem => {
            noteListItem.classList.remove("notes__list-item--selected");
        });

        this.root.querySelector(`.notes__list-item[data-note-id="${note.id}"]`).classList.add("notes__list-item--selected");
    }

    updatePreviewNota(visible) {
        this.root.querySelector(".notes__preview").style.visibility = visible ? "visible" : "hidden";
    }
}




