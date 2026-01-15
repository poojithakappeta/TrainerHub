import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Trainer } from 'src/app/models/trainer.model';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-trainer-management',
  templateUrl: './trainer-management.component.html',
  styleUrls: ['./trainer-management.component.css']
})
export class TrainerManagementComponent implements OnInit {

  trainerForm: FormGroup;
  trainerId: number;
  trainer: Trainer;
  errorMessage: string = '';
  added: boolean = false;
  updated: boolean = false;
  resumeFile: File | null = null;
  minDate: string;


  constructor(private fb: FormBuilder, private trainerService: TrainerService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
    this.trainerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      expertise: ['', [Validators.required]],
      experience: ['', [Validators.required]],
      certification: ['', [Validators.required]],
      joiningDate: ['', [Validators.required, Validators.min]],
      resume: ['', Validators.required],
      status: ['Active']
    })


    this.trainerId = +this.route.snapshot.params['id'];
    console.log(this.trainerId);

    if (this.trainerId > 0) {
      this.trainerService.getTrainerById(this.trainerId).subscribe((data) => {
        this.trainerForm = this.fb.group({
          name: [data.name, [Validators.required]],
          email: [data.email, [Validators.required, Validators.email]],
          phone: [data.phone, [Validators.required, Validators.pattern(/^\d{10}$/)]],
          expertise: [data.expertise, [Validators.required]],
          experience: [data.experience, [Validators.required]],
          certification: [data.certification, [Validators.required]],
          joiningDate: [data.joiningDate, [Validators.required, Validators.min]],
          resume: ['', Validators.required],
          status: ['Active']
        })

      })
    }


    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];


  }


  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.resumeFile = file;
    }
  }


  addTrainer() {
    if (this.trainerForm.valid) {
      const trainerData = this.trainerForm.value;
      if (this.trainerId > 0) {
        this.trainerService.updateTrainer(this.trainerId, trainerData, this.resumeFile).subscribe((data) => {
          this.added = true;
          console.log(`Updated Data: ${data}`);

        })
      }
      else {
        this.trainerService.addTrainer(trainerData, this.resumeFile).subscribe(
          (data) => {
            this.added = true;
            console.log(data);
          },
          (error) => {
            this.errorMessage = 'Duplicate Trainer cannot be added.';
          }
        );
      }

    }
  }

  closeModal() {
    this.trainerForm.reset();
    this.ngOnInit();
    this.added = false;
  }

  closeModalU() {
    this.router.navigate(['/trainers/view']);
  }

  handleOkClick() {
    if (this.trainerId > 0) {
      this.closeModalU();
    }
    else {
      this.closeModal();
    }
  }

  get f() {
    return this.trainerForm.controls;
  }

  goBack() {
    this.router.navigate(['/trainers/view']);
  }


}

