import { TestBed } from '@angular/core/testing';

import { SoccerTeamsService } from './soccer-teams.service';

describe('SoccerTeamsService', () => {
  let service: SoccerTeamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoccerTeamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
