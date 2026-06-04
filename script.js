    // Animação de contagem para os números
function animateCount(element, target, suffix = '', prefix = '', duration = 2000) {
    let start = 0;
    const increment = target / (duration / 8);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = prefix + target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = prefix + Math.floor(start) + suffix;
        }
    }, 16);
}

// Função para extrair o número do texto
function extractNumber(text) {
    const match = text.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
}

// Função para obter prefixo e sufixo
function getPrefixSuffix(text) {
    const match = text.match(/([^\d]*)(\d+)([^\d]*)/);
    if (match) {
        return { prefix: match[1], suffix: match[3] };
    }
    return { prefix: '', suffix: '' };
}

// Inicializar animações quando a seção estiver visível
function initCountAnimation() {
    const cards = document.querySelectorAll('.card h2.gradient-text');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const originalText = element.textContent;
                const { prefix, suffix } = getPrefixSuffix(originalText);
                const target = extractNumber(originalText);
                
                animateCount(element, target, suffix, prefix);
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.5
    });

    cards.forEach(card => {
        observer.observe(card);
    });
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initCountAnimation);
