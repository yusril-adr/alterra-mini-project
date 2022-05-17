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
  UpdateTransactionById: gql`
    mutation UpdateTransactionById($id: uuid = "", $title: String = "", $credit: numeric = "", $date: date = "", $type: String = "") {
      result: update_wager_lite_transactions_by_pk(pk_columns: {id: $id}, _set: {title: $title, credit: $credit, date: $date, type: $type}) {
        id
      }
    }
  `,
  DeleteTransactionById: gql`
    mutation MyMutation($id: uuid = "") {
      result: delete_wager_lite_transactions_by_pk(id: $id) {
        id
      }
    }
  `,
};

export default Mutation;
