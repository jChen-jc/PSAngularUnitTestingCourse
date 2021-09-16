import { Component, NO_ERRORS_SCHEMA, Input } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroesComponent } from "./heroes.component"

describe('HeroesComponent (shallow tests)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;
    
    @Component({
        selector: 'app-hero',
        template: '<div></div>',
      })
      class FakeHeroComponent {
        @Input() hero: Hero;
        // @Output() delete = new EventEmitter();
      
        // onDeleteClick($event): void {
        //   $event.stopPropagation();
        //   this.delete.next();
        // }
      }
      

    beforeEach(() => {
        HEROES = [
            { id: 1, name: 'SpiderGirl', strength: 35 },
            { id: 2, name: 'Block widow', strength: 98 },
            { id: 3, name: 'Boys', strength: 76 },
          ]
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero'])
        TestBed.configureTestingModule({
            declarations: [HeroesComponent, FakeHeroComponent],
            providers: [
                { provide: HeroService, useValue: mockHeroService }
            ],
            //schemas: [NO_ERRORS_SCHEMA] ignore child component
        })

        fixture = TestBed.createComponent(HeroesComponent);
    })

    it('should set heros from service', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        expect(fixture.componentInstance.heroes.length).toBe(3);
    })

    it('should render one li for each hero', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        const counts = fixture.debugElement.queryAll(By.css('li')).length;

        expect(counts).toBe(3);
    })
})