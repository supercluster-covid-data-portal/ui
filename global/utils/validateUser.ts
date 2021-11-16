import { WalletUser } from '../types';

// not a true validation, will just ensure all expected properties are present
const validateUser: (user: any) => WalletUser = (user) => {
  const output: WalletUser = {
    name: '',
    email: '',
    id: '',
  };

  return {
    ...output,
    ...user,
  } as WalletUser;
};

export default validateUser;
