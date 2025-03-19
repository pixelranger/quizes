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
    <div class="title">
      Вопрос №{{ wrongAnswers[answersStore.wrongAnswerScreenIndex].label || wrongAnswers[answersStore.wrongAnswerScreenIndex].title }}
    </div>
    <div class="subtitle">
      Варианты ответов:
    </div>
    <div class="quiz-content answers-show-mode">
			<div class="answers-grid">
				<div 
					v-for="option in wrongAnswers[answersStore.wrongAnswerScreenIndex].options" 
					class="option"
				>
					<label :class="[option.is_correct_answer ? 'correct' : 'incorrect', isSelectedAnswer(option.id) ? 'selected': '']">
						<div class="option-container">
							<div v-if="option.is_correct_answer" class="key">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
								</svg>
							</div>
							<div v-else-if="isSelectedAnswer(option.id)" class="key">
								<svg
									xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
								</svg>
							</div>
							<div v-else class="key" />
							
							<div class="">{{option.title}}</div>
						</div>
					</label>

					<!-- {{option.title}} - {{option.is_correct_answer ? 'Правильный ответ' : 'Неправильный ответ'}} - {{ isSelectedAnswer(option.id) ? 'Выбранный вариант' : '' }} -->
				</div>
			</div>
    </div>

		<br>
		<br>
		<br>
		<br>
		<br>

		<!-- Карточка -->
    <div v-if="card" class="quiz-material-card">
      <div class="title">{{card.title}}</div>
			<div class="card-content">
				<div v-if="card.image" class="card-content-image">
					<img :src="card.image" alt="">
				</div>
				<div v-html="card.content" class="card-content-text" />
			</div>
    </div>


  </div>
</template>

<style scoped>

</style>
