
import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/feedback.model';
import { Trainer } from 'src/app/models/trainer.model';
import { User } from 'src/app/models/user.model';
import { FeedbackService } from 'src/app/services/feedback.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-coordinatorviewfeedback',
  templateUrl: './coordinatorviewfeedback.component.html',
  styleUrls: ['./coordinatorviewfeedback.component.css']
})
export class CoordinatorviewfeedbackComponent implements OnInit {

  feedbacks:Feedback[]=[];
  origFeedback:Feedback[]=[];
  filteredFeedbacks:Feedback[]=[];
  user :User;
  u:boolean = false;
  t : boolean  = false; 
  trainer : Trainer;
  searchTerm:string='';
  constructor(private fs:FeedbackService, private trainerService : TrainerService) { }


  filterByCategory(option : string) {
    if(option == ''){
      this.feedbacks = this.filteredFeedbacks;
    }
    else{
      this.feedbacks = this.filteredFeedbacks.filter((f)=> f.category.includes(option));
    }

  }
  applySearch() {
    const term = this.searchTerm.toLowerCase().trim();
    this.feedbacks = this.filteredFeedbacks.filter(f =>
      f.user?.username.toLowerCase().includes(term) ||
      f.trainer?.name.toLowerCase().includes(term)
    );
  }


  ngOnInit(): void {
    this.loadfeedback();
  }
  loadfeedback(){
    this.fs.getFeedbacks().subscribe((data)=>{
      this.feedbacks=data;
      this.filteredFeedbacks = data;
    })
  }

  showProfile(userId : number) {
     this.u = true;
     this.fs.getUserById(userId).subscribe((data)=>{
      this.user =data;
      console.log(this.user);
     })
  }

  viewTrainer(trainerId : number) {
    this.t = true;
    this.trainerService.getTrainerById(trainerId).subscribe((data)=> {
      this.trainer = data;
      console.log(this.trainer);
    })
  }

  closeModal() {
    if(this.u == true) {
      this.u = false;
    }
    else {
      this.t = false;
    }
  }

}

