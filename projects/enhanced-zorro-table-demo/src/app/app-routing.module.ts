import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimpleExampleComponent } from './simple-example/simple-example.component';
import { FilterExampleComponent } from './filter-example/filter-example.component';

const routes: Routes = [
  { path: 'simple', component: SimpleExampleComponent },
  { path: 'filter', component: FilterExampleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
