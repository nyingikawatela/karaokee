async function checkAuthentication() {
  try {
    // Aguardando a resolução da promise do fetch
    const response = await fetch("https://sistema-karaoke-backend.onrender.com/checkAuthenticated", {
      method: "GET",
      credentials: "include",  // Necessário para enviar cookies
    });



    if (response.ok) {
      // Verifica se a resposta tem status 200 (autenticado)
      if (response.status === 200) {
        // Usuário autenticado, continue o carregamento da página
        window.location.href = "Login.html";
      } else if (response.status === 201) {
        // Usuário autenticado, redireciona para o dashboard
        document.body.classList.remove("hidden");
      } else {
        // Usuário não autenticado, redireciona para login
      }
    } else {
      // Se a resposta não for ok, exibe erro
      console.log("Erro");
    }
  } catch (error) {
    // Trata erros de rede ou outros erros
    console.log("Erro ao fazer a requisição:", error);
  }
}
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("minimized");
}
checkAuthentication();
async function  terminarSessao()
{
    const response =  await fetch("https://sistema-karaoke-backend.onrender.com/logout", {
        method: "GET",
        credentials: "include", // Garante o envio do cookie
      });
  
      if (response.ok) {
        const data =  response.json();
        console.log(data.message); // Exibe: "Sessão encerrada com sucesso!"
        window.location.href = "Login.html";
      } else {
        console.error("Erro ao realizar logout:", response.statusText);
      }
} 

function musicas(){
    window.location.href = "Musicas.html";
}
function perfil(){
   window.location.href = "Perfil.html";
}
function qrcode(){
  window.location.href = "qrcode.html";
}

async function carregarFila() {
  try {
      const response = await fetch("https://sistema-karaoke-backend.onrender.com/fila", {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" }
      });

      if (!response.ok) throw new Error("Erro ao buscar a fila");
      
      const data = await response.json();
      const fila = data.fila; // Certifique-se de que o backend retorna `{ fila: [...] }`

      const tbody = document.getElementById("queue-body");
      const noQueueMessage = document.getElementById("no-queue");

      tbody.innerHTML = ""; // Limpa a tabela antes de adicionar novos itens

      if (fila.length === 0) {
          noQueueMessage.style.display = "block";
          return;
      }

      noQueueMessage.style.display = "none";

      fila.forEach((cliente) => {
          const tr = document.createElement("tr");

          tr.innerHTML = `
              <td>${cliente.clienteNome}</td>
              <td>${cliente.musica.titulo} - ${cliente.musica.artista}</td>
              <td>${cliente.status}</td>
              <td><button class="delete-btn" data-id="${cliente.id}">🗑️</button></td>
              <td><input type="checkbox" class="select-item" data-id="${cliente.id}"></td>
          `;

          tbody.appendChild(tr);
      });

      // Adiciona evento aos botões de remoção
      document.querySelectorAll(".delete-btn").forEach(button => {
          button.addEventListener("click", function() {
              const filaID = this.getAttribute("data-id");
              removerFila(filaID);
          });
      });

  } catch (error) {
      console.error("Erro ao carregar a fila:", error);
  }
}


document.addEventListener("DOMContentLoaded", carregarFila);
setInterval(carregarFila(), 3000)

async function removerFila(filaID) {
  if (!confirm("Deseja realmente remover este cliente da fila?")) return;

  try {
      const response = await fetch("https://sistema-karaoke-backend.onrender.com/removerusuario", {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filaID }) 
      });

      if (!response.ok) throw new Error("Erro ao remover da fila");

      alert("Cliente removido com sucesso!");
      carregarFila(); // Atualiza a tabela após a remoção
  } catch (error) {
      console.error("Erro ao remover da fila:", error);
  }
}



    
