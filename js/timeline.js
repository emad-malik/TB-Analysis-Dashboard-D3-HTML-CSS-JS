// Setting up the visualization
const margins = { top: 20, right: 30, bottom: 40, left: 50 };
const width = 800 - margins.left - margins.right;
const height = 400 - margins.top - margins.bottom;


// load the timeline visualization in dboard
const svg = d3.select("#timeline-container")
        .append("svg")
        .attr("width", width + margins.right + margins.left)
        .attr("height", height + margins.top + margins.bottom)
        .append("g")
        .attr("transform", `translate(${margins.left},${margins.top})`);

const tooltip = d3.select("#tooltip");

// Loading the data in D3
d3.csv("data/preprocessed_data_tb.csv").then(function(data) {
    console.log("Data loaded successfully:", data);

    // Data parsing
    data.forEach(d => {
        d.year = +d.year;
        d.e_inc_100k = +d.e_inc_100k;
    });

    // Extract unique years for x-axis ticks
    const uniqueYears = [...new Set(data.map(d => d.year))];
    const allRegions = [...new Set(data.map(d => d.g_whoregion))];

    // Randomly selecting 10 countries
    const allCountries = [...new Set(data.map(d => d.country))];
    const randomCountries = d3.shuffle(allCountries).slice(0, 10);
    const selectedData = data.filter(d => randomCountries.includes(d.country));

    // Color scale
    const colorScale = d3.scaleOrdinal()
        .domain(allRegions)
        .range(d3.schemeCategory10);

    // X and Y axis scales
    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.year))
        .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.e_inc_100k)])
        .range([height, 0]);

    // Adding x-axis
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale)
            .tickValues(uniqueYears)
            .tickFormat(d3.format("d")))
        .append("text")
        .attr("class", "axis-label")
        .attr("x", width / 2)
        .attr("y", 35)
        .attr("fill", "black")
        .style("text-anchor", "middle")
        .text("Year");

    // Adding y-axis
    svg.append("g")
        .call(d3.axisLeft(yScale))
        .append("text")
        .attr("class", "axis-label")
        .attr("x", -height / 2)
        .attr("y", -40)
        .attr("fill", "black")
        .style("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .text("TB Incidence Rate (per 100,000)");

    // Line chart
    const line = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.e_inc_100k));

    // Grouping data by country
    const groupedby_country = d3.group(selectedData, d => d.country);

    // Append SVG with attributes
    const paths = svg.selectAll(".line")
        .data(groupedby_country)
        .join("path")
        .attr("class", "line")
        .attr("id", d => `line-${d[0]}`)
        .attr("fill", "none")
        .attr("stroke", d => colorScale(d[1][0].g_whoregion))
        .attr("stroke-width", 1.5)
        .attr("d", d => line(d[1]))
        .on("mouseover", function(event, d) {
            tooltip.style("opacity", 1)
                .html(`Country: <b>${d[0]}</b><br>Region: <b>${d[1][0].g_whoregion}</b>`)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 28) + "px");

            d3.select(this).attr("stroke-width", 3);
        })
        .on("mousemove", function(event) {
            tooltip.style("left", (event.pageX + 10) + "px")
                   .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function() {
            tooltip.style("opacity", 0);
            d3.select(this).attr("stroke-width", 1.5);
        });

    // Animation variables
    let i = 0;
    let animationInterval;
    let isPaused = false;

    // Animation function
    function animated_trend() {
        if (isPaused) return;

        if (i < uniqueYears.length) {
            let currentYear = uniqueYears[i];

            groupedby_country.forEach(function(value, key) {
                const currentData = value.filter(d => d.year <= currentYear);

                d3.select(`#line-${key}`)
                    .datum(currentData)
                    .transition()
                    .duration(500)
                    .attr("d", line);
            });
            i++;
        }
    }

    // Start animation
    function startAnimation() {
        animationInterval = d3.interval(animated_trend, 1000);
    }

    startAnimation();

    // Pause/resume animation
    d3.select("#pause-btn").on("click", function() {
        isPaused = !isPaused;

        if (isPaused) {
            d3.select("#pause-btn").text("Resume Animation");
            animationInterval.stop();
        } else {
            d3.select("#pause-btn").text("Pause Animation");
            startAnimation();
        }
    });

    // Slider to update chart
    d3.select("#date-slider").on("input", function() {
        const sliderValue = +this.value;
        d3.select("#slider-value").text(sliderValue);

        paths.each(function(d) {
            const filteredData = d[1].filter(d => d.year <= sliderValue);

            d3.select(this)
                .datum(filteredData)
                .transition()
                .duration(500)
                .attr("d", line);
        });
    });

    // Zoom functionality
    const zoom = d3.zoom()
        .scaleExtent([1, 10])
        .on("zoom", function(event) {
            svg.attr("transform", event.transform);
        });
        svg.call(zoom);

    // Legend
    const legend = d3.select("#legend");

    allRegions.forEach(function(region) {
        legend.append("div")
            .attr("class", "legend-item")
            .html(`<span style="background-color: ${colorScale(region)};"></span> ${region}`);
    });

}).catch(function(error) {
    console.error("Error loading data:", error);
});
