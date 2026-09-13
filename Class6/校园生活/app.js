let barDom = document.getElementById('barChart');
let barChart = echarts.init(barDom);
let pieChart = null;
let rawData = null;

$.getJSON('data/consume.json')
.done(function(res){
    $('#statusTip').hide();
    rawData = res;
    renderChart(res);
})
.fail(function(){
    $('#statusTip').removeClass('loading').addClass('error').text('数据加载失败，请检查文件路径！');
})

function renderChart(data){
    const barOption = {
        title:{text:"月度消费金额柱状图"},
        xAxis:{type:'category',data:data.month},
        yAxis:{type:'value',name:'金额(元)'},
        series:[{type:'bar',data:data.amount}]
    };
    barChart.setOption(barOption);

    const ctx = document.getElementById('pieChart').getContext('2d');
    pieChart = new Chart(ctx,{
        type:'pie',
        data:{
            labels:data.category,
            datasets:[{data:data.percent}]
        },
        options:{
            plugins:{title:{display:true,text:"消费分类占比饼图"}}
        }
    })
}

$("#showAll").click(function(){
    if(!rawData) return;
    renderChart(rawData);
});
$("#showHigh").click(function(){
    if(!rawData) return;
    let filterMonth = [];
    let filterAmount = [];
    rawData.month.forEach((m,i)=>{
        if(rawData.amount[i]>1300){
            filterMonth.push(m);
            filterAmount.push(rawData.amount[i]);
        }
    })
    if(filterMonth.length ===0){
        $('#statusTip').removeClass('loading error').addClass('empty').text('筛选后无匹配数据！');
        $('#statusTip').show();
    }else{
        $('#statusTip').hide();
        barChart.setOption({
            xAxis:{data:filterMonth},
            series:[{data:filterAmount}]
        })
    }
});

window.addEventListener('resize',()=>{
    barChart.resize();
});