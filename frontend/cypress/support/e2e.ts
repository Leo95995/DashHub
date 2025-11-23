// Import commands.js using ES2015 syntax:
import './commands'

// Avoid application exception ( skip the errors not related to the tests)
Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})
