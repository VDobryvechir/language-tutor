export interface GeneralFieldOption {
    name: string;
    value: string;
    isDefault?: boolean;
};
export interface GeneralGeneratedOptions {
    name: string;
    valueStart: string;
    valueFinish: string;
};
export interface GeneralFormField {
    name: string;
    field: string;
    kind: string;
    options?: GeneralFieldOption[];
    generatedOptions?: GeneralGeneratedOptions[];
    defValue?: string;
    minValue?: number;
    maxValue?: number;
    labelTitle?: string;
    selectorLabel?: string;
};

export const isNumericKind = (name: string): boolean => {
    return name === "int" || name === "number" || name === "selectorNumber";
};
export const generateGeneralFormDefaults = (object: any, definitions: GeneralFormField[], setter?: (obj: any, key: string, val: any) => void): any => {
    (definitions || []).forEach((item: GeneralFormField) => {
        let val: any = item.defValue;
        const tp = item.kind;
        if (isNumericKind(tp)) {
            val = val && parseFloat(val) || 0;
        } else {
            val = val || "";
        }
        if (setter) {
            setter(object, item.field, val);
        } else {
            object[item.field] = val;
        }
    });
    return object;
}