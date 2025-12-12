<script setup>

import { useAnswersStore } from '@/stores/answers';
import { ref } from 'vue';

const answersStore = useAnswersStore();
const props = defineProps({
  settings: {
    type: Object,
    required: true,
  },
  currentStep: {
    type: Number,
    required: true,
  },
  checkIfBlockVisible: {
    type: Function,
    required: true,
  },
  verifyStep: {
    type: Function,
    required: true,
  },
});

const answers = answersStore.answers;
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

function checkMask(field) {
  if (field.mask && answers[field.name]) {
    const rexp = new RegExp(field.mask);
    if (!rexp.test(answers[field.name].trim())) {
      return true;
    }
  } else {
    return false;
  }
}

function inputChange(name, e) {
  answers[name] = e.target.value;
  props.verifyStep();
}

function checkboxChange(name, e) {
  if (!answers[name]) {
    answers[name] = [];
  }

  if (answers[name].includes(e.target.value)) {
    answers[name] = answers[name].filter(el => el !== e.target.value);
  } else {
    answers[name].push(e.target.value);
  }
  props.verifyStep();
}

function questionOptionClick(option, block) {
  if (block.multiple) {
    if (block.allow_change && !answers[block.id]) {
      answers[block.id] = [];
      return;
    }

    if (!answers[block.id].includes(option.id)) {
      answers[block.id].push(option.id);
      return;
    }

    if (block.allow_change && answers[block.id].includes(option.id)) {
      answers[block.id] = answers[block.id].filter(el => el !== option.id);
      return;
    }
  } else {
    if (block.allow_change && answers[block.id] === option.id) {
      answers[block.id] = null;
    } else if (block.allow_change && answers[block.id] !== option.id) {
      answers[block.id] = option.id;
    } else if (!answers[block.id]) {
      answers[block.id] = option.id;
    }
  }
}

function getTitle(ttl) {
  return ttl.replace(/{name}/g, answers['name']);
}

function checkAnimate(block, id) {
  if (!answers[block.id]) {
    return false;
  }

  if (block.multiple && answers[block.id]) {
    return answers[block.id].includes(id);
  } else {
    return answers[block.id] === id;
  }
}

function checkAnswerText(block, id) {
  if (!answers[block.id]) {
    return false;
  }

  if (block.multiple && answers[block.id]) {
    return answers[block.id].includes(id);
  } else {
    return answers[block.id] === id;
  }

}

let shuffledBlocksCache = ref({})
function shuffle(array, blockId) {
  if (shuffledBlocksCache.value[blockId]) {
    return shuffledBlocksCache.value[blockId];
  }

  let currentIndex = array.length;

  while (currentIndex != 0) {

    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  shuffledBlocksCache.value[blockId] = array;
  return array;
}

function blockHasCorrectAnswer(block) {
  if (block.options && block.options.length > 0) {
    return block.options.some(option => option.is_correct_answer);
  }

  return false;
}

function checkIsCorrectAnswer(block, id) {
  if (block.options && block.options.length > 0) {
    const option = block.options.find((option) => option.id === id);
    return option && option.is_correct_answer;
  }

  return false;
}

</script>

<template>
  <template v-for="(block, blockIndex) in settings.steps[currentStep].blocks">
    <template v-if="checkIfBlockVisible(block)">
      <template v-if="block.type === 'header'">
        <div class="title">
          {{ block.value }}
          <template v-if="settings.steps[currentStep].required">*</template>
        </div>
      </template>

      <template v-if="block.type === 'paragraph'">
        <div
            class="description"
            v-html="block.value"
        />
      </template>

      <template v-if="block.type === 'info'">
        <div class="title">
          {{ block.title }}
        </div>
        <div
            v-if="block.description && block.description.length > 0"
            class="description"
            v-html="block.description"
        />
      </template>

      <template v-if="['formInput', 'formInputFirstName', 'formInputLastName', 'formInputEmail', 'formInputMiddleName'].includes(block.type)">
        <div class="question">
          <label v-if="block.label" class="question-title">
            {{ block.label }}
            <span v-if="block.required" class="required">*</span>
          </label>
          <div
              class="field"
              :class="{'error': !answers[block.name] || checkMask(block)}"
          >
            <input class="input-text"
                   type="text"
                   :name="block.id"
                   :placeholder="block.placeholder"
                   :value="answers[block.id]"
                   @input="inputChange(block.id, $event)"
            >
            <div v-if="block.example" class="example">
              Пример: <i>{{ block.example }}</i>
            </div>
          </div>
        </div>
      </template>

      <template v-if="['formSelect', 'formSelectRegion'].includes(block.type)">
        <div class="question">
          <label v-if="block.label" class="question-title">
            {{ block.label }}
            <span v-if="block.required" class="required">*</span>
          </label>
          <div class="field field-select">
            <select v-if="block.options"
                    :name="block.id"
                    v-model="answers[block.id]"
                    @change="inputChange(block.id, $event)">
              <option v-for="option in block.options" :value="option.id">
                {{ option.label }}
              </option>
            </select>
          </div>
        </div>
      </template>

      <template v-if="block.type === 'formRange'">
				<div class="question">
          <label v-if="block.label" class="question-title">
            {{ block.label }}
            <span v-if="block.required" class="required">*</span>
          </label>
					<div class="question-help">
						question-help: 1-10, где 1 – совершенно не была полезна, 10 – максимально полезна
					</div>					
					<div class="field field-range">
						<div class="input-range-selector">
							<div class="input-range-selector-label input-range-selector-min">
								{{ block.min }}
							</div>
							<div class="input-range-selector-label input-range-selector-max">
								{{ block.max }}
							</div>
							<input class="input-range"
								type="range"
								:name="block.name"
								:min="block.min"
								:max="block.max"
								v-model="answers[block.id]"
								@input="inputChange(block.id, $event)"
							>
						</div>
						<span class="input-range-val">{{ answers[block.id] }}</span>
					</div>
				</div>
      </template>

      <template v-if="block.type === 'formRadio'">
        <div class="question">
          <label v-if="block.label" class="question-title">
            {{ block.label }}
            <span v-if="block.required" class="required">*</span>
          </label>
          <div v-for="option in block.options" class="field field-radio">
            <div class="radio-item">
              <input class="input-radio"
                     type="radio"
                     :id="'radio' + currentStep + blockIndex + option.id"
                     :name="block.id"
                     :value="option.id"
                     @change="inputChange(block.id, $event)"
              >
              <label :for="'radio' + currentStep + blockIndex + option.id">
                {{ option.label }}
              </label>
            </div>
          </div>
          <div v-if="block.other" class="field field-radio">
            <div class="radio-item">
              <input class="input-radio"
								type="radio"
								:id="'radio' + currentStep + blockIndex + '__$OTHER'"
								:name="block.id"
								:value="'__$OTHER__'"
								@change="inputChange(block.id, $event)"
              >
              <label :for="'radio' + currentStep + blockIndex + '__$OTHER'">
                Другое
              </label>
            </div>
          </div>

          <div
              v-if="block.other && answers[block.id] && answers[block.id].includes('__$OTHER__')"
              class="field"
              :class="{'error': !answers[block.name] || checkMask(block)}"
          >
            <label>
            </label>
            <input class="input-text"
							type="text"
							:name="block.id"
							:placeholder="block.placeholder"
							:value="answers[block.id + '__$OTHER']"
							@input="inputChange(block.id  + '__$OTHER', $event)"
						>
            <div v-if="block.example" class="example">
              Пример: <i>{{ block.example }}</i>
            </div>
          </div>
        </div>

      </template>

      <template v-if="block.type === 'formCheckbox'">
        <div class="question">
          <label v-if="block.label" class="question-title">
            {{ block.label }}
            <span v-if="block.required" class="required">*</span>
          </label>
          <div v-for="option in block.options" class="field field-checkbox">
            <div class="checkbox-item">
              <input class="input-checkbox"
                     type="checkbox"
                     :id="'checkbox' + currentStep + blockIndex + block.id + option.id"
                     :name="block.id"
                     :value="option.id"
                     @change="checkboxChange(block.id, $event)"
              >
              <label :for="'checkbox' + currentStep + blockIndex + block.id + option.id">
                {{ option.label }}
              </label>
            </div>
          </div>
          <div v-if="block.other" class="field field-checkbox">
            <div class="checkbox-item">
              <input class="input-checkbox"
                     type="checkbox"
                     :id="'checkbox' + currentStep + blockIndex + block.id + '__$OTHER'"
                     :name="block.id"
                     :value="'__$OTHER__'"
                     @change="checkboxChange(block.id, $event)"
              >
              <label :for="'checkbox' + currentStep + blockIndex + block.id + '__$OTHER'">
                Другое
              </label>
            </div>
          </div>
          <div
              v-if="block.other && answers[block.id] && answers[block.id].includes('__$OTHER__')"
              class="field"
              :class="{'error': !answers[block.name] || checkMask(block)}"
          >
            <label>

            </label>
            <input class="input-text"
                   type="text"
                   :name="block.id"
                   :placeholder="block.placeholder"
                   :value="answers[block.id + '__$OTHER']"
                   @input="inputChange(block.id  + '__$OTHER', $event)">
            <div v-if="block.example" class="example">
              Пример: <i>{{ block.example }}</i>
            </div>
          </div>
        </div>
      </template>

      <template v-if="block.type === 'question'">
        <div class="top_content">
          <div
              class="question-container"
              :class="block.image ? 'image-grid' : ''"
          >
            <div class="text-part">
              <label class="title">
                {{ block.label || block.title }}
                <span v-if="block.required" class="required">*</span>
              </label>
              <div class="question-help">{{ block.multiple ? 'Выберите один или несколько вариантов ответа' : 'Выберите один вариант ответа' }}</div>
              <div
								v-if="block.description"
								class="description"
								v-html="block.description"
              />
            </div>
            <div class="image-part">
              <img v-if="block.image"
                   :src="block.image" class="question-image" alt="">
            </div>
          </div>

          <div
						class="answers-grid"
						:class="block.view"
          >
            <template v-for="(option, optionIndex) in block.randomize ? shuffle(block.options, block.id) : block.options"
							:key="option.id"
						>
              <div class="option" @click="questionOptionClick(option, block)">
                <label
                    v-if="option.title"
                    :for="'radio' + currentStep + optionIndex"
                    :class="{
                      'animate': checkAnimate(block, option.id),
                      'incorrect': blockHasCorrectAnswer(block) && !checkIsCorrectAnswer(block, option.id) && checkAnimate(block, option.id),
                      'correct': blockHasCorrectAnswer(block) && checkIsCorrectAnswer(block, option.id) && checkAnimate(block, option.id),
                    }"
                >
                  <div class="option-container">
                    <img v-if="option.image" :src="option.image" class="option-image" alt="">
                    <span class="key">{{ alphabet[optionIndex] }}</span>
                    <div>{{ option.title }} {{ (settings.isDevMode && option.is_correct_answer) ? '(Правильный ответ)' : '' }}</div>
                  </div>
                  <svg height="13" width="16">
                    <path d="M14.293.293l1.414 1.414L5 12.414.293 7.707l1.414-1.414L5 9.586z"></path>
                  </svg>
                </label>
                <input
                    class="input-radio"
                    type="radio"
                    :id="'radio' + block.id + optionIndex"
                    :name="block.id"
                    :disabled="answers[block.id]"
                    :checked="answers[block.id] === option.id"
                >
                <div
                    v-if="checkAnswerText(block, option.id) && option.selectedText && !settings.forceDisableSelectedText"
                    class="selected-answer-text"
                    v-html="option.selectedText"
                />
              </div>
            </template>
          </div>
        </div>
      </template>

      <div v-if="block.type === 'notice'" class="top_content">
        <div class="title">
          {{ getTitle(block.title) }}
        </div>
        <div
            v-if="block.description"
            class="description"
            v-html="block.description"
        />
      </div>
    </template>
  </template>
</template>

<style scoped>

</style>
