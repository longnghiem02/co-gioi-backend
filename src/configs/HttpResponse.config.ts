export interface HttpResponse {
  statusCode: number;
  message: string;
  data: any;
}

export const HttpResponse = (status: number, message?: string, data?: any) => {
  return {
    statusCode: status,
    message: message,
    data: data,
  };
};
