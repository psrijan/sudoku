import { Component, OnInit } from '@angular/core';
import { ThemesService } from './service/themes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'sudoku';

  constructor(private themeService : ThemesService) {

  }

  ngOnInit(): void {
  }

  changeTheme() : void {
    console.log('change theme clicked');
    this.themeService.changeTheme('dark');
  }


}
