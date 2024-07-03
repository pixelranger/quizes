<template>
  <Main
    :firstname="'Иван'"
    :lastname="'Петров'"
    :email="'ivan@gmail.com'"
    :settings="settings"
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

const settings = JSON.stringify({
  "id": 123,
  "title": "Семья и деньги: проверьте, как вы управляете семейным бюджетом",
  "description": "Финансовый план семьи – это когда вы точно знаете, на что тратите деньги. Вы не экономите копейки до зарплаты, в вашей семье нет ссор из-за денег, потому что дохода хватает на всех. Умение управлять бюджетом – это не врождённая способность, а навыки, которые может развить каждый. <br/><br/>Пройдите наш тест и проверьте, насколько эти навыки развиты у вас. В тесте 10 вопросов. За каждый правильный ответ вы получите по одному баллу. Максимально можно набрать 10 баллов. У вас будет три попытки. Лучший результат мы отправим в зачет рейтинга вашего региона. Желаем удачи!",
  "startImage": "https://xn--80apaohbc3aw9e.xn--p1ai/images/estafeta/main-quiz-image-01.png",
  "showStartImage": false,
  "timing": "Занимает 7 минут",
  "certificate": "https://xn--80apaohbc3aw9e.xn--p1ai/images/certificate-relay-1242x1754.jpg",
  "post": "https://app-dev.xn--80apaohbc3aw9e.xn--p1ai/index_min.php?action=quiz",
  "sendCertificateUrl": "https://app-dev.xn--80apaohbc3aw9e.xn--p1ai/api/send-fin-zosh-certificate",
  "monththeme_id": 2,
  "attempts": 3,
  "generationPDF": true,
  "ymCount": 84939769,
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
      "title": "Ваш возраст",
      "required": true,
      "fields": [
        {
          "type": "range",
          "name": "age",
          "min": 16,
          "max": 70,
          "value": 20,
          "required": true
        }
      ],
      "button": "Ок"
    },
    {
      "type": "form",
      "title": "Ваш пол",
      "required": true,
      "fields": [
        {
          "type": "radio",
          "name": "gender",
          "label": "Мужской",
          "value": "male"
        },
        {
          "type": "radio",
          "name": "gender",
          "label": "Женский",
          "value": "female"
        }
      ],
      "button": "Ок"
    },
    {
      "type": "form",
      "title": "Ваши увлечения",
      "required": true,
      "fields": [
        {
          "type": "checkbox",
          "name": "hobby",
          "label": "Музыка",
          "value": "music"
        },
        {
          "type": "checkbox",
          "name": "hobby",
          "label": "Спорт",
          "value": "sport"
        },
        {
          "type": "checkbox",
          "name": "hobby",
          "label": "Искусства",
          "value": "art"
        }
      ],
      "button": "Ок"
    },
    {
      "type": "form",
      "title": "Укажите ваш регион",
      "required": true,
      "fields": [
        {
          "type": "select",
          "label": "",
          "name": "region",
          "placeholder": "Напишите ответ здесь...",
          "example": "Москва, Россия",
          "options": [
            {
              "title": "Не выбрано",
              "image": ""
            },
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
      "image": "",
      "required": true,
      "multiple": true,
      "options": [
        {
          "title": "Чтобы понять, как распределить доходы и подсчитать расходы",
          "value": 0,
          "image": ""
        },
        {
          "title": "Чтобы легче было ставить финансовые цели и копить на крупные покупки",
          "value": 0,
          "image": ""
        },
        {
          "title": "Во всех случаях",
          "value": 1,
          "image": ""
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
          "selectedText": "<b>Что вы!</b> Доходы и расходы – это главные составляющие любого бюджета, в том числе и семейного"
        },
        {
          "title": "Сбережения: суммы, отложенные на непредвиденные расходы и на будущее",
          "value": 0,
          "selectedText": "<b>Неверно!</b> Сбережения – третья важная статья семейного бюджета после доходов и расходов"
        },
        {
          "title": "Траты на обучение",
          "value": 1,
          "selectedText": "<b>Правильно!</b> Траты на обучение – часть расходной статьи, а не отдельная составляющая в бюджете"
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
          "selectedText": "<b>Неверно!</b> Такое ощущение, что вы живете впроголодь, но развлекаетесь на полную катушку"
        },
        {
          "title": "60% откладываем на сбережения, 30% – на нужды, 10% – на желания",
          "value": 0,
          "selectedText": "<b>Неверно!</b> Вы Плюшкин?"
        }
      ]
    },
  ],
  "resultPDF": 2,
  "result": [
    {
      from: 0,
      to: 1,
      text: 'Срочно на курсы по финансовой грамотности! Вы способны разорить свою семью при любом доходе. Пока бежите записываться, почитайте наши материалы здесь.'
    },
    
    {
      from: 2,
      to: 3,
      text: 'Ого! Да вы – министр финансов своей семьи. Вы или уже ведете семейный бюджет, или изучали этот процесс и готовы его начать. Не останавливайтесь!'
    }
  ]
});

</script>
