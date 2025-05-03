import { gql } from "@apollo/client";
import {IUserClient} from "@/../packages/types/user"

export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
      user {
        id
        email
        firstName
        lastName
        phone
        role
        profileImageUrl
      }
    }
  }
`;

export interface SIGN_IN_RESPONSE{
  signIn:{
    token:string,
    user:IUserClient
  }
} 