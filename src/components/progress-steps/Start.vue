<script setup>
import { computed } from 'vue';

const props = defineProps({
  settings: {
    type: Object,
    required: true,
  },
})

const settings = computed(() => props.settings);

function checkAttempts() {
  const position = localStorage.getItem('position-' + settings.value.id);
  return parseInt(position) > settings.value.attempts && position !== null;
}
</script>

<template>
  <div 
		class="start-container"
		:class = "[settings.showStartImage && settings.startScreenImage ? 'grid_image' : '']"
	>
    <div class="title" v-html="settings.startScreenTitle"></div>
    <div v-if="settings.showStartImage && settings.startScreenImage" class="image">
      <img :src="settings.startScreenImage" class="start-image" alt="">
    </div>

    <div class="description">
      <div v-if="!checkAttempts()" v-html="settings.startScreenDescription"></div>
      <div v-else-if="settings.description_fail_attempts" v-html="settings.description_fail_attempts"></div>

      <div v-if="settings.timeString" class="timing">
									<span data-qa="icon" aria-hidden="true" class="icon">
										<svg width="12" height="12" viewBox="0 0 12 12" fill="none" data-qa="animated-clock">
											<circle cx="6" cy="6" fill="#012941" r="6"></circle>
											<line x1="6" y1="6" x2="6" y2="3" stroke="#FEFDFA" stroke-width="1.2" stroke-linecap="round"></line>
											<line x1="6" y1="6" x2="6" y2="3" stroke="#FEFDFA" stroke-width="1.2" stroke-linecap="round"></line>
										</svg>
									</span>
        {{ settings.timeString }}
      </div>
    </div>
  </div>



  <div v-if="checkAttempts() && !settings.description_fail_attempts" class="quiz-error">
    Вы исчерпали {{ settings.attempts }} попытки. Прохождение теста недоступно.
  </div>
</template>

<style scoped>

</style>
