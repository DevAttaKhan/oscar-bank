import { Injectable } from '@nestjs/common';
import * as ejs from 'ejs';

@Injectable()
export class HTMLTemplateService {
  async render(templatePath: string, data: Record<string, any>): Promise<string> {
    try {
      console.log({ templatePath });
      return await ejs.renderFile(templatePath, data);
    } catch (error) {
      console.error('Error rendering email template:', error.message);
      throw new Error('Failed to render email template');
    }
  }
}
