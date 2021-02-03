/**
 * Logging Utility Class
 * TODO(LOGGER) Implement Unit Tests
 */
class Logger {
  /**
   * Log an Event with a message and optional context
   * @param {string} message
   * @param {object} context
   * @returns {void}
   */
  static logEvent(message, context = {}) {
    window.gtag('event', message, context)
  }
}

export default Logger
