export function SuccessResponse<T>(code: number, data: T): Response {
  return new Response(JSON.stringify({ code, data, error: null }), {
    status: code,
    headers: { 'Content-Type': 'application/json' },
  });
}

export function ErrorResponse(code: number, error: string): Response {
  return new Response(JSON.stringify({ code, data: null, error }), {
    status: code,
    headers: { 'Content-Type': 'application/json' },
  });
}
