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

    // Remove espaços extras nos campos
    let nome = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let telefone = document.getElementById("phone").value.trim();
    let senha = document.getElementById("password").value.trim();

    // Verificar se o nome está vazio após o trim
    if (nome === "" || /^\s*$/.test(nome)) {
        alert("O nome não pode estar vazio ou conter apenas espaços.");
        return;
    }

    // Validação para permitir caracteres com acento, mas sem caracteres especiais indesejados
    const caracteresInvalidos = /[^a-zA-ZÀ-ÿ0-9\s\-]/g;  // Permite letras com acento e hífen
    if (caracteresInvalidos.test(nome)) {
        alert("O nome não pode conter caracteres especiais (exceto hífen).");
        return;
    }

    // Verificação de caracteres especiais para telefone
    if (/\D/.test(telefone)) {  // Verifica se há qualquer caractere não numérico
        alert("O telefone deve conter apenas números.");
        return;
    }

    // Validação do telefone - O telefone deve ter pelo menos 9 caracteres numéricos
    if (telefone.length < 9) {
        alert("O telefone deve ter pelo menos 9 caracteres.");
        return;
    }

    // Validação do email - Permite caracteres especiais válidos no email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        alert("Por favor, insira um email válido.");
        return;
    }

    // Validação de senha - A senha pode conter letras, números e caracteres especiais e deve ter pelo menos 8 caracteres
    const senhaRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    if (!senhaRegex.test(senha)) {
        alert("A senha deve ter pelo menos 8 caracteres, incluindo letras e números.");
        return;
    }

    // Criando o objeto com os dados para envio
    const dados = { nome, email, telefone, senha };

    try {
        const response = await fetch("http://localhost:3000/criarAdmin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dados),
        });

        if (response.ok) {
            const resultado = await response.json();
            alert("Usuário cadastrado com sucesso!");
            window.location.href = "Login.html"; 
        } else {
            const resultado = await response.json();
            if (response.status === 400) {
                if (resultado.error === "Erro de validação") {
                    const detalhes = resultado.detalhes.map(err => err.message).join(", ");
                    alert(`Erro de validação: ${detalhes}`);
                } else {
                    alert("Erro ao validar dados fornecidos. Verifique as informações.");
                }
            } else if (response.status === 409) {
                alert("Erro: O cadastro não pôde ser realizado. Já existe um usuário com esses dados.");
            } else if (response.status === 500) {
                alert("Ocorreu um erro interno. Por favor, tente novamente mais tarde.");
            } else {
                alert("Algo deu errado. Por favor, tente novamente.");
            }
        }
    } catch (err) {
        alert("Erro ao tentar cadastrar usuário. Verifique sua conexão e tente novamente.");
        console.error(err);
    }
});
