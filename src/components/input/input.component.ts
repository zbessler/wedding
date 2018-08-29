import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

@Component({
    selector: 'app-input',
    templateUrl: 'input.component.html',
    styleUrls: ['./input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => AppInputComponent),
        }
    ]
})
export class AppInputComponent implements ControlValueAccessor {

    @Input() field: FormControl;
    @Input() name: string;
    @Input() type: string;
    @Input() placeholder = '';
    @Input() data: any;
    @Input() customMessage: string;
    public error = '';
    public touched = '';
    public active = '';

    propagateChange = (_: any) => {};
    propagateTouch = (_: any) => {};

    constructor() {}

    onChange(newValue): void {
        this.data = newValue;
        this.propagateChange(newValue);
        if (this.field.errors) {
            this.error = 'error';
        } else {
            this.error = '';
        }
    }

    onBlur(newValue): void {
        this.propagateTouch(newValue);
        if (this.field.errors) {
            this.error = 'error';
            this.touched = 'touched';
        } else {
            this.error = '';
        }
        this.active = '';
    }

    onFocus(newValue): void {
        this.active = 'active';
    }

    writeValue(data): void {
        this.data = data;
    }

    registerOnChange(fn): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn): void {
        this.propagateTouch = fn;
    }

}
