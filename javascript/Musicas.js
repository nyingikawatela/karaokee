async function checkAuthentication() {
  try {
    // Aguardando a resolução da promise do fetch
    const response = await fetch("https://sistema-karaoke-backend.onrender.com/checkAuthenticated", {
      method: "GET",
      credentials: "include",  // Necessário para enviar cookies
    });

    // Exibe o status da resposta após a promessa ser resolvida


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
checkAuthentication()
function showAddModal() {
    document.getElementById("add-modal").style.display = "flex";
}
function closeAddModal() {
    document.getElementById("add-modal").style.display = "none";
}
function closeEditModal() {
    document.getElementById("edit-modal").style.display = "none";
} 
function editarMusica() {
  document.getElementById("edit-modal").style.display = "flex";
}
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("minimized");
}

async function AdicionarMusica(){


    const Titulo = document.getElementById("Titulo").value
    const Artista = document.getElementById("Artista").value
    const Genero = document.getElementById("Genero").value

    const musicaDados = { Titulo,Artista,Genero };

   

  try {
      const response = await fetch("https://sistema-karaoke-backend.onrender.com/adicionarMusica", {
          method: "POST",
          credentials: "include",
          headers: {
              "Content-Type": "application/json",// Substitua pelo token JWT válido
          },
          body: JSON.stringify(musicaDados),
      });
      if (response.ok) {
          const data = await response.json();
          alert("Música adicionada com sucesso:", data);
          closeAddModal()
      } else if (response.status === 409) {
          console.error("Erro: Música já existente.");
      } else if (response.status === 400) {
          const errorDetails = await response.json();
          console.error("Erro de validação:", errorDetails);
      } else {
          console.error("Erro desconhecido ao adicionar música.");
      }
  } catch (error) {
      console.error("Erro ao fazer a requisição:", error);
  }
}
  
async function fetchMusicas() {
  try {
      // Fazer a requisição para a API
      const response = await fetch("https://sistema-karaoke-backend.onrender.com/Musicas/BuscarTodos",{
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" }
      });
      const data = await response.json();
      const songsList = document.getElementById("songs-list");
      const noSongsMessage = document.getElementById("no-songs");

      // Limpar o conteúdo existente
      songsList.innerHTML = "";

      if (Array.isArray(data) && data.length > 0) {
          noSongsMessage.style.display = "none"; // Esconder a mensagem de "Nenhuma música"
          
          // Iterar sobre os dados e adicionar à tabela
          data.forEach((musica) => {
              const row = document.createElement("tr");
              row.innerHTML = `
                  <td>${musica.titulo}</td>
                  <td>${musica.artista}</td>
                  <td>${musica.genero}</td>
                  <td>
                      <button onclick="editarMusica()">Editar</button>
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

fetchMusicas(); 
setInterval(fetchMusicas, 3000)

function dashboard(){
  window.location.href = "Dashboard.html";
}
function perfil(){
 window.location.href = "Perfil.html";
}
function qrcode(){
  window.location.href = "qrcode.html";
}



async function deletarMusica(id) {
  try {
      const response = await fetch("https://sistema-karaoke-backend.onrender.com/musicas/apagar", {
          method: "DELETE",
          credentials: "include",  // Necessário para enviar cookies
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ id }) // Enviando o ID no corpo da requisição
      });

      const data = await response.json();

      if (response.ok) {
          alert("Música eliminada com sucesso!");
          fetchMusicas(); // Recarrega a lista de músicas após deletar
      } else {
          alert("Erro ao eliminar música: " + data.error);
      }
  } catch (error) {
      console.error("Erro ao deletar música:", error);
      alert("Erro ao conectar com o servidor.");
  }
}

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
