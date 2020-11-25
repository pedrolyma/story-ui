import { Injectable } from '@angular/core';
import { ToastyService } from 'ng2-toasty';

@Injectable({
  providedIn: 'root'
})
export class ErrorhandlerService {

  constructor(private toasty: ToastyService) { }

  handle(erroResponse: any) {
    let msg: string;
    if (typeof erroResponse === 'string') {
      msg = erroResponse;
    } else {
      msg = 'Erro ao Executar Servico Remoto, Tente Novamente';
      console.log('Ocorreu um Erro', erroResponse);
    }
    this.toasty.error(msg);
  }
}
