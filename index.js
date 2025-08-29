const form = document.querySelector("form")
const email = document.getElementById('email')

// Create wrapper for input and error message
const inputWrapper = document.createElement('div')
inputWrapper.className = 'input-wrapper'

// Wrap the input
email.parentNode.insertBefore(inputWrapper, email)
inputWrapper.appendChild(email)

// Create error message element
const errorMessage = document.createElement('div')
errorMessage.className = 'error-message'
errorMessage.textContent = 'Please provide a valid email address'
errorMessage.hidden = true
errorMessage.setAttribute('role', 'alert')
errorMessage.setAttribute('aria-live', 'polite')
errorMessage.id = 'email-error'

// Add error message to the wrapper (below input)
inputWrapper.appendChild(errorMessage)

// Email validation function
function validateEmail(emailValue) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(emailValue)
}

// Validate on blur
email.addEventListener('blur', () => {
  const emailValue = email.value.trim()
  const isValid = emailValue && validateEmail(emailValue)
  
  email.setAttribute('aria-invalid', String(!isValid))
  email.setAttribute('aria-describedby', isValid ? 'email-help' : 'email-error')
  errorMessage.hidden = isValid
  
  if (!isValid) {
    email.classList.add('error')
  } else {
    email.classList.remove('error')
  }
})

// Validate on form submit
form.addEventListener('submit', (e) => {
  const emailValue = email.value.trim()
  const isValid = emailValue && validateEmail(emailValue)
  
  if (!isValid) {
    e.preventDefault()
    email.focus()
    email.setAttribute('aria-invalid', 'true')
    email.setAttribute('aria-describedby', 'email-error')
    errorMessage.hidden = false
    email.classList.add('error')
  }
})

// Clear error state when user starts typing
email.addEventListener('input', () => {
  if (email.classList.contains('error')) {
    email.classList.remove('error')
    email.setAttribute('aria-invalid', 'false')
    email.setAttribute('aria-describedby', 'email-help')
    errorMessage.hidden = true
  }
})
