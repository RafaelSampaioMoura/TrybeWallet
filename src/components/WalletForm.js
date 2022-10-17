import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fecthCurrencyInfo, fetchExpensesInfo, editedRow } from '../redux/actions';
// import { fetchCurrencyInfo } from "../redux/actions";
// import getCurrencyInfo from "../services/walletAPI";
import Loading from './Loading';
import './WalletForm.css';

class WalletForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fecthCurrencyInfo());
    // console.log(currencies);
  }

  handleInput = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  resetToDefault = () => {
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(fetchExpensesInfo(this.state));
    this.setState((prevState) => ({
      id: prevState.id + 1,
    }));
    this.resetToDefault();
  };

  handleEdit = (e) => {
    e.preventDefault();
    const { value, method, description, tag, currency } = this.state;
    const { dispatch, idToEdit, expenses } = this.props;
    // console.log(idToEdit);
    const editExpense = expenses.find((expense) => expense.id === idToEdit);
    const { exchangeRates } = editExpense;
    const expensesFiltrado = expenses.filter((expense) => expense.id !== idToEdit);
    const rowEditado = {
      value, method, description, tag, currency, id: idToEdit, exchangeRates,
    };
    const newRow = [...expensesFiltrado, rowEditado].sort((a, b) => a.id - b.id);
    dispatch(editedRow(newRow));
    this.resetToDefault();
  };

  render() {
    const { currencies, isFetching, editor } = this.props;
    const { value, description } = this.state;
    // console.log(currencies);
    return (
      <form className="wallet-form">
        <label htmlFor="value-input">
          Valor:
          {' '}
          <input
            type="number"
            name="value"
            id="value-input"
            data-testid="value-input"
            value={ value }
            onChange={ this.handleInput }
          />
        </label>
        <label htmlFor="description-input">
          Descrição:
          {' '}
          <input
            type="text"
            name="description"
            id="description-input"
            data-testid="description-input"
            value={ description }
            onChange={ this.handleInput }
          />
        </label>
        {isFetching ? (
          <Loading />
        ) : (
          <label htmlFor="currency-input">
            Câmbio:
            <select
              name="currency"
              id="currency-input"
              data-testid="currency-input"
              onChange={ this.handleInput }
            >
              {currencies.map((currency) => (
                <option key={ currency } value={ currency }>
                  {currency}
                </option>
              ))}
            </select>
          </label>)}
        <label htmlFor="method-input">
          Método:
          <select
            name="method"
            id="method-input"
            data-testid="method-input"
            onChange={ this.handleInput }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Tipo:
          <select
            name="tag"
            id="tag-input"
            data-testid="tag-input"
            onChange={ this.handleInput }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        {editor ? (
          <button type="submit" onClick={ this.handleEdit }>
            Editar despesa
          </button>
        ) : (
          <button type="submit" onClick={ this.handleSubmit }>
            Adicionar despesa
          </button>
        )}
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  isFetching: state.wallet.isFetching,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

WalletForm.propTypes = {
  expenses: PropTypes.shape([]).isRequired,
  currencies: PropTypes.shape([]).isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(WalletForm);
