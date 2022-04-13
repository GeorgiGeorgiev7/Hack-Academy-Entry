import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import BaseCard from './components/BaseCard.vue';
import BaseLoader from './components/BaseLoader.vue';
import BasePagination from './components/BasePagination.vue';

const app = createApp(App);

app.use(router);
app.component('base-card', BaseCard);
app.component('base-loader', BaseLoader);
app.component('base-pagination', BasePagination);
app.mount('#app');
