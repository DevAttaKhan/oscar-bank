export interface SendMailOptions {
  from?: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
  attachments?: { filename: string; path: string }[];
}
