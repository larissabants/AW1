// Interação com o armazenamento local (carregar, salvar e deletar notas)

export default class API {
    static getNotas() {
        const notes = JSON.parse(localStorage.getItem("easynote") || "[]");

// Ordena notas pela data mais recente de update
        return notes.sort((a, b) => {
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
        });
    }

// Salva e insere uma nova nota 
    static salvarNota(notaParaSalvar) {
        const notes = API.getNotas();
        const existing = notes.find(note => note.id == notaParaSalvar);

        // Editar e atualizar 
        if (existing) {
            existing.titulo = notaParaSalvar.titulo;
            existing.corpo = notaParaSalvar.corpo;
            existing.updated = new Date().toISOString();
        } else {
            notaParaSalvar.id = Math.floor(Math.random() * 1000000);
            notaParaSalvar.updated = new Date().toISOString();
            notes.push(notaParaSalvar);
        }

        localStorage.setItem("easynote", JSON.stringify(notes));
    }

    static deletarNota(id) {
        const notes = API.getNotas();
        const novasNotas = notes.filter(note => note.id != id);

        localStorage.setItem("easynote", JSON.stringify(novasNotas));
    }
}