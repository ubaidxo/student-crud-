import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NEVER } from 'rxjs';

export interface BooksI {
  title: string;
  author: string;
  genre: string;
}
export interface Shelf {
  shelfId: number;
  capacity: number;
  books: string[];
}

 export interface Library {
  bookshelves: Shelf[];
}
@Component({
  selector: 'app-books-array',
  standalone: true,
  imports: [],
  templateUrl: './books-array.component.html',
  styleUrl: './books-array.component.scss'
})
export class BooksArrayComponent implements OnInit {
ngOnInit(): void {

  const library : Library = {
    bookshelves: [
      { shelfId: 1, capacity: 3, books: [] },
      { shelfId: 2, capacity: 5, books: [] },
      { shelfId: 3, capacity: 4, books: [] }
    ]
  };
  
  const books : BooksI[] = [
    { title: 'Book 1', author: 'Author A', genre: 'Fantasy' },
    { title: 'Book 2', author: 'Author B', genre: 'Sci-Fi' },
    { title: 'Book 3', author: 'Author A', genre: 'Mystery' },
    { title: 'Book 4', author: 'Author C', genre: 'Fantasy' },
    { title: 'Book 5', author: 'Author B', genre: 'Romance' },
    { title: 'Book 6', author: 'Author D', genre: 'Sci-Fi' },
    { title: 'Book 7', author: 'Author A', genre: 'Fantasy' },
    { title: 'Book 8', author: 'Author B', genre: 'Sci-Fi' },
    { title: 'Book 9', author: 'Author A', genre: 'Mystery' },
    { title: 'Book 10', author: 'Author C', genre: 'Fantasy' },
    { title: 'Book 11', author: 'Author B', genre: 'Romance' },
    { title: 'Book 12', author: 'Author D', genre: 'Sci-Fi' }
  ];  

  library.bookshelves.forEach((data:any) => {
    for (let i = 0; i < data.capacity; i++) {
      if (books.length > 0) {
        data.books.push(books.shift());
      }
    }
  });
  console.log(library.bookshelves);
}
}
