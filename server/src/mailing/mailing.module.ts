import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { MailService } from './mailing.service';
import * as nodemailer from 'nodemailer';
import { HTMLTemplateService } from '@/common/services/html-template.service';
import { MailTemplateService } from './mail-template.service';

@Module({
  imports: [ConfigModule],
  providers: [
    HTMLTemplateService,
    MailTemplateService,
    MailService,
    {
      provide: 'MAIL_TRANSPORT',
      useFactory: async (configService: ConfigService) => {
        return nodemailer.createTransport({
          service: 'Gmail',
          host: configService.get<string>('MAIL_HOST'),
          port: configService.get<number>('MAIL_PORT'),
          auth: {
            user: configService.get<string>('MAIL_USER'),
            pass: configService.get<string>('MAIL_PASS'),
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [MailService, MailTemplateService],
})
export class MailingModule {}
