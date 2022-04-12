import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import BaseCard from './components/BaseCard.vue';

const app = createApp(App);

app.use(router);
app.component(BaseCard);
app.mount('#app');
