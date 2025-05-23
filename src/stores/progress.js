import { defineStore } from 'pinia';
import { useAnswersStore } from '@/stores/answers';
import { useSettingsStore } from '@/stores/settings';
import isNumeric from '@/utils/isNumeric';


export const useProgressStore = defineStore('progress', {
    state: () => ({
        stage: 'start',
        total: 0,
    }),
    getters: {
        currentScore() {
            const answersStore = useAnswersStore();
            const settingsStore = useSettingsStore();
            let score = 0;
            const settings = settingsStore.settings;
            const answers = answersStore.answers;

            settings.steps.forEach(step => {
                step.blocks.forEach(block => {
                    if (['question'].includes(block.type)) {
                        if (settings.scoreCalculationMethod === 'by_question') {
                            if (block.multiple) {
                                let correctAnswers = block.options.filter(option => option.is_correct_answer);
                                let allCorrectAnswers = false;
                                if (answers[block.id]) {
                                    allCorrectAnswers = correctAnswers.every(option => answers[block.id].includes(option.id));
                                }

                                if (allCorrectAnswers) {
                                    score += settings.rightAnswerScoreWeight;
                                } else if (typeof answers[block.id] !== 'undefined' && answers[block.id].length > 0) {
                                    score += settings.wrongAnswerScoreWeight;
                                }
                            } else {
                                if (answers[block.id]) {
                                    const correctAnswer = block.options.find(option => option.is_correct_answer);
                                    if (correctAnswer.id === answers[block.id]) {
                                        score += settings.rightAnswerScoreWeight;
                                    } else if (answers[block.id]) {
                                        score += settings.wrongAnswerScoreWeight;
                                    }
                                }
                            }
                        } else if (settings.scoreCalculationMethod === 'by_answer') {
                            if (block.multiple) {
                                let options = block.options;

                                options.forEach(option => {
                                    let weight = 0;

                                    if (isNumeric(option.custom_score_weight)) {
                                        weight = option.custom_score_weight;
                                    } else if (option.is_correct_answer) {
                                        weight = settings.rightAnswerScoreWeight;
                                    } else {
                                        weight = settings.wrongAnswerScoreWeight;
                                    }

                                    if (answers[block.id] && answers[block.id].includes(option.id)) {
                                        score += parseInt(weight);
                                    }

                                })
                            } else {
                                if (answers[block.id]) {
                                    block.options.forEach(option => {
                                        let weight = 0;

                                        if (isNumeric(option.custom_score_weight)) {
                                            weight = option.custom_score_weight;
                                        } else if (option.is_correct_answer) {
                                            weight = settings.rightAnswerScoreWeight;
                                        } else {
                                            weight = settings.wrongAnswerScoreWeight;
                                        }

                                        if (answers[block.id] && answers[block.id] === option.id) {
                                            score += parseInt(weight);
                                        }
                                    })

                                }
                            }
                        }
                    }
                });
            });


            return score;
        },
        maxScore() {
            const settingsStore = useSettingsStore();

            const settings = settingsStore.settings;
            let maxScore = 0;
            settings.steps.forEach(step => {
                step.blocks.forEach(block => {
                    if (['question'].includes(block.type)) {
                        if (settings.scoreCalculationMethod === 'by_question') {
                            maxScore += settings.rightAnswerScoreWeight;
                        } else if (settings.scoreCalculationMethod === 'by_answer') {
                            if (block.multiple) {
                                block.options.forEach(option => {
                                    let weight = 0;

                                    if (isNumeric(option.custom_score_weight)) {
                                        weight = option.custom_score_weight;
                                    } else if (option.is_correct_answer) {
                                        weight = settings.rightAnswerScoreWeight;
                                    } else {
                                        weight = settings.wrongAnswerScoreWeight;
                                    }

                                    maxScore += parseInt(weight);
                                });
                            } else {
                                // find option with highest weight
                                let maxWeight = 0;
                                block.options.forEach(option => {
                                    let weight = 0;

                                    if (isNumeric(option.custom_score_weight)) {
                                        weight = option.custom_score_weight;
                                    } else if (option.is_correct_answer) {
                                        weight = settings.rightAnswerScoreWeight;
                                    } else {
                                        weight = settings.wrongAnswerScoreWeight;
                                    }

                                    if (weight > maxWeight) {
                                        maxWeight = weight;
                                    }
                                });

                                console.log(maxWeight)
                                maxScore += parseInt(maxWeight);
                            }

                        }
                    }
                });
            });

            return maxScore;
        },
    },
    actions: {
        setProgress(progress) {
            this.progress = progress;
        },
        setTotal(total) {
            this.total = total;
        },
    },
});
