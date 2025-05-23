import { defineStore } from 'pinia';

export const useAnswersStore = defineStore('answers', {
    state: () => ({
        submissionSecretId: null,
        answers: {},
        wrongAnswerScreenIndex: 0,
    }),
    getters: {
        score: (state) => {
            return Object.keys(state.answers).length;
        },
    },
    actions: {
        setAnswers(answers) {
            this.answers = answers;
        },
        getAnswerByBlockId(blockId) {
            return this.answers[blockId];
        },
        getWrongAnswers(settings) {
            const wrongAnswersList = [];
            settings.steps.forEach(step => {
                step.blocks.forEach(block => {
                    if (['question'].includes(block.type)) {
                        if (settings.scoreCalculationMethod === 'by_question') {
                            if (block.multiple) {
                                let correctAnswers = block.options.filter(option => option.is_correct_answer);
                                let allCorrectAnswers = false;
                                if (this.answers[block.id]) {
                                    allCorrectAnswers = correctAnswers.every(option => this.answers[block.id].includes(option.id));
                                }

                                if (!allCorrectAnswers) {
                                    wrongAnswersList.push(block);
                                }
                            } else {
                                if (this.answers[block.id]) {
                                    const correctAnswer = block.options.find(option => option.is_correct_answer);

                                    if (correctAnswer.id !== this.answers[block.id]) {
                                        wrongAnswersList.push(block);
                                    }
                                }
                            }
                        } else if (settings.scoreCalculationMethod === 'by_answer') {
                            if (block.multiple) {
                                let correctAnswers = block.options.filter(option => option.is_correct_answer);

                                let hasAnyCorrectAnswer = correctAnswers.some(option => this.answers[block.id] && this.answers[block.id].includes(option.id));

                                if (!hasAnyCorrectAnswer) {
                                    wrongAnswersList.push(block);
                                }
                            } else {
                                if (this.answers[block.id]) {
                                    const correctAnswer = block.options.find(option => option.is_correct_answer);
                                    if (correctAnswer && correctAnswer.id !== this.answers[block.id]) {
                                        wrongAnswersList.push(block);
                                    }
                                } else {
                                    wrongAnswersList.push(block);
                                }
                            }
                        }
                    }
                })
            })

            return wrongAnswersList;
        }
    },
});
