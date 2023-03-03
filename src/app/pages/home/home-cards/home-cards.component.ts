import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatamokService } from 'src/app/service/datamok.service';

@Component({
  selector: 'app-home-cards',
  templateUrl: './home-cards.component.html',
  styleUrls: ['./home-cards.component.scss']
})
export class HomeCardsComponent implements OnInit {
  changeSubscription: Subscription;

  modallogin = false;

  constructor(
    private datamokservice: DatamokService,
  ) {
    this.changeSubscription = this.datamokservice.getopModalLogin().subscribe(() => {
      this.modallogin = false;
    });
  }

  ngOnInit(): void {
  }

  openLanding() {
    window.open('https://landing-page-indicacao-n75g.vercel.app/', '_blank');
  }

}
