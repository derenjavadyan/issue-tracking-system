import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IssuesService } from '../service/issues.service';
import { Issue } from '../interface/issue';

@Component({
  selector: 'app-issue-report',
  templateUrl: './issue-report.component.html',
  styleUrls: ['./issue-report.component.scss'],
})
export class IssueReportComponent implements OnInit {
  @Input() editIssue?: Issue;
  @Output() formClose = new EventEmitter();
  editForm!: FormGroup;
  issueForm!: FormGroup;
  suggestions: Issue[] = [];

  constructor(
    private builder: FormBuilder,
    private issueService: IssuesService
  ) {}

  ngOnInit(): void {
    //add
    this.issueForm = this.builder.group({
      title: ['', Validators.required],
      description: [''],
      priority: ['', Validators.required],
      type: ['', Validators.required],
    });

    this.issueForm.get('title')?.valueChanges.subscribe((title: string) => {
      this.suggestions = this.issueService.getSuggestions(title);
    });

    //edit
    this.editForm = this.builder.group({
      issueNo: [this.editIssue?.issueNo],
      title: [this.editIssue?.title, Validators.required],
      description: [this.editIssue?.description, Validators.required],
      priority: [this.editIssue?.priority, Validators.required],
      type: [this.editIssue?.type, Validators.required],
    });
  }
  //add
  get title() {
    return this.issueForm?.get('title');
  }
  get priority() {
    return this.issueForm?.get('priority');
  }
  get type() {
    return this.issueForm?.get('type');
  }

  addIssue() {
    if (this.issueForm?.invalid) {
      return;
    }
    this.issueService.createIssue(this.issueForm?.value);
    this.formClose.emit();
  }

  //edit
  get editTitle() {
    return this.editForm?.get('editTitle');
  }
  get editDescription() {
    return this.editForm?.get('editDescription');
  }
  get editPriority() {
    return this.editForm?.get('editPriority');
  }
  get editType() {
    return this.editForm?.get('editType');
  }

  onEdit() {
    if (this.editForm.invalid) {
      return;
    }
    this.issueService.editIssue(this.editForm.value);
    this.formClose.emit();
  }
}
