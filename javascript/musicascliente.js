document.addEventListener("DOMContentLoaded", async function () {
    const songsList = document.getElementById("songs-list");
    const noSongsMessage = document.getElementById("no-songs");

    // Pegando adminID da URL
    const params = new URLSearchParams(window.location.search);
    const adminId = params.get("adminID");

    if (!adminId) {
        console.error("adminID não encontrado na URL!");
        noSongsMessage.textContent = "Erro: adminID ausente.";
        noSongsMessage.style.display = "block";
        return;
    }

    // Pegando o nome do usuário salvo no localStorage
    const clienteNome = localStorage.getItem("username");
    if (!clienteNome) {
        alert("Nome do cliente não encontrado! Redirecionando...");
        window.location.href = "welcomeuser.html"; // Redireciona para o input do nome
        return;
    }

    async function fetchMusicas() {
        try {
            const response = await fetch(`https://sistema-karaoke-backend.onrender.com/clientes/musicas?${adminId}`);
            const data = await response.json();
            console.log(data)
            if (!data.musicas || data.musicas.length === 0) {
                noSongsMessage.style.display = "block";
                songsList.innerHTML = "";
                return;
            }

            noSongsMessage.style.display = "none";
            songsList.innerHTML = "";

            data.musicas.forEach(musica => {
                const tr = document.createElement("tr");

                tr.innerHTML = `
                    <td>${musica.titulo}</td>
                    <td>${musica.artista}</td>
                    <td>${musica.genero || "N/A"}</td>
                    <td><button class="select-btn" data-id="${musica.id}">🎵 Selecionar</button></td>
                `;

                songsList.appendChild(tr);
            });

            document.querySelectorAll(".select-btn").forEach(button => {
                button.addEventListener("click", function () {
                    const musicaID = this.getAttribute("data-id");
                    adicionarFila(clienteNome, musicaID);
                });
            });

        } catch (error) {
            console.error("Erro ao buscar músicas:", error);
        }
    }

    async function adicionarFila(clienteNome, musicaID) {
        try {
            const response = await fetch(`https://sistema-karaoke-backend.onrender.com/fila/${adminId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    clienteNome,
                    musicaID
                })
            });

            const data = await response.json();
            if (response.ok) {
                alert("Adicionado à fila com sucesso!");
                window.location.href = `verfila.html?adminID=${adminId}`;
            } else {
                alert("Erro ao adicionar na fila: " + data.error);
            }
        } catch (error) {
            console.error("Erro ao adicionar à fila:", error);
            alert("Erro inesperado.");
        }
    }

    fetchMusicas();
});
