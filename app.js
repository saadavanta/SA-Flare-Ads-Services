// Mobile Navigation Toggle
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }),
)

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({
    behavior: "smooth",
  })
}

// Contact Functions
function openWhatsApp() {
  const message = encodeURIComponent("Hi SA Flare! I'm interested in your ad services. Can you help me get started?")
  window.open(`https://wa.me/923044444138?text=${message}`, "_blank")
}

function openEmail() {
  window.open("mailto:slisaad445@gmail.com?subject=Ad Services Inquiry", "_blank")
}

function makeCall() {
  window.open("tel:+923044444138", "_blank")
}

function requestGoldRush() {
  const message = encodeURIComponent(
    "Hi SA Flare! I need GOLD RUSH service for 48-hour delivery. Please send me details.",
  )
  window.open(`https://wa.me/923044444138?text=${message}`, "_blank")
}

// Order Form Modal
function showOrderForm() {
  document.getElementById("orderModal").style.display = "block"
  document.body.style.overflow = "hidden"
}

function closeOrderForm() {
  document.getElementById("orderModal").style.display = "none"
  document.body.style.overflow = "auto"
}

// Close modal when clicking outside
window.onclick = (event) => {
  const modal = document.getElementById("orderModal")
  if (event.target == modal) {
    closeOrderForm()
  }
}

// Package pricing data
const packagePrices = {
  "social-basic": { name: "Social Media Ad Suite (Basic)", price: 150, description: "3 Social Media Ads" },
  "social-premium": {
    name: "Social Media Ad Suite (Premium)",
    price: 250,
    description: "5 Social Media Ads + Targeting",
  },
  "video-single": { name: "Video Ad Creation", price: 100, description: "1 Professional Video Ad" },
  "complete-suite": { name: "Complete Ad Suite", price: 300, description: "5 Social + 1 Video Ad" },
}

// Update order summary when package or rush delivery changes
document.getElementById("package").addEventListener("change", updateOrderSummary)
document.getElementById("rushDelivery").addEventListener("change", updateOrderSummary)

function updateOrderSummary() {
  const packageSelect = document.getElementById("package")
  const rushDelivery = document.getElementById("rushDelivery")
  const orderSummary = document.getElementById("orderSummary")
  const summaryContent = document.getElementById("summaryContent")

  if (packageSelect.value) {
    const selectedPackage = packagePrices[packageSelect.value]
    const basePrice = selectedPackage.price
    const rushFee = rushDelivery.checked ? Math.round(basePrice * 0.2) : 0
    const totalPrice = basePrice + rushFee
    const upfrontPayment = Math.round(totalPrice * 0.5)
    const remainingPayment = totalPrice - upfrontPayment

    summaryContent.innerHTML = `
            <div style="margin-bottom: 15px;">
                <h4 style="color: #FFD700; margin-bottom: 10px;">${selectedPackage.name}</h4>
                <p style="color: #666; margin-bottom: 15px;">${selectedPackage.description}</p>
            </div>
            <div style="border-top: 1px solid #ddd; padding-top: 15px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                    <span>Package Price:</span>
                    <span>$${basePrice}</span>
                </div>
                ${
                  rushFee > 0
                    ? `
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px; color: #FFD700;">
                    <span>Rush Delivery (+20%):</span>
                    <span>+$${rushFee}</span>
                </div>
                `
                    : ""
                }
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 1.2rem; font-weight: bold; color: #FFD700;">
                    <span>Total:</span>
                    <span>$${totalPrice}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                    <span>Pay Now (50%):</span>
                    <span>$${upfrontPayment}</span>
                </div>
                <div style="display: flex; justify-content: space-between; color: #666;">
                    <span>Pay After Delivery:</span>
                    <span>$${remainingPayment}</span>
                </div>
            </div>
        `
    orderSummary.style.display = "block"
  } else {
    orderSummary.style.display = "none"
  }
}

// Form submission
function submitOrder(event) {
  event.preventDefault()

  const formData = new FormData(event.target)
  const orderData = {
    package: formData.get("package"),
    rushDelivery: formData.get("rushDelivery") === "on",
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    company: formData.get("company"),
    description: formData.get("description"),
    website: formData.get("website"),
    timestamp: new Date().toISOString(),
  }

  // Calculate pricing
  const selectedPackage = packagePrices[orderData.package]
  const basePrice = selectedPackage.price
  const rushFee = orderData.rushDelivery ? Math.round(basePrice * 0.2) : 0
  const totalPrice = basePrice + rushFee
  const upfrontPayment = Math.round(totalPrice * 0.5)

  // Create email content
  const emailSubject = encodeURIComponent("New Order - SA Flare")
  const emailBody = encodeURIComponent(`
New Order Received - SA Flare

Client Details:
- Name: ${orderData.name}
- Email: ${orderData.email}
- Phone: ${orderData.phone}
- Company: ${orderData.company || "Not provided"}

Order Details:
- Package: ${selectedPackage.name}
- Total Price: $${totalPrice}
- Upfront Payment: $${upfrontPayment}
- Rush Delivery: ${orderData.rushDelivery ? "Yes" : "No"}

Project Description:
${orderData.description}

Website/Links: ${orderData.website || "Not provided"}

Payment Number: 03044444138
Order Time: ${orderData.timestamp}

Please contact the client within 10 minutes to provide payment details.
    `)

  // Send email to SA Flare team
  window.open(`mailto:slisaad445@gmail.com?subject=${emailSubject}&body=${emailBody}`, "_blank")

  // Also send to Hassan Rashid
  window.open(`mailto:chh2d300@gmail.com?subject=${emailSubject}&body=${emailBody}`, "_blank")

  // Show success message
  const modalBody = document.querySelector(".modal-body")
  modalBody.innerHTML = `
        <div class="success-message">
            <h3 style="color: #155724; margin-bottom: 15px;">Order Submitted Successfully!</h3>
            <p style="margin-bottom: 10px;">Thank you for your order! We'll contact you within 10 minutes with payment details.</p>
            <p style="margin-bottom: 15px;"><strong>Order Summary:</strong></p>
            <ul style="margin-bottom: 15px;">
                <li>Package: ${selectedPackage.name}</li>
                <li>Total Price: $${totalPrice}</li>
                <li>Upfront Payment: $${upfrontPayment}</li>
                <li>Rush Delivery: ${orderData.rushDelivery ? "Yes" : "No"}</li>
            </ul>
            <p style="margin-bottom: 15px;"><strong>Payment Details:</strong></p>
            <p style="margin-bottom: 10px;">Send payment to: <strong>03044444138</strong></p>
            <p style="margin-bottom: 15px;">Available methods: EasyPaisa, JazzCash, SadaPay, NayaPay</p>
            <div style="display: flex; gap: 10px; justify-content: center;">
                <button onclick="openWhatsApp()" class="btn-primary">
                    <i class="fab fa-whatsapp"></i> WhatsApp Us
                </button>
                <button onclick="closeOrderForm()" class="btn-secondary">Close</button>
            </div>
        </div>
    `

  // Auto-close modal after 10 seconds
  setTimeout(() => {
    closeOrderForm()
    // Reset form
    document.getElementById("orderForm").reset()
    updateOrderSummary()
  }, 10000)
}

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.backdropFilter = "blur(10px)"
  } else {
    navbar.style.background = "#ffffff"
    navbar.style.backdropFilter = "none"
  }
})

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe all cards and sections
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".service-card, .feature-card, .package-card, .testimonial-card, .contact-card",
  )

  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})

// Add loading states to buttons
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", function () {
    if (this.type !== "submit") return

    const originalText = this.innerHTML
    this.innerHTML = '<span class="loading"></span> Processing...'
    this.disabled = true

    setTimeout(() => {
      this.innerHTML = originalText
      this.disabled = false
    }, 2000)
  })
})

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  // Add smooth scrolling to all anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Add click tracking for analytics (you can integrate with Google Analytics)
  document.querySelectorAll("button, .btn-primary, .btn-secondary").forEach((element) => {
    element.addEventListener("click", function () {
      console.log("Button clicked:", this.textContent.trim())
      // Add your analytics tracking code here
    })
  })
})

// Error handling for external links
document.querySelectorAll('a[target="_blank"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    try {
      // Link will open normally
    } catch (error) {
      console.error("Error opening external link:", error)
      alert("Unable to open link. Please try again.")
    }
  })
})

// Form validation
function validateForm(form) {
  const requiredFields = form.querySelectorAll("[required]")
  let isValid = true

  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      field.style.borderColor = "#dc3545"
      isValid = false
    } else {
      field.style.borderColor = "#FFD700"
    }
  })

  return isValid
}

// Add form validation to order form
document.getElementById("orderForm").addEventListener("submit", function (e) {
  if (!validateForm(this)) {
    e.preventDefault()
    alert("Please fill in all required fields.")
  }
})

// Auto-save form data to localStorage
function saveFormData() {
  const formData = new FormData(document.getElementById("orderForm"))
  const data = {}
  for (const [key, value] of formData.entries()) {
    data[key] = value
  }
  localStorage.setItem("saFlareOrderForm", JSON.stringify(data))
}

function loadFormData() {
  const savedData = localStorage.getItem("saFlareOrderForm")
  if (savedData) {
    const data = JSON.parse(savedData)
    Object.keys(data).forEach((key) => {
      const field = document.querySelector(`[name="${key}"]`)
      if (field) {
        if (field.type === "checkbox") {
          field.checked = data[key] === "on"
        } else {
          field.value = data[key]
        }
      }
    })
    updateOrderSummary()
  }
}

// Save form data on input
document.getElementById("orderForm").addEventListener("input", saveFormData)

// Load saved form data when modal opens
document.querySelector(".order-btn").addEventListener("click", () => {
  setTimeout(loadFormData, 100)
})

// Clear saved data after successful submission
function clearSavedFormData() {
  localStorage.removeItem("saFlareOrderForm")
}

// Add to the submitOrder function
// clearSavedFormData(); // Add this line at the end of submitOrder function

console.log("SA Flare website loaded successfully!")
