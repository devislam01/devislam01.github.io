//引入createApp用于创建应用（盆）
import { createApp } from "vue";

//引入App根组件 （根）
import App from "./App.vue";
import "./style.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import Toast, { TYPE } from "vue-toastification";
import "vue-toastification/dist/index.css";
import VueQuillEditor from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

//引入路由器
import router from "./router";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import VChart from "vue-echarts";
import { createPinia } from "pinia";
import piniaPersistedstate from "pinia-plugin-persistedstate";

use([
  CanvasRenderer,
  LineChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
]);

const pinia = createPinia();
pinia.use(piniaPersistedstate);

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

const toastOptions = {
  [TYPE.ERROR]: {
    timeout: 3000,
    icon: "error",
  },
  [TYPE.SUCCESS]: {
    timeout: 3000,
    icon: "success",
  },
  maxToasts: 5,
  pauseOnFocusLoss: false,
};

app.use(VueQuillEditor);
app.use(Toast, toastOptions);
app.use(pinia);
app.use(ElementPlus);
app.use(router);
// Register ECharts Component
app.component("v-chart", VChart);
app.mount("#app");
