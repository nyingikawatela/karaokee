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
    
    document.querySelectorAll('.faq-question').forEach((button) => {
        button.addEventListener('click', () => {
            const answer = button.nextElementSibling;

            answer.style.display =  answer.style.display === 'block' ? 'none' : 'block';
        });
    });

    function entrar(){
        window.location.href = './Login.html';
    }