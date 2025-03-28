<template>
  <div id="mf-quiz-main-container" class="quiz-container" :key="refreshKey" :class="{['type-' + settings.containerType]: !settings.isDevMode}">

    <div class="quiz-content">
      <div v-if="settings.type === 1" class="quiz-progress-container">
        <div class="quiz-progress">
          <div class="value" :style="{'width': progressValue + '%'}"></div>
        </div>
      </div>
      <div class="quiz-inner-container inner-content" :class="{'animate': animateStep}">
        <div class="parts">
          <template v-if="stage === 'start'">
            <start
                :settings="settings"
            />
          </template>

          <template v-if="stage === 'questions'">
            <questions
                :check-if-block-visible="checkIfBlockVisible"
                :verify-step="verifyStep"
                :current-step="currentStep"
                :settings="settings"
            />
          </template>
          <template v-if="stage === 'final'">
            <final
            />
          </template>



          <template v-if="stage === 'wrongAnswers'">
            <wrong-answers
                :settings="settings"
            />
          </template>


          <div v-if="stepError" class="error-message">
            <span class="boundary">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path clip-rule="evenodd" d="M16.336 18H7.003c-1.51 0-2.475-1.609-1.765-2.941l4.667-8.75c.753-1.412 2.776-1.412 3.53 0l4.666 8.75c.71 1.332-.255 2.94-1.765 2.94zM11.67 8.5a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1zm0 7.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fill-rule="evenodd"></path>
              </svg>
            </span>
            Вопросы помеченные звёздочкой * обязательны для заполнения
          </div>
        </div>

        <div v-if="!checkAttempts() && (stage !== 'final' || (settings.type === 1 && progressStore.currentScore < settings.resultPDF))" class="quiz-inner-bottom">
          <div class="button-container">
            <button v-if="stage === 'start'" class="q-btn next" @click="setStartStage()">Начать</button>
            <button v-if="stage === 'questions'" class="q-btn next" @click="nextClick()">
              {{ settings.steps[currentStep].button || 'OK' }}
            </button>
            <button v-if="stage === 'wrongAnswers' && answersStore.getWrongAnswers(settings).length - 1 > answersStore.wrongAnswerScreenIndex" class="q-btn next" @click="answersStore.wrongAnswerScreenIndex++">
              Далее
            </button>
            <button v-if="stage === 'wrongAnswers'" class="q-btn next" @click="progressStore.stage = 'final', answersStore.wrongAnswerScreenIndex = 0">
              Вернуться к результатам
            </button>

            <button v-if="settings.type === 1 && stage === 'final'" class="q-btn next" @click="reloadQuiz()">Повторить квиз</button>
            <div v-if="settings.type === 1" class="info">Нажмите <b>Enter ↵</b></div>
<!--            <button v-if="settings.type === 1 && settings.isDevMode" class="q-btn next" @click="progress = 'start', currentStep = 0, progressCalc()">-->
<!--              Вернуться в начало-->
<!--            </button>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, watch, computed } from 'vue';
import html2pdf from "html2pdf.js/dist/html2pdf.bundle"
import Final from '@/components/progress-steps/Final.vue';
import Start from '@/components/progress-steps/Start.vue';
import Questions from '@/components/progress-steps/Questions.vue';
import { useAnswersStore } from '@/stores/answers.js';
import WrongAnswers from '@/components/progress-steps/WrongAnswers.vue';
import { useSettingsStore } from '@/stores/settings';
import { useProgressStore } from '@/stores/progress';
import { useCardsStore } from '@/stores/cards';

const answersStore = useAnswersStore();
const settingsStore = useSettingsStore();
const progressStore = useProgressStore();
const cardsStore = useCardsStore();

const props = defineProps({
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  email: {
    type: String
  },
  settings: {
    type: String
  },
  secretId: {
    type: String
  },
  apiUrl: {
    type: String
  },
  cardsApiUrl: {
    type: String
  },
});

let settings = computed(() => settingsStore.settings);
let stage = computed(() => progressStore.stage);
let currentStep = ref(0);
let progressValue = ref(0);
let stepError = ref(false);
let animateStep = ref(false);
let answers = answersStore.answers;
/** костыль, найти решение */
let refreshKey = ref(0);

await initialSetup();

async function initialSetup() {
  for (let key in props) {
    if (key === 'firstname') {
      answers['name'] = props[key];
    }
    if (key === 'lastname') {
      answers['last_name'] = props[key];
    }
    if (key === 'email') {
      answers['email'] = props[key];
    }
  }

  if (props.secretId && props.apiUrl) {
    await fetch(props.apiUrl + '/' + props.secretId)
    .then(response => response.json())
    .then(data => {
      settingsStore.settings = fromBackend(data);
    });
  } else if (props.settings) {
    if (typeof window.mfQuizSettings !== 'undefined') {
      settingsStore.settings = JSON.parse(window.mfQuizSettings);
    } else {
      settingsStore.settings = JSON.parse(props.settings);
    }
  }

  if (settings.value.type === 0) {
    progressStore.stage = 'questions';
  }

  let cardIds = [];
  settings.value.steps.forEach(step => {
    if (!step.blocks) {
      return;
    }

    step.blocks.forEach(block => {
      if (!block.type) {
        console.log('Block type is not defined', block);
        return;
      }

      if (block.type === 'question') {
        if (block.multiple) {
          answers[block.id] = [];
        }

        if (block.wrong_answer_card) {
          cardIds.push(block.wrong_answer_card.value);
        }
      }

      if (block.type === 'formRange') {
        answers[block.id] = block.value || block.min;
      }

      if (block.type === 'formCheckbox') {
        answers[block.id] = [];
      }
    });
  });

  if (cardIds && cardIds.length) {
    cardsStore.fetchCards(props.cardsApiUrl, cardIds);
  }

  updateAutomaticNumbering();
// refreshKey.value += 1;

  const refParam = get('ref');

  if (refParam){
    localStorage.setItem('ref-' + settings.value.id, refParam);
  }

}

function updateAutomaticNumbering() {
  if (!settings.value.automaticNumberingType) {
    return;
  }

  let stepCount = 1;
  let continuousBlockCount = 1;
  settings.value.steps.forEach(step => {
    if (!step.blocks) {
      return;
    }

    let blockCount = 1;

    step.blocks.forEach(block => {
      if (!block.type) {
        console.error('Block type is not defined', block);
        return;
      }

      if (['formRange', 'formInput', 'formCheckbox', 'formRadio', 'formSelect', 'formSelectRegion', 'question'].includes(block.type)) {
        if (!checkIfBlockVisible(block)) {
          return;
        }
        if (!block.$__OLD_LABEL) {
          block.$__OLD_LABEL = block.label || block.title;
        }

        if (settings.value.automaticNumberingType && settings.value.automaticNumberingType === 'per_page') {
          block.label = blockCount + '. ' + block.$__OLD_LABEL;
        } else if (settings.value.automaticNumberingType === 'continuous') {
          block.label = continuousBlockCount + '. ' + block.$__OLD_LABEL;
        }

        blockCount++;
        continuousBlockCount++;
      }

    });

    stepCount++;
  });

}

function fromBackend(data) {
  return {
    id: data.id,
    secret_id: data.secret_id,
    automaticNumberingType: data.automatic_numbering_type,
    containerType: data.container_type,
    title: data.title,
    type: data.type,
    description_fail_attempts: data.failed_attemps_text,
    startScreenTitle: data.start_screen_title,
    startScreenDescription: data.start_screen_description,
    startScreenImage: data.start_screen_image,
    showStartImage: data.show_start_image,
    timeString: data.time_string,
    certificate: data.certificate_url,
    resultDataUrl: data.post_url,
    sendCertificateUrl: data.send_certificate_url,
    monththeme_id: data.monththeme_id,
    maxAttempts: data.max_attempts,
    generationPDF: data.is_pdf_enabled,
    ymCount: data.ym_count,
    ratingLink: data.rating_link,
    ratingText: data.rating_text,
    resultPDF: data.required_score_for_pdf,
    hideDescriptionOnResult: data.hide_description_on_result,
    hideShareOnResult: data.hide_share_on_result,
    hideRatingLinkOnResult: data.hide_rating_link_on_result,
    steps: data.steps,
    scoreCalculationMethod: data.score_calculation_method,
    rightAnswerScoreWeight: data.right_answer_score_weight,
    wrongAnswerScoreWeight: data.wrong_answer_score_weight,
    result: data.result,
  };
}

function get(name){
  if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
    return decodeURIComponent(name[1]);
}

function checkAttempts() {
  const position = localStorage.getItem('position-' + settings.value.id);
  return parseInt(position) > settings.value.attempts && position !== null;
}

function progressCalc() {
  progressValue.value = (currentStep.value * (100 / settings.value.steps.length)).toFixed();
}

function verifyStep() {
  let countError = 0;

  const step = settings.value.steps[currentStep.value];

  step.blocks.forEach(block => {
    if (!checkIfBlockVisible(block)) {
      return;
    }

    if (['formRange', 'formInput', 'formCheckbox', 'formRadio', 'formSelect', 'formSelectRegion'].includes(block.type)) {
      if (!block.required) {
        return;
      }

      if (!answers[block.id]) {
        countError++;
      }
    }
  });

  stepError.value = countError > 0;

  return countError === 0;
}


function postData() {
  let position;
  if (localStorage.getItem('position-' + settings.value.id) === null) {
    position = 1;
  } else {
    position = parseInt(localStorage.getItem('position-' + settings.value.id));
    position = position + 1;
  }
  localStorage.setItem('position-' + settings.value.id, position);

  let uuid = '';
  if (localStorage.getItem('_ym_uid') !== null) {
    uuid = localStorage.getItem('_ym_uid');
  }

  const postObj = {
    'answers': answers,
    'position': position,
    'uuid': uuid,
    'monththeme_id': settings.value.monththeme_id,
    'quiz_id': settings.value.id,
    'ref': localStorage.getItem('ref-' + settings.value.id),
    'score': progressStore.currentScore,
  };

  fetch(settings.value.resultDataUrl, {
    method: 'POST',
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    body: JSON.stringify(postObj)
  })

  const widget = document.getElementsByTagName('quiz-widget');

  if (widget.length) {
    widget[0].scrollIntoView();
  }
}

function setStep() {
  let url = new URL(window.location);
  url.searchParams.set('step', currentStep.value.toString());
  history.pushState({}, "", url);

  if (!url.pathname.startsWith('/virtual')) {

    let newPathname = '/virtual' + url.pathname;
    url.pathname = newPathname;
  }

  if (typeof(ym) === 'function') {
    ym(settings.value.ymCount, 'hit', url.href);
  }
}

function setStartStage() {
  progressStore.stage = 'questions';
  setStep();
  progressCalc();
}

function next() {
  currentStep.value++;
  progressCalc();
  setStep();

  if (currentStep.value === settings.value.steps.length) {
    progressStore.stage = 'final';
    postData();
  }
}

function nextClick() {
  if (verifyStep()) {
    next();
  }
}

function reloadQuiz() {
  clearAnswers();

  currentStep.value = 0;
  setStartStage();
}

function clearAnswers() {
  answersStore.answers = {};
}


function checkIfBlockVisible(block) {
  if (!block.conditions) {
    return true;
  }

  if (block.conditions && !block.conditions.enabled) {
    return true;
  }

  function evaluateConditions(conditions, context) {
    let conditionString = '';

    conditions.forEach((condition, index) => {
      const fieldValue = context[condition.field] || '';
      const conditionValue = condition.value;
      const operator = condition.operator === 'equal' ? '===' : '!==';

      conditionString += `"${fieldValue}" ${operator} "${conditionValue}"`;

      if (index !== conditions.length - 1) {
        const nextOperator = conditions[index + 1].toPreviousFieldOperator.toUpperCase();
        conditionString += ` ${nextOperator} `;
      }
    });

    conditionString = conditionString.replace(/\bAND\b/g, '&&').replace(/\bOR\b/g, '||');

    try {
      return new Function(`return ${conditionString}`)();
    } catch (e) {
      console.error('Error evaluating condition string:', e);
      return false;
    }
  }

  let conditionString = '';

  const context = {};
  block.conditions.list.forEach((condition, index) => {
    context[condition.field] = answers[condition.field] || '';
    context[condition.field + 'FILTER'] = condition.value;
    let fieldValue = answers[condition.field] || '';
    if (condition.operator === 'equal') {
      conditionString += '"' + condition.field + '"' + '="' + condition.field + 'FILTER"' ;
    } else if (condition.operator === 'notEqual') {
      conditionString += 'NOT' + '"' + condition.field + '"' + '="' + condition.field + 'FILTER"' ;
    }
    // console.log(answers[condition.field])
    // conditionString += answers[condition.field] + ' ' + (condition.operator === 'equal' ? '=' : ) + ' ' + condition.value;
    if (index !== block.conditions.list.length - 1) {
      if (block.conditions.list[index + 1] && block.conditions.list[index + 1].toPreviousFieldOperator) {
        conditionString += ' ' + block.conditions.list[index + 1].toPreviousFieldOperator.toUpperCase() + ' ';
      } else {
        conditionString += ' '
      }
      // if (condition.toPreviousFieldOperator) {
      //   conditionString += ' ' + condition.toPreviousFieldOperator.toUpperCase() + ' ';
      // } else {
      // }
      // conditionString += ' '

    }
  });

  return evaluateConditions(block.conditions.list, context);
}

watch(answers, (newVal, oldVal) => {
  updateAutomaticNumbering();
}, {deep: true})

watch([currentStep, () => progressStore.stage], (newVal, prevVal) => {
  if (newVal !== prevVal) {
    animateStep.value = true;
    setTimeout(() => {
      animateStep.value = false;
    }, 1000);
  }
});

document.addEventListener('keydown', e => {
  if (settings.value.type !== 1) {
    return;
  }

  if (e.key === 'Enter') {
    if (progressStore.stage === 'start') {
      progressStore.stage = 'questions';
    } else {
      if (progressStore.stage === 'final') {
        reloadQuiz();
      }
      if (progressStore.stage === 'questions') {
        nextClick();
      }
    }
  }
});

window.mfQuizSetStep = function (step) {
  if (typeof settings.value.steps[step] === 'undefined') {
    return;
  }
  currentStep.value = step;
  progressStore.stage = 'questions';
  progressCalc();
}

window.mfQuizSetStartScreen = function () {
  currentStep.value = 0;
  progressStore.stage = 'start';
  progressCalc();
}

window.mfQuizSetEndScreen = function () {
  currentStep.value = 0;
  progressStore.stage = 'final';
  progressCalc();
}

window.mfQuizRegisterNewSettings = function (newSettings) {
  settingsStore.setSettings(JSON.parse(JSON.stringify(newSettings)));
  answers = {};
  updateAutomaticNumbering();
}

</script>
