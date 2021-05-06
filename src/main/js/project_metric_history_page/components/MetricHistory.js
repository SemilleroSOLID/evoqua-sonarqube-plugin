import React from "react";
import Plot from 'react-plotly.js';

export default function MetricHistory({ metricHistory }) {
  const { name, versions, values } = metricHistory;
  return (
    <Plot
      data={[{
        x: versions,
        y: values,
        fill: 'tozeroy', // area chart
      }]}
      layout={{
        autosize: true,
        title: `${name} por versión`,
        xaxis: {
          title: { text: 'Versión' },
          //type: 'category',
        },
        yaxis: { title: { text: name } },
      }}
      config={{
        displayModeBar: true,
        locale: 'es',
      }}
      useResizeHandler={true}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
