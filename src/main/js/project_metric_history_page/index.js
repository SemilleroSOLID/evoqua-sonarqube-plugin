import React from "react";
import SonarQubeProjectMetricHistoryApp
  from './components/SonarQubeProjectMetricHistoryApp';

// This creates a page for any component (project, portfolio, etc).
//
//  You can access it at
//  /project/extension/example/project_metric_history_page?id={COMPONENT_ID}
window.registerExtension('example/project_metric_history_page', options =>
  <SonarQubeProjectMetricHistoryApp project={options.component.key} />
);
