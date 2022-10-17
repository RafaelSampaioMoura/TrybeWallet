import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, allowEdit } from '../redux/actions';
import './Table.css';

class Table extends Component {
  handleExclude = (id) => {
    const { expenses, dispatch } = this.props;
    // console.log(target.name);
    const newExpenses = expenses.filter(
      (expense) => expense.id !== Number(id),
    );
    dispatch(deleteExpense(newExpenses));
    // console.log(newExpenses);
  };

  handleEdit = (id) => {
    const { dispatch } = this.props;
    dispatch(allowEdit(id));
  };

  render() {
    const { expenses } = this.props;
    // console.log(expenses);
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>
              <button type="button">Editar/Excluir</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {expenses.length > 0
            && expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{Number(expense.value).toFixed(2)}</td>
                <td>{expense.exchangeRates[expense.currency].name}</td>
                <td>
                  {Number(expense.exchangeRates[expense.currency].ask).toFixed(
                    2,
                  )}
                </td>
                <td>
                  {(
                    Number(expense.value)
                    * Number(expense.exchangeRates[expense.currency].ask)
                  ).toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    onClick={ () => this.handleEdit(expense.id) }
                    name={ expense.id }
                    data-testid="edit-btn"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={ () => this.handleExclude(expense.id) }
                    data-testid="delete-btn"
                    name={ expense.id }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
});

Table.propTypes = {
  expenses: PropTypes.shape([]).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, null)(Table);
