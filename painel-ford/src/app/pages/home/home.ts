import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  nomeUsuario: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const usuarioSalvo = localStorage.getItem('usuarioLogado');
    if (usuarioSalvo) {
      this.nomeUsuario = JSON.parse(usuarioSalvo).nome;
    } else {
      this.router.navigate(['/login']);
    }
  }

  irParaDashboard() {
    this.router.navigate(['/dashboard']);
  }

  sair() {
    localStorage.removeItem('usuarioLogado');
    this.router.navigate(['/login']);
  }
}
