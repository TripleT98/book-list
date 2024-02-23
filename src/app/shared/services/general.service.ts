import { BehaviorSubject, Subject } from 'rxjs';

export class GeneralService<T extends { id: number }> {
  private collection: T[] = [];
  public readonly collection$ = new BehaviorSubject<T[]>(this.collection);
  public readonly remove$ = new Subject<T>();

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

  public get(){
    return [...this.collection];
  }

  public getId(id: number){
    return this.collection.find(item => item.id === id);
  }

  public add(data: Omit<T, 'id'>){
    const newId = this.getNewId();
    this.setCollection([...this.collection, {...data, id: newId} as T]);
  }

  public set(data: Omit<T, 'id'>[]){
    const newCollection: T[] = data.map((d, i) => {
      return {...d, id: i + 1}
    }) as T[];
    this.setCollection([...newCollection]);
  }

  public change(data: Partial<T>){
    const newCollection = this.collection.reduce<T[]>((acc,item) => {
      let newItem = {...item};
      if (item.id === data.id) {
        newItem = {...newItem, ...data};
      };
      acc.push(newItem)
      return acc;
    }, []);
    this.setCollection(newCollection);
  }

  public remove(dataId: number): boolean{
    const itemToRemove = this.collection.find(item => item.id === dataId);
    const newcollection = this.collection.filter(data => data.id !== dataId);
    if (newcollection.length === this.collection.length) {
      return false;
    }
    if (itemToRemove) {
      this.remove$.next(itemToRemove);
    }
    this.setCollection([...newcollection]);
    return true;
  }

}
