$(document).ready(function() {

  const trafficLine = $("#trafficLine");
  const dailyBar = $("#dailyBar");
  const mobilePie = $("#mobilePie");
  const trafficTab = $(".trafficTab").children();

  //traffic charts object
  const hourly = {
    labels: ["12AM","1AM","2AM","3AM","4AM","5AM","6AM","7AM","8AM","9AM","10AM","11AM","12PM","1PM","2PM","3PM","4PM","5PM","6PM","7PM","8PM","9PM","10PM","11PM"],
    data: [210, 120, 150, 120, 160, 240, 250,210, 120, 150, 120, 160, 240, 250,210, 120, 150, 120, 160, 240, 250, 180, 200, 160]
  };

  const daily = {
    labels: ["S","M","T","W","T","F","S"],
    data: [210, 120, 150, 120, 160, 240, 250]
  };

  const weekly = {
    labels: ["1-7","8-14","15-21","22-29","30-5","6-13","14-20","21-28","29-5","6-13","14-20"],
    data: [750, 1250, 1000, 1500, 2000, 1500, 1750, 1250, 1750, 2250, 1750, 2250]
  };

  const monthly = {
    labels: ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"],
    data: [1100, 850, 900, 800, 1200, 750, 800, 700, 1100, 1000, 850, 950]
  };

  const tabChange = (label, data) => {

  const trafficObj = {
      type: 'line',
      data: {
        labels: label,
        datasets: [{

          data: data,
          backgroundColor: "rgba(157, 137, 254, 0.3)",
          borderColor: "rgb(157, 137, 254)",
          pointBackgroundColor: '#fff',
          lineTension: 0,
          pointRadius: 5,

        }]
      },
      options: {
        responsive: true,
          scales: {
            yAxes: [{
              gridLines: {
                offsetGridLines: true
              }
            }],
            xAxes: [{
              gridLines: {
                offsetGridLines: true
              }
            }]
          }
      }
    };

  const trafficChart = new Chart(trafficLine,trafficObj);

  };

  trafficTab.on('click', (e) => {

    const target = e.target;
    const tabItems = $(".tabItems");

    if (tabItems.hasClass('selected')) {
      tabItems.removeClass('selected');
    }

    $(target).addClass('selected');
    // get the correct data among tabItems and pass them to updateChart function
    switch(target.id){

      case 'hourly':
        tabChange(hourly.labels, hourly.data);
        break;

      case 'daily':
        tabChange(daily.labels, daily.data);
        break;

      case 'weekly':
        tabChange(weekly.labels, weekly.data);
        break;

      case 'monthly':
        tabChange(monthly.labels, monthly.data);
        break;

      defalut: tabChange(weekly.labels, weekly.data);
        break;
    }

  });

  const dailyChart = new Chart(dailyBar,{
    type: 'bar',
    data: {

      labels: daily.labels,
      datasets: [{

        data: [75, 100, 175, 125, 225,200, 100],
        backgroundColor: "rgb(157, 137, 254)",

      }]

    },
    options: {
      responsive: true,
      scales: {
        xAxes: [{ barPercentage: 0.6 }]
      }
    }
  }); //dailyChart

  const mobileChart = new Chart(mobilePie,{
    type: 'doughnut',
    data: {

      labels: ["Phones","Tablets","Desktop"],
      datasets: [{

        data: [15,15,70],
        backgroundColor: [
          "rgb(129, 195, 123)",
          "rgb(116, 172, 204)",
          "rgb(157, 137, 254)"
        ],
      }]

    },

    options: {
      responsive: true,
      legend: {
        position: 'right',
      }
    }
  });

  tabChange(weekly.labels, weekly.data);

});// document ready
