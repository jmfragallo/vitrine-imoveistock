import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AnnouncementGetResponseDto } from 'src/app/dtos/announcement-get-response.dto';
import { ScheduleRegisterRequestDto } from 'src/app/dtos/schedule-register-request.dto';
import { ScheduleService } from 'src/app/service/schedule.service';
import { SchedulingStep6Component } from '../scheduling-step6/scheduling-step6.component';

@Component({
  selector: 'app-scheduling-step5',
  templateUrl: './scheduling-step5.component.html',
  styleUrls: ['./scheduling-step5.component.scss']
})
export class SchedulingStep5Component implements OnInit {

  dateSelected: Date;

  response: AnnouncementGetResponseDto;

  dateSend: ScheduleRegisterRequestDto;

  constructor(
    private modalService: NgbModal,
    private scheduleService: ScheduleService
  ) { }

  ngOnInit(): void {
    let dateSelected = localStorage.getItem('dateScheduling')
    this.dateSelected = JSON.parse(dateSelected);

    let announcementSelected = localStorage.getItem('announcementOfScheduling');
    this.response = JSON.parse(announcementSelected);


    this.dateSend = {
      visitDate: this.dateSelected
    }
  }

  exit() {
    this.modalService.dismissAll()
  }

  confirm() {
    this.modalService.dismissAll()
    this.modalService.open(SchedulingStep6Component, { centered: true, backdrop: 'static', keyboard: false });
  }
}
