import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { By } from "@angular/platform-browser";
import { HeroComponent } from "./hero.component"

describe('HeroComponent (shallow test', () => {
  let fixture: ComponentFixture<HeroComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    });
    fixture = TestBed.createComponent(HeroComponent);
  })

  it('should have the correct hero', () => {
    fixture.componentInstance.hero = { id: 1, name: 'Super!', strength: 3 };
    // fixture.detectChanges();
    expect(fixture.componentInstance.hero.name).toBe('Super!')
  })
  it('should render the hero name', () => {
    fixture.componentInstance.hero = { id: 1, name: 'Super!', strength: 3 };
    fixture.detectChanges();
    let deA = fixture.debugElement.query(By.css('a'));

    expect(deA.nativeElement.textContent).toContain('Super!')
    // expect(fixture.nativeElement.querySelector('a').textContent).toContain('Super!')
  })
})