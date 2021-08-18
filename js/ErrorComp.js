Vue.component('error', {
  template: `
  <div class="error" v-if="$root.errorFlag">
    <span class="error-text">Ошибка ответа сервера!</span>
    <button class="error-btn" @click="$root.errorFlag=!$root.errorFlag">Понятно</button>
  </div>
  `
})