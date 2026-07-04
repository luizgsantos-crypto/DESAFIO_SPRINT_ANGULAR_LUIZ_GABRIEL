import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Veiculo {
  id: number;
  vehicle: string;
  volumetotal: number;
  connected: number;
  softwareUpdates: number;
  img: string;
}

interface Telemetria {
  id: number;
  odometro: number;
  nivelCombustivel: number;
  status: string;
  lat: number;
  long: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  nomeUsuario: string = '';
  veiculos: Veiculo[] = [];
  filtroVeiculo: string = '';
  veiculoSelecionado: Veiculo | null = null;

  vinBusca: string = '';
  resultadosTelemetria: (Telemetria & { vin: string })[] = [];

  constructor(private http: HttpClient, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    const usuarioSalvo = localStorage.getItem('usuarioLogado');
    if (usuarioSalvo) {
      this.nomeUsuario = JSON.parse(usuarioSalvo).nome;
      this.buscarVeiculos();
    } else {
      this.router.navigate(['/login']);
    }
  }

  get veiculosFiltrados(): Veiculo[] {
    if (!this.filtroVeiculo.trim()) return this.veiculos;
    return this.veiculos.filter(v =>
      v.vehicle.toLowerCase().includes(this.filtroVeiculo.trim().toLowerCase())
    );
  }

  buscarVeiculos() {
    this.http.get('http://localhost:3001/vehicles').subscribe({
      next: (res: any) => {
        this.veiculos = res.vehicles;
        if (this.veiculos.length) {
          this.selecionarVeiculo(this.veiculos[0]);
        }
        this.cdr.detectChanges();
      },
      error: (erro) => console.error('Erro na API:', erro)
    });
  }

  selecionarVeiculo(v: Veiculo) {
    this.veiculoSelecionado = v;
    this.filtroVeiculo = v.vehicle;
  }

  buscarTelemetria() {
    const vin = this.vinBusca.trim();
    if (!vin) return;

    this.http.post('http://localhost:3001/vehicleData', { vin }).subscribe({
      next: (dados: any) => {
        this.resultadosTelemetria = [{ ...dados, vin }];
        this.cdr.detectChanges();
      },
      error: () => {
        this.resultadosTelemetria = [];
        alert('Código VIN não encontrado.');
      }
    });
  }

  sair() {
    localStorage.removeItem('usuarioLogado');
    this.router.navigate(['/login']);
  }

  /**
   * Cada modelo recebe a cor da sua identidade visual:
   * Ranger -> laranja | Territory -> azul claro | Mustang -> preto | Bronco Sport -> vermelho
   */
  corPorNome(nomeVeiculo: string): string {
    const nome = nomeVeiculo.toLowerCase();
    if (nome.includes('ranger')) return 'cor-ranger';
    if (nome.includes('territory')) return 'cor-territory';
    if (nome.includes('mustang')) return 'cor-mustang';
    if (nome.includes('bronco')) return 'cor-bronco';
    return 'cor-padrao';
  }
}
