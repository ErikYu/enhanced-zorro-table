import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnhancedZorroTableComponent } from './enhanced-zorro-table.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { SearchOutline } from '@ant-design/icons-angular/icons';
import { ReactiveFormsModule } from '@angular/forms';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { TableQueryParamComponent } from './table-query-param/table-query-param.component';

@NgModule({
  declarations: [
    EnhancedZorroTableComponent,
    DynamicFormComponent,
    TableQueryParamComponent,
  ],
  exports: [EnhancedZorroTableComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzSelectModule,
    NzDatePickerModule,
    NzTableModule,
    NzIconModule.forChild([SearchOutline]),
    NzButtonModule,
    NzDividerModule,
    NzDropDownModule,
    NzInputModule,
    NzSpaceModule,
    NzTagModule,
  ],
})
export class EnhancedZorroTableModule {}
