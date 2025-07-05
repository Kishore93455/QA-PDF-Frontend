import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProgressBtnComponent } from '../commom-components/progress-btn/progress-btn.component';
import { Router } from '@angular/router';
import { StepHeaderComponent } from '../commom-components/step-header/step-header.component';


@Component({
  selector: 'app-mat-forms',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MatStepperModule, MatInputModule, MatFormFieldModule,
    ProgressBtnComponent, StepHeaderComponent
  ],
  templateUrl: './mat-forms.component.html',
  styleUrls: ['./mat-forms.component.scss']
})
export class MatFormsComponent implements OnInit {

  @ViewChild('stepper') stepper!: MatStepper;

  isLinear: boolean = true;

  firstform!: FormGroup;
  secondform!: FormGroup;
  photoForm!: FormGroup;
  extraForm!: FormGroup;

  photoFile: File | null = null;
  photoName: string = '';
  currentStepIndex: number = 0;
  stepsDone: number[] = [];

  steps = [
    { label: 'User Details' },
    { label: 'Parent Details' },
    { label: 'Photo Upload' },
    { label: 'Extra Details' },
    { label: 'Review Details' }
  ];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.firstform = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.minLength(10)]],
      city: ['', Validators.required]
    });

    this.secondform = this.fb.group({
      fatherName: ['', Validators.required],
      fatherNo: ['', [Validators.required, Validators.minLength(10)]],
      fatherJob: ['', Validators.required]
    });

    this.photoForm = this.fb.group({});

    this.extraForm = this.fb.group({
      qualification: ['', Validators.required],
      hobbies: ['', Validators.required]
    });
  }

  get currentForm(): FormGroup {
    return (this.stepper?.selected?.stepControl as FormGroup) || this.fb.group({});
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.photoFile = input.files[0];
      this.photoName = this.photoFile.name;
    }
  }

  onStepProgress(): void {
    if (this.stepper.selectedIndex === this.stepper._steps.length - 1) {
      alert('Form submitted SucessFully');
      console.log(this.firstform.value)
      console.log(this.secondform.value)
      console.log(this.extraForm.value)
      this.router.navigate(['/']);
    } else if (this.stepper.selectedIndex === this.stepper._steps.length - 3) {
        alert("Call API for Uploads")
        this.stepper.next();
    }
    else {
      this.stepper.next();
    }
  }

  skipPhotoUpload(): void {
    this.stepper.next();
  }

  stepHeaderChange(index: number): void {
    this.stepper.selectedIndex = index;
  }
  stepSelectionChange(event: any) {
    this.currentStepIndex = event.selectedIndex;
  }
  stepsDoneUpdate(steps: number[]): void {
    this.stepsDone = steps;
  }

}
