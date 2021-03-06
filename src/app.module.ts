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

import { GraphQLModule } from '@nestjs/graphql';
import { AuthorModule } from './author/author.module';
import { PostsModule } from './posts/posts.module';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CaslModule } from './casl/casl.module';
import { MembersModule } from './members/members.module';
import { ReservationsModule } from './reservations/reservations.module';
import { DestinationsModule } from './destinations/destinations.module';
import config from './config';

@Module({
  imports: [
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
    MembersModule,
    ReservationsModule,
    DestinationsModule,
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
