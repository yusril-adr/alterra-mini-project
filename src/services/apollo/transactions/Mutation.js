import { gql } from '@apollo/client';

const Mutation = {
  CreateTransaction: gql`
    mutation createTransaction($title: String = "", $credit: numeric = "", $date: date = "", $type: String = "", $userId: uuid = "") {
      result: insert_wager_lite_transactions(objects: {title: $title, credit: $credit, date: $date, type: $type, userId: $userId}) {
        returning {
          id
        }
      }
    }
  `,
};

export default Mutation;
