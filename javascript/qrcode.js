function musicas(){
    window.location.href = "Musicas.html";
}
function perfil(){
   window.location.href = "Perfil.html";
}
function qrcode(){
  window.location.href = "qrcode.html";
}

async function gerar(){
    try {
        const response = await fetch("http://localhost:3000/admin/qrcode", {
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
