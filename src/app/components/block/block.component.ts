import { Component, Input, OnInit, EventEmitter, Output} from "@angular/core";
import { BlockModel } from "../../models/model";

@Component({
        selector :"number-block",
        templateUrl: "./block.component.html",
        styleUrls : ["./block.component.scss"]
    })
export class BlockElementComponent implements OnInit {

    penciledValue : number = 0 ;
    curValue: number = 0;

    isSelected = false;
    isSelectedBlock = false;

    @Input()
    gridLoc: number[];

    @Input()
    data: BlockModel;

    @Output()
    clicked : EventEmitter<any[]> = new EventEmitter<any[]> ();

    public constructor() {}


    blockClicked() {
        console.log('child: ', this.data.girdLocation);
        this.clicked.emit(this.data.girdLocation);
    }

    ngOnInit(): void {
        
    }

    addAdditionalClass() {
        if (this.data.isSelected) {
            return 'selected';
        } else if (this.data.isSectionSelected) {
            return 'selected-block';
        } else {
            return '';
        }
      }

}