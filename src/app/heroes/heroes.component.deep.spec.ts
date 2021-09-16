import { Directive, Input } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { HeroService } from "../hero.service";
import { HeroComponent } from "../hero/hero.component";
import { HeroesComponent } from "./heroes.component";

// FOR BUILD IN DIRECTIVE
@Directive({
    selector: '[routerLink]',
    host: { '(click)': 'onClick()' }
})
export class RouterLinkDirectiveStub {
    @Input('routerLink') linkParams: any;
    navTo: any = null;
    onClick() {
        this.navTo = this.linkParams;
    }
}

describe('HeroesComponent (deep tests)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;

    beforeEach(() => {
        HEROES = [
            { id: 1, name: 'SpiderGirl', strength: 35 },
            { id: 2, name: 'Block widow', strength: 98 },
            { id: 3, name: 'Boys', strength: 76 },
          ]
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero'])
        TestBed.configureTestingModule({
            declarations: [HeroesComponent, HeroComponent, RouterLinkDirectiveStub],
            providers: [
                { provide: HeroService, useValue: mockHeroService }
            ],
        })

        fixture = TestBed.createComponent(HeroesComponent);
    })
    
    it('should render each hero as a HeroComponent', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        // run ngOnInit
        fixture.detectChanges();

        const heroComponentDebug = fixture.debugElement.queryAll(By.directive(HeroComponent))
        expect(heroComponentDebug.length).toBe(3);
        expect( heroComponentDebug[0].componentInstance.hero.name).toBe('SpiderGirl');
    })

    it(`should call heroService.deleteHero when the button is click`, () => {
        spyOn(fixture.componentInstance, 'delete'); // ???
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        // run ngOnInit
        fixture.detectChanges();

        // parent to child

        const heroComps = fixture.debugElement.queryAll(By.directive(HeroComponent));

        // heroComps[0].query(By.css('button'))
        //     .triggerEventHandler('click', { stopPropagation: () => {}});

        // (<HeroComponent>heroComps[0].componentInstance).delete.emit(undefined);

        // rise the event
        heroComps[0].triggerEventHandler('delete', null);

        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
    })

    it('should add a new hero to list when add button is clicked', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        // run ngOnInit
        fixture.detectChanges();

        const name = "BOYS";

        mockHeroService.addHero.and.returnValue(of({id: 6, name, strength: 4 }));

        const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
        const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

        inputElement.value = name;
        addButton.triggerEventHandler('click', null);

        fixture.detectChanges();
        const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;

        expect(heroText).toContain(name);
    })

    it('should have the correct route for the first hero', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
        const heroComps = fixture.debugElement.queryAll(By.directive(HeroComponent));
        //???? 
        let routerLink = heroComps[0].query(By.directive(RouterLinkDirectiveStub)).injector.get(RouterLinkDirectiveStub)
    
        heroComps[0].query(By.css('a')).triggerEventHandler('click', null);

        expect(routerLink.navTo).toBe('/detail/1');
    })
})