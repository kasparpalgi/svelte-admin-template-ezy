export const USERS = `
    query Users($email: String!) {
        users(where: {deleted_at: {_is_null: true}, email: {_eq: $email}}) {
            ...usersFragment
            id
            email
        }
    }
  
  fragment usersFragment on users {
    id
    password_hash
    name
    email
    mobile
    role
    locale
    dark_mode
    image_url
    metadata
    receive_discounts
  }
`