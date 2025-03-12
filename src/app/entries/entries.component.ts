import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EntryService } from '../Services/entry.service';
import { EntryElement } from '../Interfaces/EntryElement';
import { MatDialog } from '@angular/material/dialog';
import { UpdateEntryComponent } from '../update-entry/update-entry.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';

// Import Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-entries',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTableModule,
    CommonModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatIconModule,
    MatSortModule,
    DatePipe
  ],
  providers: [EntryService],
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})
export class EntriesComponent implements AfterViewInit {
  displayedColumns: string[] = ['Description', 'IsExpense', 'Value', 'Date', 'Actions'];
  dataSource!: MatTableDataSource<EntryElement>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: EntryService, private dialog: MatDialog, private _liveAnnouncer: LiveAnnouncer) {}

  ngOnInit() {
    this.loadEntries();
  }

  ngAfterViewInit() {
    // Make sure sorting and pagination are set
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
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
        Value: entry.value,
        Date: entry.date
      }
    });

    dialogRef.afterClosed().subscribe(updatedEntry => {
      if (updatedEntry) {
        // After dialog closes, trigger the loadEntries method again to reload the data from the API
        this.loadEntries(); // Reload data from API after update
      }
    });
  }

  deleteEntry(entry: EntryElement) {
    console.log('Delete Entry - ', entry);
  }

  loadEntries() {
    this.service.getAllentries().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);

      // Ensure sorting and pagination are set AFTER data is assigned
      if (this.sort && this.paginator) {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        // Sorting accessor to handle different data types
        this.dataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'Date': return new Date(item.date); // Convert date to Date object
            case 'IsExpense': return item.isExpense ? 1 : 0; // Convert boolean to number for sorting
            case 'Value': return Number(item.value); // Ensure numeric sorting for value
            case 'Description': return item.description.toLowerCase(); // Case-insensitive sorting
            default: return (item as any)[property];
          }
        };

        // Apply sorting after data load
        this.dataSource.sort.sort({ id: 'Date', start: 'desc', disableClear: true });
      }

      // After data load, set paginator
      this.dataSource.paginator = this.paginator;
    });
  }
}
