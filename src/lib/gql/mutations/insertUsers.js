export const INSERT_USERS = `
    mutation InsertUsers($objects: [users_insert_input!]!) {
        insert_users(objects: $objects) {
            returning {
                id
            }
        }
    }
`;