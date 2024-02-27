
export interface BlockModel {
    girdLocation : number[],
    isSelected : boolean,
    isSectionSelected : boolean,
    suppliedValue : number, // suppliedValue is the value that is sent to the block when you press 1-9
    isPencilEnabled : boolean,
    penciledValue: number,
    isChangeable? : boolean,
    isSuppliedValid? : boolean
}


export interface Result {
    status : ResultEnum;
    errorIndex? : number[];
    message? : string;
    
}

export class ResultBuilder {
    
    result : Result;

    constructor() {
        this.result = { status : ResultEnum.INCOMPLETE };
    }


    status(status : ResultEnum) {
        if (this.result == null || undefined) {
            this.result = { status : status};
        } else {
            this.result.status = status;
        }

        return this;    
    }


    message(message : string) {
        if (this.result == null)
            throw new Error("There is no status please provide status before");

        this.result.message = message;
        return this;
    }

    errorIndex(errorIndex : number[]) {
        if (this.result == null || this.result == undefined) {
            throw new Error("There is no status please provide status before errorIndex");
        }

        this.result.errorIndex = errorIndex;
        return this;
    }

    build() : Result {
        return this.result;
    }



}


export enum ResultEnum {
    COMPLETE,
    ERROR,
    INCOMPLETE
}


export const INITIAL_BOARD_VALUE = 0;
export const MAX_COL_WIDTH = 9;
export const MAX_ROW_WIDTH = 9;