import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Header.css';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    // console.log(this.props);
    let valueToHeader = 0;
    if (expenses.length > 0) {
      const values = expenses.map((expense) => Number(expense.value));
      const conversions = expenses.map((expense) => expense.currency);
      const conversionRates = conversions.map(
        (rate, index) => expenses[index].exchangeRates[rate].ask,
      );
      valueToHeader = values
        .reduce(
          (total, sum, index) => {
            total += sum * conversionRates[index];
            return total;
          },
          0,
        )
        .toFixed(2);
      // console.log(valueToHeader);
      // console.log(conversions);
      // console.log(conversionRates);
    }
    return (
      <header>
        <div className="banner">TRYBE WALLET</div>
        <div className="userInfo">
          <div data-testid="email-field">
            Email:
            {email}
          </div>
          {/* {valueToHeader === 0 ? <div data-testid="total-field">0.00</div> : <div data-testid="total-field">{valueToHeader}</div>} */}
          <div data-testid="total-field">{Number(valueToHeader).toFixed(2)}</div>
          <div data-testid="header-currency-field">Câmbio: BRL</div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.shape([]).isRequired,
};

export default connect(mapStateToProps, null)(Header);
