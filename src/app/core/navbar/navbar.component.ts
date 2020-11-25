import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private primengConfig: PrimeNGConfig,
    private router: Router) { }

  items: MenuItem[];

  ngOnInit(): void {
    this.items = [
      {
          label: 'Cadastros',
          icon: 'pi pi-file',
          items: [{
                  label: 'Usuarios', icon: 'pi pi-users', routerLink: '/usuarios'},
                  {label: 'Seções', icon: 'pi pi-tags', routerLink: '/secoes'},
                  {label: 'Marcas', icon: 'pi pi-mobile', routerLink: '/marcas'},
                  {label: 'Modelos', icon: 'pi pi-money-bill', routerLink: '/modelos'},
                  {label: 'Cores', icon: 'pi pi-circle-on', routerLink: '/cores'},
                  {label: 'Unidades', icon: 'pi pi-info', routerLink: '/unidades'},
                  {label: 'Localização', icon: 'pi pi-folder', routerLink: '/localizacao'},
                  {label: 'Grades', icon: 'pi pi-bars', routerLink: '/grades'},
                  {label: 'Fornecedores', icon: 'pi pi-folder-open', routerLink: '/fornecedores'},
                  {label: 'Produtos', icon: 'pi pi-fw pi-plus', routerLink: '/produtos'},
          ]
      },
      {
          label: 'Movimentação',
          icon: 'pi pi-id-card',
          items: [
              {label: 'Entradas', icon: 'pi pi-fw pi-trash'},
              {label: 'Vendas', icon: 'pi pi-fw pi-refresh'}
          ]
      },
      {
        label: 'Relatorios',
        icon: 'pi pi-video',
        items: [
            {label: 'Produtos', icon: 'pi pi-fw pi-trash'},
            {label: 'Entradas', icon: 'pi pi-fw pi-refresh'},
            {label: 'Vendas', icon: 'pi pi-fw pi-refresh'}
        ]
    },
    {
      label: 'Graficos',
      icon: 'pi pi-sliders-h',
      items: [
          {label: 'Produtos', icon: 'pi pi-fw pi-trash'},
          {label: 'Entradas', icon: 'pi pi-fw pi-refresh'},
          {label: 'Vendas', icon: 'pi pi-fw pi-refresh'}
      ]
  },
    {label: 'SIGCOM-Sistema Gerenciador Comercial', styleClass: 'font-size: 25px,'}
  ];





  //         label: 'Usuario',
  //         icon: 'pi pi-users',
  //         command: () => { this.usuario(); }
  //     },
  //     {
  //         label: 'Seção',
  //         icon: 'pi pi-file',
  //         command: () => { this.secao(); }
  //     },
  //     {
  //       label: 'Cores',
  //       icon: 'pi pi-circle-on',
  //       routerLink: '/cores'
  //       // command: () => { this.Cores(); }
  //     },
  //     {
  //       label: 'Marca',
  //       icon: 'pi pi-image',
  //       routerLink: '/marca'
  //       // command: () => { this.marca(); }
  //     },
  //     {
  //       label: 'Modelo',
  //       icon: 'pi pi-image',
  //       routerLink: '/modelo'
  //       // command: () => { this.modelo(); }
  //     },
  //     {
  //       label: 'Localização',
  //       icon: 'pi pi-search',
  //       routerLink: '/localiza'
  //     },
  //     {
  //       label: 'Unidade',
  //       icon: 'pi pi-search',
  //       routerLink: '/Unidade'
  //     },
  //     {
  //       label: 'Fornecedores',
  //       icon: 'pi pi-search',
  //       routerLink: '/fornecedores'
  //     },
  //     {
  //       label: 'Produtos',
  //       icon: 'pi pi-search',
  //       routerLink: '/produtos'
  //     }
  //     ]},
  //     {
  //         label: 'Navigate',
  //         items: [{
  //             label: 'Angular Website',
  //             icon: 'pi pi-external-link',
  //             url: 'http://angular.io'
  //         },
  //         {
  //             label: 'Router',
  //             icon: 'pi pi-upload',
  //             routerLink: '/fileupload'
  //         }
  //     ]}
  // ];
  }

  usuario() {
     this.router.navigate(['/usuarios']);
  }

  secao() {
     this.router.navigate(['/secao']);
  }


}
