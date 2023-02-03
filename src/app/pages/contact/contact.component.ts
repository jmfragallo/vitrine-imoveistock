import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AnnouncementService } from 'src/app/service/announcement.service';
import { DatamokService } from 'src/app/service/datamok.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  form: FormGroup;
  changeSubscription: Subscription;

  modallogin = false;


  constructor(
    private formBuilder: FormBuilder,
    private datamokservice: DatamokService,
    private toastrService: ToastrService,
    private announcementService: AnnouncementService


  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      tel: ['',[Validators.required]],
      subject: ['',[Validators.required]],
      msg: ['', [Validators.required]],
    });
    this.changeSubscription = this.datamokservice.getopModalLogin().subscribe(() => {
      this.modallogin = false;
    });
  }

  ngOnInit(): void {

  }

  confirm(){
    // FAKE FEEDBACK
    this.announcementService.listLikes().subscribe(
      success => {
        this.toastrService.success('Mensagem enviada!', '', { progressBar: true });
        this.form.setValue({ name: '', email: '', tel: '', subject: '', msg: '' });
      },
      error => {
      }
    )
  }

  openLogin() {
    if (localStorage.getItem('user') === null) {
      this.datamokservice.opModalLogin();
    } else {
      window.open('https://imoveistock-app.vercel.app/logged/home', '_blank');
    }
  }

}
