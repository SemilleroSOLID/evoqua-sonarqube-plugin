import React from "react";
import Plot from 'react-plotly.js';

export default function MetricHistory(props) {
  const metrica = props.data;
  return (
    <Plot
      data={[{
        x: metrica.versiones,
        y: metrica.valores,
        fill: 'tozeroy', // area chart
      }]}
      layout={{
        autosize: true,
        title: `${metrica.nombre} por versión`,
        xaxis: {
          title: { text: 'Versión' },
          //type: 'category',
        },
        yaxis: { title: { text: metrica.nombre } },
      }}
      config={{
        displayModeBar: true,
        locale: 'es',
      }}
      useResizeHandler={true}
      style={{ width: "100%", height: "100%" }}
    />);
}
