import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { UploadModule } from './modules/upload/upload.module';
import { DownloadModule } from './modules/download/download.module';
import { MeasureModule } from './modules/measure/measure.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UploadModule,
    DownloadModule,
    MeasureModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
