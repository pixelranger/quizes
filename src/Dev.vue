<template>
	<div class="quiz-container">

		<div class="quiz-content">
			<div class="quiz-progress-container">
				<div class="quiz-progress">
					<div class="value" style="width: 10%;"></div>
				</div>
			</div>
			<div class="quiz-inner-container">
				<div class="parts">

					<!-- <div class="title">
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
					</div> -->

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
</template>