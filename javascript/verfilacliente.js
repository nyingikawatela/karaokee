document.addEventListener("DOMContentLoaded", async function () {
    const queueList = document.getElementById("queue-list");

    // Pegando adminID da URL
    const params = new URLSearchParams(window.location.search);
    const adminId = params.get("adminID");

    if (!adminId) {
        console.error("adminID não encontrado na URL!");
        alert("Erro: adminID ausente.");
        return;
    }

    async function fetchFila() {
        try {
            const response = await fetch(`https://sistema-karaoke-backend.onrender.com/clientes/fila/${adminId}`);
            const data = await response.json();
            console.log(data)
            if (!data.fila || data.fila.length === 0) {
                queueList.innerHTML = `<tr><td colspan="4">Nenhum cliente na fila.</td></tr>`;
                return;
            }

            queueList.innerHTML = "";

            data.fila.forEach((item, index) => {
                const tr = document.createElement("tr");

                tr.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${item.clienteNome}</td>
                    <td>${item.musica.titulo} - ${item.musica.artista}</td>
                    <td><button class="disabled-btn" disabled>⏳ Aguardando</button></td>
                `;

                queueList.appendChild(tr);
            });

        } catch (error) {
            console.error("Erro ao buscar fila:", error);
        }
    }

    fetchFila()
    setInterval( fetchFila(), 3000)
});
setInterval( fetchFila(), 3000)

