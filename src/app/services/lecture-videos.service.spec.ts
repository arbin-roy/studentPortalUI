import { TestBed } from '@angular/core/testing';

import { LectureVideosService } from './lecture-videos.service';

describe('LectureVideosService', () => {
  let service: LectureVideosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LectureVideosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
