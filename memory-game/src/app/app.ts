import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';

interface Card {
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  cards: Card[] = [];
  flippedCards: Card[] = [];
  moves = 0;
  bestScore: number | null = null;
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.startGame();

    if (this.isBrowser) {
      this.loadBestScore();
    }
  }

  startGame() {
    const values = ['🍎', '🍌', '🍇', '🍓', '🍍', '🥝'];
    const deck = [...values, ...values];

    this.cards = deck
      .sort(() => Math.random() - 0.5)
      .map(v => ({
        value: v,
        isFlipped: false,
        isMatched: false
      }));

    this.moves = 0;
    this.flippedCards = [];
  }

  flipCard(card: Card) {
    if (card.isFlipped || card.isMatched || this.flippedCards.length === 2) return;

    card.isFlipped = true;
    this.flippedCards.push(card);

    if (this.flippedCards.length === 2) {
      this.moves++;
      this.checkMatch();
    }
  }

  checkMatch() {
    const [c1, c2] = this.flippedCards;

    if (c1.value === c2.value) {
      c1.isMatched = true;
      c2.isMatched = true;
      this.flippedCards = [];
      this.checkWin();
    } else {
      setTimeout(() => {
        c1.isFlipped = false;
        c2.isFlipped = false;
        this.flippedCards = [];
      }, 800);
    }
  }

  checkWin() {
    const finished = this.cards.every(c => c.isMatched);

    if (finished && this.isBrowser) {
      this.saveBestScore();
      alert('Победи! Moves: ' + this.moves);
    }
  }

  restart() {
    this.startGame();
  }

  loadBestScore() {
    const score = localStorage.getItem('bestScore');
    if (score) this.bestScore = Number(score);
  }

  saveBestScore() {
    if (this.bestScore === null || this.moves < this.bestScore) {
      this.bestScore = this.moves;
      localStorage.setItem('bestScore', this.moves.toString());
    }
  }
}


