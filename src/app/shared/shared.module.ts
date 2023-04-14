import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { PaginatorComponent } from './paginator/paginator.component';
import { GeneralCardComponent } from './general-card/general-card.component';



@NgModule({
  declarations: [
    HeaderComponent,
    PaginatorComponent,
    GeneralCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    PaginatorComponent,
    GeneralCardComponent
  ]
})
export class SharedModule { }
