
export interface BlockModel {
    girdLocation : number[],
    isSelected : boolean,
    isSectionSelected : boolean,
    suppliedValue : number, // suppliedValue is the value that is sent to the block when you press 1-9
    isPencilEnabled : boolean,
    penciledValue: number
}