import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-add-animal',
  templateUrl: './add-animal.component.html',
  styleUrls: ['./add-animal.component.scss']
})
export class AddAnimalComponent implements OnInit {
  createAnimalForm: FormGroup;
  images = [];
  inputSpecies: any = 'default';
  inputRace: any = 'default';
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createAnimalForm = this.formBuilder.group({
      name: [],
      age: [],
      sex: [],
      story: [],
      color: [],
      character: [],
      species: [],
      race: [],
      file: [],
      fileSource: [],
      specifications: this.formBuilder.array([this.createSpecifications()])
    });
  }

  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      const filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.images.push(event.target.result);
          this.createAnimalForm.patchValue({
            fileSource: this.images
          });
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
    console.log(this.createAnimalForm);
  }

  get specifications() {
    return this.createAnimalForm.get('specifications') as FormArray;
  }

  createSpecifications() {
    return this.formBuilder.group({
      specificationName: [''],
      specificationValue: ['']
    });
  }

  addSpecifications() {
    this.specifications.push(this.createSpecifications());
  }

  deleteSpecifications(index) {
    this.specifications.removeAt(index);
  }

  removeImg(index: number) {
    this.images.splice(index, 1);
    this.createAnimalForm.patchValue({
      fileSource: this.images
    });
    console.log(this.createAnimalForm);
  }
}
