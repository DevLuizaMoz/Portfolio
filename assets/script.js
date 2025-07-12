function showSidebar(event) {
    if (event) {
        event.preventDefault();
    }
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
}

function hideSidebar(event) {
    if (event) {
        if(event.target.tagName.toLowerCase() === 'a') {
        } else {
            event.preventDefault();
        }
    }
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
}

document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', (event) => {
        hideSidebar(event);
    });
});

function setLoaderPercentage(loaderId, percentageId, value) {
    const loaderCircle = document.getElementById(loaderId).querySelector('circle');
    const loaderPercentage = document.getElementById(percentageId);
    
    value = Math.min(Math.max(value, 0), 100);
    
    const circumference = 2 * Math.PI * 45; 
    const offset = circumference - (value / 100) * circumference;
   
    loaderCircle.style.strokeDasharray = `${circumference}`;
    loaderCircle.style.strokeDashoffset = `${offset}`;
    
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

document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const formContainer = document.querySelector('.form-container');
  const backBtn = document.getElementById('backBtn');
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const submitBtn = this.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    fetch(this.action, {
      method: this.method,
      body: new FormData(this)
    })
    .then(response => {
      if (response.ok) {
        formContainer.classList.add('flipped');
      } else {
        throw new Error('Erro no envio');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar';
    });
  });
  backBtn.addEventListener('click', function(e) {
    e.preventDefault();
    formContainer.classList.remove('flipped');
  });
});
