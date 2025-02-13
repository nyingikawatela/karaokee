  
    document.querySelectorAll('.faq-question').forEach((button) => {
        button.addEventListener('click', () => {
            const answer = button.nextElementSibling;

            answer.style.display =  answer.style.display === 'block' ? 'none' : 'block';
        });
    });

    function entrar(){
        window.location.href = './Login.html';
    }