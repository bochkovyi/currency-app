import { Pipe, PipeTransform } from '@angular/core';
import { SelectItem } from './select-item.multiselect';


@Pipe({
  name: 'multiFilter',
  pure: false
})
export class MultiFilterPipe implements PipeTransform {

  transform(items: SelectItem[], filter: string): SelectItem[] {
    if (!items || !filter) {
      return items;
    }
    return items.filter((item: SelectItem) => item.value.toLowerCase().indexOf(filter.toLowerCase()) === 0);
  }

}
