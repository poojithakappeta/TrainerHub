import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { Trainer } from 'src/app/models/trainer.model';
import { FeedbackService } from 'src/app/services/feedback.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-managerviewfeedback',
  templateUrl: './managerviewfeedback.component.html',
  styleUrls: ['./managerviewfeedback.component.css']
})
export class ManagerviewfeedbackComponent implements OnInit {
  feedbacks: Feedback[] = [];
  trainer: Trainer = {
    name: "",
    email: "",
    phone: "",
    expertise: "",
    experience: "",
    certification: "",
    resume: "",
    joiningDate: new Date(),
    status: ""
  };
  deleteId: number | null = null;
  showDeletePopup: boolean = false;
  showModal: boolean = false;

  constructor(
    private feedbackService: FeedbackService,
    private router: Router,
    private trainerService: TrainerService
  ) { }

  ngOnInit(): void {
    this.getAllFeedback();
  }

  getAllFeedback(): void {
    this.feedbackService.getFeedbacks().subscribe((data) => {
      this.feedbacks = data;
    });
  }

  selectedtrainer(trainerId: number): void {
    this.showModal = true;
    this.trainerService.getTrainerById(trainerId).subscribe((data) => {
      this.trainer = data;
    });
  }

  openDeletePopup(feedbackId: number): void {
    this.deleteId = feedbackId;
    this.showDeletePopup = true;
  }

  confirmDelete(): void {
    if (this.deleteId !== null) {
      this.feedbackService.deleteFeedback(this.deleteId).subscribe({
        next: () => {
          console.log("Deleted successfully");
          this.getAllFeedback(); // Refresh list
          this.cancelDelete();
        },
        error: (err) => {
          console.error("Delete failed:", err);
          alert("Failed to delete feedback.");
          this.cancelDelete();
        }
      });
    }
  }

  cancelDelete(): void {
    this.showDeletePopup = false;
    this.deleteId = null;
  }
}