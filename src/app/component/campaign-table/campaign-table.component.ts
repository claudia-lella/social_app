import { Component, Input} from '@angular/core';
import { Campaign } from 'src/app/model/campaign';

@Component({
  selector: 'app-campaign-table',
  templateUrl: './campaign-table.component.html',
  styleUrls: ['./campaign-table.component.css']
})
export class CampaignTableComponent {

@Input() campaigns:Campaign[] = [];

}
