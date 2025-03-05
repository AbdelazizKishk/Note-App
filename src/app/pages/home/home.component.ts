import { Component, inject, OnInit } from '@angular/core';
import { NotesService } from '../../core/services/notes/notes.service';
import { Notes } from '../../shared/interfaces/notes/notes';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private readonly notesService = inject(NotesService);
  userNotes: Notes[] = [];
  ngOnInit(): void {
    this.getUsernotes();
  }
  getUsernotes(): void {
    this.notesService.getUserNotes().subscribe({
      next: (res) => {
        console.log(res.notes);
        this.userNotes = res.notes;
      },
      error: (err) => {
        this.userNotes = [];
        console.log(err);
      },
    });
  }
  addNoteForm: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    content: new FormControl(null, Validators.required),
  });
  addNote(): void {
    this.notesService.addnote(this.addNoteForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.getUsernotes();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  deleteNote(noteId: string): void {
    this.notesService.deleteNote(noteId).subscribe({
      next: (res) => {
        console.log(res);
        this.getUsernotes();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  updateNoteForm: FormGroup = new FormGroup({
    _id: new FormControl(null),
    title: new FormControl(null, Validators.required),
    content: new FormControl(null, Validators.required),
  });
  patchvalue(note: any): void {
    this.updateNoteForm.patchValue(note);
  }
  updateNote(): void {
    const { _id, title, content } = this.updateNoteForm.value;
    this.notesService.updateNote(_id, { title, content }).subscribe({
      next: (res) => {
        console.log(res);
        this.getUsernotes();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
