export default class SonarQubeMetricHistoryApi {
  constructor(host) {
    this.host = host;
  }

  async getProjectMetricHistory(projectId, metricId, metricName) {
    const url = this.getProjectMetricHistoryRequestURL(projectId, metricId);
    const response = await fetch(url);
    const data = await response.json();
    return this.formatProjectMetricHistoryResponse(data, metricName);
  }

  getProjectMetricHistoryRequestURL(projectId, metricId) {
    const url = new URL('/api/measures/search_history', this.host);
    url.searchParams.append('component', projectId);
    url.searchParams.append('metrics', metricId);
    return url;
  }

  formatProjectMetricHistoryResponse(data, metricName) {
    const { history } = data.measures[0];
    return {
      name: metricName,
      versions: history.map(measure => measure.value),
      values: history.map(measure => measure.date),
    };
  }

  // TODO: filter relevant metrics for the project
  async getMetrics(projectId) {
    const url = new URL('/api/metrics/search', this.host);
    const response = await fetch(url);
    const data = await response.json();
    return formatProjectMetricHistoryResponse(data);
  }

  formatProjectMetricHistoryResponse(data) {
    return data.metrics
      .filter(metric => metric.domain === "Maintainability" && !metric.hidden)
      .map(metric => ({
        value: metric.key,
        label: metric.name,
      }));
  }

  // TODO: implement this
  async getProjectIds() {
    throw new Error('not yet implemented');
  }
}