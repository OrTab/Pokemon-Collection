type LogLevel = "INFO" | "ERROR" | "WARN" | "DEBUG";

class Logger {
  private getTimestamp(): string {
    return new Date().toISOString();
  }

  private formatMessage(level: LogLevel, message: string, meta?: any): string {
    const timestamp = this.getTimestamp();
    const metaString = meta ? ` ${JSON.stringify(meta)}` : "";
    return `[${timestamp}] ${level}: ${message}${metaString}`;
  }

  info(message: string, meta?: any) {
    console.log(this.formatMessage("INFO", message, meta));
  }

  error(message: string, meta?: any) {
    console.error(this.formatMessage("ERROR", message, meta));
  }

  warn(message: string, meta?: any) {
    console.warn(this.formatMessage("WARN", message, meta));
  }

  debug(message: string, meta?: any) {
    console.debug(this.formatMessage("DEBUG", message, meta));
  }
}

export const logger = new Logger();
