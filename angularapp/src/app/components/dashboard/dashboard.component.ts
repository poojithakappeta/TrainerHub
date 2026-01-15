import { Component, OnInit } from '@angular/core';
import { TrainerService } from 'src/app/services/trainer.service';
import { RequirementService } from 'src/app/services/requirement.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Trainer } from 'src/app/models/trainer.model';
import { Requirement } from 'src/app/models/requirement.model';
import { Feedback } from 'src/app/models/feedback.model';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalTrainers = 0;
  totalRequirements = 0;
  assignedTrainers = 0;
  totalFeedbacks = 0;
 
  animatedTotalTrainers = 0;
  animatedTotalRequirements = 0;
  animatedAssignedTrainers = 0;
  animatedTotalFeedbacks = 0;
 
  trainerStatusCount: { [status: string]: number } = {};
  feedbackCategoryCount: { [category: string]: number } = {};
 
  recentTrainers: Trainer[] = [];
  recentRequirements: Requirement[] = [];
 
  loading = true;
  errorMessage = '';
 
  constructor(
    private trainerService: TrainerService,
    private requirementService: RequirementService,
    private feedbackService: FeedbackService
  ) { }
 
  ngOnInit(): void {
    this.loadDashboardData();
    this.loadFeedbackData();
    this.loadRecentActivity();
  }
 
  barColors: string[] = [
    '#007bff', '#28a745', '#ffc107', '#17a2b8', '#6f42c1',
    '#fd7e14', '#20c997', '#6610f2', '#e83e8c', '#343a40'
  ]
 
 
  loadDashboardData() {
    this.loading = true;
 
    this.trainerService.getAllTrainers()
      .pipe(catchError(() => {
        this.errorMessage = 'Failed to load trainers';
        return of([]);
      }))
      .subscribe((trainers: Trainer[]) => {
        this.totalTrainers = trainers.length;
        this.computeTrainerStatus(trainers);
        this.animateNumbers();
      });
 
    this.requirementService.getAllRequirements()
      .pipe(catchError(() => {
        this.errorMessage = 'Failed to load requirements';
        return of([]);
      }))
      .subscribe((reqs: Requirement[]) => {
        this.totalRequirements = reqs.length;
        this.assignedTrainers = reqs.filter(r => r.trainer != null).length;
        this.animateNumbers();
        this.loading = false;
      });
  }
 
  loadFeedbackData() {
    this.feedbackService.getFeedbacks()
      .pipe(catchError(() => {
        this.errorMessage = 'Failed to load feedbacks';
        return of([]);
      }))
      .subscribe((feedbacks: Feedback[]) => {
        this.totalFeedbacks = feedbacks.length;
        this.feedbackCategoryCount = {};
        feedbacks.forEach(f => {
          const category = f.category || 'Others';
          this.feedbackCategoryCount[category] = (this.feedbackCategoryCount[category] || 0) + 1;
        });
        this.animateFeedbacks();
      });
  }
 
  loadRecentActivity() {
    this.trainerService.getAllTrainers().subscribe(trainers => {
      this.recentTrainers = trainers.slice(-5).reverse();
    });
 
    this.requirementService.getAllRequirements().subscribe(reqs => {
      this.recentRequirements = reqs.slice(-5).reverse();
    });
  }
 
  computeTrainerStatus(trainers: Trainer[]) {
    this.trainerStatusCount = {};
    trainers.forEach(t => {
      const status = t.status && t.status.trim() !== '' ? t.status : 'Unassigned';
      this.trainerStatusCount[status] = (this.trainerStatusCount[status] || 0) + 1;
    });
  }
 
  getTrainerStatusKeys(): string[] {
    return Object.keys(this.trainerStatusCount);
  }
 
  getStatusPercent(status: string): number {
    if (this.loading) return 0;
    const total = Object.values(this.trainerStatusCount).reduce((a, b) => a + b, 0);
    return total > 0 ? (this.trainerStatusCount[status] / total) * 100 : 0;
  }
 
  getFeedbackCategoryKeys(): string[] {
    return Object.keys(this.feedbackCategoryCount);
  }
 
  getFeedbackPercent(category: string): number {
    const total = Object.values(this.feedbackCategoryCount).reduce((a, b) => a + b, 0);
    return total > 0 ? (this.feedbackCategoryCount[category] / total) * 100 : 0;
  }
 
  animateNumbers() {
    let duration = 1000;
    let frameRate = 20;
    let steps = duration / frameRate;
    let trainerStep = this.totalTrainers / steps;
    let reqStep = this.totalRequirements / steps;
    let assignedStep = this.assignedTrainers / steps;
 
    let currentStep = 0;
    let interval = setInterval(() => {
      currentStep++;
      this.animatedTotalTrainers = Math.min(Math.round(currentStep * trainerStep), this.totalTrainers);
      this.animatedTotalRequirements = Math.min(Math.round(currentStep * reqStep), this.totalRequirements);
      this.animatedAssignedTrainers = Math.min(Math.round(currentStep * assignedStep), this.assignedTrainers);
      if (currentStep >= steps) clearInterval(interval);
    }, frameRate);
  }
 
  animateFeedbacks() {
    let duration = 1000;
    let frameRate = 20;
    let steps = duration / frameRate;
    let feedbackStep = this.totalFeedbacks / steps;
 
    let currentStep = 0;
    let interval = setInterval(() => {
      currentStep++;
      this.animatedTotalFeedbacks = Math.min(Math.round(currentStep * feedbackStep), this.totalFeedbacks);
      if (currentStep >= steps) clearInterval(interval);
    }, frameRate);
  }
 
  exportToCSV() {
    const data = [
      ['Metric', 'Value'],
      ['Total Trainers', this.totalTrainers],
      ['Total Requirements', this.totalRequirements],
      ['Trainers Assigned', this.assignedTrainers],
      ['Total Feedbacks', this.totalFeedbacks]
    ];
 
    const csvContent = 'data:text/csv;charset=utf-8,' + data.map(e => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'dashboard_stats.csv');
    document.body.appendChild(link);
    link.click();
 
  }
}