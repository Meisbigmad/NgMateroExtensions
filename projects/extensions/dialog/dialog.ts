import { Injectable, TemplateRef } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { MtxDialogContainer } from './dialog-container';
import { MtxDialogData } from './dialog-config';

const defaults: MtxDialogData = {
  title: '',
  description: '',
  buttons: [
    {
      color: 'warn',
      text: 'OK',
      focusInitial: true,
      onClick: () => {},
    },
    {
      text: 'CLOSE',
      onClick: () => {},
    },
  ],
  showCloseIcon: false,
  disableClose: true,
  width: '300px',
};

@Injectable({ providedIn: 'root' })
export class MtxDialog {
  constructor(public dialog: MatDialog) {}

  originalOpen(
    componentOrTemplateRef: ComponentType<any> | TemplateRef<any> = MtxDialogContainer,
    config: any
  ) {
    return this.dialog.open(componentOrTemplateRef, config);
  }

  open(
    config: MtxDialogData,
    componentOrTemplateRef: ComponentType<any> | TemplateRef<any> = MtxDialogContainer
  ) {
    const data = Object.assign({}, defaults, config);
    return this.dialog.open(componentOrTemplateRef, {
      ...data,
      data,
    });
  }

  alert(
    title: string | Observable<string>,
    description: string | Observable<string> = '',
    onOk = () => {}
  ) {
    this.open({
      title,
      description,
      buttons: [
        {
          color: 'warn',
          text: 'OK',
          onClick: () => onOk(),
        },
      ],
    });
  }

  confirm(
    title: string | Observable<string>,
    description: string | Observable<string> = '',
    onOk = () => {},
    onClose = () => {}
  ) {
    this.open({
      title,
      description,
      buttons: [
        {
          color: 'warn',
          text: 'OK',
          onClick: () => onOk(),
        },
        {
          text: 'CLOSE',
          onClick: () => onClose(),
        },
      ],
    });
  }
}
