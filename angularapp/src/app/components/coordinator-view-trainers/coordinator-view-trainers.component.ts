import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Trainer } from 'src/app/models/trainer.model';
import { TrainerService } from 'src/app/services/trainer.service';
import { apiUrl } from 'src/global';

@Component({
  selector: 'app-coordinator-view-trainers',
  templateUrl: './coordinator-view-trainers.component.html',
  styleUrls: ['./coordinator-view-trainers.component.css']
})
export class CoordinatorViewTrainersComponent implements OnInit {

  trainers: Trainer[] = [];
  Ogtrainers: Trainer[] = [];
  delete: boolean = false;
  errorMessage = '';
  trainerId: number;
  searchText: string = '';
  resumeUrl: string = '';


  showResumeModal = false;
  imageLoadError: boolean;


  constructor(private trainerService: TrainerService, private router: Router) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.trainerService.getAllTrainers().subscribe((data) => {
      this.trainers = data;
      this.Ogtrainers = data;
      console.log(this.trainers);
    })
  }

  searchByTrainer() {
    this.trainers = this.Ogtrainers;
    this.trainers = this.trainers.filter((trainer) => {
      let a = trainer.name.toLowerCase().includes(this.searchText.toLowerCase());
      return a;
    })
  }

  filterByStatus(option: string) {

    if (option === "All Status") {
      this.trainers = this.Ogtrainers;
    }
    else if (option === "Active") {
      this.trainers = this.Ogtrainers.filter((trainer) => trainer.status.includes("Active"));
    }
    else if (option === "Inactive") {
      this.trainers = this.Ogtrainers.filter((trainer) => trainer.status.includes("Inactive"));
    }
  }


  changeStatus(trainer: Trainer) {
    this.trainerService.updateTrainerStatus(trainer.trainerId!).subscribe({
      next: (updatedTrainer) => {
        trainer.status = updatedTrainer.status; 
      },
      error: (err) => {
        console.error("Status update failed:", err);
        alert("Failed to update trainer status.");
      }
    });
  }


  editTrainer(id: number) {
    this.router.navigate(['/editTrainer', id]);
  }

  deleteTrainer(id: number) {
    this.delete = true;
    this.trainerId = id;
  }

  confirmDelete() {
    console.log(this.trainerId);
    this.trainerService.deleteTrainer(this.trainerId).subscribe((data) => {
      this.loadData();
      this.delete = false;
      console.log("Trainer Deleted");
    }, (error) => {
      this.errorMessage = "Trainer cannot be deleted."
    })
  }

  cancelDelete() {
    this.delete = false;
  }



  viewResume(resumeFileName: string) {
    this.resumeUrl = `${apiUrl}/images/${resumeFileName}`;
    this.showResumeModal = true;
    this.imageLoadError = false;
  }


  closeResumeModal() {
    this.showResumeModal = false;
  }



}
