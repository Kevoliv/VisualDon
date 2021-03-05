import {
  select,
  scaleLinear,
  max,
} from 'd3'

import DATA from './data.js';
console.log(DATA);



const WIDTH = 1000
const HEIGHT = 500
const MARGIN = 5
const MARGIN_BOTTOM = 90
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
  .attr('x', (d, i) => i * BAR_WIDTH)
  .attr('width', BAR_WIDTH - MARGIN)
  .attr('y', d => yScale(d.GWh))
  .attr('height', d => HEIGHT - MARGIN_BOTTOM - yScale(d.GWh))
  .attr('fill', 'steelblue')


svg.selectAll('text')
  .data(DATA)
  .enter()
  .append('text')
  .text(d => d.Commune)
  .attr('x', (d, i) => i * BAR_WIDTH + BAR_WIDTH / 2)
  .attr('y', HEIGHT - MARGIN_BOTTOM / 2)
  .attr("font-size", "10px")
  .attr('transform', (d, i) => `rotate(-90,${ i * BAR_WIDTH + BAR_WIDTH },${470})`)

  const axisY = axisLeft().scale(yScale)
  .tickFormat(d => `${d / 1000}k`)
  .ticks(5)

svg.append('svg')
  .attr('transform', `translate(${MARGIN_LEFT - 3})`)
  .call(axisY)