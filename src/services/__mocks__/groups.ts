export const GroupService = {
    addUsersToGroupCorrectGroupId: 'addUsersToGroupCorrectGroupId',
    existingGroupId: 'existingGroupId',
    existingGroupName: 'existingGroupName',
    getResponse: {
        id: 'fc2750d4-bd62-42c9-9985-38a1ef983299',
        name: 'test',
        permissions: [
            'READ',
            'WRITE',
            'SHARE'
        ]
    },
    getAllResponse: [
        {
            id: '400463cf-40f3-43c1-a40b-a9bacda9f7a3',
            name: 'test',
            permissions: [
                'READ',
                'WRITE',
                'UPLOAD_FILES'
            ]
        },
        {
            id: '733286ed-0097-4aee-b2ad-adf32905a433',
            name: 'test2',
            permissions: [
                'READ'
            ]
        }
    ],
    newGroupId: 'newGroupId',
    updateResponse: {
        id: 'fc2750d4-bd62-42c9-9985-38a1ef983299',
        name: 'test',
        permissions: [
            'READ',
            'WRITE',
            'SHARE'
        ]
    },
    addUsersToGroup(groupId: string) {
        if (groupId !== this.addUsersToGroupCorrectGroupId) {
            return false;
        }
        return true;
    },
    create({ name }: { name: string }) {
        if (name !== this.existingGroupName) {
            return this.newGroupId;
        }
    },
    delete(id: string) {
        if (id === this.existingGroupId) {
            return true;
        }
        return false;
    },
    get(id: string) {
        if (id === this.existingGroupId) {
            return this.getResponse;
        }
    },
    getAll() {
        return this.getAllResponse;
    },
    update(id: string) {
        if (id === this.existingGroupId) {
            return this.updateResponse;
        }
    }
};
