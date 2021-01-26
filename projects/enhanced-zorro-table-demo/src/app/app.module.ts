import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EnhancedZorroTableModule } from '../../../enhanced-zorro-table/src/lib/enhanced-zorro-table.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { SimpleExampleComponent } from './simple-example/simple-example.component';
import { FilterExampleComponent } from './filter-example/filter-example.component';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

@NgModule({
  declarations: [AppComponent, SimpleExampleComponent, FilterExampleComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EnhancedZorroTableModule,
    NzLayoutModule,
    NzMenuModule,
    NzDividerModule,
    NzTabsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
