import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnnouncementGetResponseDto } from 'src/app/dtos/announcement-get-response.dto';
import { UserGetResponseDto } from 'src/app/dtos/user-get-response.dtos';
import { SearchService } from 'src/app/service/search.service';
import { UserService } from 'src/app/service/user.service';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
@Component({
  selector: 'app-home-products',
  templateUrl: './home-products.component.html',
  styleUrls: ['./home-products.component.scss']
})
export class HomeProductsComponent implements OnInit {
  iconlikeheart = false;

  response: AnnouncementGetResponseDto[] = [];
  user: UserGetResponseDto;
  urlsimg: any = [];

  logged: boolean;
  naruto: string;

  filterDuplicate: any = [];

  recentlySeenList: any = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private searchService: SearchService,
  ) { }

  ngOnInit(): void {
    this.searchService.getPropertyHomeExclusivity().subscribe(
      success => {
        this.response = success;
        console.log(this.response);
      },
      error => { console.log(error, 'data not collected') }
    );

  }


  likeHeart() {
    this.iconlikeheart = !this.iconlikeheart;
  }

  announcementSelected(value) {
    localStorage.setItem('recentlySeen', JSON.stringify(this.recentlySeenList));
    this.router.navigate([`announcement/detail/${value}`])
    let teste: any = localStorage.getItem('recentlySeen');
    this.recentlySeenList = JSON.parse(teste);


    let verify = {_id: value};

    let list: any = this.recentlySeenList;

    if(list === null) {
      list = [];
    }
    
    if(this.recentlySeenList !== null ) {
      for (let i = 0; i < list.length; i++) {
        if(list[i]._id === value) {
          return
        }
      }
    }

    list.push(verify);

    this.recentlySeenList = list;




  }

}
