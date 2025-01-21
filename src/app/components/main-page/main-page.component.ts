import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  darkMode = false;

  // Input fields with updated names and default values
  inputFields = [
    { label: 'Entry Price', value: null },
    { label: 'Stop Loss Price', value: null },
    { label: 'Target Price', value: null },
    { label: 'Total Capital ($)', value: null },
    { label: 'Risk Percentage (%)', value: 1 },
  ];

  // Result fields with default "--" values
  resultFields = [
    { label: 'Risk Amount', caption: 'You will lose this amount if the trade hits SL.', value: '--', color: 'text-red-400' },
    { label: 'Reward Amount', caption: 'You will get this amount if the trade hits TP.', value: '--', color: 'text-green-400' },
    { label: 'Risk-to-Reward Ratio', caption: 'Ratio of your reward to risk.', value: '--', color: 'text-yellow-400' },
    { label: 'Profit Percentage', caption: 'Expected profit %.', value: '--', color: 'text-blue-400' },
    { label: 'Position Size', caption: 'Amount to invest from total capital.', value: '--', color: 'text-purple-400' },
  ];

  toggleTheme() {
    this.darkMode = !this.darkMode;
  }

  calculateResults() {
    const entryPrice = Number(this.inputFields[0].value) || 0;
    const stopLossPrice = Number(this.inputFields[1].value) || 0;
    const targetPrice = Number(this.inputFields[2].value) || 0;
    const totalCapital = Number(this.inputFields[3].value) || 0;
    const riskPercentage = Number(this.inputFields[4].value) || 1;
  
    if (entryPrice && stopLossPrice && targetPrice && totalCapital && riskPercentage) {
      const riskAmount = totalCapital * riskPercentage / 100; // Keep as number
      const positionSize = riskAmount / (entryPrice - stopLossPrice); // Keep as number
      const positionValueUSD = positionSize * entryPrice; // Keep as number
      const rewardAmount = positionSize * (targetPrice - entryPrice); // Keep as number
      const riskToRewardRatio = rewardAmount / riskAmount; // Keep as number
      const profitPercentage = ((targetPrice - entryPrice) / entryPrice) * 100; // Keep as number
  
      // Update result fields with calculated values
      this.resultFields[0].value = `$${riskAmount.toFixed(2)}`;
      this.resultFields[1].value = `$${rewardAmount.toFixed(2)}`;
      this.resultFields[2].value = `${riskToRewardRatio.toFixed(2)}`;
      this.resultFields[3].value = `${profitPercentage.toFixed(2)}%`;
      this.resultFields[4].value = `${positionSize.toFixed(2)} coins (~$${positionValueUSD.toFixed(2)})`;
    } else {
      // Show "--" for invalid or incomplete inputs
      this.resultFields.forEach((field) => (field.value = '--'));
    }
  }
  
}
