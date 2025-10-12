import cron from "node-cron";
import { CurrencyService } from "../services/currency.services";

export class CronJobs {
  /**
   * Ogni giorno a mezzanotte tira il cron
   */
  cron_currencies() {
    cron.schedule("0 0 * * *", () => {
      CurrencyService.updateCurrencies();
    });
  }
}
