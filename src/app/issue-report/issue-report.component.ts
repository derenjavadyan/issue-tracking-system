import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IssuesService } from '../service/issues.service';

@Component({
  selector: 'app-issue-report',
  templateUrl: './issue-report.component.html',
  styleUrls: ['./issue-report.component.scss'],
})
export class IssueReportComponent implements OnInit {
  @Output() formClose = new EventEmitter();
  issueForm?: FormGroup;

  constructor(
    private builder: FormBuilder,
    private issueService: IssuesService
  ) {}

  ngOnInit(): void {
    this.issueForm = this.builder.group({
      title: ['', Validators.required],
      description: [''],
      priority: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

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
}
