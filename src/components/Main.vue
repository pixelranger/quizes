<template>
  <div class="quiz-container">

    <div class="quiz-content">
      <div class="quiz-progress-container">
        <div class="quiz-progress">
          <div class="value" :style="{'width': progressValue + '%'}"></div>
        </div>
      </div>
      <div class="quiz-inner-container">
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
            <div v-if="checkAttempts()" class="quiz-error">
              Вы исчерапали 3 попытки. Прохождение теста недоступно.
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
              <template v-for="field in settings.steps[currentStep].fields">
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
              </template>
            </div>

            <div v-if="settings.steps[currentStep].type === 'question'" class="top_content">
              <div class="title">{{ settings.steps[currentStep].title }}</div>
              <div v-if="settings.steps[currentStep].description"
                   class="description"
                   v-html="settings.steps[currentStep].description"></div>
              <template v-for="(option, optionIndex) in settings.steps[currentStep].options" :key="option.title">
                <div class="option" @click="optionClick(settings.steps[currentStep].title, option.title, option.value)">
                  <label v-if="option.title"
                         :for="'radio' + currentStep + optionIndex"
                         :class="{'animate': answers[settings.steps[currentStep].title] === option.title}"
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
                  <div v-if="answers[settings.steps[currentStep].title] === option.title"
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
              Ваш результат: {{ score }}/10 {{ numWord() }}
              <template v-for="el in settings.result">
                <div v-if="score >= el.from && score <= el.to">
                  {{ el.text }}
                </div>
              </template>
            </div>
          </div>

          <div v-if="progress === 'final' && score > 8" class="result-grid" id="result-pdf">
            <div class="result-grid-left md:col-span-6 xl:col-span-5">
              <div class="form text-left">
                <form action="">
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


                  <div class="form-group mt-6">
                    <div class="mb-4">
                      <a href="/estafeta/semejnye-finansy/rating/?regionId=1&amp;score=10" target="_blank"
                         id="rating">Посмотреть рейтинг региона</a>
                    </div>
                    <div class="flex items-center gap-3">
                      <div>Поделиться:</div>
                      <div class="share_list flex items-center">
                        <button id="share_vk" class="m-3 icon-vk text-primary text-xl"></button>
                        <button id="share_ok" class="m-3 icon-odnoklassniki text-primary text-xl"></button>
                        <button id="share_tg" class="m-3 icon-telegram text-primary text-xl"></button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div class="result-grid-right md:col-span-6 xl:col-span-7">
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
                            <img src="https://xn--80apaohbc3aw9e.xn--p1ai/images/certificate-relay-1242x1754.jpg" alt="">
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

        <div v-if="!checkAttempts() && (progress !== 'final' || score < 9)" class="quiz-inner-bottom">
          <div class="button-container">
            <button v-if="progress === 'start'" class="q-btn next" @click="progress = 'questions'">Начать тест</button>
            <button v-if="progress === 'questions'" class="q-btn next" @click="nextClick()">
              {{ settings.steps[currentStep].button || 'Ок' }}
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
            Занимает 7 минут(-ы)
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import html2pdf from "html2pdf.js"

const props = defineProps({
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  email: {
    type: String
  }
});

const settings = {
  "title": "Семья и деньги: проверьте, как вы управляете семейным бюджетом",
  "description": "Финансовый план семьи – это когда вы точно знаете, на что тратите деньги. Вы не экономите копейки до зарплаты, в вашей семье нет ссор из-за денег, потому что дохода хватает на всех. Умение управлять бюджетом – это не врождённая способность, а навыки, которые может развить каждый. <br/><br/>Пройдите наш тест и проверьте, насколько эти навыки развиты у вас. В тесте 10 вопросов. За каждый правильный ответ вы получите по одному баллу. Максимально можно набрать 10 баллов. У вас будет три попытки. Лучший результат мы отправим в зачет рейтинга вашего региона. Желаем удачи!",
  "timing": "Занимает 7 минут(-ы)",
  "post": "https://app-dev.xn--80apaohbc3aw9e.xn--p1ai/index_min.php?action=quiz",
  "sendCertificateUrl": "https://app-dev.xn--80apaohbc3aw9e.xn--p1ai/api/send-fin-zosh-certificate",
  "steps": [
    {
      "type": "form",
      "title": "Ваше имя и электронная почта",
      "description": "Мы обещаем не присылать вам ничего, кроме результатов тестов",
      "required": true,
      "fields": [
        {
          "type": "input",
          "label": "Имя",
          "name": "name",
          "placeholder": "Александр",
          "example": "",
          "required": true,
          "prefillValue": "quizSettings.name"
        },
        {
          "type": "input",
          "label": "Фамилия",
          "name": "last_name",
          "placeholder": "Иванов",
          "example": "",
          "required": true,
          "prefillValue": "quizSettings.last_name"
        },
        {
          "type": "input",
          "label": "Эл. адрес",
          "name": "email",
          "placeholder": "somebody@example.com",
          "example": "",
          "required": true,
          "mask": "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
          "prefillValue": "quizSettings.email"
        }
      ],
      "button": "Ок",
      "callback": "custom_calculate_result"
    },
    {
      "type": "form",
      "title": "Укажите ваш регион",
      "required": false,
      "fields": [
        {
          "type": "select",
          "label": "",
          "name": "region",
          "placeholder": "Напишите ответ здесь...",
          "example": "Москва, Россия",
          "options": [
            {
              "id": 982,
              "title": "Алтайский край",
              "image": ""
            },
            {
              "id": 862,
              "title": "Амурская область",
              "image": ""
            },
            {
              "id": 872,
              "title": "Архангельская область",
              "image": ""
            },
            {
              "id": 882,
              "title": "Астраханская область",
              "image": ""
            },
            {
              "id": 902,
              "title": "Белгородская область",
              "image": ""
            },
            {
              "id": 912,
              "title": "Брянская область",
              "image": ""
            },
            {
              "id": 1602,
              "title": "Владимирская область",
              "image": ""
            },
            {
              "id": 1592,
              "title": "Волгоградская область",
              "image": ""
            },
            {
              "id": 1622,
              "title": "Вологодская область",
              "image": ""
            },
            {
              "id": 1632,
              "title": "Воронежская область",
              "image": ""
            },
            {
              "id": 2,
              "title": "Все регионы",
              "image": ""
            },
            {
              "id": 1691,
              "title": "Донецкая Народная Республика",
              "image": ""
            },
            {
              "id": 1652,
              "title": "Еврейская автономная область",
              "image": ""
            },
            {
              "id": 1662,
              "title": "Забайкальский край",
              "image": ""
            },
            {
              "id": 1711,
              "title": "Запорожская область",
              "image": ""
            },
            {
              "id": 1012,
              "title": "Ивановская область",
              "image": ""
            },
            {
              "id": 1002,
              "title": "Иркутская область",
              "image": ""
            },
            {
              "id": 1022,
              "title": "Кабардино-Балкарская республика",
              "image": ""
            },
            {
              "id": 1122,
              "title": "Калининградская область",
              "image": ""
            },
            {
              "id": 1062,
              "title": "Калужская область",
              "image": ""
            },
            {
              "id": 1142,
              "title": "Камчатский край",
              "image": ""
            },
            {
              "id": 1032,
              "title": "Карачаево-Черкесская республика",
              "image": ""
            },
            {
              "id": 1052,
              "title": "Кемеровская область - Кузбасс",
              "image": ""
            },
            {
              "id": 1182,
              "title": "Кировская область",
              "image": ""
            },
            {
              "id": 1162,
              "title": "Костромская область",
              "image": ""
            },
            {
              "id": 1042,
              "title": "Краснодарский край",
              "image": ""
            },
            {
              "id": 1192,
              "title": "Красноярский край",
              "image": ""
            },
            {
              "id": 1172,
              "title": "Курганская область",
              "image": ""
            },
            {
              "id": 1152,
              "title": "Курская область",
              "image": ""
            },
            {
              "id": 1202,
              "title": "Ленинградская область",
              "image": ""
            },
            {
              "id": 1212,
              "title": "Липецкая область",
              "image": ""
            },
            {
              "id": 1701,
              "title": "Луганская Народная Республика",
              "image": ""
            },
            {
              "id": 1242,
              "title": "Магаданская область",
              "image": ""
            },
            {
              "id": 1,
              "title": "Москва",
              "image": ""
            },
            {
              "id": 1272,
              "title": "Московская область",
              "image": ""
            },
            {
              "id": 1252,
              "title": "Мурманская область",
              "image": ""
            },
            {
              "id": 1292,
              "title": "Ненецкий автономный округ",
              "image": ""
            },
            {
              "id": 1322,
              "title": "Нижегородская область",
              "image": ""
            },
            {
              "id": 1282,
              "title": "Новгородская область",
              "image": ""
            },
            {
              "id": 1312,
              "title": "Новосибирская область",
              "image": ""
            },
            {
              "id": 1352,
              "title": "Омская область",
              "image": ""
            },
            {
              "id": 1332,
              "title": "Оренбургская область",
              "image": ""
            },
            {
              "id": 1342,
              "title": "Орловская область",
              "image": ""
            },
            {
              "id": 1392,
              "title": "Пензенская область",
              "image": ""
            },
            {
              "id": 1362,
              "title": "Пермский край",
              "image": ""
            },
            {
              "id": 1372,
              "title": "Приморский край",
              "image": ""
            },
            {
              "id": 1382,
              "title": "Псковская область",
              "image": ""
            },
            {
              "id": 842,
              "title": "Республика Адыгея",
              "image": ""
            },
            {
              "id": 852,
              "title": "Республика Алтай",
              "image": ""
            },
            {
              "id": 892,
              "title": "Республика Башкортостан",
              "image": ""
            },
            {
              "id": 922,
              "title": "Республика Бурятия",
              "image": ""
            },
            {
              "id": 972,
              "title": "Республика Дагестан",
              "image": ""
            },
            {
              "id": 992,
              "title": "Республика Ингушетия",
              "image": ""
            },
            {
              "id": 1102,
              "title": "Республика Калмыкия",
              "image": ""
            },
            {
              "id": 1082,
              "title": "Республика Карелия",
              "image": ""
            },
            {
              "id": 1132,
              "title": "Республика Коми",
              "image": ""
            },
            {
              "id": 1672,
              "title": "Республика Крым",
              "image": ""
            },
            {
              "id": 1232,
              "title": "Республика Марий Эл",
              "image": ""
            },
            {
              "id": 1262,
              "title": "Республика Мордовия",
              "image": ""
            },
            {
              "id": 1432,
              "title": "Республика Саха (Якутия)",
              "image": ""
            },
            {
              "id": 1302,
              "title": "Республика Северная Осетия — Алания",
              "image": ""
            },
            {
              "id": 1532,
              "title": "Республика Татарстан",
              "image": ""
            },
            {
              "id": 1542,
              "title": "Республика Тыва",
              "image": ""
            },
            {
              "id": 1092,
              "title": "Республика Хакасия",
              "image": ""
            },
            {
              "id": 1402,
              "title": "Ростовская область",
              "image": ""
            },
            {
              "id": 1412,
              "title": "Рязанская область",
              "image": ""
            },
            {
              "id": 1422,
              "title": "Самарская область",
              "image": ""
            },
            {
              "id": 1462,
              "title": "Санкт-Петербург",
              "image": ""
            },
            {
              "id": 1472,
              "title": "Саратовская область",
              "image": ""
            },
            {
              "id": 1442,
              "title": "Сахалинская область",
              "image": ""
            },
            {
              "id": 1492,
              "title": "Свердловская область",
              "image": ""
            },
            {
              "id": 1682,
              "title": "Севастополь",
              "image": ""
            },
            {
              "id": 1452,
              "title": "Смоленская область",
              "image": ""
            },
            {
              "id": 1482,
              "title": "Ставропольский край",
              "image": ""
            },
            {
              "id": 1502,
              "title": "Тамбовская область",
              "image": ""
            },
            {
              "id": 1552,
              "title": "Тверская область",
              "image": ""
            },
            {
              "id": 1512,
              "title": "Томская область",
              "image": ""
            },
            {
              "id": 1522,
              "title": "Тульская область",
              "image": ""
            },
            {
              "id": 1562,
              "title": "Тюменская область",
              "image": ""
            },
            {
              "id": 1572,
              "title": "Удмуртская республика",
              "image": ""
            },
            {
              "id": 1582,
              "title": "Ульяновская область",
              "image": ""
            },
            {
              "id": 1072,
              "title": "Хабаровский край",
              "image": ""
            },
            {
              "id": 1112,
              "title": "Ханты-Мансийский автономный округ",
              "image": ""
            },
            {
              "id": 1721,
              "title": "Херсонская область",
              "image": ""
            },
            {
              "id": 942,
              "title": "Челябинская область",
              "image": ""
            },
            {
              "id": 932,
              "title": "Чеченская республика",
              "image": ""
            },
            {
              "id": 962,
              "title": "Чувашская Республика",
              "image": ""
            },
            {
              "id": 952,
              "title": "Чукотский автономный округ",
              "image": ""
            },
            {
              "id": 1612,
              "title": "Ямало-Ненецкий автономный округ",
              "image": ""
            },
            {
              "id": 1642,
              "title": "Ярославская область",
              "image": ""
            }
          ],
          "required": true
        }
      ],
      "button": "Ок"
    },
    {
      "type": "notice",
      "title": "Приятно познакомиться, {name}!",
      "description": "<b>Готовы начать тестирование?</b><p>Тогда поехали!</p>",
      "button": "Начать"
    },
    {
      "type": "question",
      "title": "В каких случаях семье необходим финансовый план?",
      "required": true,
      "options": [
        {
          "title": "Чтобы понять, как распределить доходы и подсчитать расходы",
          "value": 0,
          "selectedText": "<b>Нет!</b> Финансовый план – это не только учет доходов и расходов, но и постановка финансовых целей, умение создавать сбережения и работать с инвестициями",
          "score": 0
        },
        {
          "title": "Чтобы легче было ставить финансовые цели и копить на крупные покупки",
          "value": 0,
          "selectedText": "<b>Неточно!</b> Чтобы поставить финансовую цель, надо точно подсчитать доходы и расходы",
          "score": 0
        },
        {
          "title": "Во всех случаях",
          "value": 1,
          "selectedText": "<b>Именно!</b> Финансовый план нужен для того, чтобы за те же деньги можно было позволить себе больше. Для этого надо подсчитывать доходы и расходы, ставить финансовые цели и планировать траты на месяц, полгода, год, иметь сбережения и уметь инвестировать",
          "score": 1
        }
      ]
    },
    {
      "type": "question",
      "title": "У семейного бюджета есть несколько обязательных статей. Какая статья не относится к обязательным?",
      "required": true,
      "options": [
        {
          "title": "Доходы и расходы",
          "value": 0,
          "selectedText": "<b>Что вы!</b> Доходы и расходы – это главные составляющие любого бюджета, в том числе и семейного",
          "score": 0
        },
        {
          "title": "Сбережения: суммы, отложенные на непредвиденные расходы и на будущее",
          "value": 0,
          "selectedText": "<b>Неверно!</b> Сбережения – третья важная статья семейного бюджета после доходов и расходов",
          "score": 0
        },
        {
          "title": "Траты на обучение",
          "value": 1,
          "selectedText": "<b>Правильно!</b> Траты на обучение – часть расходной статьи, а не отдельная составляющая в бюджете",
          "score": 1
        }
      ]
    },
    {
      "type": "question",
      "title": "Как известное правило 60/30/10 используется при планировании семейного бюджета?",
      "required": true,
      "options": [
        {
          "title": "60% дохода откладываем на нужды, 30% – на желания, 10% – на сбережения",
          "value": 1,
          "selectedText": "<b>Идеальный вариант</b> планирования семейного бюджета!",
          "score": 1
        },
        {
          "title": "60% откладываем на желания, 30% – на сбережения, 10% – на нужды",
          "value": 0,
          "selectedText": "<b>Неверно!</b> Такое ощущение, что вы живете впроголодь, но развлекаетесь на полную катушку",
          "score": 0
        },
        {
          "title": "60% откладываем на сбережения, 30% – на нужды, 10% – на желания",
          "value": 0,
          "selectedText": "<b>Неверно!</b> Вы Плюшкин?",
          "score": 0
        }
      ]
    },
    {
      "type": "question",
      "title": "В текущем месяце семье предстоят следующие траты: оплатить секции и репетитора для ребенка, купить подарки на день рождения друзьям, оплатить квартплату, телефон и купить проездной. Какие из этих трат относятся к необходимым?",
      "required": true,
      "options": [
        {
          "title": "Квартплата, телефон, проездной",
          "value": 1,
          "selectedText": "<b>Молодец!</b> Все расходы семейного бюджета делятся на две категории. Первая – Обязательные. Это нужды, которые удовлетворяют базовые потребности ежедневной жизни. Вторая категория – необязательные. Это расходы, связанные в основном с желаниями, и от них можно отказаться",
          "score": 1
        },
        {
          "title": "Квартплата, подарки друзьям, репетитор",
          "value": 0,
          "selectedText": "<b>Неверно!</b> Срочно на курсы по финансовой грамотности! Подарки друзьям для вас важнее связи и транспорта? Вашим друзьям очень повезло",
          "score": 0
        },
        {
          "title": "Телефон, секции, проездной",
          "value": 0,
          "selectedText": "<b>Неверно!</b> Если вы не заплатите за квартиру, то вам отключат, свет, воду и газ (если он есть). А вот без платных секций прожить можно. Расставляйте приоритеты для семьи",
          "score": 0
        }
      ]
    },
    {
      "type": "question",
      "title": "Какое соотношение между доходами и расходами считается идеальным для стабильного семейного бюджета?",
      "required": true,
      "options": [
        {
          "title": "Когда доходы равны расходам",
          "value": 0,
          "selectedText": "<b>Неточно!</b> Несмотря на то, что вам удается прожить в соответствии со своими доходами, это сценарий на грани бедности",
          "score": 0
        },
        {
          "title": "Когда доходы превышают расходы",
          "value": 1,
          "selectedText": "<b>Именно!</b> Это критерий стабильного, устойчивого бюджета и сценарий богатства",
          "score": 1
        },
        {
          "title": "Когда расходы превышают доходы, но ничего, вы уже привыкли «одалживать до зарплаты»",
          "value": 0,
          "selectedText": "<b>Неправильно!</b> Это сценарий банкротства",
          "score": 0
        }
      ]
    },
    {
      "type": "question",
      "title": "Вам надо накопить на образование ребенка крупную сумму. Но вы не укладываетесь в сроки – вам не хватает всего четверти суммы. Каково ваше решение?",
      "required": true,
      "options": [
        {
          "title": "Взять потребительский кредит на недостающую сумму или попросить в долг у друзей – сумма небольшая, всей семьей расплатимся быстро",
          "value": 0,
          "selectedText": "<b>Не лучшее решение.</b> За кредитные деньги придется заплатить проценты",
          "score": 0
        },
        {
          "title": "Посмотреть, на чем еще можно сэкономить, чтобы откладывать больше",
          "value": 1,
          "selectedText": "<b>Правильно!</b> Для этого необходимо составить финансовый план, который покажет, на чем теряет деньги ваша семья",
          "score": 1
        },
        {
          "title": "Выбрать для ребенка учебное заведение подешевле",
          "value": 0,
          "selectedText": "<b>Лучше не надо.</b> Вы рискуете лишить ребенка учебы мечты только потому, что вовремя не оптимизировали расходы",
          "score": 0
        }
      ]
    },
    {
      "type": "question",
      "title": "Какие инструменты можно использовать для ведения семейного бюджета?",
      "required": true,
      "options": [
        {
          "title": "Хватит бумаги и ручки",
          "value": 1,
          "selectedText": "<b>Лучший вариант.</b> Для того чтобы расписать личный финансовый план, этого достаточно",
          "score": 1
        },
        {
          "title": "Проще использовать собственную голову – в уме легко быстро произвести все расчеты",
          "value": 0,
          "selectedText": "<b>Неверное решение.</b> Финансовый план должен быть всегда перед глазами, иначе вы про него быстро забудете",
          "score": 0
        },
        {
          "title": "Банковское приложение – там отображаются все траты по категориям",
          "value": 0,
          "selectedText": "<b>Неверно!</b> В банковском приложении видны только те операции, которые привязаны к банку. В нем вы не получите целостного представления о своих финансах",
          "score": 0
        }
      ]
    },
    {
      "type": "question",
      "title": "Как минимизировать последствия финансовых форс-мажоров в семье?",
      "required": true,
      "options": [
        {
          "title": "Быстро найти еще один источник дохода",
          "value": 0,
          "selectedText": "<b>Неверно!</b> В числе форс-мажоров может оказаться и временная нетрудоспособность. Да и новый источник дохода может быстро не найтись",
          "score": 0
        },
        {
          "title": "Заранее накопить резервный фонд",
          "value": 1,
          "selectedText": "<b>Правильно!</b> В каждой семье должен быть свой стабилизационный фонд, который поможет покрыть неожиданные расходы",
          "score": 1
        },
        {
          "title": "Отказаться от всех крупных трат и перейти в режим строгой экономии",
          "value": 0,
          "selectedText": "<b>Неверно!</b> Это лишь часть мер, которых может оказаться недостаточно без резервного фонда на черный день",
          "score": 0
        }
      ]
    },
    {
      "type": "question",
      "title": "Какие показатели говорят о том, что вы управляете семейным бюджетом эффективно?",
      "required": true,
      "options": [
        {
          "title": "Вы смогли отказаться от развлечений и от мелких повседневных трат вроде «кофе с собой»",
          "value": 0,
          "selectedText": "<b>Неверно.</b> Важно помнить, что экономия – не значит ограничения. Иначе вы долго не продержитесь",
          "score": 0
        },
        {
          "title": "Достижение финансовых целей при отсутствии долгов",
          "value": 1,
          "selectedText": "<b>Правильно.</b> Это главный показатель правильного ведения семейного бюджета",
          "score": 1
        },
        {
          "title": "Вы понимаете, по каким статьям у вас перерасход",
          "value": 0,
          "selectedText": "<b>Неточно.</b> Понимание – это не показатель. А вот, например, увеличение сбережений за счет сокращения статей «перерасхода» – уже показатель",
          "score": 0
        }
      ]
    },
    {
      "type": "question",
      "title": "Вы решили начать вести финансовый план семьи. Кого из членов семьи вы привлечете к этому процессу?",
      "required": true,
      "options": [
        {
          "title": "Никого",
          "value": 0,
          "selectedText": "<b>Неправильно.</b> Написать финансовый план на будущий месяц, а затем заставлять родных втиснуться в его рамки – прямой путь к ссорам",
          "score": 0
        },
        {
          "title": "Только жену\\мужа – а зачем еще кого-то?",
          "value": 0,
          "selectedText": "<b>Не совсем так.</b> Если с вами живут дети или другие родственники, то семья должна быть в курсе целей каждого и заинтересована в их достижении",
          "score": 0
        },
        {
          "title": "Всех и даже кота",
          "value": 1,
          "selectedText": "<b>Все верно!</b> Так потребности каждого в семье могут быть учтены. И у кота есть расходы",
          "score": 1
        }
      ]
    }
  ],
  "result": [
    {
      from: 0,
      to: 5,
      text: 'Срочно на курсы по финансовой грамотности! Вы способны разорить свою семью при любом доходе. Пока бежите записываться, почитайте наши материалы здесь.'
    },
    {
      from: 6,
      to: 8,
      text: 'Вы неплохо справляетесь с планированием семейного бюджета, но, скорее всего, ваш сценарий – на грани бедности. Вам удается избегать долгов, но вы часто ощущаете нехватку денег. Курсы по составлению финансового плана семьи вам не помешают. А пока почитайте наш материал.'
    },
    {
      from: 9,
      to: 10,
      text: 'Ого! Да вы – министр финансов своей семьи. Вы или уже ведете семейный бюджет, или изучали этот процесс и готовы его начать. Не останавливайтесь!'
    }
  ]
}

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

let progress = ref('start');
let currentStep = ref(0);
let progressValue = ref(0);
let stepError = ref(false);
let answers = ref({});
let score = ref(0);
let pdf = ref();

function checkAttempts() {
  return parseInt(localStorage.getItem('position')) > 3 && localStorage.getItem('position') !== null
}

function progressCalc() {
  progressValue.value = (currentStep.value * (100 / settings.steps.length)).toFixed();
}

function getTitle(ttl) {
  return ttl.replace(/{name}/g, answers.value['name']);
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
    if (!answers.value[step.title]) {
      countError++;
    }
  }

  if (step.type === 'form' && step.required) {
    step.fields.forEach(field => {
      if (field.type === 'input' || field.type === 'select') {
        if (!answers.value[field.name]) {
          countError++;
        }
        if (field.mask && checkMask(field)) {
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

function optionClick(q, a, v) {
  if (!answers.value[q]) {
    answers.value[q] = a;
    score.value += parseInt(v);
  }
}

function postData() {
  let position;
  if (localStorage.getItem('position') === null) {
    position = 1;
  } else {
    position = parseInt(localStorage.getItem('position'));
    position = position + 1;
  }
  localStorage.setItem('position', position);

  let uuid = '';
  if (localStorage.getItem('_ym_uid') !== null) {
    uuid = localStorage.getItem('_ym_uid');
  }

  const postObj = {
    answers: answers.value,
    position: position,
    uuid: uuid,
    ref: localStorage.getItem('ref')
  };

  fetch(settings.post, {
    method: 'POST',
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    body: JSON.stringify(postObj)
  });
}

function next() {
  currentStep.value++;
  progressCalc();

  if (currentStep.value === settings.steps.length) {
    progress.value = 'final';
    //postData();
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
}

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
