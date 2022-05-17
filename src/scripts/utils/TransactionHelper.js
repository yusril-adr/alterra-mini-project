// Package
import moment from 'moment';

// Utils
import CSVHelper from './CSVHelper';

const TransactionHelper = {
  formatTransactionValue({ credit, ...payload }) {
    const parsedCredit = credit.includes('.') ? parseInt(credit.split('.').join(''), 10) : credit;

    const formattedTransaction = { ...payload, credit: parsedCredit };
    return formattedTransaction;
  },

  getAllSummary(transactions) {
    const summary = {
      income: this._getTotal(transactions, 'Income'),
      outcome: this._getTotal(transactions, 'Outcome'),
      balance: this.getBalanceTotal(transactions),
    };

    return summary;
  },

  _getTotal(transactions, type) {
    const filteredTransactions = transactions.filter(
      (transaction) => transaction.type.toLowerCase() === type.toLowerCase(),
    );

    let total;
    if (filteredTransactions.length === 0) {
      total = 0;
    } else if (filteredTransactions.length === 1) {
      total = filteredTransactions[0].credit;
    } else {
      total = filteredTransactions.reduce((prev, next, idx) => {
        if (idx === 1) return prev.credit + next.credit;

        return prev + next.credit;
      });
    }

    return total;
  },

  getBalanceTotal(transactions) {
    const income = this._getTotal(transactions, 'Income');
    const outcome = this._getTotal(transactions, 'Outcome');

    return income - outcome;
  },

  getAllDate(transactions) {
    let datesInTransactions = [];

    transactions.forEach(({ date }) => {
      if (!datesInTransactions.includes(date)) {
        datesInTransactions.push(date);
      }
    });

    datesInTransactions = datesInTransactions.map((date) => (new Date(date)));

    datesInTransactions.sort((oldest, newest) => newest - oldest);

    datesInTransactions = datesInTransactions.map((date) => (moment(date).format('YYYY-MM-DD')));

    return datesInTransactions;
  },

  getTransactionsInDay(date, transactions) {
    return transactions.filter((transaction) => transaction.date === date);
  },

  downloadCSV(transactions) {
    const formattedTransactions = transactions.map((transaction) => {
      const { __typename, ...payload } = transaction;
      return { ...payload };
    });
    const csv = CSVHelper.convertToDownloadAbleCSV(formattedTransactions);
    CSVHelper.downloadCSV(csv, { filename: 'transactions' });
  },
};

export default TransactionHelper;
