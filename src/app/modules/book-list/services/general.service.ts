import { BehaviorSubject } from 'rxjs';

export class GeneralService<T extends { id: number }> {
  private collection: T[] = [];
  public readonly collection$ = new BehaviorSubject<T[]>(this.collection);

  constructor(

  ){
    this.collection$.subscribe(collection => {
      this.collection = collection;
    })
  }

  private setCollection(collection: T[]){
    this.collection$.next(collection);
  }

  private getNewId(): number{
    const existedIds = this.collection.map(elem => elem.id);
    let newId: number = 0;
    existedIds.forEach((id, i, arr) => {
      if (newId) {
        return;
      }
      const nextId = arr[i + 1];
      if (!nextId) {
        newId = id + 1;
      }
      if (nextId - id !== 1) {
        newId = id + 1;
      }
      const isExist = arr.includes(newId);
      if (isExist) {
        newId = 0;
      }
    });
    return newId || 1;
  }

  public get$(){
    return this.collection$;
  }

  public add(book: Omit<T, 'id'>){
    const newId = this.getNewId();
    this.setCollection([...this.collection, {...book, id: newId} as T]);
  }

  public remove(bookId: number): boolean{
    const newcollection = this.collection.filter(book => book.id === bookId);
    if (newcollection.length === this.collection.length) {
      return false;
    }
    this.setCollection(newcollection);
    return true;
  }

}
