import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Type } from '../Interfaces/Type';
import { EntryService } from '../Services/entry.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-new-entry',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,MatDatepickerModule,MatNativeDateModule
  ],
  providers: [EntryService],
  templateUrl: './new-entry.component.html',
  styleUrls: ['./new-entry.component.css']
})


export class NewEntryComponent {

  constructor(private entryService: EntryService) { }
  entryForm = new FormGroup({
    description: new FormControl('',Validators.required),
    isExpense: new FormControl('',Validators.required),
    value: new FormControl('',[Validators.required,Validators.pattern('\\d+\\.?\\d*')]),
    date: new FormControl('',Validators.required)
  });

  types: Type[] = [
    { value: true, display: 'Expense' },
    { value: false, display: 'Income' }
  ];


  onFormSubmit() {
    console.log(this.entryForm.value);
    this.entryService.createEntry(this.entryForm.value).subscribe((response) => {
      console.log('response - ',response);
    });
  }
}