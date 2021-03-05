const data = require('./data.json')

 
const VilleEtGW = d => d.Canton === 'Neuchâtel'

const resultat = data
  .filter(VilleEtGW)
  .map(d => ({ Commune: d.MunicipalityName, GWh: d.Scenario3_RoofsFacades_PotentialSolarElectricity_GWh }))
  .sort((a, b) => a.GWh > b.GWh ? -1 : 1)

console.log(resultat)
console.log(JSON.stringify(result))