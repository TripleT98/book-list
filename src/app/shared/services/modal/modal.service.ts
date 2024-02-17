import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ModalCreateBookComponent } from './components/modal-create-book/modal-create-book.component';

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
				configDialog.maxWidth = '85vw';
				configDialog.minWidth = 550;
				configDialog.disableClose = true;
				component = ModalCreateBookComponent;
				break;
      }
    if (component) {
  		configDialog.id = String(modalName);
  		this.currentModal = this.matDialog.open(component, configDialog);
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
  'createBook'
}
