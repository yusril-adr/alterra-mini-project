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
};

export default Query;
