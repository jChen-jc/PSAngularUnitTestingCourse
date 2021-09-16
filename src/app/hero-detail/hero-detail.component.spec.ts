import { ComponentFixture, fakeAsync, flush, TestBed, tick, waitForAsync } from "@angular/core/testing"
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';

import { HeroService } from "../hero.service";
import { HeroDetailComponent } from "./hero-detail.component"
import { of } from "rxjs";
import { FormsModule } from "@angular/forms";

describe('HeroDetailComponent', () => {
  let fixture: ComponentFixture<HeroDetailComponent>,
  mockHeroService, mockLocationService, mockActiveRoute;

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
    mockLocationService = jasmine.createSpyObj(['back']);
    mockActiveRoute = {
      snapshot: {
        paramMap: {
          get: () => '3',
        }
      }
    }

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HeroDetailComponent],
      //active route, hero service, location service
      providers: [
        { provide: ActivatedRoute, useValue: mockActiveRoute },
        { provide: HeroService, useValue: mockHeroService },
        { provide: Location, useValue: mockLocationService },
      ]
    });
    fixture = TestBed.createComponent(HeroDetailComponent);
    mockHeroService.getHero.and.returnValue(of({ id: 3, name: 'Boys', strength: 11}))
  });

  
  it('should render hero name in a h2 tag', () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h2').textContent).toContain('BOYS')
  })

  // declare async 
  // it('should call updateHero when save is called', (done) => {
  //   mockHeroService.updateHero.and.returnValue(of(null));
  //   fixture.detectChanges();

  //   fixture.componentInstance.save();

  //   // BAD but will take long time as more async tests
  //   setTimeout(() => {
  //     expect(mockHeroService.updateHero).toHaveBeenCalled();
  //     done();
  //   }, 300);
  // })

  // THIS IS PREFERRED!!!!!!!!!!!
  it('should call updateHero when save is called', fakeAsync(() => {
    mockHeroService.updateHero.and.returnValue(of(null));
    fixture.detectChanges();

    fixture.componentInstance.save();
    // run the clock
    // tick(250);
    // just exc all when you don't know the time
    flush();
    expect(mockHeroService.updateHero).toHaveBeenCalled();
  }))

  // it('should call updateHero when save is called', waitForAsync(() => {
  //   mockHeroService.updateHero.and.returnValue(of(null));
  //   fixture.detectChanges();

  //   fixture.componentInstance.save();

  //   fixture.whenStable().then(() => {
  //     expect(mockHeroService.updateHero).toHaveBeenCalled();
  //   })
  // }))
})