import { Component, OnInit, OnChanges, SimpleChanges, EventEmitter, Input, Output } from '@angular/core';
import { SelectItem } from '../common/select-item.multiselect';


@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.css']
})


export class MultiselectComponent implements OnInit, OnChanges {
  @Input() options: SelectItem[];
  @Input() maxOptions: number;
  @Input() placeholder: string;
  @Output() selectionMade = new EventEmitter<SelectItem[]>();

  public showSelectList: boolean = false;
  public selectedLength: number = 0;
  public searchInput: string = '';
  constructor( ) {}

  public hasFocus(value: boolean) {
      this.showSelectList = value;
      this.searchInput = '';
  }

  public optionClicked(option: SelectItem, index: number) {
    option.selected = option.selected ? false : true;
    this.selectedLength = option.selected ? this.selectedLength + 1 : this.selectedLength - 1;
    // Emit the results to parent component
    this.selectionMade.emit(this.options.filter((option: SelectItem) => option.selected));
  }
  
  // Can be used later if needed
  ngOnInit() { }
  ngOnChanges(changes: SimpleChanges) { }
}
