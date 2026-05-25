function toggleObjecao(el) {
  el.classList.toggle('open');
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Animação de digitação no logo
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Iniciar animação quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
  const typingElement = document.querySelector('.typing-text');
  if (typingElement) {
    setTimeout(() => {
      typeWriter(typingElement, 'singular.', 80);
    }, 500);
  }

  const heroTypingElement = document.querySelector('.hero-typing-text');
  if (heroTypingElement) {
    setTimeout(() => {
      const heroText = 'Cada dia sem<br>cliente é <span class="accent">dinheiro</span><br><span class="outline">indo embora.</span>';
      typeWriterHTML(heroTypingElement, heroText, 50);
    }, 1200);
  }
});

// Função para digitar texto com HTML
function typeWriterHTML(element, html, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < html.length) {
      // Verifica se estamos no meio de uma tag HTML
      if (html.charAt(i) === '<') {
        const tagEnd = html.indexOf('>', i);
        if (tagEnd !== -1) {
          element.innerHTML += html.substring(i, tagEnd + 1);
          i = tagEnd + 1;
          setTimeout(type, speed);
          return;
        }
      }
      element.innerHTML += html.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      // Remove o cursor após a digitação terminar
      const cursor = document.querySelector('.hero-cursor');
      if (cursor) {
        setTimeout(() => {
          cursor.style.display = 'none';
        }, 2000);
      }
    }
  }
  
  type();
}
