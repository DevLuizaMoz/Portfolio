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
observeLoader('loader-html-css', 'percentage-html-css', 90);
observeLoader('loader-js', 'percentage-js', 85);
observeLoader('loader-python', 'percentage-python', 80);


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});
