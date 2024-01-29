export const UPDATE_USERS = `
    mutation UpdateUsersByPk($id: uuid!, $_set: users_set_input = {}) {
        update_users_by_pk(pk_columns: {id: $id}, _set: $_set) {
            id
        }
    }
`;