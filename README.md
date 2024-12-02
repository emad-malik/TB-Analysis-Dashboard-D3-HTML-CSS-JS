# TB-Analysis-Dashboard-D3-HTML-CSS-JS

## UMEMA ASHAR 22I2036 | EMAD MALIK 22I2072 | HAMZA ASAD 22I1908

## Dataset Overview
The project utilizes four datasets, which were preprocessed and merged into a unified dataset, preprocessed_data_tb. Below is an overview of the individual datasets and the variables they include:
### 2.1 LTBI Estimates Household Dataset: 
This dataset provides estimates of latent tuberculosis infection (LTBI) in households.
### 2.2 MDR-RR TB Burden Estimates: 
This dataset focuses on multi-drug resistant (MDR) and rifampicin-resistant (RR) TB.
### 2.3 TB Burden by Age and Sex: 
This dataset breaks down TB burden by age group and sex.
### 2.4 TB Burden by Country: 
This dataset provides overall TB burden estimates by country, focusing on incidence and mortality rates, including TB-HIV co-infection rates.
### 2.5 Merged Dataset
The four datasets were merged into the preprocessed_data_tb dataset, which now includes:

Data on incidence rates, mortality rates, case fatality ratios, and MDR-TB rates.
Breakdown by country, region, year, age group, and sex.
Specific estimates on TB-HIV co-infection and its impact on TB incidence and mortality.


## Dashboard Overview
To make the findings from the dataset accessible and actionable, a dashboard was created. The dashboard provides interactive visualizations that allow users to explore TB trends across countries, years, and demographic groups. The main features of the dashboard include:
### 3.1 Key Statistics
At the top of the dashboard, key statistics are displayed:

Total Incidence: The total number of TB cases worldwide.

Average Incidence Rate (per 100k): The average TB incidence rate.

Mortality Rate (per 100k): The average mortality rate from TB.

Case Fatality Ratio: The percentage of deaths among diagnosed TB cases.

These metrics are dynamically updated based on the data and provide a quick overview of the global TB situation.


## Visualizations
### 4.1 Force-Directed Graph for Relationship Mapping
Overview: The Force-Directed Graph visualization represents the relationships between countries based on tuberculosis (TB) incidence and mortality rates. This interactive graph helps users explore connections between countries that share regional similarities. It visualizes TB data using a force-directed layout, where countries are depicted as nodes, and the relationships between them are shown as links.

Nodes: Each country is a node, representing its data related to TB incidence and mortality rates.

Links: The links between nodes signify the relationship between countries within the same region.

Features:

Interactive Filters: Users can select specific years and regions from dropdown menus to filter the displayed data.

Tooltip: Hovering over any country shows detailed information about that country’s TB incidence, mortality rates, and population.

Zoom and Reset: The zoom controls allow users to zoom in, zoom out, and reset the graph view to its original state.

Download Option: Users can download the graph as an image.
### 4.2 Map Chart for Geographic Representation
Overview: This visualization uses a two-map approach to display and explore tuberculosis (TB) incidence data on a global scale. The small map provides an overview of the world, while the main map offers a detailed view of individual countries with information about TB incidence, mortality rates, and HIV-related mortality. The user can interact with the map by hovering over or clicking on a country in the small map to highlight the corresponding country on the main map and display detailed information.

Features:

Two Maps:

Small Map: A compact map that gives a global overview. This map allows users to interact with countries by hovering or clicking, with the ability to highlight the corresponding country on the main map.

Main Map: A detailed map where users can view each country's TB incidence rate and related information.

Interactivity:

Hover: Hovering over a country on the small map highlights the same country on the main map, providing a focused view of the data.

Click: Clicking on a country displays detailed information about TB incidence, mortality, and other health indicators in a side panel.

Dynamic Color Mapping: The countries on the map are color-coded based on their TB incidence rate (per 100,000 people), making it easier to identify regions with high or low TB incidence.

### 4.3 Timeline Visualization with Animation
This visualization displays the global trends in tuberculosis (TB) incidence and mortality over time. The chart includes an animated timeline that updates based on user interactions, allowing for dynamic exploration of the data. Users can filter the data by regions, select specific years, and see how the trends change over time.

Key Features:

Interactive Controls:

Region Filter: A dropdown menu allows users to filter the data by region, with options like "AMR", "EUR", "EMR", etc.

Year Slider: A slider lets users select the year they want to explore, ranging from 1990 to 2020.

Play/Pause Button: The animation can be paused or resumed by clicking this button, providing a more controlled experience.

Download Image Button: Users can download the current view of the chart as an image.

Animated Chart: The chart animates over time, updating the data points (countries) for each year. This allows users to track the changes in TB incidence and mortality dynamically.

Data points are represented as circles, where the size of the circle corresponds to the population of the country, and the position on the x and y axes corresponds to TB incidence and mortality rates, respectively.

Color Encoding: Different regions are color-coded, making it easier to compare trends across geographic areas.

### 4.4 Hierarchical Tree Map for Entity Categorization
Overview: This tree-based hierarchical visualization represents global tuberculosis (TB) incidence data categorized by regions and countries. The treemap displays each country as a rectangle, where:

Size: The size of each rectangle corresponds to the number of TB incidents in each country.

Color Intensity: The color of each rectangle represents the TB incidence rate per 100,000 people, with darker shades indicating higher rates.

Users can interact with the visualization by selecting regions and metrics to explore the data. The treemap also offers dynamic tooltips with detailed information and allows users to click on countries for further exploration.

Features:

Hierarchical Display: Shows TB incidence data by region and country with rectangle sizes representing the number of TB incidents and color intensity representing incidence rates per 100,000 people.

Interactive Filtering: Users can filter data by region and metric (e.g., incidence rate, mortality rate) using dropdown menus.

Hover Tooltips: Displays country, region, and metric value details when hovering over a rectangle.

Click Actions: Clicking on a country highlights it and triggers an alert with the country’s name.

Dynamic Updates: The treemap updates smoothly based on selected filters, with transitions for resizing and repositioning rectangles.

Color Scale: The color scale indicates the intensity of the metric, with darker shades representing higher values.

Responsive: Adapts to different screen sizes and modern browsers.
### 4.5 Sunburst Chart for Hierarchical Data
Overview: This Sunburst chart visualizes the TB incidence rates across various regions and countries, providing an interactive way to explore the data. It displays the data in a hierarchical, circular layout, where each ring represents a different level of categorization: regions, countries, and incidence values. The chart allows users to interact with the data, zooming into specific regions and countries for more detailed insights.

Features: 

Hierarchical Data: Displays TB incidence data in a circular format, with levels for regions, countries, and incidence rates.

Interactive Zoom: Click on segments to zoom into specific regions or countries for more detailed data.

Tooltip: Shows dynamic information (name and value) when hovering over segments.

Color Coding: Uses a color scale to distinguish different hierarchical levels (regions, countries, incidence).

Smooth Transitions: Animates zoom and data changes for a seamless user experience.

Customizable: Easily adjustable for visual style and data sources.

Features of the Visualization:

Tree-based Structure:

The hierarchical tree map uses a multi-level structure where the top level represents regions, and the next level shows the countries within those regions.

Each country is represented by a rectangle, with its size reflecting the number of TB incidences and its color intensity indicating the TB incidence rate per 100,000 people.

Interactivity:

Region and Metric Selection: Users can filter the data by selecting a specific region (e.g., Africa, Asia) from a dropdown menu or by choosing a metric (e.g., Incidence Rate, Mortality Rate) from another dropdown.

Hover Effects: When hovering over a rectangle, the tooltip shows detailed information about the country, including the country name, region, and the selected metric value.

Click to Highlight: Clicking on a rectangle highlights that specific country, and an alert pops up showing the country name.
Dynamic Rendering:

The treemap dynamically adjusts based on the selected region and metric, allowing users to explore different aspects of the data.

Rectangles are resized and recolored as per the selected filters, providing an intuitive view of how TB incidence varies across regions and countries.

## 5. Insights from the Dashboard
### 5.1 Force Directed Graph
Regional Clusters: Countries within the same region, such as Africa, tend to show similar TB incidence and mortality rates, forming dense clusters.

Outliers: Countries with notably higher or lower TB rates compared to their regional peers can be identified, indicating a need for further investigation by public health officials.

Population Influence: Larger populations are represented by bigger nodes, facilitating the analysis of how population size affects TB statistics.

Trends over Time: Users can explore changes in TB data over different years, helping to identify regions that are improving or deteriorating in TB control.

Mortality and Incidence Rate Comparison: Tooltips provide detailed mortality and incidence rates, enabling users to assess the severity of TB relative to population size.

Region-Specific Issues: The layout emphasizes regional challenges, such as higher mortality rates in Southeast Asia or Africa, indicating the need for targeted public health interventions.
### 5.2 Mapchart
Global Distribution: Color intensity on the maps highlights regions with high TB incidence rates, particularly in parts of Africa, Asia, and Eastern Europe, while showing lower rates in other areas.

Interactivity: The two-map setup allows users to zoom in on specific countries for detailed health statistics, enhancing understanding without overwhelming them with information.

Regional Comparison: Users can compare TB incidence rates across countries within a region, helping to identify patterns or disparities that can inform public health interventions.

Contextual Information: Additional data, such as population, TB-HIV percentages, and mortality rates, provides a comprehensive view of TB's impact, aiding comparisons between countries with similar incidence rates but different healthcare challenges.

Data Visualization and Awareness: This map-based approach effectively visualizes the global spread of TB, raising awareness about high-incidence countries and fostering discussions on prevention and treatment strategies.
### 5.3 Timeline
High Incidence in Developing Regions: Countries in regions like AFR (Africa) often show higher mortality and incidence rates, reflecting ongoing challenges in TB control and healthcare infrastructure.

Improvement in Some Regions: Over time, some regions (e.g., EUR - Europe) may show a decrease in mortality and incidence, indicating successful public health efforts.

Country-Specific Analysis: Countries like India or China, with large populations, might show significant fluctuations in incidence and mortality rates due to their size and the scale of their public health measures.
### 5.4 Hierarchical Tree Map
Regional TB Incidence Comparison: Users can visually assess TB incidences across regions, with larger and darker rectangles indicating higher rates, which can inform targeted interventions and resource allocation.

Focus on Specific Countries: Clicking on a country provides detailed TB statistics, helping users understand localized issues.

Exploring Multiple Metrics: Users can switch between various metrics, such as incidence and mortality rates, offering a comprehensive view of the TB situation and highlighting differences in healthcare quality or reporting.

Global Overview: The initial global view enables quick identification of regions with the highest TB burden, facilitating further analysis or intervention efforts.
### 5.5 Sunburst Chart
Regional Comparison: The sunburst chart provides a clear visual representation of TB incidence rates across different regions. Users can quickly identify which regions have higher TB rates based on the size and color of the segments.

Country-Level Details: The hierarchical structure allows for detailed comparisons between countries within each region. By clicking on a region, users can zoom in to explore individual countries' TB incidence rates.

Interactive Exploration: The chart's interactivity allows users to explore the data dynamically. They can zoom into specific regions or countries, making it easy to discover patterns or anomalies at different levels of the hierarchy.

Data Granularity: This chart is highly useful for data sets with multiple hierarchical levels, as it makes it easy to navigate and analyze data at different levels of granularity.

## 6. Conclusion
This project successfully integrates multiple TB-related datasets into a unified, preprocessed dataset that can be used for comprehensive analysis. The dashboard created for visualizing TB trends across countries and regions is an effective tool for identifying key trends and insights. By analyzing the incidence, mortality, and case fatality ratios, users can better understand the global TB burden and identify areas in need of intervention. Future improvements could include incorporating more granular data, such as specific interventions and policies, to assess their impact on TB outcomes.
