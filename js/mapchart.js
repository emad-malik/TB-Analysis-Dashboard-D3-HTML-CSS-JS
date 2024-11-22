const width = 1200, height = 600;

// Set up the map projection and path
const projection = d3.geoMercator().scale(150).translate([width / 2, height / 1.5]);
const path = d3.geoPath().projection(projection);

const svg = d3.select("svg");

// Set up color scale
const colorScale = d3.scaleSequential(d3.interpolateReds)
    .domain([0, 500]);  // Adjust domain based on max `e_inc_100k`

// Add Legend
const legendHeight = 200;
const legendWidth = 20;

const legend = svg.append("g")
    .attr("class", "legend")
    .attr("transform", `translate(${width - 50}, 50)`); // Move legend to the right side

const legendScale = d3.scaleLinear()
    .domain(colorScale.domain())
    .range([legendHeight, 0]);

const legendAxis = d3.axisRight(legendScale)
    .ticks(5);

legend.selectAll("rect")
    .data(d3.range(0, 500, 10)) // Change range and step if needed
    .enter().append("rect")
    .attr("y", d => legendScale(d))
    .attr("width", legendWidth)
    .attr("height", 10)
    .attr("fill", d => colorScale(d));

legend.append("g")
    .attr("transform", `translate(${legendWidth}, 0)`)
    .call(legendAxis);

legend.append("text")
    .attr("x", -50)
    .attr("y", -10)
    .style("font-size", "14px")
    .style("text-anchor", "middle")
    .text("TB Incidence (per 100k)");

// Load GeoJSON and CSV data
Promise.all([
    d3.json("https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson"),
    d3.csv("data/preprocessed_data_tb.csv")
]).then(([geoData, csvData]) => {
    
    // Map CSV data with GeoJSON
    const dataMap = new Map(csvData.map(d => [d.iso3, d]));

    // Create a group element for all map elements (to apply zoom behavior)
    const mapGroup = svg.append("g");

    // Draw map paths within the group
    mapGroup.selectAll("path")
        .data(geoData.features)
        .enter().append("path")
        .attr("class", "country")
        .attr("d", path)
        .attr("fill", d => {
            const iso3 = d.properties.ISO_A3;
            const value = dataMap.get(iso3) ? +dataMap.get(iso3).e_inc_100k : null;
            return value ? colorScale(value) : "#eee";
        })
        .on("mouseover", function (event, d) {
            const iso3 = d.properties.ISO_A3;
            const data = dataMap.get(iso3);

            // Display tooltip
            const tooltipHtml = `
                <strong>${d.properties.ADMIN}</strong><br>
                Estimated Population: ${data ? data.e_pop_num : "N/A"}<br>
            
                TB Incidence Number: ${data ? data.e_inc_num : "N/A"}<br>
                TB-HIV Percentage: ${data ? data.e_tbhiv_prct : "N/A"}%<br>
                Mortality Excluding TB-HIV (per 100k): ${data ? data.e_mort_exc_tbhiv_100k : "N/A"}<br>
            `;

            d3.select("body").append("div").attr("class", "tooltip")
                .html(tooltipHtml)
                .style("left", (event.pageX + 5) + "px")
                .style("top", (event.pageY - 28) + "px");
            
            d3.select(this).attr("fill", "orange");
        })
        .on("mousemove", function(event) {
            d3.select(".tooltip")
                .style("left", (event.pageX + 5) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function () {
            d3.select(this).attr("fill", d => {
                const iso3 = d.properties.ISO_A3;
                const value = dataMap.get(iso3) ? +dataMap.get(iso3).e_inc_100k : null;
                return value ? colorScale(value) : "#eee";
            });
            d3.select(".tooltip").remove();
        })
        .on("click", function(event, d) {
            const iso3 = d.properties.ISO_A3;
            const data = dataMap.get(iso3);

            // Highlight clicked country
            mapGroup.selectAll("path").classed("highlight", false);  // Reset previous highlights
            d3.select(this).classed("highlight", true);  // Highlight the clicked country

            // Display the info panel
            const infoPanel = document.getElementById("info-panel");
            infoPanel.style.display = "block";
            infoPanel.innerHTML = `
                <strong>${d.properties.ADMIN}</strong><br>
                Estimated Population: ${data ? data.e_pop_num : "N/A"}<br>
                
                TB Incidence Number: ${data ? data.e_inc_num : "N/A"}<br>
                TB-HIV Percentage: ${data ? data.e_tbhiv_prct : "N/A"}%<br>
                Mortality Excluding TB-HIV (per 100k): ${data ? data.e_mort_exc_tbhiv_100k : "N/A"}<br>
            `;
            infoPanel.style.left = `${event.pageX + 10}px`;
            infoPanel.style.top = `${event.pageY - 100}px`;
        });

    // Add zoom and pan functionality
    const zoom = d3.zoom()
        .scaleExtent([1, 8])  // Min and max zoom levels
        .translateExtent([[0, 0], [width, height]])  // Limits to the SVG area
        .on("zoom", (event) => {
            mapGroup.attr("transform", event.transform);
            mapGroup.selectAll("path").attr("d", path);
        });

    svg.call(zoom);  // Apply the zoom behavior to the SVG container

}).catch(error => console.error(error));