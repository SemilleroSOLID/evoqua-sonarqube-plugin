import React from "react";
import AsyncSelect from 'react-select/async';

import MetricHistory from "./MetricHistory";

export default class MetricsHistoryViewer extends React.PureComponent {
  state = {}

  render() {
    const { metricHistoryApi, projectId } = this.props;
    return (
      <>
        <AsyncSelect
          cacheOptions
          defaultOptions
          loadOptions={() => metricHistoryApi.getMetrics(projectId)}
          placeholder="Métrica"
          onChange={({ value, label }) => this.handleNewMetric(value, label)}
        />
        {'metricHistory' in this.state &&
          <MetricHistory metricHistory={this.state.metricHistory} />}
      </>
    );
  }

  async handleNewMetric(metricId, metricName) {
    const { metricHistoryApi, projectId } = this.props;
    this.setState({
      metricHistory: await metricHistoryApi.getProjectMetricHistory(
        projectId, metricId, metricName),
    });
  }
}
