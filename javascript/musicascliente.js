const params = new URLSearchParams(window.location.search);
const adminId = params.get("adminID"); // Pegando o ID do admin da URL

async function fetchMusicas() {
    try {
        // Garantir que temos um ID válido
        if (!adminId) {
            console.error("Nenhum ID de administrador fornecido.");
            return;
        }

        // Fazer a requisição para a API
        const response = await fetch(`http://localhost:3000/clientes/musicas?id=${adminId}`);
        const data = await response.json();

        // Obter os elementos da tabela
        const songsList = document.getElementById("songs-list");
        const noSongsMessage = document.getElementById("no-songs");

        // Limpar o conteúdo existente
        songsList.innerHTML = "";

        if (data.musicas && data.musicas.length > 0) {
            noSongsMessage.style.display = "none"; // Esconder a mensagem de "Nenhuma música"

            // Iterar sobre os dados e adicionar à tabela
            data.musicas.forEach((musica) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${musica.titulo}</td>
                    <td>${musica.artista}</td>
                    <td>${musica.genero}</td>
                    <td>
                        <button onclick="editarMusica(${musica.id})">Editar</button>
                        <button onclick="deletarMusica(${musica.id})">Deletar</button>
                    </td>
                `;
                songsList.appendChild(row);
            });
        } else {
            noSongsMessage.style.display = "block"; // Mostrar a mensagem de "Nenhuma música"
        }
    } catch (error) {
        console.error("Erro ao buscar músicas:", error);
    }
}

// Função para editar (exemplo, pode ser implementada depois)
function editarMusica(id) {
    alert(`Editar música com ID: ${id}`);
}

// Função para deletar (exemplo, pode ser implementada depois)
function deletarMusica(id) {
    alert(`Deletar música com ID: ${id}`);
}

// Chamar a função ao carregar a página
document.addEventListener("DOMContentLoaded", fetchMusicas);
