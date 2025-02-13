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
  
  checkAuthentication();

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("minimized");
}

function editProfile() {
    document.getElementById("edit-modal").style.display = "flex";
}

function closeEditModal() {
    document.getElementById("edit-modal").style.display = "none";
}

function saveProfile() {
    const name = document.getElementById("edit-name").value;
    const email = document.getElementById("edit-email").value;
    if (name && email) {
        alert(`Perfil atualizado:\nNome: ${name}\nEmail: ${email}`);
        closeEditModal();
    } else {
        alert("Preencha todos os campos.");
    }
}
function musicas(){
  window.location.href = "Musicas.html";
}
function dashboard(){
 window.location.href = "Dashboard.html";
}
function qrcode(){
  window.location.href = "qrcode.html";
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
