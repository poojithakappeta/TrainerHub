import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Requirement } from 'src/app/models/requirement.model';
import { Trainer } from 'src/app/models/trainer.model';
import { RequirementService } from 'src/app/services/requirement.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-manager-requirement',
  templateUrl: './manager-requirement.component.html',
  styleUrls: ['./manager-requirement.component.css']
})
export class ManagerRequirementComponent implements OnInit {
  requirementForm: FormGroup;

  requirement: Requirement = {
    title: '',
    description: '',
    department: '',
    postedDate: new Date(),
    status: '',
    duration: '',
    mode: '',
    location: '',
    skillLevel: '',
    budget: 0,
    priority: ''
  };


  reqId: number = 0;
  isEditing: boolean = false;
  trainers: Trainer[] = [];
  showTrainerList: boolean = false;
  showAddPopup: boolean = false;
  showUpdatePopup: boolean = false;

  constructor(private fb: FormBuilder, private rs: RequirementService, private router: Router, private route: ActivatedRoute, private ts: TrainerService) {
    this.requirementForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      department: ['', Validators.required],
      status: ['Open', Validators.required],
      duration: ['', Validators.required],
      mode: ['', Validators.required],
      location: ['', Validators.required],
      skillLevel: ['', Validators.required],
      budget: [0, [Validators.required, Validators.min(0)]],
      priority: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id'] && !isNaN(+params['id'])) {
        this.reqId = +params['id'];
        this.isEditing = true;

        this.rs.getRequirementById(this.reqId).subscribe({
          next: (data) => {
            this.requirementForm.patchValue(data);
          },
          error: (err) => {
            console.error('Error fetching requirement:', err);
          }
        });
      } else {
        console.warn('Invalid or missing requirement ID');
      }
    });
  }



  addRequirement() {

    this.requirement = this.requirementForm.value;

    this.requirement.postedDate = new Date();

    if (this.requirementForm.invalid) {

      alert("Please fill all form details correctly");

      return;

    }

    if (this.requirementForm.valid && !this.isEditing) {

      this.rs.addRequirement(this.requirement).subscribe(() => {

        this.showAddPopup = true;

        this.requirementForm.reset();

      });

    } else {

      this.rs.updateRequirement(this.reqId, this.requirement).subscribe(() => {

        this.showUpdatePopup = true;

      });

    }

  }

  confirmAdd() {

    this.showAddPopup = false;
  }


  confirmUpdate() {
    this.showUpdatePopup = false;
    this.router.navigate(['/managerviewrequirements']);
  }

  goBack() {
    this.router.navigate(['/managerviewrequirements']);
  }
  get f() {
    return this.requirementForm.controls;
  }


}
