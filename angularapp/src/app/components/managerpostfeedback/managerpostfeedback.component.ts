import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';


@Component({
  selector: 'app-managerpostfeedback',
  templateUrl: './managerpostfeedback.component.html',
  styleUrls: ['./managerpostfeedback.component.css']
})
export class ManagerpostfeedbackComponent implements OnInit {
 
  feedbackForm: FormGroup;
  submitted = false;
  feedback:Feedback;
  loggedInManagerId:number;
  trainerId:number;
  showAddPopup:boolean=false;
  constructor(private fb: FormBuilder,private feedbackService:FeedbackService,private route: ActivatedRoute,private au:AuthService) {
 
  }
  ngOnInit(): void {    
    this.loggedInManagerId= this.au.getUserId();
   this.trainerId = Number(this.route.snapshot.params['id']);
   console.log(this.trainerId);
    this.feedbackForm = this.fb.group({
      category: ['', Validators.required],
      feedbackText: ['', Validators.required],
      ratings: [null, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
 
  }
 
  get f() {
    return this.feedbackForm.controls;
  }
 
  addFeedback() {
    this.submitted = true;
    if (this.feedbackForm.invalid) {
      console.log(":Invalid")
      return;
    }
   
    this.feedback={
      ...this.feedbackForm.value,
      userId:this.loggedInManagerId,
      trainerId:this.trainerId,
      date:new Date(),
      feedbackId:Date.now()  
    };
    console.log(this.feedback);
    this.feedbackService.sendFeedback(this.loggedInManagerId,this.trainerId,this.feedback).subscribe((data)=>{      
      this.feedback=data;
      this.feedbackForm.reset();
      this.submitted=false;
      Object.keys(this.feedbackForm.controls).forEach((key)=>{
        console.log(key);
        this.feedbackForm.get(key)?.setErrors(null);
      });
      this.showAddPopup=true;
    });
   
  }
  confirmAdd() {
    this.showAddPopup = false;
  }
}
