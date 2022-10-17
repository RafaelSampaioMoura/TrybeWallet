import getCurrencyInfo from '../../services/walletAPI';

// Coloque aqui suas actions
export const SUBMIT_USER_EMAIL = 'SUBMIT_USER_EMAIL';

export const REQUEST_CURRENCY_INFORMATION = 'REQUEST_CURRENCY_INFORMATION';
export const RECEIVE_CURRENCY_INFORMATION = 'RECEIVE_CURRENCY_INFORMATION';
export const FAILED_CURRENCY_INFORMATION = 'FAILED_CURRENCY_INFORMATION';
export const REQUEST_EXPENSE_INFORMATION = 'REQUEST_EXPENSE_INFORMATION';
export const RECEIVE_EXPENSE_INFORMATION = 'RECEIVE_EXPENSE_INFORMATION';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT = 'EDIT';
export const EDITED_ROW = 'EDITED_ROW';

export const actSubmitUserEmail = (payload) => ({
  type: SUBMIT_USER_EMAIL,
  payload,
});

const requestCurrencyInfo = () => ({
  type: REQUEST_CURRENCY_INFORMATION,
});

const successCurrencyInfo = (payload) => ({
  type: RECEIVE_CURRENCY_INFORMATION,
  currencies: Object.keys(payload).filter((currency) => currency !== 'USDT'),
});

const failureCurrencyInfo = (errorMessage) => ({
  type: FAILED_CURRENCY_INFORMATION,
  error: errorMessage,
});

const successExpenseInfo = (payload, expense) => ({
  type: RECEIVE_EXPENSE_INFORMATION,
  expenses: {
    ...expense,
    exchangeRates: { ...payload },
  },
});

const failureExpenseInfo = (errorMessage) => ({
  type: FAILED_CURRENCY_INFORMATION,
  error: errorMessage,
});

export const deleteExpense = (payload) => ({
  type: DELETE_EXPENSE,
  expenses: [...payload],
});

export const allowEdit = (payload) => ({
  type: EDIT,
  idToEdit: payload,
});

export const editedRow = (payload) => ({
  type: EDITED_ROW,
  expenses: payload,
});

export const fecthCurrencyInfo = () => async (dispatch) => {
  dispatch(requestCurrencyInfo());

  try {
    const response = await getCurrencyInfo();
    // console.log(response);
    dispatch(successCurrencyInfo(response));
  } catch (error) {
    const errorAction = failureCurrencyInfo(error);
    dispatch(errorAction);
  }
};

export const fetchExpensesInfo = (expense) => async (dispatch) => {
  dispatch(requestCurrencyInfo());

  try {
    const response = await getCurrencyInfo();
    dispatch(successExpenseInfo(response, expense));
  } catch (error) {
    const errorAction = failureExpenseInfo(error);
    dispatch(errorAction);
  }
};
