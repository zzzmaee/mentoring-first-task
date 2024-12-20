import { Component, inject, Inject, OnInit } from '@angular/core';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader } from '@angular/material/card';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-edit-user',
  standalone: true,
  imports: [
    MatCardHeader,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatCard,
    MatInput,
    MatCardActions,
    MatButton,
    MatLabel,
    MatDialogActions
  ],
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.scss'
})
export class CreateEditUserComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<CreateEditUserComponent>);

  public userForm: FormGroup;
  public isEdit: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.isEdit = data.isEdit;
    this.userForm = this.fb.group({
      id: [data?.id || null],
      name: [data?.name || '', Validators.required],
      username: [data?.username || '', Validators.required],
      email: [data?.email || '', [Validators.required, Validators.email]],
      phone: [data?.phone || '', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    });
  }

  ngOnInit(): void {
    this.userForm.patchValue({...this.data});
  }

  public saveUser(): void {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
    }
  }

  public closePopup(): void {
    this.dialogRef.close();
  }
}
