const url = 'https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_WEEKLY&symbol=BTC&market=BRL&apikey=YGW4V7E762HZ1D5D';
const url2 = 'https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_WEEKLY&symbol=ETH&market=BRL&apikey=YGW4V7E762HZ1D5D'
const url3 = 'https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_WEEKLY&symbol=LTC&market=BRL&apikey=YGW4V7E762HZ1D5D'
var items = [];
var labels = [];

//Variável que contêm os dados da API
var chartData = {
        bitcoin: [],
     //   etherium:[],
     //   litecoin:[]
     //Tentativa de adicionar novas cryptomoedas ao gráfico

}

/**
 * loadCanvas é o criador do Chart.js
 * Ele gera o Canvas com o Gráfico, porém os dados já devem ter sido coletados
 * para que alguma imagem seja gerada
 */
function loadCanvas() {
    var ctx = $('#mychart');

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: option
    });
}

/**
 * Essa variável difine os atributos do gráfico, cada "dataset" equivale a uma linha no canvas
 * chartDAta é preenchido com dados pela função loadCurrData().
 */
var data = {
    labels: labels,
    datasets: [
        {
        label: "Bitcoin em Reais",
        type: "line",
        borderColor: "#b71c1c",
        data: chartData.bitcoin,
        fill: false
        }
   //Tentativa de adicionar novas cryptomoedas ao gráfico
   // , {        
   //     label: "Etherium em Reais",
   //     type: "line",
   //     borderColor: "#880e4f",
   //     data: chartData.etherium,
   //     fill: false
   //   }, {        
   //     label: "Litecoin em Reais",
   //     type: "line",
   //     borderColor: "#4a148c   ",
   //     data: chartData.litecoin,
   //     fill: false
   //   }
    ]
    
};

var option = {
    responsive: false,
    scales: {
        yAxes: [{
            stacked: true,
            gridLines: {
                display: true,
                color: "rgba(255,99,132,0.2)"
            }
        }],
        xAxes: [{
            gridLines: {
                display: false
            }
        }]
    }
};

/**
 * Essa função puxa os dados da API e carrega eles em na variável chartData. 
 */
function loadCurrData() {
    $.getJSON(url, function (data) {
        console.log(data);
        $.each(data["Time Series (Digital Currency Weekly)"], function (key, val) {
            labels.unshift(key)
            var currencyValue = parseFloat(val["4a. close (BRL)"]).toFixed(2)
            chartData.bitcoin.unshift(currencyValue);
        });   
    });
    //Tentativa de adicionar novas cryptomoedas ao gráfico
    //$.getJSON(url2, function (data) {
    //    console.log(data);
    //    $.each(data["Time Series (Digital Currency Weekly)"], function (key, val) {
    //        currencyValue = parseFloat(val["4a. close (BRL)"]).toFixed(2)
    //        chartData.etherium.unshift(currencyValue);
    //    });   
    //});   
    //$.getJSON(url3, function (data) {
    //    console.log(data);
    //    $.each(data["Time Series (Digital Currency Weekly)"], function (key, val) {
    //            currencyValue = parseFloat(val["4a. close (BRL)"]).toFixed(2)
    //        chartData.litecoin.unshift(currencyValue);
    //    });   
    //});
}

/**
 * Executa a função loadCurrData() ao carregar a página
 */
(function OnInit(){
    loadCurrData();
})()
