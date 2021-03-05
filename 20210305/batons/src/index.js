

import {
    select,
    scaleLinear,
    max,
  } from 'd3'
  
  const DATA = [
    { Commune: 'La Chaux-de-Fonds', GWh: 226.46 },
  { Commune: 'Neuch├ótel', GWh: 204.92 },
  { Commune: 'Val-de-Ruz', GWh: 168.73 },
  { Commune: 'Val-de-Travers', GWh: 135.33 },
  { Commune: 'Le Locle', GWh: 85.09 },
  { Commune: 'La Grande-B├®roche', GWh: 75.55 },
  { Commune: 'Milvignes', GWh: 58.69 },
  { Commune: 'La T├¿ne', GWh: 42.36 },
  { Commune: 'Boudry', GWh: 38.72 },
  { Commune: 'Cortaillod', GWh: 35.17 },
  { Commune: 'Le Landeron', GWh: 30.96 },
  { Commune: 'Cressier (NE)', GWh: 24.83 },
  { Commune: 'La Br├®vine', GWh: 21.89 },
  { Commune: 'Saint-Blaise', GWh: 21.68 },
  { Commune: 'Les Ponts-de-Martel', GWh: 20.75 },
  { Commune: 'Les Verri├¿res', GWh: 18.53 },
  { Commune: 'La Sagne', GWh: 17.58 },
  { Commune: 'Cornaux', GWh: 17.27 },
  { Commune: 'Ligni├¿res', GWh: 15.22 },
  { Commune: 'Rochefort', GWh: 15 },
  { Commune: 'Hauterive (NE)', GWh: 12.23 },
  { Commune: 'La Chaux-du-Milieu', GWh: 11.26 },
  { Commune: 'La C├┤te-aux-F├®es', GWh: 11.14 },
  { Commune: 'Brot-Plamboz', GWh: 9.31 },
  { Commune: 'Le Cerneux-P├®quignot', GWh: 8.89 },
  { Commune: 'Les Planchettes', GWh: 4.13 },
  { Commune: 'Enges', GWh: 3.76 },
  ]
  
  const WIDTH = 1000
  const HEIGHT = 500
  const MARGIN = 5
  const MARGIN_BOTTOM = 50
  const BAR_WIDTH = WIDTH / DATA.length
  
  const svg = select('body')
    .append('svg')
    .attr('viewBox', `0 0 ${WIDTH} ${HEIGHT}`)
  
  const yScale = scaleLinear()
    .domain([0, max(DATA, d => d.GWh)])
    .range([HEIGHT - MARGIN_BOTTOM, 0])
  
  svg.selectAll('rect')
    .data(DATA)
    .enter()
    .append('rect')
    .attr('x', (d, i) =>  i * BAR_WIDTH)
    .attr('width', BAR_WIDTH - MARGIN)
    .attr('y', d => yScale(d.GWh))
    .attr('height', d => HEIGHT - MARGIN_BOTTOM - yScale(d.GWh))
    .attr('fill', 'steelblue')

    svg.selectAll('text')
  .data(DATA)
  .enter()
  .append('text')
  .text(d => d.Commune)
  .attr('x', (d, i) =>  i * BAR_WIDTH + BAR_WIDTH / 2)
  .attr('y', HEIGHT - MARGIN_BOTTOM / 2)
  .attr('text-anchor', 'middle')