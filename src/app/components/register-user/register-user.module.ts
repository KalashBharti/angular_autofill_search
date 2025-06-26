import { NgClass, NgIf, NgFor } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { RouterLink } from "@angular/router";

@NgModule({
  declarations: [],
  imports: [MatFormFieldModule,
      MatSelectModule,
      FormsModule,
      ReactiveFormsModule,
      MatInputModule,
      MatDatepickerModule,
      MatButtonToggleModule,
      MatButtonModule,
      NgClass,
      NgIf,
      NgFor,
      RouterLink],
  exports: []
})
export class RegisterModule {}
