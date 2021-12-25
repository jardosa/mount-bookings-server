import { MongooseModule } from '@nestjs/mongoose';
import { PostsService } from './../posts/posts.service';
import { PostsModule } from './../posts/posts.module';
import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorResolver } from './author.resolver';
import { Author, AuthorSchema } from './schemas/author.schema';

@Module({
  imports: [PostsModule, MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }])],

  providers: [AuthorResolver, AuthorService, PostsService],
})
export class AuthorModule {}
