import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-qeustion-card',
  templateUrl: './qeustion-card.component.html',
  styleUrls: ['./qeustion-card.component.css']
})

export class QeustionCardComponent {
  constructor(private router: Router) { }
answer_router(){
  this.router.navigateByUrl('/question');

}
}
