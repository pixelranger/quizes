<script setup>

import { computed } from 'vue';
import { useAnswersStore } from '@/stores/answers';
import { useCardsStore } from '@/stores/cards';

const answersStore = useAnswersStore();
const cardsStore = useCardsStore();
const props = defineProps({
  settings: {
    type: Object,
    required: true,
  },
});

const wrongAnswers = computed(() => answersStore.getWrongAnswers(props.settings));
const currentWrongAnswer = computed(() => wrongAnswers.value.find((_, index) => index === answersStore.wrongAnswerScreenIndex));

const card = computed(() => {
  if (currentWrongAnswer.value.wrong_answer_card) {
    return cardsStore.getCardById(currentWrongAnswer.value.wrong_answer_card.value);
  }
})

function isSelectedAnswer(optionId) {
  const answer = answersStore.answers[wrongAnswers.value[answersStore.wrongAnswerScreenIndex].id];
  if (!answer) {
    return false;
  }

  if (!Array.isArray(answer)) {
    return answer === optionId;
  }

  return answer.some((answer) => answer === optionId);
}
</script>

<template>
  <div v-if="wrongAnswers[answersStore.wrongAnswerScreenIndex]">
    <div>
      Вопрос №{{ wrongAnswers[answersStore.wrongAnswerScreenIndex].label || wrongAnswers[answersStore.wrongAnswerScreenIndex].title }}
    </div>
    <div>
      Варианты ответов:
    </div>
    <div>
      <div v-for="option in wrongAnswers[answersStore.wrongAnswerScreenIndex].options">
        {{option.title}} - {{option.is_correct_answer ? 'Правильный ответ' : 'Неправильный ответ'}} - {{ isSelectedAnswer(option.id) ? 'Выбранный вариант' : '' }}
      </div>
    </div>

    <div v-if="card">
      Карточка:
      <div>{{card.title}}</div>
      <div v-if="card.image">
        <img :src="card.image" alt="card image">
      </div>
      <div v-html="card.content">
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
