export const UserService = {
    autoSuggestResponse: [{
        id: '1',
        login: 'test',
        age: 21
    }],
    existingLogin: 'existingLogin',
    existingUserId: 'existingUser',
    getResponse: {
        id: '1',
        login: 'test',
        age: 21
    },
    newUserId: 'newUserId',
    updateResponse: {
        id: '1',
        login: 'test',
        age: 21
    },
    autoSuggest() {
        return this.autoSuggestResponse;
    },
    create({ login }: { login: string }) {
        if (login !== this.existingLogin) {
            return this.newUserId;
        }
    },
    delete(id: string) {
        if (id === this.existingUserId) {
            return true;
        }
        return false;
    },
    get(id: string) {
        if (id === this.existingUserId) {
            return this.getResponse;
        }
    },
    update(id: string) {
        if (id === this.existingUserId) {
            return this.updateResponse;
        }
    }
};
