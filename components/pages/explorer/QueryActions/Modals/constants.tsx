import { QueryModalsData } from '../types';

export const modalsData: QueryModalsData = {
  deleteQuery: {
    actionText: 'Delete',
    content: (
      <div>
        <p>Are you sure you want to delete this query?</p>
        <p>This action cannot be undone.</p>
      </div>
    ),
    title: 'Delete Query',
    type: 'confirmation',
  },
  deleteQuery_success: {
    content: 'Query deleted succesfully!',
    type: 'success',
  },
  deleteQuery_error: {
    content: 'The query could not be deleted.',
    type: 'error',
  },
  editQuery: {
    actionText: 'Update',
    content: 'Edit the name of your saved query',
    title: 'Edit Query',
    type: 'input',
  },
  editQuery_success: {
    content: 'Query updated succesfully!',
    type: 'success',
  },
  editQuery_error: {
    content: 'The query could not be updated.',
    type: 'error',
  },
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
