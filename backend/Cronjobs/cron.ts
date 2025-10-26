import cron from "node-cron";
import { CurrencyService } from "../services/currency.services";

export class CronJobs {
  /**
   * Every day a 0.00 the cron fetches updated currencies
   */
  cron_currencies() {
    cron.schedule("0 0 * * *", () => {
      CurrencyService.updateCurrencies();
    });
  }
}
