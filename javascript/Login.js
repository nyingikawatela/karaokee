async function checkAuthentication() {
  try {
    // Aguardando a resolução da promise do fetch
    const response = await fetch("http://localhost:3000/checkAuthenticated", {
      method: "GET",
      credentials: "include",  // Necessário para enviar cookies
    });

    // Exibe o status da resposta após a promessa ser resolvida
    

    if (response.ok) {
      // Verifica se a resposta tem status 200 (autenticado)
      if (response.status === 200) {
        // Usuário autenticado, continue o carregamento da página
        document.body.classList.remove("hidden");
        
      } else if (response.status === 201) {
        // Usuário autenticado, redireciona para o dashboard
        window.location.href = "Dashboard.html";
        
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


  
  
  

document.getElementById("formulario").addEventListener("submit", async (evt) => {
    evt.preventDefault();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("password").value.trim();

    // Validações simples
    if (!email || !email.includes("@") || !email.includes(".")) {
        alert("Por favor, insira um email válido.");
        return;
    }

    if (!senha || senha.length < 8) {
        alert("A senha deve ter pelo menos 8 caracteres.");
        return;
    }

    const dados = { email, senha };

    try {
        const response = await fetch("http://localhost:3000/loginAdmin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dados),
          credentials: "include", // Essencial para cookies
      });

        if (response.ok) {
            const resultado = await response.json();
            window.location.href = "Dashboard.html";
        } else {
            alert("Credenciais inválidas. Tente novamente.");
        }
    } catch (e) {
        alert("Erro ao conectar ao servidor.");
        console.error(e);
    }
});
