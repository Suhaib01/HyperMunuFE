import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchQuery: string): any[] {
    if (!items || !searchQuery) {
      return items;
    }
    searchQuery = searchQuery.toLowerCase();  // Convert to lowercase for case-insensitive search
    return items.filter(item => 
      item.name.toLowerCase().includes(searchQuery)
      
    );
  }
}
