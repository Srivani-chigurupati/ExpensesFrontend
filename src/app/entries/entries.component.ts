import { Component, ViewChild, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import { EntryService } from '../Services/entry.service';
import { EntryElement } from '../Interfaces/EntryElement';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { UpdateEntryComponent } from '../update-entry/update-entry.component';
import { RouterLink } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-entries',
  imports: [MatButtonModule,MatTableModule,CommonModule,RouterLink,MatFormField,MatInput,MatPaginator,MatIconModule],
  providers:[EntryService],
  templateUrl: './entries.component.html',
  styleUrl: './entries.component.css'
})
export class EntriesComponent {
 
  displayedColumns :string[] = ['Description','IsExpense','Value','Actions'];
  dataSource!: MatTableDataSource<EntryElement>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private service: EntryService,private dialog:MatDialog){}
  ngOnInit(){
    this.loadEntries();
  }

  loadEntries(){
    this.service.getAllentries().subscribe((data) => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  updateEntry(entry: EntryElement) {
    console.log('Update Entry - ', entry);
    const dialogRef = this.dialog.open(UpdateEntryComponent, {
      data: {
        Id: entry.id,
        Description: entry.description,
        IsExpense: entry.isExpense,
        Value: entry.value
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadEntries(); // Reload entries after update
      }
    });
  }
  
  deleteEntry(entry:EntryElement){
    console.log('Delete Entry - ',entry);
    
  }

}
