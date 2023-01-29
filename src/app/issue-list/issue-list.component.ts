import { Component, OnInit } from '@angular/core';
import { Issue } from '../interface/issue';
import { IssuesService } from '../service/issues.service';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss'],
})
export class IssueListComponent implements OnInit {
  editableIssue?: Issue;
  showReportIssue = false;
  issues: Issue[] = [];
  selectedIssue: Issue | null = null;

  constructor(private issueService: IssuesService) {}

  ngOnInit(): void {
    this.getIssues();
  }
  onCloseReport() {
    this.showReportIssue = false;
    this.getIssues();
  }

  onConfirm(confirmed: boolean) {
    if (confirmed && this.selectedIssue) {
      this.issueService.completeIssue(this.selectedIssue);
      this.getIssues();
    }
  }

  private getIssues() {
    this.issues = this.issueService.getPendingIssues();
  }

  editIssue(issue: Issue) {
    this.showReportIssue = true;
    this.editableIssue = issue;
  }
}
