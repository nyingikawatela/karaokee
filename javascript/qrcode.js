function musicas(){
    window.location.href = "Musicas.html";
}
function perfil(){
   window.location.href = "Perfil.html";
}
function dashboard(){
  window.location.href = "Dashboard.html";
}

async function gerar(){
    try {
        const response = await fetch("https://sistema-karaoke-backend.onrender.com/admin/qrcode", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        console.log("Ola")
        if (response.ok) {
            document.getElementById("qr").src = data.qrCodeUrl;
            localStorage.setItem("imagem", data.qrCodeUrl);
        } else {
            alert("Erro ao gerar QR Code: " + data.error);
        }
    } catch (error) {
        console.error("Erro ao conectar com o servidor:", error);
        alert("Erro ao conectar com o servidor.");
    }
}
async function  terminarSessao()
{
    const response =  await fetch("http://localhost:3000/logout", {
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


const url = document.getElementById("qr").src;
    
function imprimir() {
    const url = document.getElementById("qr").src;
    
    if (url) {
        let novaJanela = window.open();
        novaJanela.document.write(`
            <html>
                <head>
                    <title>Visualização da Imagem</title>
                </head>
                <body style="display: flex; justify-content:center; align-items: center; flex-direction: column; height: 100vh">
                    <img src="${url}" style="max-width: 100%; height: auto;">
                    <br>
                    <a href="${url}" download="imagem.png" style="display: block; margin-top: 10px; font-size: 18px;">Baixar Imagem</a>
                </body>
            </html>
        `);
        novaJanela.document.title = "Visualização da Imagem";
        novaJanela.document.close();
    } else {
        alert("Imagem não encontrada!");
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
