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

    // @todo additional class should also check for validity
    addAdditionalClass() {
        let resultClass = '';

        if (!this.data.isSuppliedValid) {
            resultClass +=  'error ';
        } else if (this.data.isSelected) {
            resultClass +=  'selected ';
        } else if (this.data.isSectionSelected) {
            resultClass +=  'selected-block ';
        } else {
            resultClass += '';
        }

        let r = this.data.girdLocation[0];
        let c = this.data.girdLocation[1];

        if (r == 0) {
            resultClass += ' border-top-bold border-bottomm ';
        } else {
            if ( (r + 1) % 3 == 0) {
                resultClass += ' border-bottom-bold'
            } else {
                resultClass += ' border-bottomm ';
            }
        }

        if (c == 0) {
            resultClass += ' border-left-bold border-right ';
        } else {
            if ( (c + 1) % 3 == 0) {
                resultClass += ' border-right-bold '
            } else {
                resultClass += ' border-right ';
            }
        }




        // console.log("RESULTING SYLE: ", resultClass);

        return resultClass;
      }

}