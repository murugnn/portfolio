// Wait for DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
  // Theme switcher functionality
  const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]')
  const currentTheme = localStorage.getItem("theme")

  if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme)
    if (currentTheme === "dark") {
      toggleSwitch.checked = true
    }
  }

  function switchTheme(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute("data-theme", "dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.setAttribute("data-theme", "light")
      localStorage.setItem("theme", "light")
    }
  }

  toggleSwitch.addEventListener("change", switchTheme, false)

  // Mobile Navigation Toggle
  const hamburger = document.querySelector(".hamburger")
  const navLinks = document.querySelector(".nav-links")

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active")
    hamburger.classList.toggle("active")
  })

  // Close mobile menu when clicking on a nav link
  const navItems = document.querySelectorAll(".nav-links a")
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active")
        hamburger.classList.remove("active")
      }
    })
  })

  // Smooth scrolling for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        // Calculate header height for offset
        const headerHeight = document.querySelector("header").offsetHeight
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Typewriter effect
  const typewriterElement = document.getElementById("typewriter")
  const phrases = ["Software Engineer", "Web Developer"]

  let phraseIndex = 0
  let charIndex = 0
  let isDeleting = false
  let typingSpeed = 100

  function typeWriter() {
    const currentPhrase = phrases[phraseIndex]

    if (isDeleting) {
      // Remove a character
      typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1)
      charIndex--
      typingSpeed = 50 // Faster when deleting
    } else {
      // Add a character
      typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1)
      charIndex++
      typingSpeed = 100 // Normal speed when typing
    }

    // If word is complete, start deleting after a pause
    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true
      typingSpeed = 1500 // Pause at the end of the phrase
    }

    // If deletion is complete, move to next word
    if (isDeleting && charIndex === 0) {
      isDeleting = false
      phraseIndex = (phraseIndex + 1) % phrases.length
      typingSpeed = 500 // Pause before starting new word
    }

    setTimeout(typeWriter, typingSpeed)
  }

  // Start the typewriter effect
  setTimeout(typeWriter, 1000)

  // Add active class to navigation based on scroll position
  const sections = document.querySelectorAll("section")
  const navLinksItems = document.querySelectorAll(".nav-links a")

  window.addEventListener("scroll", () => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navLinksItems.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })

    // Add box shadow to header on scroll
    const header = document.querySelector("header")
    if (window.scrollY > 0) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Animation on scroll (simple implementation)
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".animate-on-scroll")

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementPosition < windowHeight - 100) {
        element.classList.add("animated")
      }
    })
  }

  // Initial check for elements in view
  animateOnScroll()

  // Check for elements on scroll
  window.addEventListener("scroll", animateOnScroll)
})
