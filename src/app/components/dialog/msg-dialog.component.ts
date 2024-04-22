import { Component, Inject, OnInit } from "@angular/core";
import {
    MatDialog,
    MAT_DIALOG_DATA,
    MatDialogRef,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  } from '@angular/material/dialog';
import { ThemesService } from "src/app/service/themes.service";


@Component({
    selector: 'msg-dialog',
    templateUrl: './msg-dialog.component.html',
    styleUrls: ['./msg-dialog.component.scss']
})
export class MsgDialogComponent {

    minStr : string = "";
    secStr : string = ""; 
    difficultyLevel : string;
    themeChoice : any;
    fontSize : any = 1;

    constructor(public dialogRef : MatDialogRef<MsgDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData, private themeService : ThemesService) { 
            this.themeChoice = data.theme?.type;
            this.fontSize = data.theme?.fontSize;
            console.log("Msg - Dialog: ", data);
    }


    doneClicked() {
        let fontSize = 2;
        this.dialogRef.close({theme: this.themeChoice, fontSize : fontSize });

    }

    resumeClicked() {
        this.dialogRef.close(PauseDialogResponse.RESUME);
    }

    restartClicked() {
        this.dialogRef.close(PauseDialogResponse.RESTART);

    }

  themeChosen(value ) {
    this.themeChoice = value;
    this.themeService.changeTheme(value);
  }
}

export interface DialogData {
    theme?: {type : any, fontSize : number},
    pause? : { minStr : string, secStr : string, difficulty : string, hintHeader? : string, hintContent? : string }
}


export enum PauseDialogResponse {
    RESTART,
    RESUME
}

export enum ThemeChoice {
    DARK = "dark",
    WHITE = "white",
    YELLOW = "yellow",
    BLUE = "blue"
}