import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ruleta-jass';
  isRotating = false;
  selectedNumber: number | null = null;
  casillaSeleccionada: number | null = null;
  filas: number[][] = [];
  resultado: string | null = null;

  @ViewChild('rouletteContainer') rouletteContainer!: ElementRef;

  constructor() {
    this.generarFilas();
  }

  generarFilas() {
    for (let i = 2; i >= 0; i--) {
      let fila: number[] = [];
      for (let j = i + 1; j <= 36; j += 3) {
        fila.push(j);
      }
      this.filas.push(fila);
    }
  }

  generarNumeroAleatorio(): number {
    return Math.floor(Math.random() * 36) + 1;
  }

  seleccionarCasilla(numero: number) {
    this.casillaSeleccionada = numero;
    console.log("casilla seleccionada: " + numero);
  }

  spinRoulette() {
    this.resultado = "";
    if (!this.isRotating) {
      const container = this.rouletteContainer.nativeElement;
      container.classList.add('rotating');
      this.isRotating = true;

      const animationDuration = 6000;

      setTimeout(() => {
        container.classList.remove('rotating');
        this.isRotating = false;
        this.selectedNumber = this.generarNumeroAleatorio();

        if (this.selectedNumber === this.casillaSeleccionada) {
          this.resultado = 'GANASTE (Número exacto)';
        } else if (this.casillaSeleccionada !== null) {
          if (this.selectedNumber >= 1 && this.selectedNumber <= 12 && this.casillaSeleccionada! >= 1 && this.casillaSeleccionada! <= 12) {
            this.resultado = 'GANASTE (1 - 12) Numero aleatorio: ' + this.selectedNumber;
          } else if (this.selectedNumber >= 13 && this.selectedNumber <= 24 && this.casillaSeleccionada! >= 13 && this.casillaSeleccionada! <= 24) {
            this.resultado = 'GANASTE (13-24) Numero aleatorio: ' + this.selectedNumber;
          } else if (this.selectedNumber >= 25 && this.selectedNumber <= 36 && this.casillaSeleccionada! >= 25 && this.casillaSeleccionada! <= 36) {
            this.resultado = 'GANASTE (25-36) Numero aleatorio: ' + this.selectedNumber;
          } else {
            this.resultado = 'PERDISTE Numero aleatorio: ' + this.selectedNumber;
          }
        } else {
          this.resultado = 'PERDISTE Numero aleatorio: ' + this.selectedNumber;
        }
        console.log("Num aleat: " + this.selectedNumber)
        console.log("Num selec: " + this.casillaSeleccionada)
      }, animationDuration);

      const audio = new Audio();
      audio.src = "../assets/audio/audioRuleta.mp3";
      audio.load();
      audio.play();
    }
  }

  esRojo(numero: number): boolean {
    const rojoNumbers: number[] = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    return rojoNumbers.includes(numero);
  }
}
