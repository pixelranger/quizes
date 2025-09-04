import { defineStore } from 'pinia';

export const useCourseCardsStore = defineStore('courseCards', {
    state: () => ({
        cards: [],
    }),
    actions: {
        getCardById(cardId) {
            return this.cards.find(card => card.id === cardId);
        },
        fetchCards(apiUrl, ids) {
            return fetch(`${apiUrl}/api/fingram/courses/elements/?ids=${ids.join(',')}`)
                .then(response => response.json())
                .then(data => {
                    this.cards = data.data;
                });
        },
    },
});
