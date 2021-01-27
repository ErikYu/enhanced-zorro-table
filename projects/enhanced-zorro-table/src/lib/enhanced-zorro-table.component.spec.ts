import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';
import { EnhancedZorroTableComponent } from './enhanced-zorro-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { TableQueryParamComponent } from './table-query-param/table-query-param.component';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EnhancedZorroTableService } from './enhanced-zorro-table.service';

interface TestMember {
  name: string;
  age: number;
  gender: 'f' | 'm';
}

describe('TestEnhancedZorroTableComponent', () => {
  let fixture: ComponentFixture<EnhancedZorroTableComponent<TestMember>>;
  let component: EnhancedZorroTableComponent<TestMember>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        NzFormModule,
        NzSelectModule,
        NzDatePickerModule,
        NzTableModule,
        NzIconModule,
        NzButtonModule,
        NzDividerModule,
        NzDropDownModule,
        NzInputModule,
        NzSpaceModule,
        NzTagModule,
      ],
      declarations: [
        TableQueryParamComponent,
        DynamicFormComponent,
        EnhancedZorroTableComponent,
      ],
      providers: [
        {
          provide: EnhancedZorroTableService,
          useClass: EnhancedZorroTableService,
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent<EnhancedZorroTableComponent<TestMember>>(
      EnhancedZorroTableComponent,
    );
    component = fixture.componentInstance;
    component.columns = [
      {
        label: '姓名',
        propFn: (row) => row.name,
        column: 'name',
        useSearch: true,
      },
      {
        label: '年龄',
        propFn: (row) => row.age.toString(),
        column: 'age',
        useSort: true,
      },
      {
        label: '性别',
        propFn: (row) => row.gender,
        column: 'gender',
        useFilter: true,
        filterOptions: [
          { text: '男', value: 'm' },
          { text: '女', value: 'f' },
        ],
      },
    ];
    component.rows = [
      { name: 'name1', age: 13, gender: 'f' },
      { name: 'name2', age: 15, gender: 'm' },
      { name: 'name3', age: 16, gender: 'm' },
      { name: 'name4', age: 17, gender: 'f' },
      { name: 'name5', age: 18, gender: 'f' },
    ];
    component.defaultQueryParam = {
      pageIndex: 1,
      pageSize: 5,
      search: {},
      filter: [],
      sort: [],
    };
    component.total = 11;
  });

  it('should init successfully', () => {
    fixture.detectChanges(); // ngOnInit
    expect(component).toBeTruthy();
  });

  it('sort should work', () => {
    fixture.detectChanges(); // ngOnInit
    const ageHeader = fixture.debugElement.queryAll(By.css('th'))[1];

    const upArrow = ageHeader.query(By.css('.anticon-caret-up'));
    const downArrow = ageHeader.query(By.css('.anticon-caret-down'));
    expect(!!upArrow.classes.active).toBeFalse();
    expect(!!downArrow.classes.active).toBeFalse();

    ageHeader.triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(!!upArrow.classes.active).toBeTrue();
    expect(!!downArrow.classes.active).toBeFalse();
    ageHeader.triggerEventHandler('click', {});
    fixture.detectChanges();
    expect(!!upArrow.classes.active).toBeFalse();
    expect(!!downArrow.classes.active).toBeTrue();
  });

  it('text search should work', fakeAsync(() => {
    fixture.detectChanges(); // ngOnInit
    const nameSearchInput = fixture.debugElement.query(
      By.css('input.ant-input'),
    );
    const searchButton = fixture.debugElement.query(By.css('button.ant-btn'));
    spyOn(component.remoteTableService, 'changeSearch');
    spyOn(component.remoteTableService, 'changeFilter');
    spyOn(component.remoteTableService, 'changePage');
    spyOn(component.remoteTableService, 'changeSort');
    expect(nameSearchInput).not.toBeNull();
    expect(searchButton).not.toBeNull();

    nameSearchInput.triggerEventHandler('input', { target: { value: '123' } });
    fixture.detectChanges();
    expect(component.remoteTableService.changeSearch).toHaveBeenCalledWith({
      search: { name: '123' },
    });
    expect(component.remoteTableService.changeFilter).toHaveBeenCalledWith({
      filter: [{ key: 'gender', value: null }],
    });
    expect(component.remoteTableService.changePage).not.toHaveBeenCalled();
    expect(component.remoteTableService.changeSort).not.toHaveBeenCalled();
    flush();
  }));

  it('queryParam input should work',  () => {
    component.queryParam = {
      filter: [{key: 'gender', value: 'f'}],
      search: {name: 'Wow'},
    };
    fixture.detectChanges();
    expect(component).toBeTruthy();
    const nameSearchInput = fixture.debugElement.query(
      By.css('input.ant-input'),
    );
    expect(nameSearchInput.nativeElement.value).toBe('Wow');
  });
});
