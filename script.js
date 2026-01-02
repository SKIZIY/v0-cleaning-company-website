// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
const navMobile = document.querySelector(".nav-mobile")
const mobileLinks = document.querySelectorAll(".nav-mobile .nav-link")

mobileMenuToggle.addEventListener("click", () => {
  mobileMenuToggle.classList.toggle("active")
  navMobile.classList.toggle("active")
})

// Close mobile menu when clicking a link
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenuToggle.classList.remove("active")
    navMobile.classList.remove("active")
  })
})

// FAQ Accordion
const faqItems = document.querySelectorAll(".faq-item")

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question")

  question.addEventListener("click", () => {
    const isActive = item.classList.contains("active")

    // Close all FAQ items
    faqItems.forEach((faqItem) => {
      faqItem.classList.remove("active")
    })

    // Open clicked item if it wasn't active
    if (!isActive) {
      item.classList.add("active")
    }
  })
})

// Smooth Scroll for Anchor Links
const anchorLinks = document.querySelectorAll('a[href^="#"]')

anchorLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href")

    // Skip if it's just "#"
    if (href === "#") return

    e.preventDefault()

    const targetId = href.substring(1)
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      const headerHeight = document.querySelector(".sticky-header").offsetHeight
      const targetPosition = targetElement.offsetTop - headerHeight - 20

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Back to Top Button
const backToTopButton = document.getElementById("backToTop")

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    backToTopButton.classList.add("visible")
  } else {
    backToTopButton.classList.remove("visible")
  }
})

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// Header Shadow on Scroll
const header = document.querySelector(".sticky-header")

window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    header.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
  } else {
    header.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
  }
})

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".sticky-header") && navMobile.classList.contains("active")) {
    mobileMenuToggle.classList.remove("active")
    navMobile.classList.remove("active")
  }
})

// Chatbot Widget
const chatbotToggle = document.getElementById("chatbot-toggle")
const chatbotWindow = document.getElementById("chatbot-window")
const chatbotClose = document.getElementById("chatbot-close")
const chatbotMessages = document.getElementById("chatbot-messages")
const chatbotInput = document.getElementById("chatbot-input")
const chatbotSend = document.getElementById("chatbot-send")
const quickReplies = document.querySelectorAll(".quick-reply")

// Toggle chatbot window
function toggleChatbot() {
  chatbotToggle.classList.toggle("active")
  chatbotWindow.classList.toggle("active")
  if (chatbotWindow.classList.contains("active")) {
    chatbotInput.focus()
  }
}

chatbotToggle.addEventListener("click", toggleChatbot)
chatbotClose.addEventListener("click", toggleChatbot)

// Add message to chat
function addMessage(text, isUser = false) {
  const messageDiv = document.createElement("div")
  messageDiv.className = `message ${isUser ? "user-message" : "bot-message"}`

  const contentDiv = document.createElement("div")
  contentDiv.className = "message-content"

  const p = document.createElement("p")
  p.textContent = text
  contentDiv.appendChild(p)
  messageDiv.appendChild(contentDiv)

  chatbotMessages.appendChild(messageDiv)
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight
}

// Bot responses
function getBotResponse(userMessage) {
  const message = userMessage.toLowerCase()

  if (message.includes("cennik") || message.includes("cena") || message.includes("ile")) {
    return "Nasz cennik zależy od wielkości mieszkania. Sprzątanie podstawowe kawalerki 20m² to 150 PLN, a generalne 250 PLN. Zobacz pełny cennik na stronie lub zadzwoń: +48 623 100 666"
  } else if (message.includes("usług") || message.includes("oferuj")) {
    return "Oferujemy sprzątanie podstawowe, generalne, mycie okien oraz czyszczenie balkonów i tarasów. Wszystkie usługi wykonujemy profesjonalnie i dokładnie! 🧹✨"
  } else if (message.includes("termin") || message.includes("umów") || message.includes("rezerwacj")) {
    return "Świetnie! Jesteśmy dostępni 24/7. Zadzwoń do nas: +48 623 100 666, aby umówić dogodny termin sprzątania. 📞"
  } else if (message.includes("kontakt") || message.includes("zadzwon")) {
    return "Możesz do nas zadzwonić pod numer: +48 623 100 666. Jesteśmy dostępni 24 godziny na dobę, 7 dni w tygodniu! ⏰"
  } else if (message.includes("dzięk") || message.includes("dziękuj")) {
    return "Bardzo proszę! Chętnie pomożemy w każdej sprawie. 😊"
  } else if (message.includes("cześć") || message.includes("witaj") || message.includes("hej")) {
    return "Cześć! 👋 Jak mogę Ci pomóc dzisiaj?"
  } else {
    return "Dziękujemy za wiadomość! Aby uzyskać szczegółowe informacje, zadzwoń do nas: +48 623 100 666. Jesteśmy dostępni 24/7! 📞"
  }
}

// Send message
function sendMessage() {
  const message = chatbotInput.value.trim()
  if (!message) return

  // Add user message
  addMessage(message, true)
  chatbotInput.value = ""

  // Remove quick replies after first message
  const quickRepliesContainer = document.querySelector(".quick-replies")
  if (quickRepliesContainer) {
    quickRepliesContainer.remove()
  }

  // Add bot response after delay
  setTimeout(() => {
    const response = getBotResponse(message)
    addMessage(response, false)
  }, 500)
}

chatbotSend.addEventListener("click", sendMessage)
chatbotInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage()
  }
})

// Quick replies
quickReplies.forEach((btn) => {
  btn.addEventListener("click", () => {
    const message = btn.getAttribute("data-message")
    chatbotInput.value = message
    sendMessage()
  })
})
