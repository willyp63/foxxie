declare namespace Cypress {
  interface Chainable<Subject = any> {
    tab(options?: Partial<{shift: Boolean}>): Chainable
    // add custom commands here
  }
}
