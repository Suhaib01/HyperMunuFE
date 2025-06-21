import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'jsonToArray' })
export class JsonToArrayPipe implements PipeTransform {
  transform(value: string): any[] {
    try {
      return JSON.parse(value);
    } catch {
      return [];
    }
  }
}
