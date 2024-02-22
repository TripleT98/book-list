import { Component,  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  protected readonly tabs: Tab[] = [
    { name: TabNames.Books, path: Path.books, id: 0 },
    { name: TabNames.Authors, path: Path.authors, id: 1 }
  ]

  constructor(
    private router: Router
  ){
    this.router.navigate(['']);
  }

  title = 'book-list';

  protected switchTab(id: number){
    const selectedTab = this.tabs.find(t => t.id === id);
    if (!selectedTab) {
      return;
    }
    this.router.navigate([String(selectedTab.path)])
  }
}

type Tab = {
  name: TabNames,
  path: Path,
  id: number
}

enum Path {
  'books' = 'books',
  'authors' = 'authors'
}

enum TabNames {
  'Books' = 'Книги',
  'Authors' = 'Авторы'
}
