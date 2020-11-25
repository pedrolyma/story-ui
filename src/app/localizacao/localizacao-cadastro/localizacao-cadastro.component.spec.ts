import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalizacaoCadastroComponent } from './localizacao-cadastro.component';

describe('LocalizacaoCadastroComponent', () => {
  let component: LocalizacaoCadastroComponent;
  let fixture: ComponentFixture<LocalizacaoCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalizacaoCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalizacaoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
