import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalConfigService } from 'src/app/global-config.service';
import { GlobalConfig } from 'src/app/models/global-config';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-finder-config',
  templateUrl: './finder-config.component.html',
  styleUrls: ['./finder-config.component.scss']
})
export class FinderConfigComponent implements OnInit {

  configForm: FormGroup;
  globalConfig: GlobalConfig;

  constructor(
    private globalConfigService: GlobalConfigService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.configForm = this.fb.group({
      defaultLanguage: [''],
      cacheLifetime: ['', Validators.required],
      numResults: ['', Validators.required],
      sponsorshipFlatRate: [''],
      dataWhRefresh: ['']
    });
    this.globalConfig = new GlobalConfig();
  }

  ngOnInit(): void {
    this.globalConfigService.getConfig().subscribe((data: any) => {
      this.globalConfig = data[0];
      this.configForm.controls['cacheLifetime'].setValue(this.globalConfig.cacheLifetime);
      this.configForm.controls['numResults'].setValue(this.globalConfig.numResults);
    });
  }

  updateFinderConfig() {
    const config = this.configForm.value;
    config.defaultLanguage = this.globalConfig.defaultLanguage;
    config.sponsorshipFlatRate = this.globalConfig.sponsorshipFlatRate;
    config.dataWhRefresh = this.globalConfig.dataWhRefresh;
    this.globalConfigService.updateConfig(config).subscribe((data: any) => {});
  }

}
