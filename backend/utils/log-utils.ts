export const getLogLevel = (statusCode: number, durationMs: number) => {
  return statusCode >= 500
    ? "ERROR"
    : statusCode >= 400
    ? "WARN"
    : durationMs > 500
    ? "WARN"
    : "INFO";
};
