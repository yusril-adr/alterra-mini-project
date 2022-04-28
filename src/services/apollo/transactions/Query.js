import { gql } from '@apollo/client';

const Query = {
  GetUserTransactions: gql`
    query GetUserTransactions($userId: uuid = "") {
      result: wager_lite_transactions(where: {userId: {_eq: $userId}}) {
        id
        title
        credit
        date
        type
      }
    }
  `,
};

export default Query;
