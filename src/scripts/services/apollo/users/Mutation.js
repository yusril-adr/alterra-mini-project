import { gql } from '@apollo/client';

const Mutation = {
  CreateUser: gql`
    mutation CreateUser($username: String = "", $password: String = "") {
      result: insert_wager_lite_users_one(object: {username: $username, password: $password}) {
        id
        username
      }
    }
  `,
};

export default Mutation;
