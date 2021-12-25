import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { Author, AuthorDocument } from './schemas/author.schema';
// import { Author } from './entities/author.entity';

@Injectable()
export class AuthorService {
  constructor(@InjectModel(Author.name) private authorModel: Model<AuthorDocument>) {}

  async create(createAuthorInput: CreateAuthorInput): Promise<Author> {
    const createdAuthor = new this.authorModel(createAuthorInput);
    return createdAuthor.save();
  }

  async findAll(): Promise<Author[]> {
    return this.authorModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} author`;
  }

  update(id: number, updateAuthorInput: UpdateAuthorInput) {
    return `This action updates a #${id} author`;
  }

  remove(id: number) {
    return `This action removes a #${id} author`;
  }
}
