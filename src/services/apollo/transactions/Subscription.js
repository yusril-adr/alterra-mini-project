import { gql } from '@apollo/client';

const Subscription = {
  GetUserTransactions: gql`
    subscription GetUserTransactions($userId: uuid = "") {
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

export default Subscription;
