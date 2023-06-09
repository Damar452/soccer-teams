import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SoccerTeam } from 'src/app/core/models/interfaces/teams-response';
import { AlertService } from 'src/app/core/services/alert/alert.service';
import { SoccerTeamsService } from 'src/app/core/services/soccer-teams/soccer-teams.service';
import { dateFormat, getMessage } from './equipment-form.consts';

@Component({
  selector: 'app-equipment-form',
  templateUrl: './equipment-form.component.html',
  styleUrls: ['./equipment-form.component.scss']
})
export class EquipmentFormComponent implements OnInit {

  public equipmentForm: FormGroup;
  public isEdit: boolean;
  public actualDate: string;
  private idTeam = this.activatedRoute.snapshot.params['id'];

  constructor(
    private formBuild: FormBuilder, 
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private soccerTeamsService: SoccerTeamsService,
    private alertService: AlertService,
    private datePipe: DatePipe, 
  ) { }

  ngOnInit(): void {
    this.setForm();
    this.getDateActual();
    this.idTeam && this.getSelectedTeamData();
  }

  public getDateActual(){
    this.actualDate = this.datePipe.transform(new Date(), dateFormat)!;  }

  public getValidation(controlName: string, validator: string) {
    const control = this.equipmentForm.get(controlName);
    return control?.touched && control.hasError(validator);
  }

  public goToList(): void{
    this.router.navigate(['/dashboard/equipment-list']);
  }

  public sendForm(form: SoccerTeam) {
    this.isEdit ? this.updateTeam(form) : this.createTeam(form);
  }

  private createTeam(form: SoccerTeam) {
    this.soccerTeamsService.createTeam(form).subscribe({
      next: () => {
        this.alertService.successAlert(getMessage('creado'));
        this.goToList();
      },
    });
  }

  private updateTeam(form: SoccerTeam) {
    form.id = this.idTeam;
    this.soccerTeamsService.updateTeam(form).subscribe({
      next: () => {
        this.alertService.successAlert(getMessage('actualizado'));
        this.goToList();
      },
    });
  }

  private setForm(): void {
    this.equipmentForm = this.formBuild.group({
      nombre: ['', [Validators.required]],
      estadio: ['', [Validators.required]],
      sitioWeb: ['', [Validators.required]],
      nacionalidad: ['', Validators.required],
      fundacion: ['', Validators.required],
      entrenador: ['', Validators.required],
      capacidad: ['', Validators.required],
      valor: ['', Validators.required],
    });
  }

  private getSelectedTeamData() {
    this.isEdit = true;
    this.soccerTeamsService.getTeamById(this.idTeam).subscribe({
      next: (resp) => {
        resp.fundacion = this.datePipe.transform(resp.fundacion, dateFormat)!;
        this.equipmentForm.patchValue(resp);
      }
    })
  }
}
