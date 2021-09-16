import { TestBed } from "@angular/core/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject } from "@angular/core";

describe('HeroService', () => {
  let mockMessageService = jasmine.createSpyObj(['add']);
  let httpTestingController: HttpTestingController;
  let heroService: HeroService; 

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        HeroService,
        { provide: MessageService, useValue: mockMessageService }
      ]
    })

    httpTestingController = TestBed.inject(HttpTestingController);
    heroService = TestBed.inject(HeroService);

  })

  describe('getHero', () => {
    it('should call get the correct URL', () => {
      // call getHero()
      heroService.getHero(2).subscribe(hero => {
        expect(hero.id).toBe(2);
      });

      // test that the url was correct
      const req = httpTestingController.expectOne(`api/heroes/2`)

      req.flush({id: 2, name: "hey", strength: 11 })
      expect(req.request.method).toBe('GET');
      httpTestingController.verify();
    })
  })

})