import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MultiselectComponent } from './multiselect/multiselect.component';
import { MultiFilterPipe } from './common/multi-filter.pipe';


@NgModule({
  imports: [
    CommonModule, FormsModule
  ],
  declarations: [MultiselectComponent, MultiFilterPipe],
  exports: [MultiselectComponent]
})
export class MultiselectModule { }
