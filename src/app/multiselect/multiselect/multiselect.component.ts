import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, OnInit, OnChanges, SimpleChanges, EventEmitter, Input, Output } from '@angular/core';
import { SelectItem } from '../common/select-item.multiselect';

//https://netbasal.com/angular-custom-form-controls-made-easy-4f963341c8e2
//https://plnkr.co/edit/iFXRkJWVZ9tQ9i6mxmuf?p=preview



@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MultiselectComponent,
      multi: true,
    }
  ]
})


export class MultiselectComponent implements OnInit, OnChanges, ControlValueAccessor {
  @Input() options: SelectItem[];
  @Input() maxOptions: number;
  @Input() placeholder: string;
  @Output() selectionMade = new EventEmitter<SelectItem[]>();

  public componentState: SelectItem[];

  public showSelectList: boolean = false;
  public selectedItems: SelectItem[] = [];
  public searchInput: string = '';
  private onChange: any;
  private onTouch: any;

  constructor( ) {}

  // Implementing ControlValueAccessor
  writeValue( value : SelectItem[] ) : void {
    if (!value) value = [];

    // First deselect all items
    let temp:SelectItem[]  = this.componentState.map((stateItem: SelectItem) => ({value: stateItem.value, label: stateItem.label, selected: false}));
    
    // Then select the selected ones
    temp.forEach((stateItem: SelectItem, index: number) => {
      value.forEach((newStateItem: SelectItem) => {
        if (newStateItem.value === stateItem.value) {
          temp[index] = Object.assign({}, newStateItem);
        }
      })
    });

    this.componentState = temp;
    this.countSelectedItems();
  }

  // Implementing ControlValueAccessor
  registerOnChange( fn : any ) : void {
    this.onChange = fn;
  }

  // Implementing ControlValueAccessor
  registerOnTouched( fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState( isDisabled : boolean ) : void {
    console.log('Multisilect disabled: ', isDisabled);
  }

  public hasFocus(value: boolean) {
      this.showSelectList = value;
      this.searchInput = '';
  }

  public onOptionClicked(option: SelectItem, index: number) {
    option.selected = option.selected ? false : true;
    this.countSelectedItems();
    // Emit the results to parent component
    
    if (this.onChange) {
      this.onChange(this.selectedItems);
    }

    if (this.onTouch) {
      this.onTouch(true);
    }
    this.selectionMade.emit(this.selectedItems);
  }

  private countSelectedItems() {
    this.selectedItems = this.componentState.filter((stateItem: SelectItem) => stateItem.selected);
  }
  
  ngOnChanges(changes: SimpleChanges) {
    // Setting state and not mutating outside state
    this.componentState = (!this.options) ? [] : JSON.parse(JSON.stringify(this.options));
    this.countSelectedItems();
  }

  // Can be used later if needed
  ngOnInit() { 
    
  }
}
