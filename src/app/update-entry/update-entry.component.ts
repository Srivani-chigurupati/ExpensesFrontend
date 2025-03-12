import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { Type } from '../Interfaces/Type';
import { CommonModule } from '@angular/common';
import { EntryService } from '../Services/entry.service';
import { Router } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-update-entry',
  imports: [MatDialogModule, MatButtonModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatCardModule,ReactiveFormsModule,CommonModule,MatDatepickerModule,MatNativeDateModule
    ],
  templateUrl: './update-entry.component.html',
  styleUrl: './update-entry.component.css'
})


export class UpdateEntryComponent {

    types: Type[] = [
        { value: true, display: 'Expense' },
        { value: false, display: 'Income' }
      ];

    form:FormGroup;
    id:number=0;
    constructor(private fb:FormBuilder,private entryService:EntryService,private router:Router,
        private dialogRef:MatDialogRef<UpdateEntryComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { Description: string, IsExpense: boolean, Value: number, Id: number, Date: Date }) {
        this.id = data.Id;
        this.form = this.fb.group({
          description: [data.Description, Validators.required],
          isExpense: [data.IsExpense, Validators.required],
          value: [data.Value, [Validators.required, Validators.pattern('\\d+\\.?\\d*')]],
          date: [data.Date, Validators.required]
        });
      

    }
    close(){
        this.dialogRef.close();
        this.router.navigate(['/']);
    }

    save() {
      this.form.value.id = this.id;
      this.entryService.UpdateEntry(this.id, this.form.value).subscribe((updatedEntry) => {
        console.log('Updated Entry:', updatedEntry);
        this.dialogRef.close(updatedEntry); // Return updated entry to parent component
        this.router.navigate(['/']);
      });
    }

    
    

   
}
