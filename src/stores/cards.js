import { defineStore } from 'pinia';

export const useCardsStore = defineStore('cards', {
    state: () => ({
        cards: [],
    }),
    actions: {
        getCardById(cardId) {
            return this.cards.find(card => card.id === cardId);
        },
        fetchCards(apiUrl, ids) {
            return fetch(`${apiUrl}/?ids=${ids.join(',')}`)
                .then(response => response.json())
                .then(data => {
                    this.cards = data.data;
                });
        },
    },
});
