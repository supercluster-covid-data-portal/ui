import { QueryModalsData } from '../types';

export const modalsData: QueryModalsData = {
  saveQuery: {
    actionText: 'Save',
    content: 'Save the current configuration of filters',
    title: 'Save Query',
    type: 'input',
  },
  saveQuery_success: {
    content: 'Query saved succesfully!',
    type: 'success',
  },
  saveQuery_error: {
    content: 'The query could not be saved.',
    type: 'error',
  },
};
