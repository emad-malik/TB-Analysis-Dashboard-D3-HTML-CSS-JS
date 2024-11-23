// Setting the dimensions dynamically for the treemap
const treeWidth = document.getElementById("tree-container").offsetWidth;
const treeHeight = 400; 
const tree_margins = { top: 20, right: 30, bottom: 40, left: 50 };

// Create SVG for the treemap
const treeSVG = d3.select("#tree-container")
    .append("svg")
    .attr("width", treeWidth)
    .attr("height", treeHeight)
    .append("g")
    .attr("transform", `translate(${tree_margins.left},${tree_margins.top})`);


const tree_tooltip = d3.select("#tree_tooltip");

// Loading the data in D3
d3.csv("data/preprocessed_data_tb.csv").then(function (data) {
    console.log("Data loaded successfully:", data);

    // Data parsing
    data.forEach(d => {
        d.e_inc_num = +d.e_inc_num;
        d.e_inc_100k = +d.e_inc_100k;
    });

    // Filter menu based on regions
    const regions = Array.from(new Set(data.map(d => d.g_whoregion)));
    const dropdown = d3.select("#regionSelect");
    regions.forEach(region => {
        dropdown.append("option").text(region).attr("value", region);
    });

    // Function to load the treemap
    function loadTreemap(region) {
        // Filter data based on region
        const filteredData = region === "All" ? data : data.filter(d => d.g_whoregion === region);

        // Creating hierarchical data structure
        const nestedData = d3.group(filteredData, d => d.g_whoregion, d => d.country);
        const root = d3.hierarchy({
            name: "World",
            children: Array.from(nestedData, ([region, countries]) => ({
                name: region,
                children: Array.from(countries, ([country, values]) => ({
                    name: country,
                    ...values[0],
                }))
            }))
        })
            .sum(d => d.e_inc_num) // Rectangles size based on incidence
            .sort((a, b) => b.value - a.value);

        // D3 treemap layout
        const treemapLayout = d3.treemap()
            .size([treeWidth - tree_margins.left - tree_margins.right, treeHeight - tree_margins.top - tree_margins.bottom])
            .padding(1);
        treemapLayout(root);

        // Colors based on per 100k column
        const colorScale = d3.scaleSequential(d3.interpolateReds)
            .domain([0, d3.max(filteredData, d => d.e_inc_100k)]);

        // Adding a legend
        const legendWidth = 200;
        const legendHeight = 20;

        // Append a group for the legend
        // const legend = d3.select("body")
        //     .append("svg")
        //     .attr("width", legendWidth + tree_margins.left + tree_margins.right)
        //     .attr("height", legendHeight + 50)
        //     .append("g")
        //     .attr("transform", `translate(${tree_margins.left}, 20)`);

        // // Color scale for legend
        // const legendScale = d3.scaleLinear()
        //     .domain(colorScale.domain())
        //     .range([0, legendWidth]);

        const gradient = legend.append("defs")
            .append("linearGradient")
            .attr("id", "legend-gradient")
            .attr("x1", "0%")
            .attr("x2", "100%")
            .attr("y1", "0%")
            .attr("y2", "0%");

        gradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", d3.interpolateReds(0));

        gradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", d3.interpolateReds(1));

        // Draw the rectangle for the gradient
        legend.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", legendWidth)
            .attr("height", legendHeight)
            .style("fill", "url(#legend-gradient)");

        // Legend axis
        const legendAxis = d3.axisBottom(legendScale)
            .ticks(5)
            .tickFormat(d3.format(".0f"));

        legend.append("g")
            .attr("transform", `translate(0, ${legendHeight})`)
            .call(legendAxis)
            .attr("class", "legend-axis");

        // Data binding for nodes
        const rect_nodes = treeSVG.selectAll("rect")
            .data(root.leaves(), d => d.data.name);

        // Joining nodes with transitions
        rect_nodes.join(
            enter => enter.append("rect")
                .attr("class", "tree_node")
                .attr("x", d => d.x0)
                .attr("y", d => d.y0)
                .attr("width", d => d.x1 - d.x0)
                .attr("height", d => d.y1 - d.y0)
                .attr("fill", d => colorScale(d.data.e_inc_100k))
                .on("mouseover", (event, d) => {
                    tree_tooltip.transition().duration(200).style("opacity", 1);
                    tree_tooltip.html(`
                        <b>Country:</b> ${d.data.country}<br>
                        <b>Region:</b> ${d.data.g_whoregion}<br>
                        <b>Incidence:</b> ${d.data.e_inc_num}<br>
                        <b>Rate:</b> ${d.data.e_inc_100k} per 100k
                    `)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 28) + "px");
                })
                .on("mouseout", () => {
                    tree_tooltip.transition().duration(200).style("opacity", 0);
                })
                .on("click", (event, d) => {
                    // Highlight clicked node
                    d3.selectAll(".node").classed("highlighted", false);
                    d3.select(event.target).classed("highlighted", true);
                    alert(`Clicked on ${d.data.country}`);
                }),
            update => update
                .transition()
                .duration(500)
                .attr("x", d => d.x0)
                .attr("y", d => d.y0)
                .attr("width", d => d.x1 - d.x0)
                .attr("height", d => d.y1 - d.y0)
                .attr("fill", d => colorScale(d.data.e_inc_100k)),
            exit => exit.remove()
        );

        // Add/update text labels
        const labels = treeSVG.selectAll("text")
            .data(root.leaves(), d => d.data.name);

        labels.join(
            enter => enter.append("text")
                .attr("x", d => d.x0 + 5)
                .attr("y", d => d.y0 + 15)
                .text(d => d.x1 - d.x0 > 50 && d.y1 - d.y0 > 20 ? d.data.country : "")
                .attr("font-size", "10px")
                .attr("fill", "black")
                .attr("pointer-events", "none"),
            update => update
                .transition()
                .duration(500)
                .attr("x", d => d.x0 + 5)
                .attr("y", d => d.y0 + 15)
                .text(d => d.x1 - d.x0 > 50 && d.y1 - d.y0 > 20 ? d.data.country : ""),
            exit => exit.remove()
        );
    }

    // Initial treemap with all regions
    loadTreemap("All");

    // Update on dropdown change
    dropdown.on("change", function () {
        const selectedRegion = this.value;
        loadTreemap(selectedRegion);
    });
}).catch(error => {
    console.error("Error loading the data:", error);
});
