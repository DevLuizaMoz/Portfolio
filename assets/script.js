function showSidebar(event) {
    if (event) {
        event.preventDefault(); // Impede que o link redirecione a página para o topo
    }
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
}

function hideSidebar(event) {
    if (event) {
        if(event.target.tagName.toLowerCase() === 'a') {
            // Não impede o comportamento padrão se o alvo for um link
        } else {
            event.preventDefault(); // Impede que o link redirecione a página para o topo
        }
    }
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
}

// Adiciona evento de clique a todos os links dentro do sidebar para fechar o menu
document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', (event) => {
        hideSidebar(event);
    });
});

function setLoaderPercentage(loaderId, percentageId, value) {
    const loaderCircle = document.getElementById(loaderId).querySelector('circle');
    const loaderPercentage = document.getElementById(percentageId);
    
    // Limitar o valor entre 0 e 100
    value = Math.min(Math.max(value, 0), 100);
    
    // Calcular o comprimento do traço
    const circumference = 2 * Math.PI * 45; // 45 é o raio do círculo
    const offset = circumference - (value / 100) * circumference;
    
    // Atualizar o stroke-dashoffset do círculo
    loaderCircle.style.strokeDasharray = `${circumference}`;
    loaderCircle.style.strokeDashoffset = `${offset}`;
    
    // Atualizar o texto de porcentagem
    loaderPercentage.textContent = `${value}%`;
}

function observeLoader(elementId, percentageId, value) {
    const element = document.getElementById(elementId);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setLoaderPercentage(elementId, percentageId, value);
                observer.unobserve(element);
            }
        });
    });

    observer.observe(element);
}

// Exemplo de uso: Atualizar os carregadores somente quando o usuário visualizar o elemento
observeLoader('loader-html-css', 'percentage-html-css', 90);
observeLoader('loader-js', 'percentage-js', 85);
observeLoader('loader-python', 'percentage-python', 80);



// script.js

// Seleciona a barra de progresso e a div pai
const progressBar = document.querySelector('.timeline_progress-bar'); // Seletor da barra de progresso
const parentDiv = document.querySelector('.mostra-linha'); // Seletor da div pai

// Cria um observador de interseção
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Adiciona a classe 'visible' à barra de progresso quando a div pai é visualizada
            progressBar.classList.add('visible');
            console.log('Div pai visível: classe "visible" adicionada à barra de progresso.');
        } else {
            // Remove a classe 'visible' da barra de progresso quando a div pai não é mais visualizada
            progressBar.classList.remove('visible');
            console.log('Div pai invisível: classe "visible" removida da barra de progresso.');
        }
    });
});

// Inicia a observação da div pai
observer.observe(parentDiv);