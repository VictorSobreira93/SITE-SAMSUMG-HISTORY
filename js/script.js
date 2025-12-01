// ========================================
// MENU MOBILE
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const navList = document.querySelector(".nav-list")

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", function () {
      navList.classList.toggle("active")

      // Animar o ícone do menu (transformar em X)
      const spans = this.querySelectorAll("span")
      if (navList.classList.contains("active")) {
        spans[0].style.transform = "rotate(45deg) translateY(10px)"
        spans[1].style.opacity = "0"
        spans[2].style.transform = "rotate(-45deg) translateY(-10px)"
      } else {
        spans[0].style.transform = "none"
        spans[1].style.opacity = "1"
        spans[2].style.transform = "none"
      }
    })
  }

  // Fechar menu ao clicar em um link
  const navLinks = document.querySelectorAll(".nav-list a")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        navList.classList.remove("active")
        const spans = mobileMenuToggle.querySelectorAll("span")
        spans[0].style.transform = "none"
        spans[1].style.opacity = "1"
        spans[2].style.transform = "none"
      }
    })
  })
})

// ========================================
// CARROSSEL DE IMAGENS
// ========================================
class Carousel {
  constructor(element) {
    this.carousel = element
    this.slides = this.carousel.querySelectorAll(".carousel-slide")
    this.prevBtn = this.carousel.querySelector(".carousel-btn-prev")
    this.nextBtn = this.carousel.querySelector(".carousel-btn-next")
    this.indicators = this.carousel.querySelectorAll(".indicator")
    this.currentSlide = 0
    this.autoPlayInterval = null

    this.init()
  }

  init() {
    // Event listeners para botões
    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () => this.prevSlide())
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () => this.nextSlide())
    }

    // Event listeners para indicadores
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => this.goToSlide(index))
    })

    // Auto play
    this.startAutoPlay()

    // Pausar auto play ao passar o mouse
    this.carousel.addEventListener("mouseenter", () => this.stopAutoPlay())
    this.carousel.addEventListener("mouseleave", () => this.startAutoPlay())

    // Suporte para touch/swipe em mobile
    this.setupTouchEvents()
  }

  goToSlide(n) {
    // Remover classe active de todos
    this.slides[this.currentSlide].classList.remove("active")
    this.indicators[this.currentSlide].classList.remove("active")

    // Atualizar índice
    this.currentSlide = n

    // Adicionar classe active ao novo slide
    this.slides[this.currentSlide].classList.add("active")
    this.indicators[this.currentSlide].classList.add("active")
  }

  nextSlide() {
    let next = this.currentSlide + 1
    if (next >= this.slides.length) {
      next = 0
    }
    this.goToSlide(next)
  }

  prevSlide() {
    let prev = this.currentSlide - 1
    if (prev < 0) {
      prev = this.slides.length - 1
    }
    this.goToSlide(prev)
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide()
    }, 5000) // Trocar a cada 5 segundos
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval)
    }
  }

  setupTouchEvents() {
    let touchStartX = 0
    let touchEndX = 0

    this.carousel.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX
    })

    this.carousel.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX
      this.handleSwipe()
    })

    const handleSwipe = () => {
      if (touchEndX < touchStartX - 50) {
        // Swipe left
        this.nextSlide()
      }
      if (touchEndX > touchStartX + 50) {
        // Swipe right
        this.prevSlide()
      }
    }

    this.handleSwipe = handleSwipe
  }
}

// Inicializar carrossel
document.addEventListener("DOMContentLoaded", () => {
  const carouselElement = document.getElementById("mainCarousel")
  if (carouselElement) {
    new Carousel(carouselElement)
  }
})

// ========================================
// LINHA DO TEMPO INTERATIVA
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  const timelineEvents = document.querySelectorAll(".timeline-event")

  timelineEvents.forEach((event) => {
    // Click para dispositivos mobile (toggle)
    event.addEventListener("click", function (e) {
      // Verificar se é dispositivo touch
      if ("ontouchstart" in window) {
        e.preventDefault()

        // Remover active de outros eventos
        timelineEvents.forEach((ev) => {
          if (ev !== this) {
            ev.classList.remove("active")
          }
        })

        // Toggle active no evento clicado
        this.classList.toggle("active")
      }
    })

    // Animação de fade in ao scroll
    observeElement(event)
  })
})

// ========================================
// INTERSECTION OBSERVER PARA ANIMAÇÕES
// ========================================
function observeElement(element) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    },
    {
      threshold: 0.1,
    },
  )

  element.style.opacity = "0"
  element.style.transform = "translateY(30px)"
  element.style.transition = "all 0.6s ease"

  observer.observe(element)
}

// Aplicar animações de scroll em elementos
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".card, .history-block, .curiosity-hover-card, .stat-card")

  animatedElements.forEach((element) => {
    observeElement(element)
  })
})

// ========================================
// CARDS DE CURIOSIDADES COM FLIP (TOUCH)
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  const curiosityCards = document.querySelectorAll(".curiosity-hover-card")

  curiosityCards.forEach((card) => {
    card.addEventListener("click", function (e) {
      // Para dispositivos touch, adicionar classe flipped
      if ("ontouchstart" in window) {
        e.preventDefault()
        this.classList.toggle("flipped")
      }
    })
  })
})

// ========================================
// MODAL DE CRÉDITOS
// ========================================
function openCreditsModal(event) {
  if (event) {
    event.preventDefault()
  }
  const modal = document.getElementById("creditsModal")
  if (modal) {
    modal.classList.add("active")
  }
}

function closeCreditsModal() {
  const modal = document.getElementById("creditsModal")
  if (modal) {
    modal.classList.remove("active")
  }
}

// Fechar modal ao clicar fora do conteúdo
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("creditsModal")
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeCreditsModal()
      }
    })
  }

  // Fechar modal com tecla ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCreditsModal()
    }
  })
})

// ========================================
// SCROLL SUAVE PARA HEADER FIXO
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header")
  let lastScroll = 0

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset

    // Adicionar sombra ao rolar
    if (currentScroll > 50) {
      header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)"
    } else {
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"
    }

    lastScroll = currentScroll
  })
})

// ========================================
// LOG DE DEBUG (pode remover em produção)
// ========================================
console.log("[v0] Samsung History - JavaScript carregado com sucesso")
console.log("[v0] Recursos implementados: Carrossel, Timeline Interativa, Menu Mobile, Animações")
