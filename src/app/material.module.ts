import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule }   from '@angular/material/input';
import { MatButtonModule }  from '@angular/material/button';
import { MatCardModule }    from '@angular/material/card';

@NgModule({
  imports: [
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule
  ]
})
export class MaterialModule {}
