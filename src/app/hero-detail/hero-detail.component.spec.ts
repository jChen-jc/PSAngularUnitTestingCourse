import { ComponentFixture, TestBed } from "@angular/core/testing"
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

})