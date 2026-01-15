import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  showModal:boolean=false;
  constructor() { }

  ngOnInit(): void {
  }

  toggleModal() {
    this.showModal = true;
  }
 
  closeModal() {
    this.showModal = false;
  }

}
