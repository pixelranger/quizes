<script setup>

import { useSettingsStore } from '@/stores/settings';
import { computed, onMounted, ref, watch } from 'vue';
import { useAnswersStore } from '@/stores/answers';
import { useProgressStore } from '@/stores/progress';
import { numWord } from '../../utils/numWord';
import html2pdf from 'html2pdf.js/dist/html2pdf.bundle';

const settingsStore = useSettingsStore();
const answersStore = useAnswersStore();
const progressStore = useProgressStore();
const score = computed(() => progressStore.currentScore);
const pdf = ref();
const email = ref();
const answers = computed(() => answersStore.answers);
const settings = computed(() => settingsStore.settings);
onMounted(() => {
  const emailField = settingsStore.getFirstFieldByType('formInputEmail');

  if (emailField) {
    email.value = answers.value[emailField.id];
  }
})

const firstName = computed(() => {
  const field = settingsStore.getFirstFieldByType('formInputFirstName')
  return field ? answers.value[field.id] : '';
})

const lastName = computed(() => {
  const field = settingsStore.getFirstFieldByType('formInputLastName')
  return field ? answers.value[field.id] : '';
})


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

async function sendPdf() {

  const pdf = await getPdfFile();
  const formData = new FormData();
  formData.append('method', 'sendMail');
  formData.append('certificate', new File([pdf], 'certificate'));
  formData.append('email', email.value);

  fetch(settings.value.sendCertificateUrl, {
    method: "POST",
    body: formData,
  }).then(response => {
    if (response.status == 200) {
      settings.value.generationPDF = false;
      alert('Ваш сертификат отправлен на почту');
    } else {
      alert('Произошла ошибка, попробуйте позже');
    }
  })
  .catch(error => {
    alert('Произошла ошибка, попробуйте позже.');
  });
}

async function getPdfFile() {
  let options = {
    margin: 0,

    filename: 'сертификат.pdf',

    image: {
      type: 'jpeg',
      quality: 0.98
    },

    enableLinks: false,

    html2canvas: {
      scale: 2,
      useCORS: true,
      scale: 1,
      y: 0,
      x: 0,
      scrollY: 0,
      scrollX: 0,
      windowWidth: 794,
      allowTaint: true,
      ignoreElements(e) {
        // Here, ignore external URL links and lazyload images
        if ((e.tagName === "A" && e.host !== window.location.host) || e.getAttribute('loading') === "lazy") {
          return true;
        } else {
          return false;
        }
      },
    },

    jsPDF: {
      unit: 'in',
      format: 'a4',
      orientation: 'portrait'
    }
  }

  const html2PdfSetup = html2pdf().set(options).from(pdf.value.innerHTML)
  let pdfBlobUrl = await html2PdfSetup.output('bloburl')

  if (pdfBlobUrl) {
    const res = await fetch(pdfBlobUrl)
    const blobFile = await res.blob()
    return blobFile;
  }
}

function share(serviceName) {
  let url = '';
  const pageUrl = window.location.href;
  const title = encodeURIComponent(settings.value.title);
  let text = encodeURIComponent(settings.value.description);
  const image = encodeURIComponent('');

  text = stripHtmlTags(text);

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

function stripHtmlTags(str) {
  return str.replace(/<\/?[^>]+(>|$)/g, "");
}
</script>

<template>
  <div v-if="settings.type === 0 || settings.disableLastScreen" class="final-message-block">
    <div class="final-message">Спасибо! Ваши данные учтены.</div>
  </div>
  <div v-if="settings.type === 1 && typeof settings.disableLastScreen !== 'undefined' && !settings.disableLastScreen" class="top_content">
    <div v-if="answers['name']" class="title">
      {{ answers['name'] }}, благодарим за прохождение теста.
    </div>
    <div v-else class="title">
      Благодарим за прохождение теста.
    </div>
    <div v-if="settings.hideDescriptionOnResult === false">
      <div class="score-message">Ваш результат: {{ progressStore.currentScore }}/{{ progressStore.maxScore }} {{ numWord(progressStore.currentScore, ['балл', 'балла', 'баллов']) }}</div>
      <template v-for="(el, elementIndex) in settings.result">
        <div
					v-if="(!settings.isDevMode && progressStore.currentScore >= el.from && progressStore.currentScore <= el.to) || (settings.devData && (settings.devData.resultTextCurrentIndex == elementIndex || ((!settings.devData.resultTextCurrentIndex || settings.devData.resultTextCurrentIndex == -1) && elementIndex === 0)))"
					class="score-description"
					v-html="el.text"
				></div>
      </template>
    </div>
    <a v-if="answersStore.getWrongAnswers(settings).length > 0" @click.prevent="progressStore.stage = 'wrongAnswers'" class="wrong-answers link">
      Режим просмотра неправильных ответов
    </a>
  </div>

  <div v-if="settings.type === 1 && typeof settings.disableLastScreen !== 'undefined' && !settings.disableLastScreen" class="result-grid" id="result-pdf">
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

            <div id="printPdf">
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
                      v-model="email"
                      id="quiz-pdf-email"
                      name="pdfEmail"
                      type="email"
                      class="form-control"
                  >
                  <button type="button" class="q-btn" @click="sendPdf()">
                    Отправить
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="pdf-additional-block form-group">
            <div class="rating_link"  v-if="settings.hideRatingLinkOnResult === false">
              <a class="link" :href="settings.ratingLink" target="_blank" id="rating">{{ settings.ratingText }}</a>
            </div>
            <div v-if="settings.hideShareOnResult === false">
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
                      {{ firstName }}
                    </div>
                    <div class="lastName">
                      {{ lastName }}
                    </div>
                  </div>
                  <div class="image-wrap">
                    <img :src="settings.certificate" width="792" height="1118" alt="" crossorigin="*">
                  </div>
                </div>
              </section>
            </section>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
