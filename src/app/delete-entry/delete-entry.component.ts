import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EntryService } from '../Services/entry.service';
import { MatListModule } from '@angular/material/list';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-entry',
  imports: [CommonModule,MatListModule,MatCardModule,RouterModule,MatButtonModule],
  providers:[EntryService],
  templateUrl: './delete-entry.component.html',
  styleUrl: './delete-entry.component.css'
})
export class DeleteEntryComponent {

  id:number=0;
  entry={
    description:'',
    isExpense:false,
    value:0
  }
  constructor(private route:ActivatedRoute,private service:EntryService,private router:Router) { }

  ngOnInit(): void {
    this.id= this.route.snapshot.params['id'];
    this.service.getEntry(this.id).subscribe((data) => {
      console.log('Entry to delete - ',data);
      this.entry.description = data.description;
      this.entry.isExpense = data.isExpense;
      this.entry.value = data.value;  
    });
  }

  cancel(){
    this.router.navigate(['/']);
  }

  confirm(){
    this.service.deleteEntry(this.id).subscribe((data) => {
      console.log('Entry Deleted - ',data);
      this.router.navigate(['/']);
    });
  }

}
