import { gql } from '@apollo/client';

const Query = {
  GetTransactionById: gql`
    query GetTransactionById($id: uuid = "") {
      result: wager_lite_transactions_by_pk(id: $id) {
        id
        title
        credit
        date
        type
        userId
      }
    }
  `,
};

export default Query;
