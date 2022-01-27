<template>
  <div class="bit-coin">
    <b-overlay class="min-vh-100" :show="isLoading" spinner-variant="success">
      <b-card class="col-md-10 mx-auto mt-3">
        <b-card-header header-bg-variant="dark" header-text-variant="light">
          <b-card-title class="my-auto">Bitcoin Price</b-card-title>
        </b-card-header>
        <b-card-body>
          <b-table-simple hover responsive>
            <b-thead head-variant="dark">
              <b-th>Currency</b-th>
              <b-th>Rate</b-th>
            </b-thead>
            <b-tbody>
              <b-tr v-for="(val, key) in bpi" :key="key">
                <b-td>{{ val.code }}</b-td>
                <b-td class="text-right" :variant="changeColor(val.rate_float)">
                  {{ val.rate_float | formatRate }}
                </b-td>
              </b-tr>
            </b-tbody>
            <b-tfoot>
              <b-tr>
                <b-th colspan="2" class="text-right" variant="secondary">
                  Total : {{ getSum | formatRate}}
                </b-th>
              </b-tr>
            </b-tfoot>
          </b-table-simple>
        </b-card-body>
      </b-card>
    </b-overlay>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios, { AxiosDefaults } from "axios";

interface Bpi {
  USD: Currency;
  GBP: Currency;
  EUR: Currency;
}

type Currency = {
  code: string;
  symbol: string;
  rate: string;
  description: string;
  rate_float: number;
};

export default Vue.extend({
  name: "BitCoin",
  data: () => {
    return {
      bpi: {} as Bpi,
      isLoading: true,
      isShowModal: false,
    };
  },
  async mounted(): Promise<void> {
    try {
      // WEB APIからビットコインレートを取得する
      const res: AxiosDefaults = await axios.get("https://api.coindesk.com/v1/bpi/currentprice.json");

      // overlayの動きを見るために遅い回線をシミュレートする(下の処理で3秒間止まる)
      const _sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
      await _sleep(3000);

      const bpi: Bpi = res.data.bpi;
      this.bpi = bpi;
    } catch (err) {
      console.log("Error...");
    } finally {
      // ローディングを終了する
      this.isLoading = false;
    }
  },
  computed: {
    getSum(): number {
      // APIからデータ取得前に計算がされないようにオブジェクトの空判定をする
      if (!Object.keys(this.bpi).length) return 0;
      // レート合計を算出する
      const rates = Object.values(this.bpi).map((currency) => currency.rate_float);
      return rates.reduce((prev, cur) => prev + cur);
    },
  },
  methods: {
    /**
     * セルの色制御を行う
     * @param rete ビットコインレート
     */
    changeColor: (rate: number): string => {
      // 60000以上は緑色に
      if (rate >= 60000) {
        return "success";
      // 50000未満は黄色に
      } else if (rate < 50000) {
        return "warning";
      // それ以外は無色
      } else {
        return "";
      }
    },
  },
  filters: {
    formatRate: (rate: number): string => {
      return rate.toFixed(2);
    },
  },
});
</script>

<style scoped>
.bit-coin {
  text-align: center;
}
</style>
