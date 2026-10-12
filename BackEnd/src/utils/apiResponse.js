/**
 * Standard API response structure.
 */
class ApiResponse {
  /**
   * @param {number} statusCode - HTTP status code (e.g., 200, 201, 400, 500).
   * @param {string} message - A message describing the result.
   * @param {object | Array | null} data - The response payload.
   * @param {string | object | null} error - Error details, if any.
   */
  constructor(statusCode, message, data = null, error = null) {
    this.success = statusCode < 300;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.error = error;
  }
}

module.exports = ApiResponse;
