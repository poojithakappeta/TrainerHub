import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/feedback.model';
import { Requirement } from 'src/app/models/requirement.model';
import { Trainer } from 'src/app/models/trainer.model';
import { FeedbackService } from 'src/app/services/feedback.service';
import { RequirementService } from 'src/app/services/requirement.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-coordinator-view-requirements',
  templateUrl: './coordinator-view-requirements.component.html',
  styleUrls: ['./coordinator-view-requirements.component.css']
})
export class CoordinatorViewRequirementsComponent implements OnInit {
  requirements: Requirement[] = [];
  oRequirements: Requirement[] = [];
  searchText: string = '';
  trainers: Trainer[] = [];
  feedbacks : Feedback[] = [];
  showModal: boolean = false;
  selectedRequirement: Requirement | null = null;
  selectedTrainerId: number | null = null;

  constructor(
    private requirementService: RequirementService,
    private trainerService: TrainerService,
    private feedbackService : FeedbackService
  ) {}

  ngOnInit(): void {
    this.loadRequirements();
    this.loadTrainers();
  }

  loadRequirements() {
    this.requirementService.getAllRequirements().subscribe((data) => {
      this.requirements = data;
      this.oRequirements = data;
    });
  }

  loadTrainers() {
    this.trainerService.getAllTrainers().subscribe((data) => {
      this.trainers = data;
      this.loadRequirements();
    });
  }

  searchFilter() {
    this.requirements = this.oRequirements.filter((req) => {
      const titleMatch = req.title.toLowerCase().includes(this.searchText.toLowerCase());
      const deptMatch = req.department.toLowerCase().includes(this.searchText.toLowerCase());
      return titleMatch || deptMatch;
    });
  }

  reset() {
    this.searchText = '';
    this.requirements = this.oRequirements;
  }

  assignTrainer(requirement: Requirement) {
    this.selectedRequirement = requirement;
    this.selectedTrainerId = null;
    this.showModal = true;
  }

  confirmAssignment() {
    if (!this.selectedRequirement || this.selectedTrainerId == null) {
      alert("Please select a trainer.");
      return;
    }

    this.requirementService.assignTrainer(
      this.selectedRequirement.requirementId!,
      this.selectedTrainerId
    ).subscribe({
      next: () => {
        alert("Trainer assigned successfully!");

        const trainerObj = this.trainers.find(t=>t.trainerId===this.selectedTrainerId);
        if (this.selectedRequirement) {
          this.selectedRequirement.trainerId = this.selectedTrainerId!;
          this.selectedRequirement.trainer = trainerObj || null;
        }

        this.showModal = false;
        this.selectedTrainerId = null;
        this.selectedRequirement = null;
      },
      error: (err) => {
        console.error("Assignment failed:", err);
        alert("Failed to assign trainer.");
      }
    });
  }

  getTrainerName(id: number): string {
    const trainer = this.trainers.find(t => t.trainerId === id);
    return trainer ? trainer.name : 'Unknown';
  }
  
  calculateAverageRating(trainerId : number){
    this.feedbackService.getFeedBackByTrainerId(trainerId).subscribe((data)=> {
      this.feedbacks = data;
    })
    let sum=0;
    for(let i=0;i<this.feedbacks.length;i++){
       sum+=this.feedbacks[i].ratings;
    }
    return sum/this.feedbacks.length;
  }

  





}
