import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actor } from 'src/app/models/actor';
import { DataWarehouse } from 'src/app/models/data-warehouse';
import { AuthService } from 'src/app/services/auth.service';
import { DataWarehouseService } from 'src/app/services/data-warehouse.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dataWarehouse: DataWarehouse;
  ratioChart: any;
  topSearchesChart: any;
  actor: Actor;

  constructor(
    private dataWarehouseService: DataWarehouseService,
    private authService: AuthService,
    private router: Router
  ) {
    this.dataWarehouse = new DataWarehouse();
    this.actor = new Actor();
  }

  ngOnInit(): void {
    const query = {};
    this.dataWarehouseService.getIndicators().subscribe((dataWarehouse) => {
      this.dataWarehouse = dataWarehouse[0];
      console.log(this.dataWarehouse);
      this.ratioChart = this.getRatioOfApplicationsByStatus();
      this.topSearchesChart = this.getTopSearchedKeyWords();
    });
    this.actor = this.authService.getCurrentActor();
  }

  getRatioOfApplicationsByStatus() {
    const labels = new Array();
    const data = new Array();
    this.dataWarehouse.ratioOfApplicationsByStatus.forEach((dict) => {
      labels.push(dict._id);
      data.push(dict.numApplications);
    });
    return new Chart('ratioChart', {
      type: 'doughnut',
      data: {
        labels,
        datasets: [
          {
            label: $localize`Ratio of applications by status`,
            data,
            backgroundColor: [
              '#122c91',
              '#2a6fdb',
              '#48bad6',
              '#81e9e6',
              '#bfdffe',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: 20
        },
        plugins: {
          title: {
            display: true,
            text: 'Ratio of applications by status',
            font: {
              family: "'Reem Kufi', sans-serif",
              size: 18,
            },
            color: '#0e2649',
          },
          legend: {
            position: 'top',
            labels: {
              font: {
                family: "'Reem Kufi', sans-serif",
                size: 16,
              },
            },
          },
        },
      },
    });
  }

  getTopSearchedKeyWords() {
    const topSearched = this.dataWarehouse.topSearchedKeywords;
    const labels = new Array();
    const data = new Array();
    topSearched.forEach((dict) => {
      labels.push(dict._id || 'Blank');
      data.push(dict.totalSearches);
    });
    return new Chart('topSearchesChart', {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: $localize`Top searched keywords`,
            data,
            backgroundColor: [
              '#122c91',
              '#2a6fdb',
              '#48bad6',
              '#81e9e6',
              '#bfdffe',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        layout: {
          padding: 10
        },
        plugins: {
          title: {
            display: true,
            text: 'Top searched keywords',
            font: {
              family: "'Reem Kufi', sans-serif",
              size: 18,
            },
            color: '#0e2649',
          },
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            ticks: {
              font: {
                family: "'Reem Kufi', sans-serif",
                size: 16,
              },
            },
          },
        },
      },
    });
  }

}
