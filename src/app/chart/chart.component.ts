import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ChartOptions, ChartType ,ChartDataset} from 'chart.js';
import * as ChartDataLabels from 'chartjs-plugin-datalabels';
import { AuthService } from '../services/auth.service';
import { ProductService } from '../services/product.service';
import { ChartConfiguration, ChartData, ChartEvent } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { x: {}, y: { max :100 }},
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  chartForm:FormGroup;
  charttypes:string[] = ['Top 4','Top 7','Top 10'];
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DataLabelsPlugin];
  public cards:any;
  public barChartLegend = true;
  public barprodList : number[] = [];
  public barviewList: number[] = [];

  public barChartData: ChartData<'bar'> = {
    // labels: [ 'LIME', 'VISHUD', 'SOCH', 'LIBAS', 'GERUA', 'STELLA', 'STELLA' ],
    labels: [],
    datasets: [
      { data: [], label: 'Series A' }
      // { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' }
    ]
  };


  constructor(private productService:ProductService,
    private auth:AuthService,
    private router:Router,
    private fb:FormBuilder) { }

  ngOnInit(): void {
    this.myServices();
    this.chartForm = this.fb.group({
      charttypes :['Top 4']
    })
  }

  myServices() {
    this.productService.getConfig().subscribe(
      datas => {
        let elements= Object.keys(datas);
        let counts = elements.map(key => datas[key]);
        counts.sort(function(a,b){ return b['noofviews'] - a['noofviews']});
        counts = counts.slice(0,5);
        console.log(counts);
        for(let i=0; i < counts.length; i++){
          this.barprodList.push(counts[i]["productname"]);
          console.log(this.barChartData.labels);
         // this.chartData = this.barChartData.labels;
          console.log(this.barprodList);
          this.barviewList.push(counts[i]["noofviews"]);
          this.barviewList = this.barChartData.datasets[0].data;

        }
      })

  }
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }
  changeSuit(e){
    if (!this.auth.IsLogged()){
      this.router.navigate(['/login'])
    }
    else{
      this.chartForm.get('charttypes')?.setValue(e.target.value)
      if(e.target.value =="Top 4"){
        this.barChartData.labels = [];
        this.barChartData.datasets[0].data = [];
        this.productService.getConfig().subscribe(
          datas => {
            let elements= Object.keys(datas);
            let counts = elements.map(key => datas[key]);
            counts.sort(function(a,b){ return b['noofviews'] - a['noofviews']});
            counts = counts.slice(0,5);
            console.log('4 heighest',JSON.stringify(counts));
            console.log(counts.slice(0,5));
            for(let i=0; i < counts.length; i++){
              this.barprodList.push(counts[i]["productname"]);
              barprodList : this.barChartData.labels;
              this.barviewList.push(counts[i]["noofviews"]);
              barviewList : this.barChartData.datasets[0].data;
    
            }
          })

      }
      if(e.target.value =="Top 7"){
        this.barChartData.labels = [];
        this.barChartData.datasets[0].data = [];
        this.productService.getConfig().subscribe(
          datas => {
            let elements= Object.keys(datas);
            let counts = elements.map(key => datas[key]);
            counts.sort(function(a,b){ return b['noofviews'] - a['noofviews']});
            counts = counts.slice(0,9);
            console.log('8 heighest',JSON.stringify(counts));
            console.log(counts.slice(0,9));
            for(let i=0; i < counts.length; i++){
              this.barprodList.push(counts[i]["productname"]);
              barprodList : this.barChartData.labels;
              this.barviewList.push(counts[i]["noofviews"]);
              barviewList : this.barChartData.datasets[0].data;
    
            }
          })

      }
      if(e.target.value =="Top 10"){
        this.barChartData.labels = [];
        this.barChartData.datasets[0].data = [];
        this.productService.getConfig().subscribe(
          datas => {
            let elements= Object.keys(datas);
            let counts = elements.map(key => datas[key]);
            counts.sort(function(a,b){ return b['noofviews'] - a['noofviews']});
            counts = counts.slice(0,11);
            console.log('10 heighest',JSON.stringify(counts));
            console.log(counts.slice(0,11));
            for(let i=0; i < counts.length; i++){
              this.barprodList.push(counts[i]["productname"]);
              barprodList : this.barChartData.labels;
              this.barviewList.push(counts[i]["noofviews"]);
              barviewList : this.barChartData.datasets[0].data;
    
            }
          })

      }
    }

  }

}
