import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzTableFilterList } from 'ng-zorro-antd/table';

export interface DFSchemaField<T = any> {
  label: string;
  column: string;
  typing: 'select' | 'multi-select' | 'text' | 'number' | 'date-range';
  default?: T;
  options?: NzTableFilterList;
}

@Component({
  selector: 'enhanced-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.less'],
})
export class DynamicFormComponent implements OnChanges, OnInit, OnDestroy {
  @Input() schema: DFSchemaField[] = [];
  @Input() extra: TemplateRef<any> | undefined = undefined;
  @Output() valueChanges = new EventEmitter();
  form: FormGroup | undefined = undefined;

  // position
  countPerLine = 3;

  // 0 - 2
  // 1 - 1
  // 2 - 0
  get makeUpArr(): number[] {
    return new Array(2 - (this.schema.length % 3));
  }

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.schema) {
      this.form = this.buildForm(changes.schema.currentValue);
    }
  }

  ngOnInit(): void {
    // this.form.valueChanges.pipe(untilDestroyed(this)).subscribe((val) => {
    this.form!.valueChanges.subscribe((val) => {
      this.valueChanges.emit(val);
    });
  }

  ngOnDestroy(): void {}

  private buildForm(schema: DFSchemaField[]): FormGroup {
    return this.fb.group(
      schema.reduce((prev, item) => {
        if (!item.column) {
          throw Error('column should not be null for search');
        }
        return {
          ...prev,
          [item.column]: [item.default],
        };
      }, {}),
    );
  }

  resetVal(): void {
    this.form!.reset();
  }
}
