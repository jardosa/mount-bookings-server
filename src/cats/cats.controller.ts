import { TransformInterceptor } from './../interceptors/transform.interceptor';
import { LoggingInterceptor } from './../interceptors/logging.interceptor';
import { ExcludeNullInterceptor } from './../interceptors/exclude.null.interceptor';
import { ValidationPipe } from './pipes/validation.pipe';
import { HttpExceptionFilter } from './../exceptions/http-exception.filter';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';

import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';

@UseFilters(HttpExceptionFilter)
@UseInterceptors(ExcludeNullInterceptor, LoggingInterceptor, TransformInterceptor)
@Controller({ path: 'cats' })
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @HttpCode(201)
  create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(+id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catsService.remove(+id);
  }
}
