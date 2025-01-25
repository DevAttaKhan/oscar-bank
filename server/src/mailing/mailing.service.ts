import { SendMailOptions } from '@/common/interfaces/mail.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Transporter } from 'nodemailer';

@Injectable()
export class MailService {
  constructor(@Inject('MAIL_TRANSPORT') private readonly transporter: Transporter) {}

  async sendMail(options: SendMailOptions): Promise<void> {
    try {
      await this.transporter.sendMail(options);
      console.log(`Email sent successfully to ${options.to}`);
    } catch (error) {
      console.error('Error sending email:', error.message);
      throw new Error('Failed to send email');
    }
  }

  async sendPlainTextEmail(to: string, subject: string, text: string): Promise<void> {
    await this.sendMail({
      from: 'attakhandev@gmail.com',
      to,
      subject,
      text,
    });
  }

  async sendHtmlEmail(to: string, subject: string, html: string): Promise<void> {
    await this.sendMail({
      from: 'attakhandev@gmail.com',
      to,
      subject,
      html,
    });
  }

  async sendEmailWithAttachments(
    to: string,
    subject: string,
    html: string,
    attachments: { filename: string; path: string }[],
  ): Promise<void> {
    await this.sendMail({
      from: '"Your App Name" <no-reply@yourapp.com>',
      to,
      subject,
      html,
      attachments,
    });
  }
}
