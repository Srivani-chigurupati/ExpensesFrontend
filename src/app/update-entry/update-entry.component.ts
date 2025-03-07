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

@Component({
  selector: 'app-update-entry',
  imports: [MatDialogModule, MatButtonModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatCardModule,ReactiveFormsModule,CommonModule
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
        @Inject(MAT_DIALOG_DATA) public data: { Description: string, IsExpense: boolean, Value: number, Id: number }){
        this.id = data.Id;
        this.form = this.fb.group({
          description: [data.Description, Validators.required],
          isExpense: [data.IsExpense, Validators.required],
          value: [data.Value, [Validators.required, Validators.pattern('\\d+\\.?\\d*')]]
        });
      

    }
    close(){
      //this.router.navigate(['/']);
      this.dialogRef.close();
    }

    save(){
      this.form.value.id = this.id;
        this.entryService.UpdateEntry(this.id,this.form.value).subscribe((response)=>{
            console.log('response - ',response);
            
        });
        this.dialogRef.close(this.form.value);
        this.router.navigate(['/entries']);
       
    }

   
}
