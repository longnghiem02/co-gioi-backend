export class ErrorResponse {
  statusCode: number;
  message?: string;
  error?: string;

  constructor(statusCode: number, message?: string, error?: any) {
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
  }
}
