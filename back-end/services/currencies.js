export class CurrencyServises {

    static calculate (currencyData,baseCode, baseAmount) {
      // const baseCurrency = currencyData['USD']
      console.log({baseCode});
      console.log({currencyData});
      let baseCurrency;
      if (baseCode) {
        baseCurrency = currencyData[baseCode]
      } else {
        baseCurrency = currencyData['USD'];

      }
        if (!baseCurrency) return;
        console.log({baseCurrency});
    
        const updatedValues = {};
        Object.keys(currencyData).forEach((currencyCode) => {
          updatedValues[currencyCode] =
            (baseAmount / baseCurrency) * currencyData[currencyCode];
        });
        
        return updatedValues
    }
}

