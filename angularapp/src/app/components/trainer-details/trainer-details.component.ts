import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { Requirement } from 'src/app/models/requirement.model';
import { Trainer } from 'src/app/models/trainer.model';
import { FeedbackService } from 'src/app/services/feedback.service';
import { RequirementService } from 'src/app/services/requirement.service';
import { TrainerService } from 'src/app/services/trainer.service';
import { apiUrl } from 'src/global';

@Component({
  selector: 'app-trainer-details',
  templateUrl: './trainer-details.component.html',
  styleUrls: ['./trainer-details.component.css']
})
export class TrainerDetailsComponent implements OnInit {


  // trainerId: number;
  // trainer: Trainer;
  // requirements: Requirement[] = [];
  // selectedRequirements: Requirement[] = [];

  // constructor(
  //   private route: ActivatedRoute,
  //   private trainerService: TrainerService,
  //   private requirementService: RequirementService,
  //   private router: Router
  // ) { }

  // ngOnInit(): void {
  //   this.trainerId = Number(this.route.snapshot.paramMap.get('id'));

  //   this.trainerService.getTrainerById(this.trainerId).subscribe((data) => {
  //     this.trainer = data;
  //   });

  //   this.requirementService.getRequirementsByTrainerId(this.trainerId).subscribe((reqs) => {
  //     this.requirements = reqs; // multiple requirements supported
  //   });
  // }

  // acceptRequirement(requirement: Requirement) {
  //   // Add to selected list only if not already present
  //   if (!this.selectedRequirements.some(r => r.requirementId === requirement.requirementId)) {
  //     this.selectedRequirements.push(requirement);
  //   }
  // }

  // rejectRequirement(requirement: Requirement) {
  //   // Simply skip it or remove if it was accidentally added
  //   this.selectedRequirements = this.selectedRequirements.filter(r => r.requirementId !== requirement.requirementId);
  // }

  // finishSelection() {
  //   // Navigate to SelectedComponent and pass selectedRequirements
  //   this.router.navigate(['/selected'], { state: { selected: this.selectedRequirements } });
  // }

  trainer: Trainer;
  requirement: Requirement;
  requirementId: number;
  trainerId: number;
  showResumeModal: boolean = false;
  resumeUrl: string = '';
  imageLoadError: boolean = false;
  accept: boolean = false;
  reject: boolean = false;
  feedbacks: Feedback[] = [];

  constructor(
    private trainerService: TrainerService,
    private router: Router,
    private route: ActivatedRoute,
    private requirementService: RequirementService,
    private feedbackService: FeedbackService
  ) { }

  ngOnInit(): void {
    this.trainerId = +this.route.snapshot.params['trainerId'];
    this.requirementId = +this.route.snapshot.params['reqId'];

    this.trainerService.getTrainerById(this.trainerId).subscribe((data) => {
      this.trainer = data;
    });

    this.requirementService.getRequirementById(this.requirementId).subscribe((data) => {
      this.requirement = data;
    });

    this.feedbackService.getFeedBackByTrainerId(this.trainerId).subscribe((data) => {
      this.feedbacks = data;
    });
  }

  
  acceptTrainer(): void {
    this.accept = true;
  }

  
  confirmAcceptTrainer(): void {
    if (!this.trainer) return;

    this.requirementService.updateRequirementStatus(this.requirement.requirementId, "Closed").subscribe({
      next: (updated) => {
        this.requirement.status = updated.status;
        this.accept = false;
        this.router.navigate(['/managerviewrequirements']);
      },
      error: (err) => {
        console.error("Error updating requirement status:", err);
        alert("Failed to accept trainer");
      }
    });
  }

  
  rejectTrainer(): void {
    this.reject = true;
  }

  
  confirmRejectTrainer(): void {
    if (!this.trainer) return;

    this.requirementService.rejectTrainer(this.requirement.requirementId).subscribe({
      next: (updated) => {
        this.requirement.trainer = null;
        this.requirement.status = updated.status;
        this.reject = false;
        this.router.navigate(['/managerviewrequirements']);
      },
      error: (err) => {
        console.error("Error rejecting trainer:", err);
        alert("Failed to reject trainer");
      }
    });
  }

  
  closeModal(): void {
    this.accept = false;
    this.reject = false;
  }

  
  viewResume(resumeFileName: string): void {
    this.resumeUrl = `${apiUrl}/images/${resumeFileName}`;
    this.showResumeModal = true;
    this.imageLoadError = false;
  }

  closeResumeModal(): void {
    this.showResumeModal = false;
  }


  calculateAverageRating() {
    if(!this.feedbacks) {
      return 0;
    }
    else {
      let sum = 0;
      for (let i = 0; i < this.feedbacks.length; i++) {
        sum += this.feedbacks[i].ratings;
      }
      return sum / this.feedbacks.length;   
    }
  }


}
