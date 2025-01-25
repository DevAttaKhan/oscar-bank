import { HTMLTemplateService } from './../common/services/html-template.service';
import { Injectable } from '@nestjs/common';
import * as path from 'path';

@Injectable()
export class MailTemplateService {
  constructor(private htmlTemplateService: HTMLTemplateService) {}

  renderMailTemplate(templateName: string, data?: Record<string, any>) {
    const templatePath = path.join(__dirname, 'templates', `${templateName}.ejs`);

    return this.htmlTemplateService.render(templatePath, data);
  }
}
