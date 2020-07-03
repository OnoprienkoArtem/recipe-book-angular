import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { DropdownDirective } from './dropdown.directive';

// add modules
// AlertComponent
// PlaceholderDirective


@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    DropdownDirective,
  ],
  imports: [
    CommonModule,

  ],
  exports: [
    CommonModule,
    LoadingSpinnerComponent,
    DropdownDirective,
  ]
})
export class SharedModule { }