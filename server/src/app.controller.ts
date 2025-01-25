import { MailService } from './mailing/mailing.service';
import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { MailTemplateService } from './mailing/mail-template.service';
// import { Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private mailService: MailService,
    private mailTemplateService: MailTemplateService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('test')
  test(@Body() body) {
    return body;
  }

  @Get('/mail')
  async testMail() {
    const mailTempate = await this.mailTemplateService.renderMailTemplate('test', { name: 'Atta khan' });
    await this.mailService.sendHtmlEmail('coco@mailsac.com', 'testing', mailTempate);
    return mailTempate;
  }
}
