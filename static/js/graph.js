queue()
    .defer(d3.json, "/data")
    .await(makeGraphs);


function makeGraphs(error, projectsJson) {
    document.getElementById("loading").style.display = "none";
    document.getElementById("blocks").style.display = "inline-block";
    //var data = projectsJson;


    projectsJson.forEach(function(d) {
        d["total_gross"] = +d["gross"];

    });

    projectsJson.forEach(function(d) {
        d["profit"] = d["gross"] - d["budget"];

    });


    //Create a Crossfilter instance
    var ndx = crossfilter(projectsJson);


    //Define Dimensions

    var dateDim = ndx.dimension(function(d) {
        return d["title_year"];
    });

    var genreDim = ndx.dimension(function(d) {
        return d["genres"];
    });
    //
    var grossDim = ndx.dimension(function(d) {
        return d["gross"];
    });
    // //

    var titleDim = ndx.dimension(function(d) {
        return d["movie_title"]
    });

    var imdbDim = ndx.dimension(function(d) {
        return d["imdb_score"]
    });


    //
    // // //
    // var totalMoviesDim = ndx.dimension(function (d) {
    //     return d["total_movies"];
    // });


    //Calculate metrics
    //     var genres = genreDim.group();
    var numProjectsByDate = dateDim.group();
    var numProjectsByGenre = genreDim.group();

    var totalGross = ndx.groupAll().reduceSum(function(d) {
        return d["gross"];
    });

    var totalMovies = ndx.groupAll().reduceSum(function(d) {
        return d["total_films"];
    });

    var totalBudget = ndx.groupAll().reduceSum(function(d) {
        return d["budget"];
    });

    var filmBudget = titleDim.group().reduceSum(function(d) {
        return d["budget"]
    });

    var filmGross = titleDim.group().reduceSum(function(d) {
        return d["gross"]
    });

    var filmProfit = dateDim.group().reduceSum(function(d) {
        return d["profit"]
    });

    var filmLeader = titleDim.group().reduceSum(function(d) {
        return d["profit"]
    });

    var imdbRating = titleDim.group().reduceSum(function(d) {
        return d["imdb_score"]
    });

    var imdbYear = dateDim.group().reduceSum(function(d) {
        return d["imdb_score"]
    });
    //
    var bubbleList = titleDim.group().reduce(
        function(p, v) {
            p.fBudget += +v["budget"] / 1000000;
            p.imdbRating += +v["imdb_score"];
            p.fGross += +v["gross"] / 1000000;
            return p;
        },
        function(p, v) {
            p.fBudget -= +v["budget"] / 1000000;
            p.imdbRating -= +v["imdb_score"];
            p.fGross -= +v["gross"] / 1000000;
            return p;
        },
        function() {
            return { fBudget: 0, imdbRating: 0, fGross: 0 }
        }
    );


    //Define values (to be used in charts)
    var minDate = dateDim.bottom(1)[0]["title_year"];
    var maxDate = dateDim.top(1)[0]["title_year"];

    //Charts
    var timelineChart = dc.lineChart("#time-line-chart");
    var timeChart = dc.barChart("#num-movies-per-year");
    var topMovieChartbyYear = dc.lineChart("#highest-rated-chart");
    var genreChart = dc.rowChart("#funding-by-genre-row-chart");


    var budgetChart = dc.pieChart("#most-expensive-pie-chart");

    var numberFormat = d3.format(".0f");

    var dollarFormat = function(d) { return '$' + d3.format(',f')(d) };

    timelineChart
        .width(600)
        .height(200)
        .margins({ top: 10, right: 50, bottom: 30, left: 80 })
        .dimension(dateDim)
        .group(filmProfit)
        .transitionDuration(500)
        // .x(d3.time.scale().domain([minDate, maxDate]))
        .x(d3.scale.linear().domain([minDate, maxDate]))
        .elasticY(true)
        .xAxisLabel("Year")
        // .tickFormat(d3.format("s"))
        .yAxis().ticks(6);


    timeChart
        .ordinalColors(["#ffd847", "#f58277", "#6dc2e8", "#07b6ca", "#9178ea", "#ffbd49", "#3ce6ab", "#ffd847", "#f58277"])
        .width(600)
        .height(200)
        .margins({ top: 10, right: 50, bottom: 30, left: 50 })
        .dimension(dateDim)
        .group(numProjectsByDate)
        .transitionDuration(500)
        // .x(d3.time.scale().domain([minDate, maxDate]))
        .x(d3.scale.linear().domain([minDate, maxDate]))
        .elasticY(true)
        .xAxisLabel("Year")
        .yAxis().ticks(4);
    /*
      
    */

    //      .ordering(function (d) {
    //     return -d.value;
    // })
    // topMovieChart.data(function (group) {
    //     return group.top(10);
    // });

    genreChart
        .ordinalColors(["#ffd847", "#f58277", "#6dc2e8", "#9178ea", "#07b6ca"])
        .width(400)
        .height(250)
        .dimension(genreDim)
        .group(numProjectsByGenre)
        .xAxis().ticks(10);
    genreChart.ordering(function(d) {
        return -d.value
    });
    genreChart.rowsCap([5]);
    genreChart.othersGrouper(false);


    budgetChart
        .ordinalColors(["#ffd847", "#f58277", "#6dc2e8", "#9178ea", "#07b6ca"])
        .height(250)
        .width(500)
        .radius(125)
        .innerRadius(30)
        .transitionDuration(1500)
        .dimension(titleDim)
        .group(filmBudget);
    budgetChart.ordering(function(d) {
        return -d.value
    });
    budgetChart.slicesCap([5]);
    budgetChart.othersGrouper(false);



    topMovieChartbyYear
        .width(400)
        .height(250)
        .margins({ top: 30, right: 50, bottom: 50, left: 50 })
        .dimension(dateDim)
        .group(imdbYear)
        .transitionDuration(1500)
        .x(d3.scale.linear().domain([minDate, maxDate]))
        .yAxisLabel("IMDB Score")
        .xAxisLabel("Year")
        .elasticX(true)
        .elasticY(true)
        .xAxis().ticks(10);

    dc.renderAll();

}