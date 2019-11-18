$(function () {
    var timePosted;
    var arr = [];
    $.get("https://api.weather.gov/gridpoints/OAX/82,59/forecast")
        .done(function (data) {
            timePosted = data.properties.generatedAt;
            for (var itm = 0; itm < data.properties.periods.length; itm++) {
                var obj = {
                    name: data.properties.periods[itm].name,
                    temperature: data.properties.periods[itm].temperature + " " + data.properties.periods[itm].temperatureUnit,
                    windSpeed: data.properties.periods[itm].windSpeed,
                    windDirection: data.properties.periods[itm].windDirection,
                    icon: data.properties.periods[itm].icon,
                    shortForecast: data.properties.periods[itm].shortForecast
                }
                arr.push(obj);
            }

            $("#footer").html("<div>Generated at: " + timePosted + "</div>");

            var table = $("<table>");
            table.addClass("table");
            var thead = $("<thead>");
            var header_cells =
                "<th>When</th>" +
                "<th>Icon</th>" +
                "<th>Temperature</th>" +
                "<th>Wind speed</th>" +
                "<th>Wind direction</th>" +
                "<th>Forecast</th>";
            thead.append(header_cells);
            table.append(thead);

            var table_contents = []
            table_contents.push("<tbody>");

            for (var itm = 0; itm < arr.length; itm++) {
                var trow =
                    '<tr>' +
                    '<td>{name}</td>' +
                    '<td><img src="{icon}"></td>' +
                    '<td>{temperature}</td>' +
                    '<td>{windSpeed}</td>' +
                    '<td>{windDirection}</td>' +
                    '<td>{shortForecast}</td>' +
                    '</tr>';

                trow = trow
                    .replace("{name}", arr[itm].name)
                    .replace("{icon}", arr[itm].icon)
                    .replace("{temperature}", arr[itm].temperature)
                    .replace("{windSpeed}", arr[itm].windSpeed)
                    .replace("{windDirection}", arr[itm].windDirection)
                    .replace("{shortForecast}", arr[itm].shortForecast);

                table_contents.push(trow);
            }
            table_contents.push("</tbody>");
            table.append(table_contents.join(''));

            $("#weatherForecast").append(table);
        })
        .fail(function (responseText, textStatus, req) {
            console.info(textStatus);
        })
        .always(function () {

        });
});