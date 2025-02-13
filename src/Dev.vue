<template>
  <Main
    :firstname="'Иван'"
    :lastname="'Петров'"
    :email="'ivan@gmail.com'"
    :settings="settings2"
  />

  <!--
  <div class="quiz-container">

		<div class="quiz-content">
			<div class="quiz-progress-container">
				<div class="quiz-progress">
					<div class="value" style="width: 10%;"></div>
				</div>
			</div>
			<div class="quiz-inner-container">
				<div class="parts">

					 <div class="title">
						Семья и деньги: проверьте, как вы управляете семейным бюджетом
					</div>
					<div class="description">
						Финансовый план семьи – это когда вы точно знаете, на что тратите деньги. Вы не экономите копейки до
						зарплаты, в вашей семье нет ссор из-за денег, потому что дохода хватает на всех. Умение управлять бюджетом –
						это не врождённая способность,

						а навыки, которые может развить каждый. <br><br>Пройдите наш тест и проверьте, насколько эти навыки развиты
						у вас. В тесте 10 вопросов. За каждый правильный ответ вы получите по одному баллу. Максимально можно
						набрать 10 баллов. У вас будет три попытки. Лучший результат мы отправим в зачет рейтинга вашего региона.
						Желаем удачи!

						Финансовый план семьи – это когда вы точно знаете, на что тратите деньги. Вы не экономите копейки до
						зарплаты, в вашей семье нет ссор из-за денег, потому что дохода хватает на всех. Умение управлять бюджетом –
						это не врождённая способность, а навыки, которые может развить каждый. <br><br>Пройдите наш тест и
						проверьте, насколько эти навыки развиты у вас. В тесте 10 вопросов. За каждый правильный ответ вы получите
						по одному баллу. Максимально можно набрать 10 баллов. У вас будет три попытки. Лучший результат мы отправим
						в зачет рейтинга вашего региона. Желаем удачи!
					</div>
					<div class="title">Александр, благодарим за прохождение теста!</div>
					<div class="description" id="result-text">Ваш результат: 10/10 баллов<br><br>Ого! Да вы – министр финансов
						своей семьи. Вы или уже ведете семейный бюджет или изучали этот процесс и готовы его начать. Не
						останавливайтесь! <br><br>Вы получили право на сертификат участника Всероссийской просветительской
						эстафеты «Мои финансы», этап «Семейный бюджет».
					</div>

					<div class="result-grid" id="result-pdf">
						<div class="result-grid-left md:col-span-6 xl:col-span-5">
							<div class="form text-left">
								<form action="">
									<div class="mb-3" style="display:none;">
										<label class="block mb-1">
											Имя
										</label>
										<input id="quiz-pdf-name" name="pdfName" type="text" value="" class="form-control w-full">
									</div>
									<div class="mb-3" style="display:none;">
										<label class="block mb-1">
											Фамилия
										</label>
										<input id="quiz-pdf-last-name" name="pdfLastName" type="text" value=""
											class="form-control w-full">
									</div>

									<p class="description mt-4 mb-3">Как вы хотите получить результат?</p>
									<div class="block-button-wrap">
										<a id="quiz-pdf-print-now" target="_self" class="btn relative w-full btn  btn-primary">
											<span class="text">
												Распечатать сейчас (pdf)
											</span>
										</a>
									</div>
									<div class="form-group mt-3">
										<label class="">
											Отправить мне на электронную почту
										</label>
										<div class="flex mt-1">
											<input id="quiz-pdf-email" name="pdfEmail" type="email" value=""
												class="form-control flex-grow -mr-2">
											<div class="block-button-wrap">
												<a id="quiz-pdf-send" target="_self" class="btn relative btn  btn-primary">
													<span contenteditable="false" class="text">
														Отправить
													</span> </a>
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
												<div id="pdf-wrap" class="pdf-wrap ">
													<div class="fullName">
														Александр
													</div>
													<div class="lastName">
														Крастылев
													</div>
													<div class="image-wrap">
														<img src="https://xn--80apaohbc3aw9e.xn--p1ai/images/certificate-relay-1242x1754.jpg">
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

				<div class="quiz-inner-bottom">
					<div class="button-container">
						<a href="javascript://" class="q-btn next">Начать тест</a>
						<div class="info">Нажмите <b>Enter ↵</b></div>
					</div>
					<div class="timing"><span data-qa="icon" aria-hidden="true" class="icon"><svg width="12" height="12"
								viewBox="0 0 12 12" fill="none" data-qa="animated-clock" class="ClockSVG-sc-__sc-1j3qdaw-0 iFObvB">
								<circle cx="6" cy="6" fill="#012941" r="6"></circle>
								<line x1="6" y1="6" x2="6" y2="3" stroke="#FEFDFA" stroke-width="1.2" stroke-linecap="round"></line>
								<line x1="6" y1="6" x2="6" y2="3" stroke="#FEFDFA" stroke-width="1.2" stroke-linecap="round"
									id="clock-hour-hand"></line>
							</svg></span>Занимает 7 минут(-ы)</div>
				</div>
			</div>


		</div>
	</div>

  -->
</template>

<script setup>
import { defineProps } from 'vue';
import Main from "@/components/Main.vue";
defineProps({
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
});

const settings2 = JSON.stringify({
  type: 0,
  steps: [
  {
    "title": "Форма",
    "blocks": [
      {
        "id": "1c369ebd-9a4a-4c84-a9e6-d13b2999ab1a",
        "type": "info",
        "title": "Опрос: что россияне знают об исламском банкинге?",
        "description": "<p>Опрос поможет выявить, какие финансовые продукты и услуги больше всего интересуют людей, какие ожидания у них есть от новых финансовых моделей. Полученные данные станут основой для дальнейшего развития и внедрения партнерского финансирования в стране, способствуя созданию более прозрачной и доступной финансовой среды.</p>"
      },
      {
        "id": "97b3bdd3-8d0a-4329-a5f2-150090d5463f",
        "name": null,
        "type": "formRadio",
        "label": "1.      Слышали ли вы о продуктах исламского банкинга (партнерского финансирования)?",
        "example": null,
        "options": [
          {
            "id": "d049725c-7da4-4006-86ad-e002ca4f2057",
            "label": "Да"
          },
          {
            "id": "aaf995ec-1792-4d4d-aa5b-87f1b547adfc",
            "label": "Нет"
          },
          {
            "id": "341b0a36-f40d-46d4-ac77-c5c80f248dc6",
            "label": "Затрудняюсь ответить"
          }
        ],
        "required": true,
        "placeholder": null
      },
      {
        "id": "926882ec-8a97-448d-bb24-b300d1f72d4f",
        "name": null,
        "type": "formRadio",
        "label": "2.      Знаете ли вы о принципах исламского банкинга (партнерского финансирования)?",
        "example": null,
        "options": [
          {
            "id": "3ac71972-d06f-4304-a7a1-d7f671b2dede",
            "label": "Да"
          },
          {
            "id": "b61c1e71-c8b6-475c-93b2-fd6447a4a1eb",
            "label": "Нет"
          }
        ],
        "required": true,
        "conditions": {
          "list": [
            {
              "id": "fda79dc3-93b8-46e8-a1fd-878b25665bb1",
              "field": null,
              "value": null,
              "operator": "equal",
              "toPreviousFieldOperator": "and"
            }
          ],
          "enabled": true
        },
        "placeholder": null
      },
      {
        "id": "d8eccf94-204b-4bd6-a438-6e8da77f17f6",
        "name": null,
        "type": "formRadio",
        "label": "3.      Предлагали ли вам в банке продукты исламского банкинга (партнерского финансирования)?",
        "example": null,
        "options": [
          {
            "id": "84d3d356-667d-4c72-bf60-37ca682a5964",
            "label": "Да"
          },
          {
            "id": "2f72c286-1f24-45ab-83cb-e8272c39ab5a",
            "label": "Нет"
          },
          {
            "id": "4f6a8d6d-ee45-40f5-a9eb-d4cbd502ed08",
            "label": "Уже пользуюсь услугами партнерского финансирования"
          }
        ],
        "required": true,
        "placeholder": null
      },
      {
        "id": "453a29c7-af7e-492d-9078-bb206b308eb4",
        "name": null,
        "type": "formRadio",
        "label": "4.      В чем, по вашему мнению, суть исламского банкинга (партнерского финансирования)?",
        "example": null,
        "options": [
          {
            "id": "2ec74caf-2ea7-438a-ba1a-4fe9f03a7afe",
            "label": "Это финансы только для мусульман"
          },
          {
            "id": "4a444bd5-397e-413a-98c5-a7e3d5b281a3",
            "label": "Это финансы, основанные на принципах партнерства и этичности"
          },
          {
            "id": "cb43b671-209a-4aec-8898-5d1c7b4bb52b",
            "label": "Это благотворительность"
          },
          {
            "id": "bb5dedd7-7b2d-4198-94e0-4c87d6838b06",
            "label": "Выстраивание связей с восточными странами"
          }
        ],
        "required": true,
        "placeholder": null
      },
      {
        "id": "0cba31c0-3863-44b0-851e-9feacb7ac66e",
        "name": null,
        "type": "formCheckbox",
        "label": "5.      О каких  аспектах партнерского финансирования вы хотели бы знать больше?",
        "value": null,
        "options": [
          {
            "id": "b59b411c-c0ea-43ad-84e0-9e4546bb9720",
            "label": "Условия сотрудничества"
          },
          {
            "id": "47264963-d104-469f-9dbe-c730399b579c",
            "label": "Принципы разделения рисков и прибылей"
          },
          {
            "id": "296ac39a-5db4-484b-9eb1-23480816d9fa",
            "label": "Процесс получения финансирования"
          }
        ],
        "required": true
      },
      {
        "id": "dee2e7fd-f95b-4ebd-abd2-de020efe3ac6",
				"other": true,
        "name": null,
        "type": "formCheckbox",
        "label": "6.  \tО каких продуктах партнерского финансирования вы бы хотели узнать подробнее?",
        "value": null,
        "options": [
          {
            "id": "e9c035e5-e323-4670-8f9d-0402e0465bda",
            "label": "Дебетовая карта"
          },
          {
            "id": "234624c6-1394-40c3-a6a9-7928e79d29f2",
            "label": "Расчетно-кассовое обслуживание (РКО)"
          },
          {
            "id": "88b0e18b-2d51-4c38-b1c8-158c711bc5c9",
            "label": "Автокредит"
          },
          {
            "id": "45cbcd0f-f1bc-40e6-a6b4-7fa71b5e595f",
            "label": "Ипотека"
          },
          {
            "id": "64ef4e61-9563-4ad1-9d74-3346a5ee44ca",
            "label": "Инвестиции"
          },
          {
            "id": "b9b30724-a834-47dd-b2a6-07b2d6670ceb",
            "label": "Цифровые финансовые активы ЦФА"
          }
        ],
        "required": true
      },
      // {
      //   "id": "640e9376-ece6-4cd7-93d6-7776e591256b",
      //   "name": null,
      //   "type": "formInput",
      //   "label": "Свой вариант ответа ________",
      //   "example": null,
      //   "required": true,
      //   "placeholder": null,
      //   "prefillValue": null
      // },
      {
        "id": "3c23dd27-2c75-4c91-adb6-0ba265a87f2b",
        "name": null,
        "type": "formRadio",
        "label": "7.   \tКак вы считаете, будут ли кредитные и инвестиционные продукты партнерского финансирования интересны и конкурентоспособны во всех регионах России?",
        "example": null,
        "options": [
          {
            "id": "7c130a0d-a737-4e4f-80f2-bfe9bf2e921f",
            "label": "Да"
          },
          {
            "id": "b3da1d48-faa3-4476-9c69-1e8e0b17ebd1",
            "label": "Нет"
          },
          {
            "id": "ffcf9572-2fca-4ea0-9c26-95679624534f",
            "label": "Затрудняюсь ответить"
          }
        ],
        "required": true,
        "conditions": {
          "list": [
            {
              "id": "d1129ee8-fc16-4331-8373-8a2ac33254c8",
              "field": "97b3bdd3-8d0a-4329-a5f2-150090d5463f",
              "value": "d049725c-7da4-4006-86ad-e002ca4f2057",
              "operator": "equal",
              "toPreviousFieldOperator": "and"
            },
            {
              "id": "3b354470-3f69-4a29-b620-0ce1c37d8960",
              "field": "97b3bdd3-8d0a-4329-a5f2-150090d5463f",
              "value": "341b0a36-f40d-46d4-ac77-c5c80f248dc6",
              "operator": "equal",
              "toPreviousFieldOperator": "and"
            }
          ],
          "enabled": true
        },
        "placeholder": null
      },
      {
        "id": "ec320257-d4e7-4093-81f4-0b1fcecc6ad9",
        "name": null,
        "type": "formRadio",
        "label": "8.      Какую роль вы видите за партнерским финансированием (исламским банкингом) в будущем финансовом рынке России?",
        "example": null,
        "options": [
          {
            "id": "2b2e03ba-63a4-4646-837c-90a38e8f6e53",
            "label": "Важную"
          },
          {
            "id": "82053cbe-f98f-468d-aece-efc5ea32e24a",
            "label": "Умеренную"
          },
          {
            "id": "cc9c86a6-fdf3-4a9b-86cb-2f52eaca0c1a",
            "label": "Незначительную"
          },
          {
            "id": "326ccccb-dd64-4fd0-b741-8878fb1cd97f",
            "label": "Затрудняюсь ответить"
          }
        ],
        "required": true,
        "conditions": {
          "list": [
            {
              "id": "1de4b54f-3da5-4655-a5fb-43d72c99baa2",
              "field": "97b3bdd3-8d0a-4329-a5f2-150090d5463f",
              "value": "d049725c-7da4-4006-86ad-e002ca4f2057",
              "operator": "equal",
              "toPreviousFieldOperator": "and"
            },
            {
              "id": "68c4b300-14f6-44e5-bdeb-8815470e7c67",
              "field": "97b3bdd3-8d0a-4329-a5f2-150090d5463f",
              "value": "341b0a36-f40d-46d4-ac77-c5c80f248dc6",
              "operator": "equal",
              "toPreviousFieldOperator": "and"
            }
          ],
          "enabled": true
        },
        "placeholder": null
      },
      {
        "id": "9948e274-8d2a-4632-b49d-bc2d67d10711",
        "name": null,
        "type": "formCheckbox",
        "label": "9.      Что могло бы повысить вашу заинтересованность в исламском банкинге?",
        "value": null,
        "options": [
          {
            "id": "847effd9-bb47-43ee-92a4-7026a8c260cc",
            "label": "Образовательные программы и семинары"
          },
          {
            "id": "358eb2e6-d096-4f31-be9f-4834f28a7666",
            "label": "Прямые консультации с экспертами"
          },
          {
            "id": "126ac77f-4655-4990-9944-979d40e9e547",
            "label": "Примеры успешных кейсов"
          },
          {
            "id": "410700ec-6c54-4839-b258-fe2fd39801e6",
            "label": "Реклама"
          },
          {
            "id": "3527ab95-499a-4a9e-a106-e30db5063757",
            "label": "Рекомендации родственников, друзей и коллег"
          }
        ],
        "required": true
      },
      {
        "id": "b8bc374d-8531-41db-8250-84637b368d3f",
        "name": null,
        "type": "formRadio",
        "label": "10.  Готовы ли вы перейти с классической финансовой модели к беспроцентной, как в исламском банкинге?",
        "example": null,
        "options": [
          {
            "id": "392941ee-c09e-4574-acb6-e0b177ed6546",
            "label": "Да, готов(а)"
          },
          {
            "id": "65d87f79-69b1-48c6-ad39-92a0e0b98e99",
            "label": "Возможно, нужно больше информации"
          },
          {
            "id": "3f3e380c-b564-4f92-a69c-f766b33ef56c",
            "label": "Затрудняюсь ответить"
          }
        ],
        "required": true,
        "conditions": {
          "list": [
            {
              "id": "13a43b64-ec4a-473e-bab0-5b2adb240519",
              "field": "97b3bdd3-8d0a-4329-a5f2-150090d5463f",
              "value": "d049725c-7da4-4006-86ad-e002ca4f2057",
              "operator": "equal",
              "toPreviousFieldOperator": "and"
            },
            {
              "id": "97032d20-791e-4248-8820-4cbc3163a11c",
              "field": "97b3bdd3-8d0a-4329-a5f2-150090d5463f",
              "value": "341b0a36-f40d-46d4-ac77-c5c80f248dc6",
              "operator": "equal",
              "toPreviousFieldOperator": "and"
            }
          ],
          "enabled": true
        },
        "placeholder": null
      },
      {
        "id": "6867b5db-8f8d-4c12-b2bc-f96cd06695eb",
				"other": true,
        "name": null,
        "type": "formCheckbox",
        "label": "11.  Какой фактор может повлиять на ваше решение о переходе на исламский банкинг?",
        "value": null,
        "options": [
          {
            "id": "ed2d1bb3-5b79-44d7-88da-082bcb1d28ad",
            "label": "Доступность услуг"
          },
          {
            "id": "cb4d5cbf-100a-47a2-b8f6-054004e96add",
            "label": "Доверие к банку / к финансовой организации"
          },
          {
            "id": "d40906ce-af7f-4b64-a8a2-bd859deccc70",
            "label": "Рекомендации от знакомых"
          },
          {
            "id": "0e07dc86-c65c-4527-a96f-051a8e3712f8",
            "label": "Условия обслуживания"
          },
          {
            "id": "1dbeb20c-d801-458e-a0e3-8676cf502c49",
            "label": "Не знаю/не интересует"
          }
        ],
        "required": true,
        "conditions": {
          "list": [
            {
              "id": "c319bda6-e31b-4cf6-9a66-fb500fa35527",
              "field": "97b3bdd3-8d0a-4329-a5f2-150090d5463f",
              "value": "d049725c-7da4-4006-86ad-e002ca4f2057",
              "operator": "equal",
              "toPreviousFieldOperator": "and"
            },
            {
              "id": "e3a787bb-b614-455d-b616-bd5e826c9de2",
              "field": "97b3bdd3-8d0a-4329-a5f2-150090d5463f",
              "value": "341b0a36-f40d-46d4-ac77-c5c80f248dc6",
              "operator": "equal",
              "toPreviousFieldOperator": "and"
            }
          ],
          "enabled": true
        }
      },
      // {
      //   "id": "06925dc9-6653-45dc-a57a-62e3708e1705",
      //   "name": null,
      //   "type": "formInput",
      //   "label": "Другие (укажите): ___________",
      //   "example": null,
      //   "required": true,
      //   "conditions": {
      //     "list": [
      //       {
      //         "id": "869680a1-b6aa-4595-a2d9-680f6ce87019",
      //         "field": "97b3bdd3-8d0a-4329-a5f2-150090d5463f",
      //         "value": "d049725c-7da4-4006-86ad-e002ca4f2057",
      //         "operator": "equal",
      //         "toPreviousFieldOperator": "and"
      //       },
      //       {
      //         "id": "3feaf2bf-8b37-49c6-8726-7c2a3f5ef164",
      //         "field": "97b3bdd3-8d0a-4329-a5f2-150090d5463f",
      //         "value": "341b0a36-f40d-46d4-ac77-c5c80f248dc6",
      //         "operator": "equal",
      //         "toPreviousFieldOperator": "and"
      //       }
      //     ],
      //     "enabled": true
      //   },
      //   "placeholder": null,
      //   "prefillValue": null
      // },
      {
        "id": "eb38446a-7ebd-40b8-8af7-d6f755324f26",
        "name": null,
        "type": "formCheckbox",
        "label": "12.   Какие из следующих услуг исламского банкинга вас бы заинтересовали?",
        "value": null,
        "options": [
          {
            "id": "3cbb49e1-9907-49f6-b412-eb97b6d89c26",
            "label": "Исламская дебетовая карта"
          },
          {
            "id": "b83de7b5-23df-402e-96c7-fd0b1b7c4104",
            "label": "Исламская ипотека"
          },
          {
            "id": "9ce26574-a589-4a81-b8c6-771406dfc90b",
            "label": "Инвестиции в проекты, соответствующие шариату"
          },
          {
            "id": "3cf6553e-2f88-4ab4-9973-8a456b236b07",
            "label": "Кредиты без процентов"
          },
          {
            "id": "6ebbcda3-069c-4ce6-88c6-16959a4b115e",
            "label": "Не знаю/не интересует"
          }
        ],
        "conditions": {
          "list": [
            {
              "id": "3a36517a-2694-4537-95fe-2a733478701b",
              "field": "97b3bdd3-8d0a-4329-a5f2-150090d5463f",
              "value": "d049725c-7da4-4006-86ad-e002ca4f2057",
              "operator": "equal",
              "toPreviousFieldOperator": "and"
            },
            {
              "id": "83c4e90b-3666-42fb-8098-ec957c955c80",
              "field": "97b3bdd3-8d0a-4329-a5f2-150090d5463f",
              "value": "341b0a36-f40d-46d4-ac77-c5c80f248dc6",
              "operator": "equal",
              "toPreviousFieldOperator": "and"
            }
          ],
          "enabled": true
        }
      },
      {
        "id": "4e17eb72-f571-4376-be14-4eea39682450",
        "name": null,
        "type": "formInput",
        "label": "Другие (укажите): ___________",
        "example": null,
        "required": true,
        "conditions": {
          "list": [
            {
              "id": "a02ffaf7-242a-4a9b-b205-cc7a1d59f9b8",
              "field": "97b3bdd3-8d0a-4329-a5f2-150090d5463f",
              "value": "d049725c-7da4-4006-86ad-e002ca4f2057",
              "operator": "equal",
              "toPreviousFieldOperator": "and"
            },
            {
              "id": "3fe8afd3-abc8-45fc-bcf2-092b350b8d2f",
              "field": "97b3bdd3-8d0a-4329-a5f2-150090d5463f",
              "value": "341b0a36-f40d-46d4-ac77-c5c80f248dc6",
              "operator": "equal",
              "toPreviousFieldOperator": "and"
            }
          ],
          "enabled": true
        },
        "placeholder": null,
        "prefillValue": null
      },
      {
        "id": "a084d5a9-e354-4aab-ac9c-5ed6eaaf896c",
        "name": null,
        "type": "formCheckbox",
        "label": "13.  Для каких целей вам могли бы понадобиться исламские финансовые услуги?",
        "value": null,
        "options": [
          {
            "id": "b3cf6871-f727-4aaa-9890-8399fa661188",
            "label": "Приобретение жилья"
          },
          {
            "id": "14893f3d-b7b7-4187-9964-24a57ca7be87",
            "label": "Открытие депозитного счета"
          },
          {
            "id": "d18cb6f3-35c7-43b0-bbd8-b2b601b480f9",
            "label": "Получение кредита (инвестиции) на бизнес"
          },
          {
            "id": "baf8966c-7016-4c62-be7c-624d021b0f17",
            "label": "Инвестиции в благотворительность"
          },
          {
            "id": "1d1e6f23-86e1-4ea2-b04c-53dfc3d32522",
            "label": "Не знаю/не интересует"
          }
        ],
        "required": true,
        "conditions": {
          "list": [
            {
              "id": "b52952ea-7917-40f6-b8a8-d89814820ac9",
              "field": "97b3bdd3-8d0a-4329-a5f2-150090d5463f",
              "value": "d049725c-7da4-4006-86ad-e002ca4f2057",
              "operator": "equal",
              "toPreviousFieldOperator": "and"
            },
            {
              "id": "76366744-5fbb-4e37-ba97-f8fffd1f2ebf",
              "field": "97b3bdd3-8d0a-4329-a5f2-150090d5463f",
              "value": "341b0a36-f40d-46d4-ac77-c5c80f248dc6",
              "operator": "equal",
              "toPreviousFieldOperator": "and"
            }
          ],
          "enabled": true
        }
      },
      {
        "id": "fd5ad5b5-0759-4e83-982d-ff22d5562847",
        "name": null,
        "type": "formInput",
        "label": "Другие (укажите): ___________",
        "example": null,
        "required": true,
        "conditions": {
          "list": [
            {
              "id": "67ff84c4-1115-4660-9b8d-c87082d3e384",
              "field": "97b3bdd3-8d0a-4329-a5f2-150090d5463f",
              "value": "d049725c-7da4-4006-86ad-e002ca4f2057",
              "operator": "equal",
              "toPreviousFieldOperator": "and"
            },
            {
              "id": "f49a5b96-78cf-4c2e-8731-76df4dbfc371",
              "field": "97b3bdd3-8d0a-4329-a5f2-150090d5463f",
              "value": "341b0a36-f40d-46d4-ac77-c5c80f248dc6",
              "operator": "equal",
              "toPreviousFieldOperator": "and"
            }
          ],
          "enabled": true
        },
        "placeholder": null,
        "prefillValue": null
      },
      {
        "id": "406f3367-22fe-4817-bd5c-85e81a5851f4",
        "name": null,
        "type": "formSelect",
        "label": "14.  Ваш Регион",
        "options": [
          {
            "id": "a8cb5348-61a8-4abf-a882-30462d74f466",
            "label": "Москва"
          },
          {
            "id": "879b25e3-0a71-46c1-9192-b617e3e43478",
            "label": "Крым"
          }
        ]
      },
      {
        "id": "42572573-2135-4b63-8ced-c437b95db18e",
        "name": null,
        "type": "formInput",
        "label": "16.  Ваш возраст: (укажите числом):",
        "example": null,
        "required": true,
        "placeholder": null,
        "prefillValue": null
      }
    ]
  }
  ]
})
const settings = JSON.stringify( {
  id: null,
  type: 1,
  title: '',
  description: '',
  description_fail_attempts: "Попытки закончились. Повторите попытку позднее.",
  startScreenTitle: 'Семья и деньги: проверьте, как вы управляете семейным бюджетом',
  startScreenDescription: 'Финансовый план семьи – это когда вы точно знаете, на что тратите деньги. Вы не экономите копейки до зарплаты, в вашей семье нет ссор из-за денег, потому что дохода хватает на всех. Умение управлять бюджетом – это не врождённая способность, а навыки, которые может развить каждый. <br/><br/>Пройдите наш тест и проверьте, насколько эти навыки развиты у вас. В тесте 10 вопросов. За каждый правильный ответ вы получите по одному баллу. Максимально можно набрать 10 баллов. У вас будет три попытки. Лучший результат мы отправим в зачет рейтинга вашего региона. Желаем удачи!',
  startScreenImage: "https://xn--80apaohbc3aw9e.xn--p1ai/images/estafeta/main-quiz-image-01.png",
  showStartImage: true,
  timeString: "Занимает 7 минут",
  "certificate": "https://xn--80apaohbc3aw9e.xn--p1ai/images/certificate-relay-1242x1754.jpg",
  "post": "https://app-dev.xn--test.xn--p1ai/index_min.php?action=quiz",
  sendCertificateUrl: "https://app-dev.xn--test.xn--p1ai/api/send-fin-zosh-certificate",
  monththeme_id: 2,
  attempts: 3000,
  generationPDF: true,
  "ymCount": 84939769,
  steps: [
    {
      "required": true,
      "blocks": [
        {
          type: 'header',
          value: 'Ваше имя и электронная почта',
        },
        {
          type: 'paragraph',
          value: 'Мы обещаем не присылать вам ничего, кроме результатов тестов',
        },
        {
          "type": "formInput",
          "label": "Имя",
          "name": "name",
          "placeholder": "Александр",
          "example": "",
          "required": true,
          "prefillValue": "quizSettings.name"
        },
        {
          "type": "formInput",
          "label": "Фамилия",
          "name": "last_name",
          "placeholder": "Иванов",
          "example": "",
          "required": true,
          "prefillValue": "quizSettings.last_name"
        },
        {
          type: "input",
          label: "Эл. адрес",
          name: "email",
          placeholder: "somebody@example.com",
          example: "",
          required: true,
          mask: "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
          prefillValue: "quizSettings.email"
        }
      ],
      "button": "Ок",
      "callback": "custom_calculate_result"
    },
    // {
    //   "required": true,
    //   "multiple": true,
    //   blocks: [
    //     {
    //       title: "В каких случаях семье необходим финансовый план?",
    //       image: "https://app-dev.xn--80apaohbc3aw9e.xn--p1ai/storage/63927/treker-montaznaia-oblast-1-kopiia_resize_w600_h600.png",
    //       view: "images",
    //       type: 'question',
    //       required: true,
    //       multiple: true,
    //       options: [
    //         {
    //           "title": "Чтобы понять, как распределить доходы и подсчитать расходы",
    //           "value": 0,
    //           "image": "https://app-dev.xn--80apaohbc3aw9e.xn--p1ai/storage/64302/programma.png",
    //           "selectedText": "Текст ответа 1"
    //         },
    //         {
    //           "title": "Чтобы легче было ставить финансовые цели и копить на крупные покупки",
    //           "value": 0,
    //           "image": "https://app-dev.xn--80apaohbc3aw9e.xn--p1ai/storage/64302/programma.png",
    //           "selectedText": "Текст ответа 2"
    //         },
    //         {
    //           "title": "Во всех случаях",
    //           "value": 1,
    //           "image": "https://app-dev.xn--80apaohbc3aw9e.xn--p1ai/storage/64302/programma.png",
    //           "selectedText": "Текст ответа 3 верный"
    //         }
    //       ]
    //     },
    //     {
    //       title: "Второй вопрос на странице",
    //       image: "https://app-dev.xn--80apaohbc3aw9e.xn--p1ai/storage/63927/treker-montaznaia-oblast-1-kopiia_resize_w600_h600.png",
    //       view: "images",
    //       type: 'question',
    //       required: true,
    //       multiple: true,
    //       options: [
    //         {
    //           "title": "Чтобы понять, как распределить доходы и подсчитать расходы",
    //           "value": 0,
    //           "image": "https://app-dev.xn--80apaohbc3aw9e.xn--p1ai/storage/64302/programma.png",
    //           "selectedText": "Текст ответа 1"
    //         },
    //         {
    //           "title": "Чтобы легче было ставить финансовые цели и копить на крупные покупки",
    //           "value": 0,
    //           "image": "https://app-dev.xn--80apaohbc3aw9e.xn--p1ai/storage/64302/programma.png",
    //           "selectedText": "Текст ответа 2"
    //         },
    //         {
    //           "title": "Во всех случаях",
    //           "value": 1,
    //           "image": "https://app-dev.xn--80apaohbc3aw9e.xn--p1ai/storage/64302/programma.png",
    //           "selectedText": "Текст ответа 3 верный"
    //         }
    //       ]
    //     },
    //   ],
    // },
    // {
    //   "type": "question",
    //   "title": "У семейного бюджета есть несколько обязательных статей. Какая статья не относится к обязательным?",
    //   "required": true,
    //   "options": [
    //     {
    //       "title": "Доходы и расходы",
    //       "value": 0,
    //       "selectedText": "<b>Что вы!</b> Доходы и расходы – это главные составляющие любого бюджета, в том числе и <a href='/' target='_blank'>семейного</a>"
    //     },
    //     {
    //       "title": "Сбережения: суммы, отложенные на непредвиденные расходы и на будущее",
    //       "value": 0,
    //       "selectedText": "<b>Неверно!</b> Сбережения – третья важная статья семейного бюджета после доходов и расходов"
    //     },
    //     {
    //       "title": "Траты на обучение",
    //       "value": 1,
    //       "selectedText": "<b>Правильно!</b> Траты на обучение – часть расходной статьи, а не отдельная составляющая в бюджете"
    //     }
    //   ]
    // },
    // {
    //   "type": "form",
    //   "title": "Ваш возраст",
    //   "required": true,
    //   "blocks": [
    //     {
    //       "type": "formRange",
    //       "name": "age",
    //       "min": 16,
    //       "max": 70,
    //       "value": 20,
    //       "required": true
    //     },
    //     {
    //       "type": "formRange",
    //       "label": "тест",
    //       "name": "agetest",
    //       "min": 16,
    //       "max": 70,
    //       "value": 20,
    //       "required": true
    //     }
    //   ],
    //   "button": "Ок"
    // },
    // {
    //   "type": "form",
    //   "title": "Ваш пол",
    //   "required": true,
    //   "blocks": [
    //     {
    //       "type": "radio",
    //       "name": "gender",
    //       "label": "Мужской",
    //       "value": "male"
    //     },
    //     {
    //       "type": "radio",
    //       "name": "gender",
    //       "label": "Женский",
    //       "value": "female"
    //     }
    //   ],
    //   "button": "Ок"
    // },
    // {
    //   "type": "form",
    //   "title": "Ваши увлечения",
    //   "required": true,
    //   "blocks": [
    //     {
    //       "type": "checkbox",
    //       "name": "hobby",
    //       "label": "Музыка",
    //       "value": "music"
    //     },
    //     {
    //       "type": "checkbox",
    //       "name": "hobby",
    //       "label": "Спорт",
    //       "value": "sport"
    //     },
    //     {
    //       "type": "checkbox",
    //       "name": "hobby",
    //       "label": "Искусства",
    //       "value": "art"
    //     }
    //   ],
    //   "button": "Ок"
    // },
    // {
    //   "type": "form",
    //   "title": "Укажите ваш регион",
    //   "required": true,
    //   "blocks": [
    //     {
    //       "type": "formSelect",
    //       "label": "",
    //       "name": "region",
    //       "placeholder": "Напишите ответ здесь...",
    //       "example": "Москва, Россия",
    //       "options": [
    //         {
    //           "title": "Не выбрано",
    //           "image": ""
    //         },
    //         {
    //           "id": 982,
    //           "title": "Алтайский край",
    //           "image": ""
    //         },
    //         {
    //           "id": 862,
    //           "title": "Амурская область",
    //           "image": ""
    //         },
    //         {
    //           "id": 872,
    //           "title": "Архангельская область",
    //           "image": ""
    //         },
    //         {
    //           "id": 882,
    //           "title": "Астраханская область",
    //           "image": ""
    //         },
    //         {
    //           "id": 902,
    //           "title": "Белгородская область",
    //           "image": ""
    //         },
    //         {
    //           "id": 912,
    //           "title": "Брянская область",
    //           "image": ""
    //         },
    //         {
    //           "id": 1602,
    //           "title": "Владимирская область",
    //           "image": ""
    //         },
    //         {
    //           "id": 1592,
    //           "title": "Волгоградская область",
    //           "image": ""
    //         },
    //         {
    //           "id": 1622,
    //           "title": "Вологодская область",
    //           "image": ""
    //         },
    //         {
    //           "id": 1632,
    //           "title": "Воронежская область",
    //           "image": ""
    //         },
    //         {
    //           "id": 2,
    //           "title": "Все регионы",
    //           "image": ""
    //         },
    //         {
    //           "id": 1691,
    //           "title": "Донецкая Народная Республика",
    //           "image": ""
    //         },
    //         {
    //           "id": 1652,
    //           "title": "Еврейская автономная область",
    //           "image": ""
    //         },
    //         {
    //           "id": 1662,
    //           "title": "Забайкальский край",
    //           "image": ""
    //         },
    //         {
    //           "id": 1711,
    //           "title": "Запорожская область",
    //           "image": ""
    //         },
    //         {
    //           "id": 1012,
    //           "title": "Ивановская область",
    //           "image": ""
    //         },
    //         {
    //           "id": 1002,
    //           "title": "Иркутская область",
    //           "image": ""
    //         },
    //         {
    //           "id": 1022,
    //           "title": "Кабардино-Балкарская республика",
    //           "image": ""
    //         },
    //         {
    //           "id": 1122,
    //           "title": "Калининградская область",
    //           "image": ""
    //         },
    //         {
    //           "id": 1062,
    //           "title": "Калужская область",
    //           "image": ""
    //         },
    //         {
    //           "id": 1142,
    //           "title": "Камчатский край",
    //           "image": ""
    //         },
    //         {
    //           "id": 1032,
    //           "title": "Карачаево-Черкесская республика",
    //           "image": ""
    //         },
    //         {
    //           "id": 1052,
    //           "title": "Кемеровская область - Кузбасс",
    //           "image": ""
    //         },
    //         {
    //           "id": 1182,
    //           "title": "Кировская область",
    //           "image": ""
    //         },
    //         {
    //           "id": 1162,
    //           "title": "Костромская область",
    //           "image": ""
    //         },
    //         {
    //           "id": 1042,
    //           "title": "Краснодарский край",
    //           "image": ""
    //         },
    //         {
    //           "id": 1192,
    //           "title": "Красноярский край",
    //           "image": ""
    //         },
    //         {
    //           "id": 1172,
    //           "title": "Курганская область",
    //           "image": ""
    //         },
    //         {
    //           "id": 1152,
    //           "title": "Курская область",
    //           "image": ""
    //         },
    //         {
    //           "id": 1202,
    //           "title": "Ленинградская область",
    //           "image": ""
    //         },
    //         {
    //           "id": 1212,
    //           "title": "Липецкая область",
    //           "image": ""
    //         },
    //         {
    //           "id": 1701,
    //           "title": "Луганская Народная Республика",
    //           "image": ""
    //         },
    //         {
    //           "id": 1242,
    //           "title": "Магаданская область",
    //           "image": ""
    //         },
    //         {
    //           "id": 1,
    //           "title": "Москва",
    //           "image": ""
    //         },
    //         {
    //           "id": 1272,
    //           "title": "Московская область",
    //           "image": ""
    //         },
    //         {
    //           "id": 1252,
    //           "title": "Мурманская область",
    //           "image": ""
    //         },
    //         {
    //           "id": 1292,
    //           "title": "Ненецкий автономный округ",
    //           "image": ""
    //         },
    //         {
    //           "id": 1322,
    //           "title": "Нижегородская область",
    //           "image": ""
    //         },
    //         {
    //           "id": 1282,
    //           "title": "Новгородская область",
    //           "image": ""
    //         },
    //         {
    //           "id": 1312,
    //           "title": "Новосибирская область",
    //           "image": ""
    //         },
    //         {
    //           "id": 1352,
    //           "title": "Омская область",
    //           "image": ""
    //         },
    //         {
    //           "id": 1332,
    //           "title": "Оренбургская область",
    //           "image": ""
    //         },
    //         {
    //           "id": 1342,
    //           "title": "Орловская область",
    //           "image": ""
    //         },
    //         {
    //           "id": 1392,
    //           "title": "Пензенская область",
    //           "image": ""
    //         },
    //         {
    //           "id": 1362,
    //           "title": "Пермский край",
    //           "image": ""
    //         },
    //         {
    //           "id": 1372,
    //           "title": "Приморский край",
    //           "image": ""
    //         },
    //         {
    //           "id": 1382,
    //           "title": "Псковская область",
    //           "image": ""
    //         },
    //         {
    //           "id": 842,
    //           "title": "Республика Адыгея",
    //           "image": ""
    //         },
    //         {
    //           "id": 852,
    //           "title": "Республика Алтай",
    //           "image": ""
    //         },
    //         {
    //           "id": 892,
    //           "title": "Республика Башкортостан",
    //           "image": ""
    //         },
    //         {
    //           "id": 922,
    //           "title": "Республика Бурятия",
    //           "image": ""
    //         },
    //         {
    //           "id": 972,
    //           "title": "Республика Дагестан",
    //           "image": ""
    //         },
    //         {
    //           "id": 992,
    //           "title": "Республика Ингушетия",
    //           "image": ""
    //         },
    //         {
    //           "id": 1102,
    //           "title": "Республика Калмыкия",
    //           "image": ""
    //         },
    //         {
    //           "id": 1082,
    //           "title": "Республика Карелия",
    //           "image": ""
    //         },
    //         {
    //           "id": 1132,
    //           "title": "Республика Коми",
    //           "image": ""
    //         },
    //         {
    //           "id": 1672,
    //           "title": "Республика Крым",
    //           "image": ""
    //         },
    //         {
    //           "id": 1232,
    //           "title": "Республика Марий Эл",
    //           "image": ""
    //         },
    //         {
    //           "id": 1262,
    //           "title": "Республика Мордовия",
    //           "image": ""
    //         },
    //         {
    //           "id": 1432,
    //           "title": "Республика Саха (Якутия)",
    //           "image": ""
    //         },
    //         {
    //           "id": 1302,
    //           "title": "Республика Северная Осетия — Алания",
    //           "image": ""
    //         },
    //         {
    //           "id": 1532,
    //           "title": "Республика Татарстан",
    //           "image": ""
    //         },
    //         {
    //           "id": 1542,
    //           "title": "Республика Тыва",
    //           "image": ""
    //         },
    //         {
    //           "id": 1092,
    //           "title": "Республика Хакасия",
    //           "image": ""
    //         },
    //         {
    //           "id": 1402,
    //           "title": "Ростовская область",
    //           "image": ""
    //         },
    //         {
    //           "id": 1412,
    //           "title": "Рязанская область",
    //           "image": ""
    //         },
    //         {
    //           "id": 1422,
    //           "title": "Самарская область",
    //           "image": ""
    //         },
    //         {
    //           "id": 1462,
    //           "title": "Санкт-Петербург",
    //           "image": ""
    //         },
    //         {
    //           "id": 1472,
    //           "title": "Саратовская область",
    //           "image": ""
    //         },
    //         {
    //           "id": 1442,
    //           "title": "Сахалинская область",
    //           "image": ""
    //         },
    //         {
    //           "id": 1492,
    //           "title": "Свердловская область",
    //           "image": ""
    //         },
    //         {
    //           "id": 1682,
    //           "title": "Севастополь",
    //           "image": ""
    //         },
    //         {
    //           "id": 1452,
    //           "title": "Смоленская область",
    //           "image": ""
    //         },
    //         {
    //           "id": 1482,
    //           "title": "Ставропольский край",
    //           "image": ""
    //         },
    //         {
    //           "id": 1502,
    //           "title": "Тамбовская область",
    //           "image": ""
    //         },
    //         {
    //           "id": 1552,
    //           "title": "Тверская область",
    //           "image": ""
    //         },
    //         {
    //           "id": 1512,
    //           "title": "Томская область",
    //           "image": ""
    //         },
    //         {
    //           "id": 1522,
    //           "title": "Тульская область",
    //           "image": ""
    //         },
    //         {
    //           "id": 1562,
    //           "title": "Тюменская область",
    //           "image": ""
    //         },
    //         {
    //           "id": 1572,
    //           "title": "Удмуртская республика",
    //           "image": ""
    //         },
    //         {
    //           "id": 1582,
    //           "title": "Ульяновская область",
    //           "image": ""
    //         },
    //         {
    //           "id": 1072,
    //           "title": "Хабаровский край",
    //           "image": ""
    //         },
    //         {
    //           "id": 1112,
    //           "title": "Ханты-Мансийский автономный округ",
    //           "image": ""
    //         },
    //         {
    //           "id": 1721,
    //           "title": "Херсонская область",
    //           "image": ""
    //         },
    //         {
    //           "id": 942,
    //           "title": "Челябинская область",
    //           "image": ""
    //         },
    //         {
    //           "id": 932,
    //           "title": "Чеченская республика",
    //           "image": ""
    //         },
    //         {
    //           "id": 962,
    //           "title": "Чувашская Республика",
    //           "image": ""
    //         },
    //         {
    //           "id": 952,
    //           "title": "Чукотский автономный округ",
    //           "image": ""
    //         },
    //         {
    //           "id": 1612,
    //           "title": "Ямало-Ненецкий автономный округ",
    //           "image": ""
    //         },
    //         {
    //           "id": 1642,
    //           "title": "Ярославская область",
    //           "image": ""
    //         }
    //       ],
    //       "required": true
    //     }
    //   ],
    //   "button": "Ок"
    // },
    // {
    //   "button": "Начать",
    //   blocks: [
    //     {
    //       type: "notice",
    //       title: "Приятно познакомиться, {name}!",
    //       description: "<b>Готовы начать тестирование?</b><p>Тогда поехали!</p>",
    //     }
    //   ]
    // },
    // {
    //   "type": "question",
    //   "title": "В каких случаях семье необходим финансовый план?",
    //   "image": "https://app-dev.xn--80apaohbc3aw9e.xn--p1ai/storage/63927/treker-montaznaia-oblast-1-kopiia_resize_w600_h600.png",
    //   "required": true,
    //   "multiple": true,
    //   "view": "images",
    //   "options": [
    //     {
    //       "title": "Чтобы понять, как распределить доходы и подсчитать расходы",
    //       "value": 0,
    //       "image": "https://app-dev.xn--80apaohbc3aw9e.xn--p1ai/storage/64302/programma.png",
    //       "selectedText": "Текст ответа 1"
    //     },
    //     {
    //       "title": "Чтобы легче было ставить финансовые цели и копить на крупные покупки",
    //       "value": 0,
    //       "image": "https://app-dev.xn--80apaohbc3aw9e.xn--p1ai/storage/64302/programma.png",
    //       "selectedText": "Текст ответа 2"
    //     },
    //     {
    //       "title": "Во всех случаях",
    //       "value": 1,
    //       "image": "https://app-dev.xn--80apaohbc3aw9e.xn--p1ai/storage/64302/programma.png",
    //       "selectedText": "Текст ответа 3 верный"
    //     }
    //   ]
    // },
    // {
    //   "type": "question",
    //   "title": "У семейного бюджета есть несколько обязательных статей. Какая статья не относится к обязательным?",
    //   "required": true,
    //   "options": [
    //     {
    //       "title": "Доходы и расходы",
    //       "value": 0,
    //       "selectedText": "<b>Что вы!</b> Доходы и расходы – это главные составляющие любого бюджета, в том числе и <a href='/' target='_blank'>семейного</a>"
    //     },
    //     {
    //       "title": "Сбережения: суммы, отложенные на непредвиденные расходы и на будущее",
    //       "value": 0,
    //       "selectedText": "<b>Неверно!</b> Сбережения – третья важная статья семейного бюджета после доходов и расходов"
    //     },
    //     {
    //       "title": "Траты на обучение",
    //       "value": 1,
    //       "selectedText": "<b>Правильно!</b> Траты на обучение – часть расходной статьи, а не отдельная составляющая в бюджете"
    //     }
    //   ]
    // },
    // {
    //   "type": "question",
    //   "title": "Как известное правило 60/30/10 используется при планировании семейного бюджета?",
    //   "required": true,
    //   "options": [
    //     {
    //       "title": "60% дохода откладываем на нужды, 30% – на желания, 10% – на сбережения",
    //       "value": 1,
    //       "selectedText": "<b>Идеальный вариант</b> планирования семейного бюджета!",
    //       "score": 1
    //     },
    //     {
    //       "title": "60% откладываем на желания, 30% – на сбережения, 10% – на нужды",
    //       "value": 0,
    //       "selectedText": "<b>Неверно!</b> Такое ощущение, что вы живете впроголодь, но развлекаетесь на полную катушку"
    //     },
    //     {
    //       "title": "60% откладываем на сбережения, 30% – на нужды, 10% – на желания",
    //       "value": 0,
    //       "selectedText": "<b>Неверно!</b> Вы Плюшкин?"
    //     }
    //   ]
    // },
  ],
  "ratingLink": "/rating/",
  "ratingText": "Посмотреть рейтинг региона",
  "resultPDF": 1,
  "hideDescriptionOnResult": false,
  "hideShareOnResult": false,
  "hideRatingLinkOnResult": false,
  "result": [
    {
      from: 0,
      to: 1,
      text: 'Срочно на курсы по финансовой грамотности! Вы способны разорить свою семью при любом доходе. Пока бежите записываться, почитайте наши материалы здесь.'
    },

    {
      from: 2,
      to: 3,
      text: 'Ого! Да вы – <a href="/" target="_blank">министр финансов</a> своей семьи. Вы или уже ведете семейный бюджет, или изучали этот процесс и готовы его начать. Не останавливайтесь!'
    }
  ]
}
);

</script>
