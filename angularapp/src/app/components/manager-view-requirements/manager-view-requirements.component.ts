import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Requirement } from 'src/app/models/requirement.model';
import { Trainer } from 'src/app/models/trainer.model';
import { RequirementService } from 'src/app/services/requirement.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-manager-view-requirements',
  templateUrl: './manager-view-requirements.component.html',
  styleUrls: ['./manager-view-requirements.component.css']
})
export class ManagerViewRequirementsComponent implements OnInit {

  requirements: Requirement[] = [];
  origrequirements: Requirement[] = [];
  searchText: string = '';
  trainers: Trainer[] = [];
  showTrainerList: boolean = false;
  reqId: number = 0;
  deleteId: number | null = null;
  showDeletePopup: boolean = false;

  constructor(
    private rs: RequirementService,
    private router: Router,
    private ts: TrainerService
  ) { }
  ngOnInit(): void {
    this.ts.getAllTrainers().subscribe((trainerData) => {
      this.trainers = trainerData;

     
      this.rs.getAllRequirements().subscribe((reqData) => {
        this.requirements = reqData;
        this.origrequirements = reqData;
        console.log('Requirements:', this.requirements);
      });
    });
  }

  searchByName(): void {
    this.requirements = this.origrequirements.filter((req) =>
      req.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  filterByStatus(option: string): void {
    if (option === 'all') {
      this.requirements = [...this.origrequirements];
    } else {
      this.requirements = this.origrequirements.filter((req) =>
        req.status.toLowerCase() === option.toLowerCase()
      );
    }
  }

  loadRequirements(): void {
    this.rs.getAllRequirements().subscribe((data) => {
      this.requirements = data;
      this.origrequirements = data;
    });
  }

  viewFun(id: number): void {
    this.router.navigate(['/managerrequirement', id]);
  }

  getTrainerName(trainerId?: number): string {
    if (!trainerId || !this.trainers?.length) return 'Not Assigned';
    const trainer = this.trainers.find(t => t.trainerId === trainerId);
    return trainer ? trainer.name : 'Not Assigned';
  }

  selectTrainer(trainerId: number, reqId: number) {
    console.log('in select');

    if (trainerId) {
      this.router.navigate(['/trainerdetails', trainerId, reqId]);
    } else {
      alert('Trainer not assigned.');
    }


 
  }

 
openDeletePopup(rid: number): void {

  this.deleteId = rid;

  this.showDeletePopup = true;

}
 
confirmDelete(): void {

  if (this.deleteId !== null) {

    this.rs.deleteRequirement(this.deleteId).subscribe(() => {

      this.loadRequirements();

      this.cancelDelete(); 

    });

  }

}
 
cancelDelete(): void {

  this.showDeletePopup = false;

  this.deleteId = null;

}
}
