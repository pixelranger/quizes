<template>
  <!--Link to compiled style.css-->
<!--  <link rel="stylesheet" href="/quiz_widgets/variant-1/style.css">-->
<!--  <link rel="stylesheet" href="/admin_assets/quiz-editor/index.css">-->
  <link rel="stylesheet" href="https://app-prod.xn--80apaohbc3aw9e.xn--p1ai/assets/quiz/style.css?v=1739517386">
<!--  <link rel="stylesheet" href="https://mfbr.test/admin_assets/quiz/style.css?v=1739517382">-->

  <suspense>
    <Main
      :firstname="firstname"
      :lastname="lastname"
      :email="email"
      :settings="settings"
      :secret-id="secretId"
      :api-url="apiUrl"
    />
  </suspense>
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
    type: Object
  },
  secretId: {
    type: String
  },
  apiUrl: {
    type: String
  },
});
</script>
