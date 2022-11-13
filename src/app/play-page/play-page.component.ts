import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-play-page',
  templateUrl: './play-page.component.html',
  styleUrls: ['./play-page.component.scss'],
})
export class PlayPageComponent implements OnInit {
  Choice = Choice;

  opponentsChoice$ = new BehaviorSubject('');
  loading$ = new BehaviorSubject(true);

  timer = 5;
  playersChoice!: Choice;

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.loading$.next(false);
      this.startPlay();
    }, 2000);
  }

  startPlay(): void {
    this.opponentsChoice$.next(this.setOpponentsChoice());

    let interval = setInterval(() => {
      this.timer--;
      if (this.timer === 0) {
        clearInterval(interval);
        console.log(
          this.calculateChoices(this.playersChoice, this.opponentsChoice$.value)
        );
      }
    }, 1000);
  }

  setPlayersChoice(choice: Choice): void {
    this.playersChoice = choice;
  }

  setOpponentsChoice(): string {
    return Object.values(Choice)[Math.floor(Math.random() * 3)];
  }

  calculateChoices(playerChoice: Choice, opponentsChoice: string): Result {
    // Draw
    console.log('playerChoice', playerChoice);
    console.log('opponentsChoice', opponentsChoice);
    if (playerChoice == opponentsChoice) {
      return Result.Draw;
    }

    // Won
    if (
      (playerChoice === Choice.Rock && opponentsChoice === Choice.Scissor) ||
      (playerChoice === Choice.Paper && opponentsChoice === Choice.Rock) ||
      (playerChoice === Choice.Scissor && opponentsChoice === Choice.Paper)
    ) {
      return Result.Won;
    }

    return Result.Lose;
  }
}

export enum Choice {
  Rock = 'rock',
  Paper = 'paper',
  Scissor = 'scissors',
}

enum Result {
  Won = 'You Won',
  Lose = 'You Lose',
  Draw = 'Draw',
}
