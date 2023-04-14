import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SoccerTeamsService } from 'src/app/core/services/soccer-teams/soccer-teams.service';
import { DatePipe } from '@angular/common';
import { SoccerTeam } from 'src/app/core/models/interfaces/teams-response';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert/alert.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { User } from 'src/app/core/models/interfaces/authentication';

@Component({
  selector: 'app-list-equipment',
  templateUrl: './list-equipment.component.html',
  styleUrls: ['./list-equipment.component.scss']
})
export class ListEquipmentComponent implements OnInit {

  public soccerTeams: SoccerTeam[] = [];
  public page: number = 1;
  public pageSize: number = 10;
  public totalElements: number;
  public hasMultiRegisters = true;
  public filtersForm: FormGroup;
  public userSession: User;
  private idTeam = this.activatedRoute.snapshot.params['id'];

  constructor(
    private soccerTeamsService: SoccerTeamsService, 
    private formBuild: FormBuilder, 
    private datePipe: DatePipe, 
    private router: Router,
    private alertService: AlertService,
    private storageService: StorageService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getData();
    this.setForm();
    this.getUser();
    this.idTeam && this.getCreated();
  }

  public getUser() {
    this.userSession = this.storageService.getUser();
  }

  public getControl(controlName: string) {
    return this.filtersForm?.get(controlName);
  }

  public getById(): void {
    this.getControl('dateStart')?.setValue('');
    this.getControl('dateEnd')?.setValue('');
    this.hasMultiRegisters = false;
    this.soccerTeamsService.getTeamById(this.getControl('id')?.value).subscribe({
      next: (resp) => {
        this.soccerTeams = [resp];
      },
      error: () => {
        this.soccerTeams = [];
      }
    })
  }

  public getByDates() {
    this.getControl('id')?.setValue('');
    const dateStart = this.datePipe.transform(this.getControl('dateStart')?.value, 'dd-MM-yyyy')!;
    const dateEnd = this.datePipe.transform(this.getControl('dateEnd')?.value, 'dd-MM-yyyy')!;
    this.soccerTeamsService.getTeamsByRange(dateStart, dateEnd).subscribe(resp => {
      this.hasMultiRegisters = false;
      this.soccerTeams = resp;
    })
  }

  public onPageIndexChanged(page: number): void {
    this.page = page;
    this.getData();
  }

  public clearFilters(): void {
    this.filtersForm.reset();
    this.getData();
    this.hasMultiRegisters = true;
    this.idTeam && this.router.navigate(['/dashbooard/equipment-list/']);
  }

  public onEdit(id: number): void {
    this.router.navigate(['/dashboard/equipment-edit', id]);
  }

  public async onDelete(id: number) {
    const confirmation = await this.alertService.confirmModal('¿Seguro que desea eliminar este equipo?', 'Luego de eliminarlo no podrá revertirlo');
    if(confirmation){
      this.soccerTeamsService.deleteTeam(id).subscribe(()=> this.getData());
    }
  }

  private getCreated() {
    this.getControl('id')?.setValue(this.idTeam);
    this.getById();
  }

  private setForm(): void {
    this.filtersForm = this.formBuild.group({
      id: ['', [Validators.required]],
      dateStart: ['', Validators.required],
      dateEnd: ['', Validators.required],
    });
  }

  private getData(): void {
    this.soccerTeamsService.getTeams(this.page, this.pageSize).subscribe(resp => {
      this.soccerTeams = resp?.content;
      this.totalElements = resp?.totalElements;
    })
  }
}
