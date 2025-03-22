import { Component, inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle } from "@angular/material/dialog";

@Component({
  selector: 'app-map-modal',
  templateUrl: 'modal.component.html',
  imports: [MatDialogTitle, MatDialogContent],
})
export class ModalComponent {
  data = inject(MAT_DIALOG_DATA);
}
