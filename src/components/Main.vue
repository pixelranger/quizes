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

						<div class="start-container">
							<div class="title" v-html="settings.title"></div>
							<div class="image">
								<img v-if="settings.showStartImage && settings.startImage"
								:src="settings.startImage" class="start-image" alt="">
							</div>
							<div class="description" v-html="settings.description"></div>
						</div>
            <div v-if="checkAttempts()" class="quiz-error">
              Вы исчерапали {{ settings.attempts }} попытки. Прохождение теста недоступно.
            </div>
          </template>

          <template v-if="progress === 'questions'">
            <div v-if="settings.steps[currentStep].type === 'notice'" class="top_content">
              <div class="title">
								{{ getTitle(settings.steps[currentStep].title) }}
							</div>
              <div
								v-if="settings.steps[currentStep].description"
                class="description"
                v-html="settings.steps[currentStep].description"
							/>
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
							<div
								class="question-container"
								:class="settings.steps[currentStep].image ? 'image-grid' : ''"
							>
								<div class="text-part">
									<div class="title">{{ settings.steps[currentStep].title }}</div>
									<div
										v-if="settings.steps[currentStep].description"
										class="description"
										v-html="settings.steps[currentStep].description"
									/>
								</div>
								<div class="image-part">
									<img v-if="settings.steps[currentStep].image"
									:src="settings.steps[currentStep].image" class="question-image" alt="">
								</div>
							</div>

							<div
								class="answers-grid"
								:class="settings.steps[currentStep].view"
							>
								<template v-for="(option, optionIndex) in settings.steps[currentStep].options" :key="option.title">
									<div class="option" @click="optionClick(option.title, option.value)">
										<label
											v-if="option.title"
											:for="'radio' + currentStep + optionIndex"
											:class="{'animate': checkAnimate(option.title)}"
										>
											<div class="option-container">
												<img v-if="option.image" :src="option.image" class="option-image" alt="">
												<span class="key">{{ alphabet[optionIndex] }}</span>
												<div>{{ option.title }}</div>
											</div>
											<svg height="13" width="16">
												<path d="M14.293.293l1.414 1.414L5 12.414.293 7.707l1.414-1.414L5 9.586z"></path>
											</svg>
										</label>
										<input
											class="input-radio"
											type="radio"
											:id="'radio' + currentStep + optionIndex"
											:name="settings.steps[currentStep].title"
											:disabled="answers[settings.steps[currentStep].title]"
											:checked="answers[settings.steps[currentStep].title] === option.title"
										>
										<div
											v-if="answers[settings.steps[currentStep].title] === option.title && option.selectedText"
											class="selected-answer-text"
											v-html="option.selectedText"
										/>
									</div>
								</template>
							</div>
            </div>
          </template>

          <div v-if="progress === 'final'" class="top_content">
            <div class="title">
              {{ answers['name'] }}, благодарим за прохождение теста или опроса!
            </div>
            <div class="description" v-if="settings.hideDescriptionOnResult === false">
              Ваш результат: {{ score }}/{{ maxScore }} {{ numWord() }}
              <template v-for="el in settings.result">
                <div v-if="score >= el.from && score <= el.to">
                  {{ el.text }}
                </div>
              </template>
            </div>
          </div>

          <div v-if="progress === 'final'" class="result-grid" id="result-pdf">
            <div class="result-grid-left md:col-span-6 xl:col-span-5">
              <div class="form text-left">
                <form action="">
                  <div v-if="settings.generationPDF && score >= settings.resultPDF">
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
                      <button type="button" class="q-btn" @click="printPdf()">
												Распечатать сейчас (pdf)
                      </button>
                    </div>
                    <div class="form-group">
                      <label>Отправить мне на электронную почту</label>
                      <div class="input-group">
                        <input
													id="quiz-pdf-email"
													name="pdfEmail"
													type="email"
													:value="answers['email']"
                          class="form-control"
												>
												<button type="button" class="q-btn" @click="sendPdf()">
													Отправить
												</button>
                      </div>
                    </div>
                  </div>

                  <div class="pdf-additional-block form-group">
                    <div class="rating_link"  v-if="settings.hideRatingLinkOnResult === false">
                      <a class="link" :href="settings.ratingLink" target="_blank" id="rating">{{ settings.ratingText }}</a>
                    </div>
                    <div>
                      <div class="share_label">Поделиться:</div>
                      <div class="share_list">
                        <button type="button" id="share_vk" class="q-btn m-3 icon-vk text-white text-xl" @click="share('vk')">
													<svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path fill-rule="evenodd" clip-rule="evenodd" d="M21.4935 0.939473C21.6482 0.386842 21.4935 0 20.7713 0H18.364C17.745 0 17.4699 0.35 17.3151 0.736842C17.3151 0.736842 16.0943 3.94211 14.3576 6.00526C13.7902 6.61316 13.5495 6.79737 13.24 6.79737C13.0852 6.79737 12.8617 6.61316 12.8617 6.06053V0.939473C12.8617 0.276316 12.6897 0 12.1739 0H8.39105C8.01276 0 7.77204 0.313157 7.77204 0.589473C7.77204 1.21579 8.63178 1.36316 8.73494 3.09474V6.88947C8.73494 7.71842 8.59739 7.86579 8.28788 7.86579C7.47973 7.86579 5.48513 4.66053 4.31589 0.976316C4.07516 0.294737 3.85163 0 3.23262 0H0.825349C0.137558 0 0 0.35 0 0.736842C0 1.41842 0.808154 4.8079 3.80004 9.28421C5.79464 12.3421 8.59739 14 11.1422 14C12.6725 14 12.8617 13.6316 12.8617 13.0053V10.6842C12.8617 9.94737 12.9992 9.8 13.4979 9.8C13.859 9.8 14.4608 9.98421 15.888 11.4579C17.5215 13.2079 17.7966 14 18.7079 14H21.1152C21.803 14 22.1469 13.6316 21.9405 12.9132C21.717 12.1947 20.9432 11.1447 19.9115 9.8921C19.3441 9.17368 18.5016 8.41842 18.2608 8.03158C17.8998 7.53421 18.0029 7.31316 18.2608 6.88947C18.2608 6.87105 21.2012 2.45 21.4935 0.939473Z" fill="currentColor" />
													</svg>
												</button>
                        <button type="button" id="share_ok" class="q-btn m-3 icon-odnoklassniki text-primary text-xl" @click="share('ok')">
													<svg height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1258.2 2174.7">
														<path class="st0" d="M629.9,1122.4c310-0.1,561.1-251.5,561-561.4c-0.1-310-251.5-561.1-561.4-561S68.4,251.5,68.5,561.4  C68.9,871.2,320.1,1122.2,629.9,1122.4 M629.9,329c128.4,0,232.5,104.1,232.5,232.5S758.3,793.9,629.9,793.9  S397.4,689.8,397.4,561.4C397.6,433.1,501.6,329.1,629.9,329L629.9,329z M856.8,1580.3c115.5-26.2,225.7-71.9,326-135  c76.4-49.3,98.4-151.1,49.1-227.5c-48.5-75.2-148.3-97.9-224.5-51c-231.1,144.5-524.5,144.5-755.6,0c-76.7-48.1-178-25.1-226.3,51.5  c-48.5,76.7-25.7,178.3,51.1,226.8c0.1,0,0.2,0.1,0.2,0.1c100.2,63,210.4,108.7,325.8,135L88.8,1894c-62.5,66-59.6,170.2,6.5,232.7  c63.5,60,162.7,60,226.2,0l308.2-308.4l308.4,308.4c64.2,64.1,168.1,64.1,232.3,0c64.1-64.2,64.1-168.1,0-232.3L856.8,1580.3z" fill="currentColor" />
													</svg>
												</button>
                        <button type="button" id="share_tg" class="q-btn m-3 icon-telegram text-primary text-xl" @click="share('tg')">
													<svg height="16" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M0.980933 6.09703C0.980933 6.09703 8.05735 3.02377 10.5116 1.9416C11.4524 1.50877 14.6429 0.123584 14.6429 0.123584C14.6429 0.123584 16.1155 -0.482382 15.9927 0.989309C15.9518 1.59533 15.6246 3.7163 15.2974 6.01047C14.8065 9.25692 14.2747 12.8063 14.2747 12.8063C14.2747 12.8063 14.1929 13.8019 13.4976 13.9751C12.8022 14.1482 11.6569 13.3691 11.4524 13.1959C11.2887 13.0661 8.38456 11.1182 7.32106 10.1659C7.03472 9.9062 6.70751 9.3868 7.36194 8.78078C8.83451 7.35234 10.5934 5.57763 11.6569 4.45221C12.1477 3.93275 12.6386 2.72076 10.5934 4.19245C7.68921 6.31348 4.82592 8.30463 4.82592 8.30463C4.82592 8.30463 4.17144 8.73746 2.94433 8.34788C1.71716 7.95836 0.285519 7.4389 0.285519 7.4389C0.285519 7.4389 -0.696122 6.78963 0.980933 6.09703Z" fill="currentColor"/>
													</svg>
												</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div v-if="settings.generationPDF && score >= settings.resultPDF" class="result-grid-right md:col-span-6 xl:col-span-7">
              <div class="scale-container">
                <div id="quiz-pdf-zone" class="">
                  <section class="layout-container unset-all">
                    <section class="content-wrapper" style="width:794px;">
                      <section>
                        <div id="pdf-wrap" class="pdf-wrap" ref="pdf">
													<div class="name-box">
														<div class="fullName">
															{{ answers['name'] }}
														</div>
														<div class="lastName">
															{{ answers['last_name'] }}
														</div>
													</div>
                          <div class="image-wrap">
                            <img :src="settings.certificate" width="792" height="1118" alt="">
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
            <button v-if="progress === 'start'" class="q-btn next" @click="start()">Начать</button>
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
    'quiz_id': settings.id,
    'ref': localStorage.getItem('ref-' + settings.id),
    'score': score.value,
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

  if (!url.pathname.startsWith('/virtual')) {
    
    let newPathname = '/virtual' + url.pathname;
    url.pathname = newPathname;
  }

  console.log('v'+url.href);

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
