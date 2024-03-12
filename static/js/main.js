// 取得主繪製區域
const myChart = echarts.init(document.getElementById('main'));

$("#update").click(() => {
    
});








// 呼叫後端資料跟繪製
drawPM25();

// 取得後端資料
function drawPM25() {
    myChart.showLoading();
    $.ajax(
        {
            url: "/pm25-data",
            type: "GET",
            dataType: "json",
            success: (result) => {
                $("#pm25_high_site").text(result["highest"]["site"])
                $("#pm25_high_value").text(result["highest"]["pm25"])
                $("#pm25_low_site").text(result["lowest"]["site"])
                $("#pm25_low_value").text(result["lowest"]["pm25"])
                // document.querySelector("#pm25_high_site").innerText = result["highest"]["site"];
                // document.querySelector("#pm25_high_value").innerText = result["highest"]["pm25"];
                // document.querySelector("#pm25_low_site").innerText = result["lowest"]["site"];
                // document.querySelector("#pm25_low_site").innerText = result["lowest"]["pm25"];
                //console.log(result);
                //繪製對應區塊並給予必要參數
                drawChat(myChart, result["datetime"], "PM2.5", result["site"], result["pm25"])
                myChart.hideLoading();
            },
            error :()=>{
                alert("讀取失敗");
                myChart.hideLoading();
            }
        }
    )
}

function drawChat(chart, title, legend, xData, yData) {
    let option = {
        title: {
            text: title
        },
        tooltip: {},
        legend: {
            data: [legend]
        },
        xAxis: {
            data: xData
        },
        yAxis: {},
        series: [
            {
                name: legend,
                type: 'bar',
                data: yData
            }
        ]
    };

    chart.setOption(option);
}