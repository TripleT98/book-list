import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ModalCreateBookComponent } from './components/modal-create-book/modal-create-book.component';
import { ModalCreateAuthorComponent } from './components/create-author/create-author.component';

@Injectable(
  { providedIn: 'root' }
)
export class ModalService {

  private currentModal: MatDialogRef<any> | null = null;

  constructor(
    private matDialog: MatDialog
  ){

  }

  public open(modalName: MatDialogName, data?: any): void | MatDialogRef<any, any>{
    const configDialog: MatDialogConfig = {
      data: data
    }
    this.currentModal = null;
		let component = null;
    switch (modalName) {
			case MatDialogName['createBook']:
				component = ModalCreateBookComponent;
        configDialog.disableClose = true;
				break;
      case MatDialogName['createAuthor']:
  			component = ModalCreateAuthorComponent;
        configDialog.disableClose = true;
  			break;
    }
    if (component) {
  		configDialog.id = String(modalName);
  		this.currentModal = this.matDialog.open(component as any, configDialog);
  		return this.currentModal;
  	}
  }

  public getModal(componentName: MatDialogName): MatDialogRef<any, any> | undefined{
		return this.matDialog.getDialogById(String(componentName));
	}

  public close(){
		if (this.currentModal) {
			this.currentModal.close();
		}
	}

}

export enum MatDialogName {
  'createBook',
  'createAuthor'
}
