import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByTag'
})
export class FilterByTagPipe implements PipeTransform {
  transform(notes: any[], searchQuery: string): any[] {
    if (!notes || !searchQuery) {
      return notes;
    }

    searchQuery = searchQuery.toLowerCase();
    // Filter notes by title or tag name
    return notes.filter(note =>
      note.title.toLowerCase().includes(searchQuery) ||
      note.tags.some((tag: string) =>
        tag.toLowerCase().includes(searchQuery)
      )
    );
  }
}
