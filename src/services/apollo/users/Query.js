import { gql } from '@apollo/client';

const Query = {
  GetUserByUsername: gql`
    query getUserByUsername($username: String = "") {
      result: wager_lite_users(where: {username: {_eq: $username}}) {
        id
        username
        password
      }
    }
  `,

  GetUserById: gql`
    query getUserById($id: uuid = "") {
      result: wager_lite_users_by_pk(id: $id) {
        id
        username
      }
    }
  `,
};

export default Query;
