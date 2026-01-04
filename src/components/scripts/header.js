document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('[data-collapse-toggle="navbar-default"]');
    const navbar = document.getElementById('navbar-default');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const closeButton = document.getElementById('close-menu');
    const menuBackdrop = document.getElementById('menu-backdrop');
    
    // 1. Para pantallas grandes: menú original (opcional mantener)
    if (toggleButton && navbar) {
        toggleButton.addEventListener('click', () => {
            // Solo usar en desktop si quieres mantener esa funcionalidad
            if (window.innerWidth >= 768) {
                const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
                toggleButton.setAttribute('aria-expanded', String(!isExpanded));
                navbar.classList.toggle('hidden');
                navbar.classList.toggle('block');
            }
        });
    }
    
    // 2. Para móviles: menú lateral superpuesto
    if (toggleButton && mobileMenuOverlay) {
        toggleButton.addEventListener('click', () => {
            // Solo en móvil (menor a md: 768px)
            if (window.innerWidth < 768) {
                openMobileMenu();
            }
        });
    }
    
    // Función para abrir menú móvil
    function openMobileMenu() {
        mobileMenuOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Bloquear scroll
        
        // Pequeño delay para la animación
        setTimeout(() => {
            const menuPanel = mobileMenuOverlay.querySelector('.fixed.right-0');
            menuPanel.classList.remove('translate-x-full');
        }, 10);
        
        // Actualizar estado del botón
        if (toggleButton) {
            toggleButton.setAttribute('aria-expanded', 'true');
        }
    }
    
    // Función para cerrar menú móvil
    function closeMobileMenu() {
        const menuPanel = mobileMenuOverlay.querySelector('.fixed.right-0');
        menuPanel.classList.add('translate-x-full');
        
        // Esperar a que termine la animación
        setTimeout(() => {
            mobileMenuOverlay.classList.add('hidden');
            document.body.style.overflow = ''; // Restaurar scroll
            
            // Actualizar estado del botón
            if (toggleButton) {
                toggleButton.setAttribute('aria-expanded', 'false');
            }
        }, 300);
    }
    
    // Cerrar con botón X
    if (closeButton) {
        closeButton.addEventListener('click', closeMobileMenu);
    }
    
    // Cerrar haciendo clic en el fondo oscuro
    if (menuBackdrop) {
        menuBackdrop.addEventListener('click', closeMobileMenu);
    }
    
    // Cerrar con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !mobileMenuOverlay.classList.contains('hidden')) {
            closeMobileMenu();
        }
    });
    
    // Cerrar menú al hacer clic en un enlace (solo móvil)
    const mobileLinks = mobileMenuOverlay.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                closeMobileMenu();
            }
        });
    });
    
    // Manejar cambio de tamaño de ventana
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            // En desktop: asegurar que el menú lateral esté cerrado
            if (mobileMenuOverlay && !mobileMenuOverlay.classList.contains('hidden')) {
                closeMobileMenu();
            }
            // En desktop: mostrar menú horizontal
            if (navbar) {
                navbar.classList.remove('hidden');
                navbar.classList.add('md:flex');
            }
        } else {
            // En móvil: ocultar menú horizontal si existe
            if (navbar && toggleButton) {
                if (toggleButton.getAttribute('aria-expanded') === 'false') {
                    navbar.classList.add('hidden');
                    navbar.classList.remove('block');
                }
            }
        }
    });
});