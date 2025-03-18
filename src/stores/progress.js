import { defineStore } from 'pinia';
import { useAnswersStore } from '@/stores/answers';
import { useSettingsStore } from '@/stores/settings';


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
                                }
                            } else {
                                if (answers[block.id]) {
                                    const correctAnswer = block.options.find(option => option.is_correct_answer);
                                    if (correctAnswer.id === answers[block.id]) {
                                        score += settings.rightAnswerScoreWeight;
                                    }
                                }
                            }
                        } else if (settings.scoreCalculationMethod === 'by_answer') {
                            if (block.multiple) {
                                let correctAnswers = block.options.filter(option => option.is_correct_answer);

                                correctAnswers.forEach(option => {
                                    if (answers[block.id] && answers[block.id].includes(option.id)) {
                                        score += settings.rightAnswerScoreWeight;
                                    }
                                });
                            } else {
                                if (answers[block.id]) {
                                    const correctAnswer = block.options.find(option => option.is_correct_answer);
                                    if (correctAnswer.id === answers[block.id]) {
                                        score += settings.rightAnswerScoreWeight;
                                    }
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
                            maxScore += block.options.reduce((acc, option) => {
                                return option.is_correct_answer ?
                                    acc + settings.rightAnswerScoreWeight :
                                    acc;
                            }, 0);
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
