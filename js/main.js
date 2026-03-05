// ===== INFOTECH - MAIN JAVASCRIPT =====
// Suporte Técnico Especializado

(function() {
    'use strict';

    // ===== AGUARDAR DOM CARREGAR =====
    document.addEventListener('DOMContentLoaded', function() {
        initMobileMenu();
        initSmoothScroll();
        initContactForm();
        initHeaderScroll();
        initAnimations();
        initStatsCounter();
        initFormEffects();
        initConsoleMessage();
    });

    // ===== MENU MOBILE =====
    function initMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!hamburger || !navMenu) return;

        // Abrir/fechar menu
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu(hamburger, navMenu);
        });

        // Fechar ao clicar em link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                closeMenu(hamburger, navMenu);
            });
        });

        // Fechar ao clicar fora
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                closeMenu(hamburger, navMenu);
            }
        });

        // Prevenir scroll quando menu aberto
        navMenu.addEventListener('touchmove', function(e) {
            if (navMenu.classList.contains('active')) {
                e.preventDefault();
            }
        }, { passive: false });
    }

    function toggleMenu(hamburger, navMenu) {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    function closeMenu(hamburger, navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    // ===== ROLAGEM SUAVE =====
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                
                if (targetId === '#') return;
                
                const target = document.querySelector(targetId);
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ===== FORMULÁRIO DE CONTATO =====
    function initContactForm() {
        const contactForm = document.querySelector('.contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                // Simular envio bem-sucedido
                showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
                this.reset();
                resetFormFields(this);
            }
        });
    }

    function validateForm(form) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                markInvalidField(field);
            } else {
                markValidField(field);
            }
        });

        if (!isValid) {
            showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
        }

        return isValid;
    }

    function markInvalidField(field) {
        field.style.borderColor = '#ff4757';
        field.classList.add('error');
        
        field.addEventListener('input', function onInput() {
            this.style.borderColor = '';
            this.classList.remove('error');
            this.removeEventListener('input', onInput);
        }, { once: true });
    }

    function markValidField(field) {
        field.style.borderColor = 'var(--primary-green)';
        setTimeout(() => {
            field.style.borderColor = '';
        }, 1000);
    }

    function resetFormFields(form) {
        form.querySelectorAll('input, select, textarea').forEach(field => {
            field.style.borderColor = '';
            field.classList.remove('error', 'focused');
        });
    }

    // ===== NOTIFICAÇÕES =====
    function showNotification(message, type = 'info') {
        removeExistingNotifications();

        const notification = createNotification(message, type);
        document.body.appendChild(notification);

        setupNotificationEvents(notification);
        autoRemoveNotification(notification);
    }

    function removeExistingNotifications() {
        document.querySelectorAll('.notification').forEach(n => n.remove());
    }

    function createNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        const colors = {
            success: { bg: '#7ED321', text: '#000' },
            error: { bg: '#ff4757', text: '#000' },
            info: { bg: '#2a2a2a', text: '#fff' }
        };

        const color = colors[type] || colors.info;

        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close" aria-label="Fechar">&times;</button>
            </div>
        `;

        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            background: color.bg,
            color: color.text,
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            zIndex: '10000',
            maxWidth: '400px',
            animation: 'slideInRight 0.3s ease',
            fontSize: '0.95rem'
        });

        return notification;
    }

    function setupNotificationEvents(notification) {
        const closeBtn = notification.querySelector('.notification-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                closeNotification(notification);
            });
        }
    }

    function closeNotification(notification) {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }

    function autoRemoveNotification(notification) {
        setTimeout(() => {
            if (notification.parentNode) {
                closeNotification(notification);
            }
        }, 5000);
    }

    // Adicionar estilos das notificações
    addNotificationStyles();

    function addNotificationStyles() {
        if (document.querySelector('#notification-styles')) return;

        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            .notification-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
            }
            .notification-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: inherit;
                opacity: 0.7;
                transition: opacity 0.2s;
                padding: 0 5px;
            }
            .notification-close:hover {
                opacity: 1;
            }
            .notification.error input {
                border-color: #ff4757;
            }
        `;
        document.head.appendChild(style);
    }

    // ===== EFEITO DO HEADER NO SCROLL =====
    function initHeaderScroll() {
        const header = document.querySelector('.header');
        if (!header) return;

        let lastScrollTop = 0;
        const scrollThreshold = 100;

        window.addEventListener('scroll', throttle(function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Efeito de background
            if (scrollTop > scrollThreshold) {
                header.style.background = 'rgba(26, 26, 26, 0.98)';
                header.style.backdropFilter = 'blur(20px)';
            } else {
                header.style.background = 'rgba(26, 26, 26, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            }

            // Esconder/mostrar header
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        }, 100));
    }

    // ===== ANIMAÇÕES SCROLL =====
    function initAnimations() {
        const elements = document.querySelectorAll(
            '.plan-card, .service-card, .stat-item, .mission, .vision, .value-card, .timeline-item'
        );

        if (elements.length === 0) return;

        // Pré-configurar elementos
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Pequeno delay para efeito em cascata
                    const delay = Array.from(elements).indexOf(entry.target) * 0.1;
                    entry.target.style.transitionDelay = `${delay}s`;
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(el => observer.observe(el));
    }

    // ===== CONTADOR DE ESTATÍSTICAS =====
    function initStatsCounter() {
        const stats = document.querySelectorAll('.stat-item h3, .stat h3');
        if (stats.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(stat => observer.observe(stat));
    }

    function animateCounter(element) {
        const finalText = element.textContent;
        const numericValue = parseInt(finalText.replace(/\D/g, ''));
        
        if (!numericValue) return;

        const suffix = finalText.replace(/[\d\s]/g, '');
        let currentValue = 0;
        const increment = Math.ceil(numericValue / 50);
        
        const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue >= numericValue) {
                element.textContent = finalText;
                clearInterval(counter);
            } else {
                element.textContent = currentValue + suffix;
            }
        }, 20);
    }

    // ===== EFEITOS DE FORMULÁRIO =====
    function initFormEffects() {
        const formFields = document.querySelectorAll(
            '.contact-form input, .contact-form select, .contact-form textarea'
        );

        formFields.forEach(field => {
            // Efeito focus
            field.addEventListener('focus', function() {
                this.parentElement?.classList.add('focused');
                this.style.borderColor = 'var(--primary-green)';
            });
            
            field.addEventListener('blur', function() {
                this.parentElement?.classList.remove('focused');
                if (!this.value) {
                    this.style.borderColor = '';
                }
            });

            // Placeholder flutuante
            if (field.value) {
                field.parentElement?.classList.add('focused');
            }
        });
    }

    // ===== MENSAGEM NO CONSOLE =====
    function initConsoleMessage() {
        console.log(
            '%c🚀 InfoTech - Soluções em Tecnologia',
            'color: #70D800; font-size: 20px; font-weight: bold;'
        );
        console.log(
            '%cO melhor suporte técnico do Brasil!',
            'color: #cccccc; font-size: 14px;'
        );
        console.log(
            '%c🌐 https://www.infotechti.com',
            'color: #70D800; font-size: 12px;'
        );
    }

    // ===== UTILITÁRIOS =====
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // ===== API PÚBLICA =====
    window.InfoTech = {
        showNotification: showNotification,
        debounce: debounce,
        throttle: throttle
    };

})();
