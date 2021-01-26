import { NzButtonType } from 'ng-zorro-antd/button';
import { NzTableFilterList } from 'ng-zorro-antd/table';
import { NzPresetColor } from 'ng-zorro-antd/core/color';

export function useGenderFilter(): {
  useFilter?: boolean;
  filterOptions?: NzTableFilterList;
} {
  return {
    useFilter: true,
    filterOptions: [
      {
        text: '女',
        value: 'f',
      },
      {
        text: '男',
        value: 'm',
      },
    ],
  };
}

export function useProfileAction<T>(fn: (row: T) => void, btnAuth?: string) {
  return {
    btnAuth,
    btnLabel: '查看',
    onClick: fn,
  };
}

export function useDeleteAction<T>(fn: (row: T) => void, btnAuth?: string) {
  return {
    btnAuth,
    btnLabel: '删除',
    btnType: 'danger' as NzButtonType,
    onClick: (row) => fn(row),
  };
}

export function withTagged<T>(
  valExtractor: (row: T) => string,
  mapping,
): {
  propFn: (row: T) => string;
  tagged: (arg: T) => NzPresetColor;
} {
  return {
    propFn: (row) => mapping[valExtractor(row)].label,
    tagged: (row) => mapping[valExtractor(row)].color,
  };
}
