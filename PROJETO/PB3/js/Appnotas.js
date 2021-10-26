import API from "./API.js";
import VisualizarNotas from "./VisualizarNotas.js";

export default class Appnotas {
    constructor(root) {
        this.notes = [];
        this.notaAtiva = null;
        this.visualizar = new VisualizarNotas(root, this._metodos());

        this._recarregarnotas();
    }

    _recarregarnotas() {
        const notes = API.getNotas();

        this._setNotas(notes);

        if (notes.length > 0) {
            this._setNotaAtiva(notes[0]);
        }
    }

    _setNotas(notes) {
        this.notes = notes;
        this.visualizar.updateListaNotas(notes);
        this.visualizar.updatePreviewNota(notes.length > 0);
    }

    _setNotaAtiva(note) {
        this.notaAtiva = note;
        this.visualizar.updateNotaAtiva(note);
    }

    _metodos() {
        return {
            onSelectNota: noteId => {
                const NotaSelecionada = this.notes.find(note => note.id == noteId);
                this._setNotaAtiva(NotaSelecionada);
            },
            onAddNota: () => {
                const novaNota = {
                    titulo: "Nova Nota",
                    corpo: "Escreva uma nota..."
                };

                API.salvarNota(novaNota);
                this._recarregarnotas();
            },
            onEditarNota: (titulo, corpo) => {
                API.salvarNota({
                    id: this.notaAtiva.id,
                    titulo,
                    corpo
                });

                this._recarregarnotas();
            },
            onDeletarNota: noteId => {
                API.deletarNota(noteId);
                this._recarregarnotas();
            },
        };
    }
}
