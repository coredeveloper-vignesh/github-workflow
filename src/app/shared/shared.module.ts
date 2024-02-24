import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddAllToPaginator } from './directives/add-all-to-paginator/add-all-to-paginator.directive';

import { RouterModule } from '@angular/router';

import { NumbersOnly } from './directives/allowNumbersDecimals/allowNumbersDecimals.directive';
import { SeparatorDirective } from './directives/numberSeparatorByComma/numberSeparatorByComma.directive';
import { SpecialCharacterDirective } from './directives/specialCharacter/specialCharacter.directive';
import { AuthGuard } from './guards/auth-guard/auth.guard';
import { UnsavedChangesGuard } from './guards/unsaved-changes/unsaved-changes.guard';
import { MaterialModule } from './material.module';
import { EllipsisPipe } from './pipes/ellipsis/ellipsis.pipe';
import { NoSanitizePipe } from './pipes/no-sanitize/no-sanitize.pipe';
import { SpinnerComponent } from './services/custom-spinner/spinner.component';

const BASE_MODULES = [FormsModule, ReactiveFormsModule, MaterialModule];

const Guards = [UnsavedChangesGuard, AuthGuard];

const Pipes = [EllipsisPipe, NoSanitizePipe];

const Directives = [
  AddAllToPaginator,
  NumbersOnly,
  SeparatorDirective,
  SpecialCharacterDirective,
];
@NgModule({
  declarations: [Pipes, Directives, SpinnerComponent],
  imports: [CommonModule, RouterModule, BASE_MODULES],
  providers: [Guards],
  exports: [Pipes, Directives, BASE_MODULES],
})
export class SharedModule {}
