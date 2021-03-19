import React from "react";
import MetricHistory from "./MetricHistory";

export default class SonarQubeProjectMetricHistoryApp
  extends React.PureComponent
{
  constructor(props) {
    super(props);
    this.state = {
      webAPIBaseURL: props.webAPIBaseURL || window.location.origin,
      project: props.project,
      metric: 'sqale_index',
      loading: true,
    };
  }

  async componentDidMount() {
    this.setState({
      loading: false,
      metricHistory: await this.getProjectMetricHistory(),
    });
  }

  render() {
    return (this.state.loading)
      ? <div>Loading...</div>
      : <MetricHistory data={this.state.metricHistory} />;
  }
  
  async getProjectMetricHistory() {
    const url = this.getProjectMetricHistoryRequestURL();
    const response = await fetch(url);
    const data = await response.json();
    return this.formatProjectMetricHistoryResponse(data);
  }
  
  getProjectMetricHistoryRequestURL() {
    const endpoint = '/api/measures/search_history';
    const baseURL = this.state.webAPIBaseURL;
    const url = new URL(endpoint, baseURL);
    url.searchParams.append('component', this.state.project);
    url.searchParams.append('metrics', this.state.metric);
    return url;
  }
  
  formatProjectMetricHistoryResponse(data) {
    const history = data.measures[0].history;
    return {
      nombre: this.state.metric,
      valores: history.map(measure => measure.value),
      versiones: history.map(measure => measure.date),
    };
  }
}
