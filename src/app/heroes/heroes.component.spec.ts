import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroesComponent } from "./heroes.component";

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let HEROES: Hero[];
  let mockHeroService;

  beforeEach(() => {
    HEROES = [
      { id: 1, name: 'SpiderGirl', strength: 35 },
      { id: 2, name: 'Block widow', strength: 98 },
      { id: 3, name: 'Boys', strength: 76 },
    ]

    // mock functions
    mockHeroService = jasmine.createSpyObj(['getHeros', 'addHero', 'deleteHero'])
    // pass the required server to component
    component = new HeroesComponent(mockHeroService)
  })

  describe('delete', () => {
    it('should remove the hero from the list', () => {
      // because delete is observable
      mockHeroService.deleteHero.and.returnValue(of(true))
      component.heroes = HEROES;

      component.delete(HEROES[2]);

      expect(component.heroes.length).toBe(2);
    })

    it('should call deleteHero', () => {
      mockHeroService.deleteHero.and.returnValue(of(true))
      component.heroes = HEROES;

      component.delete(HEROES[2]);

      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
    })
  })
})