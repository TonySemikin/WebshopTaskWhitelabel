export class Utils {
  static round(amount: number, decimals: number): number {
    return Math.round(amount * Math.pow(10, decimals)) / Math.pow(10, decimals);
  }

  static async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
