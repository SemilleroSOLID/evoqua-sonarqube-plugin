import React from "react";

import SonarQubeMetricHistoryApi from './api/SonarQubeMetricHistoryApi';
import MetricsHistoryViewer from './components/MetricsHistoryViewer';

// This creates a page for any component (project, portfolio, etc).
//
//  You can access it at
//  /project/extension/example/project_metric_history_page?id={COMPONENT_ID}
window.registerExtension('example/project_metric_history_page', options =>
  <MetricsHistoryViewer
    metricHistoryApi={new SonarQubeMetricHistoryApi(window.location.origin)}
    projectId={options.component.key}
  />
);
