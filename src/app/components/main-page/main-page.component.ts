import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent {
  darkMode = false;
  showResults = false;

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
    {
      label: 'Risk Amount',
      caption: 'You will lose this amount if the trade hits SL.',
      value: '--',
      color: 'text-red-400',
    },
    {
      label: 'Reward Amount',
      caption: 'You will get this amount if the trade hits TP.',
      value: '--',
      color: 'text-green-400',
    },
    {
      label: 'Risk-to-Reward Ratio',
      caption: 'Ratio of your reward to risk.',
      value: '--',
      color: 'text-yellow-400',
    },
    {
      label: 'Profit Percentage',
      caption: 'Expected profit %.',
      value: '--',
      color: 'text-blue-400',
    },
    {
      label: 'Position Size',
      caption: 'Amount to invest from total capital.',
      value: '--',
      color: 'text-purple-400',
    },
  ];

  toggleTheme() {
    this.darkMode = !this.darkMode;
    this.showResults = false;
  }
calculateResults() {
  const entryPrice = Number(this.inputFields[0].value) || 0;
  const stopLossPrice = Number(this.inputFields[1].value) || 0;
  const targetPrice = Number(this.inputFields[2].value) || 0;
  const totalCapital = Number(this.inputFields[3].value) || 0;
  const riskPercentage = Number(this.inputFields[4].value) || 0;

  // Validate that all fields have valid numeric values
  if (
    entryPrice > 0 &&
    stopLossPrice > 0 &&
    targetPrice > 0 &&
    totalCapital > 0 &&
    riskPercentage > 0
  ) {
    const riskAmount = (totalCapital * riskPercentage) / 100; // Total risk amount
    const positionSize = riskAmount / (entryPrice - stopLossPrice); // Position size in coins
    const positionValueUSD = positionSize * entryPrice; // Total position value in USD
    const rewardAmount = positionSize * (targetPrice - entryPrice); // Total reward amount
    const riskToRewardRatio = rewardAmount / riskAmount; // Risk-to-reward ratio
    const profitPercentage = ((targetPrice - entryPrice) / entryPrice) * 100; // Profit percentage

    // Update result fields with calculated values
    this.resultFields[0].value = `$${riskAmount.toFixed(2)}`;
    this.resultFields[1].value = `$${rewardAmount.toFixed(2)}`;
    this.resultFields[2].value = `${riskToRewardRatio.toFixed(2)}`;
    this.resultFields[3].value = `${profitPercentage.toFixed(2)}%`;
    this.resultFields[4].value = `${positionSize.toFixed(
      2
    )} coins (~$${positionValueUSD.toFixed(2)})`;

    // Clear invalid states on inputs if previously flagged
    this.inputFields.forEach((field, index) => {
      const inputElement = document.querySelectorAll("input")[index];
      if (inputElement) {
        inputElement.classList.remove("border-red-500");
      }
    });
  } else {
    // Handle invalid inputs
    this.resultFields.forEach((field) => (field.value = "--"));

    // Highlight empty or invalid inputs
    this.inputFields.forEach((field, index) => {
      const inputElement = document.querySelectorAll("input")[index];
      if (inputElement && !field.value) {
        inputElement.classList.add("border-red-500"); // Add red border for empty fields
      }
    });
  }
}

  scrollToResults() {
    if (window.innerWidth < 768) {
      document
        .getElementById('results-section')
        ?.scrollIntoView({ behavior: 'smooth' });
    }
  }
  isMobile(): boolean {
    return window.innerWidth < 768;
  }
}
