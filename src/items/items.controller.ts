import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './item.model';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  findAll(): Item[] {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Item {
    const item = this.itemsService.findOne(Number(id));
    if (!item) {
      throw new NotFoundException('Item not found');
    }
    return item;
  }

  @Post()
  create(@Body() createItemDto: Omit<Item, 'id'>): Item {
    return this.itemsService.create(createItemDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateItemDto: Partial<Item>): Item {
    const item = this.itemsService.update(Number(id), updateItemDto);
    if (!item) {
      throw new NotFoundException('Item not found');
    }
    return item;
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    const deleted = this.itemsService.delete(Number(id));
    if (!deleted) {
      throw new NotFoundException('Item not found');
    }
  }
}
