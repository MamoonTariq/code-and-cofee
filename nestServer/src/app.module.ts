import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TasksModule,
    MongooseModule.forRoot(
      'mongodb+srv://root:1Dch0At6m5AQ8wJU@et.ok63x.mongodb.net/nestJs?retryWrites=true&w=majority',
    ),
  ],
})
export class AppModule {}
