import { Field, FieldOperator, RepoFiltersType } from '../../sqonTypes';

const getValues = (filters: any /* RepoFiltersType | FieldOperator | Field */): any => {
  const content = filters.content;

  if (content) {
    if (Array.isArray(content)) {
      return content.reduce((acc, item) => acc.concat(getValues(item)), []);
    } else {
      return [[].concat(content.value || [])];
    }
  }

  return [];
};

const MAX_VALUES = 6;

const filtersToName = ({
  filters,
  length = Infinity,
  max = MAX_VALUES,
}: {
  filters?: RepoFiltersType;
  length?: number;
  max?: number;
}): string => {
  if (!filters) return '';
  const values = getValues(filters);

  let total = 0;
  const name = values
    .reduce((acc: any, value: any, i: any, arr: any) => {
      if (total >= max) return acc;
      const joined = value.slice(0, max - total).join(' / ');
      total += value.length;
      return acc.concat(
        `${joined}${total > max || (total === max && i < arr.length - 1) ? '...' : ''}`,
      );
    }, [])
    .join(', ');
  return name.length <= length ? name : name.slice(0, length - 3).replace(/[, ./]*$/, '...');
};

export default filtersToName;
