import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ServiceResponse, SoccerTeam } from '../../models/interfaces/teams-response';

@Injectable({
  providedIn: 'root'
})
export class SoccerTeamsService {

  private api = environment.API + '/equipos';

  constructor(private http: HttpClient) { }

  public getTeams(page: number, size: number): Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(`${this.api}/listar/${page}/${size}`);
  }

  public getTeamById(id:number): Observable<SoccerTeam> {
    return this.http.get<SoccerTeam>(`${this.api}/consultar/${id}`);
  }

  public getTeamsByRange(start: string, end: string) {
    return this.http.get<any>(`${this.api}/consultar/${start}/${end}`);
  }

  public createTeam(team: SoccerTeam) {
    return this.http.post<SoccerTeam>(`${this.api}/crear`, team);
  }

  public updateTeam(team: SoccerTeam): Observable<SoccerTeam>  {
    return this.http.put<SoccerTeam>(`${this.api}/actualizar/${team.id}`, team);
  }

  public deleteTeam(id: number)  {
    return this.http.delete<any>(`${this.api}/eliminar/${id}`);
  }
}
