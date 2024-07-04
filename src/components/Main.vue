<template>
  <div class="quiz-container">

    <div class="quiz-content">
      <div class="quiz-progress-container">
        <div class="quiz-progress">
          <div class="value" :style="{'width': progressValue + '%'}"></div>
        </div>
      </div>
      <div class="quiz-inner-container inner-content" :class="{'animate': animateStep}">
        <div class="parts">
          <div v-if="stepError" class="error-message">
            <span class="boundary">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path clip-rule="evenodd" d="M16.336 18H7.003c-1.51 0-2.475-1.609-1.765-2.941l4.667-8.75c.753-1.412 2.776-1.412 3.53 0l4.666 8.75c.71 1.332-.255 2.94-1.765 2.94zM11.67 8.5a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1zm0 7.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fill-rule="evenodd"></path>
              </svg>
            </span>
            Вам нужно указать ответ
          </div>

          <template v-if="progress === 'start'">
            <div class="title" v-html="settings.title"></div>
            <div class="description" v-html="settings.description"></div>
            <img v-if="settings.showStartImage && settings.startImage"
                 :src="settings.startImage" class="start-image" alt="">
            <div v-if="checkAttempts()" class="quiz-error">
              Вы исчерапали {{ settings.attempts }} попытки. Прохождение теста недоступно.
            </div>
          </template>

          <template v-if="progress === 'questions'">
            <div v-if="settings.steps[currentStep].type === 'notice'" class="top_content">
              <div class="title">{{ getTitle(settings.steps[currentStep].title) }}</div>
              <div v-if="settings.steps[currentStep].description"
                   class="description"
                   v-html="settings.steps[currentStep].description"></div>
            </div>

            <div v-if="settings.steps[currentStep].type === 'form'" class="top_content">
              <div class="title">
                {{ settings.steps[currentStep].title }}
                <template v-if="settings.steps[currentStep].required">*</template>
              </div>
              <div v-if="settings.steps[currentStep].description"
                   class="description"
                   v-html="settings.steps[currentStep].description"></div>
              <template v-for="(field, fieldIndex) in settings.steps[currentStep].fields">
                <div v-if="field.type && field.type === 'select'" class="field field-select">
                  <label v-if="field.label">
                    {{ field.label }}
                    <template v-if="field.required">*</template>
                  </label>
                  <select v-if="field.options"
                          :name="field.name"
                          v-model="answers[field.name]"
                          @change="inputChange(field.name, $event)">
                    <option v-for="option in field.options" :value="option.id">
                      {{ option.title }}
                    </option>
                  </select>
                </div>

                <div v-if="field.type && field.type === 'input'"
                     class="field"
                     :class="{'error': !answers[field.name] || checkMask(field)}">
                  <label v-if="field.label">
                    {{ field.label }}
                    <template v-if="field.required">*</template>
                  </label>
                  <input class="input-text"
                         type="text"
                         :name="field.name"
                         :placeholder="field.placeholder"
                         :value="answers[field.name]"
                         @input="inputChange(field.name, $event)">
                  <div v-if="field.example" class="example">
                    Пример: <i>{{ field.example }}</i>
                  </div>
                </div>

                <div v-if="field.type && field.type === 'radio'" class="field field-radio">
                  <div class="radio-item">
                    <input class="input-radio"
                           type="radio"
                           :id="'radio' + currentStep + fieldIndex"
                           :name="field.name"
                           :value="field.value"
                           @change="inputChange(field.name, $event)"
                    >
                    <label :for="'radio' + currentStep + fieldIndex">
                      {{ field.label }}
                    </label>
                  </div>
                </div>

                <div v-if="field.type && field.type === 'checkbox'" class="field field-checkbox">
                  <div class="checkbox-item">
                    <input class="input-checkbox"
                           type="checkbox"
                           :id="'checkbox' + currentStep + fieldIndex"
                           :name="field.name"
                           :value="field.value"
                           @change="checkboxChange(field.name, $event)"
                    >
                    <label :for="'checkbox' + currentStep + fieldIndex">
                      {{ field.label }}
                    </label>
                  </div>
                </div>

                <div v-if="field.type && field.type === 'range'" class="field field-range">
                  <label v-if="field.label">
                    {{ field.label }}
                    <template v-if="field.required">*</template>
                  </label>
                  <input class="input-range"
                         type="range"
                         :name="field.name"
                         :min="field.min"
                         :max="field.max"
                         v-model="answers[field.name]"
                         @input="inputChange(field.name, $event)">
                  <span class="input-range-val">{{ answers[field.name] }}</span>
                </div>
              </template>
            </div>

            <div v-if="settings.steps[currentStep].type === 'question'" class="top_content">
              <div class="title">{{ settings.steps[currentStep].title }}</div>
              <div v-if="settings.steps[currentStep].description"
                   class="description"
                   v-html="settings.steps[currentStep].description"></div>
              <img v-if="settings.steps[currentStep].image"
                   :src="settings.steps[currentStep].image" class="question-image" alt="">
              <template v-for="(option, optionIndex) in settings.steps[currentStep].options" :key="option.title">
                <div class="option" @click="optionClick(option.title, option.value)">
                  <label v-if="option.title"
                         :for="'radio' + currentStep + optionIndex"
                         :class="{'animate': checkAnimate(option.title)}"
                  >
                    <span class="key">{{ alphabet[optionIndex] }}</span>
                    {{ option.title }}
                    <svg height="13" width="16">
                      <path d="M14.293.293l1.414 1.414L5 12.414.293 7.707l1.414-1.414L5 9.586z"></path>
                    </svg>
                  </label>
                  <input class="input-radio"
                         type="radio"
                         :id="'radio' + currentStep + optionIndex"
                         :name="settings.steps[currentStep].title"
                         :disabled="answers[settings.steps[currentStep].title]"
                         :checked="answers[settings.steps[currentStep].title] === option.title"
                  >
                  <img v-if="option.image" :src="option.image" class="option-image" alt="">
                  <div v-if="answers[settings.steps[currentStep].title] === option.title && option.selectedText"
                       class="selected-answer-text"
                       v-html="option.selectedText"></div>
                </div>
              </template>
            </div>
          </template>

          <div v-if="progress === 'final'" class="top_content">
            <div class="title">
              {{ answers['name'] }}, благодарим за прохождение теста!
            </div>
            <div class="description">
              Ваш результат: {{ score }}/{{ maxScore }} {{ numWord() }}
              <template v-for="el in settings.result">
                <div v-if="score >= el.from && score <= el.to">
                  {{ el.text }}
                </div>
              </template>
            </div>
          </div>

          <div v-if="progress === 'final' && score >= settings.resultPDF" class="result-grid" id="result-pdf">
            <div class="result-grid-left md:col-span-6 xl:col-span-5">
              <div class="form text-left">
                <form action="">
                  <div v-if="settings.generationPDF">
                    <div class="mb-3" style="display:none;">
                      <label class="block mb-1">
                        Имя
                      </label>
                      <input id="quiz-pdf-name" name="pdfName" type="text" :value="answers['name']" class="form-control w-full">
                    </div>
                    <div class="mb-3" style="display:none;">
                      <label class="block mb-1">
                        Фамилия
                      </label>
                      <input id="quiz-pdf-last-name" name="pdfLastName" type="text" :value="answers['last_name']"
                             class="form-control w-full">
                    </div>

                    <p class="description mt-4 mb-3">Как вы хотите получить результат?</p>
                    <div class="block-button-wrap">
                      <button type="button" class="btn relative w-full btn btn-primary" @click="printPdf()">
											<span class="text">
												Распечатать сейчас (pdf)
											</span>
                      </button>
                    </div>
                    <div class="form-group mt-3">
                      <label class="">
                        Отправить мне на электронную почту
                      </label>
                      <div class="flex mt-1">
                        <input id="quiz-pdf-email" name="pdfEmail" type="email" :value="answers['email']"
                               class="form-control flex-grow -mr-2">
                        <div class="block-button-wrap">
                          <button type="button" class="btn relative btn btn-primary" @click="sendPdf()">
													<span contenteditable="false" class="text">
														Отправить
													</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form-group mt-6">
                    <div class="mb-4">
                      <a href="/estafeta/semejnye-finansy/rating/?regionId=1&amp;score=10" target="_blank"
                         id="rating">Посмотреть рейтинг региона</a>
                    </div>
                    <div class="flex items-center gap-3">
                      <div>Поделиться:</div>
                      <div class="share_list flex items-center">
                        <button type="button" id="share_vk" class="m-3 icon-vk text-primary text-xl" @click="share('vk')">vk</button>
                        <button type="button" id="share_ok" class="m-3 icon-odnoklassniki text-primary text-xl" @click="share('ok')">ok</button>
                        <button type="button" id="share_tg" class="m-3 icon-telegram text-primary text-xl" @click="share('tg')">tg</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div v-if="settings.generationPDF" class="result-grid-right md:col-span-6 xl:col-span-7">
              <div class="scale-container">
                <div id="quiz-pdf-zone" class="">
                  <section class="layout-container unset-all">
                    <section class="content-wrapper" style="width:794px;">
                      <section>
                        <div id="pdf-wrap" class="pdf-wrap" ref="pdf">
                          <div class="fullName">
                            {{ answers['name'] }}
                          </div>
                          <div class="lastName">
                            {{ answers['last_name'] }}
                          </div>
                          <div class="image-wrap">
                            <img :src="settings.certificate" alt="">
                          </div>
                        </div>
                      </section>
                    </section>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="!checkAttempts() && (progress !== 'final' || score < settings.resultPDF)" class="quiz-inner-bottom">
          <div class="button-container">
            <button v-if="progress === 'start'" class="q-btn next" @click="start()">Начать тест</button>
            <button v-if="progress === 'questions'" class="q-btn next" @click="nextClick()">
              {{ settings.steps[currentStep].button || 'OK' }}
            </button>
            <button v-if="progress === 'final'" class="q-btn next" @click="reloadQuiz()">Повторить квиз</button>
            <div class="info">Нажмите <b>Enter ↵</b></div>
          </div>
          <div v-if="progress === 'start'" class="timing">
            <span data-qa="icon" aria-hidden="true" class="icon">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" data-qa="animated-clock">
								<circle cx="6" cy="6" fill="#012941" r="6"></circle>
								<line x1="6" y1="6" x2="6" y2="3" stroke="#FEFDFA" stroke-width="1.2" stroke-linecap="round"></line>
								<line x1="6" y1="6" x2="6" y2="3" stroke="#FEFDFA" stroke-width="1.2" stroke-linecap="round"></line>
							</svg>
            </span>
            {{ settings.timing }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, watch } from 'vue';
import html2pdf from "html2pdf.js/dist/html2pdf.bundle"

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
  }
});

let settings;
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
let progress = ref('start');
let currentStep = ref(0);
let progressValue = ref(0);
let stepError = ref(false);
let animateStep = ref(false);
let answers = ref({});
let score = ref(0);
let maxScore = ref(0);
let pdf = ref();

for (let key in props) {
  if (key === 'firstname') {
    answers.value['name'] = props[key];
  }
  if (key === 'lastname') {
    answers.value['last_name'] = props[key];
  }
  if (key === 'email') {
    answers.value['email'] = props[key];
  }
  if (key === 'settings') {
    settings = JSON.parse(props[key]);
  }
}

settings.steps.forEach(step => {
  if (step.type === 'form') {
    step.fields.forEach(field => {
      if (field.type === 'range') {
        answers.value[field.name] = field.value || field.min;
      }
      if (field.type === 'checkbox') {
        answers.value[field.name] = [];
      }
    })
  }

  if (step.type === 'question') {
    maxScore.value++;
    if (step.multiple) {
      answers.value[step.title] = [];
    }
  }
});

const refParam = get('ref');
if (refParam){
  localStorage.setItem('ref-' + settings.id, refParam);
}

function get(name){
  if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
    return decodeURIComponent(name[1]);
}

function checkAttempts() {
  const position = localStorage.getItem('position-' + settings.id);
  return parseInt(position) > settings.attempts && position !== null;
}

function progressCalc() {
  progressValue.value = (currentStep.value * (100 / settings.steps.length)).toFixed();
}

function getTitle(ttl) {
  return ttl.replace(/{name}/g, answers.value['name']);
}

function checkAnimate(title) {
  if (settings.steps[currentStep.value].multiple) {
    return answers.value[settings.steps[currentStep.value].title].includes(title);
  } else {
    return answers.value[settings.steps[currentStep.value].title] === title;
  }
}

function numWord() {
  const words = ['балл', 'балла', 'баллов'];
  const value = Math.abs(score.value) % 100;
  const num = value % 10;
  if (value > 10 && value < 20) {
    return words[2]
  }
  if (num > 1 && num < 5) {
    return words[1]
  }
  if (num === 1) {
    return words[0];
  }
  return words[2];
}

function checkMask(field) {
  if (field.mask && answers.value[field.name]) {
    const rexp = new RegExp(field.mask);
    if (!rexp.test(answers.value[field.name].trim())) {
      return true
    }
  } else {
    return false;
  }
}

function verifyStep() {
  let countError = 0;

  const step = settings.steps[currentStep.value];

  if (step.type === 'question' && step.required) {
    if (settings.steps[currentStep.value].multiple) {
      if (!answers.value[step.title].length) {
        countError++;
      }
    } else {
      if (!answers.value[step.title]) {
        countError++;
      }
    }
  }

  if (step.type === 'form' && step.required) {
    step.fields.forEach(field => {
      const types = ['input', 'select', 'radio'];
      if (types.includes(field.type)) {
        if (!answers.value[field.name]) {
          countError++;
        }
        if (field.mask && checkMask(field)) {
          countError++;
        }
      }

      if (field.type === 'checkbox') {
        if (!answers.value[field.name].length) {
          countError++;
        }
      }
    });
  }

  stepError.value = countError > 0;
  return countError === 0;
}

function inputChange(name, e) {
  answers.value[name] = e.target.value;
  verifyStep();
}

function checkboxChange(name, e) {
  if (answers.value[name].includes(e.target.value)) {
    answers.value[name] = answers.value[name].filter(el => el !== e.target.value);
  } else {
    answers.value[name].push(e.target.value);
  }
  verifyStep();
}

function optionClick(a, v) {
  const q = settings.steps[currentStep.value].title;

  if (settings.steps[currentStep.value].multiple) {
    if (!answers.value[q].includes(a)) {
      answers.value[q].push(a);
      score.value += parseInt(v);
    }
  } else {
    if (!answers.value[q]) {
      answers.value[q] = a;
      score.value += parseInt(v);
    }
  }
}

function postData() {
  let position;
  if (localStorage.getItem('position-' + settings.id) === null) {
    position = 1;
  } else {
    position = parseInt(localStorage.getItem('position-' + settings.id));
    position = position + 1;
  }
  localStorage.setItem('position-' + settings.id, position);

  let uuid = '';
  if (localStorage.getItem('_ym_uid') !== null) {
    uuid = localStorage.getItem('_ym_uid');
  }

  const postObj = {
    'answers': answers.value,
    'position': position,
    'uuid': uuid,
    'monththeme_id': settings.monththeme_id,
    'ref': localStorage.getItem('ref-' + settings.id)
  };

  fetch(settings.post, {
    method: 'POST',
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    body: JSON.stringify(postObj)
  });
}

function setStep() {
  let url = new URL(window.location);
  url.searchParams.set('step', currentStep.value.toString());
  history.pushState({}, "", url);
  if (typeof(ym) === 'function') {
    ym(settings.ymCount, 'hit', url.href);
  }
}

function start() {
  progress.value = 'questions';
  setStep();
}

function next() {
  currentStep.value++;
  progressCalc();
  setStep();

  if (currentStep.value === settings.steps.length) {
    progress.value = 'final';
    postData();
  }
}

function nextClick() {
  if (verifyStep()) {
    next();
  }
}

function reloadQuiz() {
  window.location.reload();
}

function getPdfFile() {
  return false
}

function printPdf() {
  let options = {
    margin: 0,
    filename: `сертификат.pdf`,
    image: {
      type: 'jpeg',
      quality: 0.98
    },
    enableLinks: false,
    html2canvas: {
      scale: 1,
      y: 0,
      x: 0,
      scrollY: 0,
      scrollX: 0,
      windowWidth: 794,
      useCORS: true,
      allowTaint: true,
    },
    jsPDF: {
      unit: 'in',
      format: 'a4',
      orientation: 'portrait'
    }
  }
  html2pdf().set(options).from(pdf.value.innerHTML).toContainer().toCanvas().save();
}

function sendPdf() {
  const pdf = getPdfFile();
  const formData = new FormData();
  formData.append('method', 'sendMail');
  formData.append('certificate', new File([pdf], 'certificate'));
  formData.append('email', answers.value['email']);

  fetch(settings.sendCertificateUrl, {
    method: "POST",
    body: formData,
  });
}

function share(serviceName) {
  let url = '';
  const pageUrl = window.location.href;
  const title = encodeURIComponent(settings.title);
  const text = encodeURIComponent(settings.description);
  const image = encodeURIComponent('');

  switch (serviceName) {
    case 'vk':
      url = `https://vk.com/share.php?url=${pageUrl}&title=${text}`;
      if (image) {
        url += `&image=${image}`;
      }
      break;
    case 'ok':
      url = `https://connect.ok.ru/offer?url=${pageUrl}&title=${title}&description=${text}`;
      if (image) {
        url += `&imageUrl=${image}`;
      }
      break;
    case 'tg':
      url = `https://t.me/share/url?url=${pageUrl}&text=${text}`;
      break;
  }

  window.open(url, '', 'toolbar=0,status=0,scrollbars=1,width=626,height=436');
}

watch([currentStep, progress], (newVal, prevVal) => {
  if (newVal !== prevVal) {
    animateStep.value = true;
    setTimeout(() => {
      animateStep.value = false;
    }, 1000);
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    if (progress.value === 'start') {
      progress.value = 'questions';
    } else {
      if (progress.value === 'final') {
        reloadQuiz();
      }
      if (progress.value === 'questions') {
        nextClick();
      }
    }
  }
});

</script>
