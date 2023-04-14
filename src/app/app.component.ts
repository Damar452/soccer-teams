import { ChangeDetectorRef, Component } from '@angular/core';
import { LoadingService } from './core/services/loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isLoading = false;

  constructor(private loadingService: LoadingService, private cd: ChangeDetectorRef){
    this.setLoadingStatus();
  }

  public setLoadingStatus(){
    this.loadingService.isLoading$.subscribe( value => {
      this.isLoading = value;
      this.cd.detectChanges();
    });
  }
}
