import { Injectable } from '@nestjs/common';
import { Item } from './item.model';

@Injectable()
export class ItemsService {
  private items: Item[] = [];

  findAll(): Item[] {
    return this.items;
  }

  findOne(id: number): Item {
    return this.items.find((item) => item.id === id);
  }

  create(item: Omit<Item, 'id'>): Item {
    const newItem = {
      id: Date.now(),
      ...item,
    };
    this.items.push(newItem);
    return newItem;
  }

  update(id: number, updatedItem: Partial<Item>): Item {
    const item = this.findOne(id);
    if (item) {
      Object.assign(item, updatedItem);
      return item;
    }
  }

  delete(id: number): boolean {
    const index = this.items.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.items.splice(index, 1);
      return true;
    }
    return false;
  }
}
