import { DefaultResolver } from './default-resolvers/default-resolvers.resolver';
import { logger, LoggerMiddleware } from './middleware/logger.middleware';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CatsModule } from './cats/cats.module';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthorModule } from './author/author.module';
import { PostsModule } from './posts/posts.module';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CaslModule } from './casl/casl.module';
import config from './config';

@Module({
  imports: [
    CatsModule,
    AuthorModule,
    DefaultResolver,
    PostsModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      subscriptions: {
        'graphql-ws': true,
      },
    }),
    MongooseModule.forRoot(config.MONGODB_URI, {}),
    UsersModule,
    AuthModule,
    CaslModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(logger)
      .forRoutes({ path: 'cats', method: RequestMethod.GET });
  }
}
