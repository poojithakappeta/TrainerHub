
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Requirement } from 'src/app/models/requirement.model';
import { Trainer } from 'src/app/models/trainer.model';
import { RequirementService } from 'src/app/services/requirement.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-selected-trainers',
  templateUrl: './selected-trainers.component.html',
  styleUrls: ['./selected-trainers.component.css']
})
export class SelectedTrainersComponent implements OnInit {

  requirements : Requirement[] = [];
  selectedTrainers : Trainer[] = [];
  trainer : Trainer;
 
  constructor(private requirementService : RequirementService, private trainerService : TrainerService, private router : Router) { }
 
  ngOnInit(): void {
    this.loadRequirements();
    
  }
 
  loadRequirements() {
    this.requirementService.getAllRequirements().subscribe((data)=> {
      this.requirements = data;
      console.log(this.requirements);
      this.loadSelectedTrainers();
    })
  }
 
  loadSelectedTrainers() {
    this.requirements = this.requirements.filter((r)=> r.trainer);
    console.log("Length " + this.requirements.length);
   
    for (let r  of this.requirements){
      this.trainerService.getTrainerById(r.trainer.trainerId).subscribe((data)=> {
        this.trainer = data;
        this.selectedTrainers.push(this.trainer);
      })
    console.log(this.selectedTrainers);
    }
   
  }
 
  writeReview(tranerId : number) {
  this.router.navigate(['/feedback', tranerId]);
  }
 

 

}
