import * as echarts from 'echarts'
export function createPieChart(divName, dataArray) {
    var chart = echarts.init(document.getElementById(divName));
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            left: 0,
            data: dataArray.map(item => item.name)
        },
        series: [
            {
                name: 'Source',
                type: 'pie',
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: true,
                        position: 'inside',
                        formatter: '{d}%',
                    },
                },
                data: [
                    ...dataArray
                ]
            }
        ]
    }
    chart.setOption(option)
    window.addEventListener('resize', function () {
        chart.resize();
    });
}
export function createMultiChart(divName, dataArray, xaxis, yaxis, nameArray) {
    var chart = echarts.init(document.getElementById(divName))
    var option = {
        tooltip: {
            formatter: '{a}:{c}  @ {b}'
        },
        xAxis: {
            data: dataArray[nameArray[0]].map(item => item[xaxis]),
            name: 'Time'
        },
        legend: {
            orient: 'horizontal',
            y: 'bottom',
            data: nameArray,
            fontSize: 30,
            // left: 250
        },
        yAxis: [{ name: 'Amount', position: 'left', interval: 20 }, {
            name: 'Revenue', position: 'right', interval: 20
        }
        ],
        series: [
            {
                data: dataArray[nameArray[0]].map(item => item[yaxis]),
                type: 'bar',
                // stack: 'y',
                name: nameArray[0],
                // formatter: '{ d }'
            },
            {
                data: dataArray[nameArray[1]].map(item => item[yaxis]),
                type: 'bar',
                // stack: 'y',
                name: nameArray[1]

            },
            {
                data: dataArray[nameArray[2]].map(item => item[yaxis]),
                type: 'line',
                // stack: 'x',
                name: nameArray[2]

            }
        ]
    }
    chart.setOption(option)
    window.addEventListener('resize', function () {
        chart.resize();
    });
}

export function createChart(divName, dataArr) {
    var Chart = echarts.init(document.getElementById(divName))
    var option = {
        title: {
            text: 'The Number of Outputs'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{c}"
        },
        legend: {
            orient: 'vertical',
            data: ["Output's Amounts"],
            right: '37%',
            bottom: 10
        },
        xAxis: {

            min: 0,
            // max: 3,
            // text: 'Amounts'
        },
        yAxis:
        {
            // name: '#Outputs',
            name: "Amounts",

            data: dataArr.map(item => item.OutputAmount),

        }
        ,
        series: [{
            name: "Output's Amounts",
            type: 'bar',
            data: dataArr.map(item => item.Stats),
            itemStyle: {
                borderRadius: 5,
                borderWidth: 1,
                borderType: 'solid',
                borderColor: '#73c0de',
                shadowColor: '#5470c6',
                shadowBlur: 3,
                color: '#91cc75',
                // barWidth: '2%'
                // barMaxWidth:2
            }
        }]
    }
    Chart.setOption(option)
    window.addEventListener('resize', function () {
        Chart.resize();
    });
}