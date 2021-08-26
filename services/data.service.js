module.exports = {
    createItem: async (modelSch, data) => {
        const createdItem = await modelSch.create(data);

        return createdItem;
    },

    deleteItem: async (modelSch, id) => {
        await modelSch.deleteOne({ _id: id });
    },

    getItems: async (modelSch, data) => {
        const items = await modelSch.find(data);

        return items;
    },

    updateItem: async (modelSch, id, data) => {
        const itemUpdate = await modelSch.findByIdAndUpdate(id, data);

        return itemUpdate;
    }
};
