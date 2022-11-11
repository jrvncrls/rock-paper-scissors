import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-play-page',
  templateUrl: './play-page.component.html',
  styleUrls: ['./play-page.component.scss'],
})
export class PlayPageComponent implements OnInit {
  Choice = Choice;

  timer = 3;

  opponentsChoice!: string;
  playersChoice!: Choice;

  constructor() {}

  ngOnInit(): void {
    this.opponentsChoice = this.setOpponentsChoice();

    let interval = setInterval(() => {
      this.timer--;
      if (this.timer === 0) {
        clearInterval(interval);
        console.log(
          this.calculateChoices(this.playersChoice, this.opponentsChoice)
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
    if (playerChoice === opponentsChoice) {
      return Result.Won;
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
