import { Component, Input, inject } from "@angular/core";
import IClassRoom from "src/app/interface/IClassRoom.interface";
import { DataService } from "../services/data.service";

@Component({
    selector: 'app-classroom-card',
    templateUrl: './classroom-card.component.html',
    styleUrls: ['./classroom-card.component.css']
})


export class ClassroomCardComponenet{
  @Input() classRoom! :IClassRoom
  dataService= inject(DataService)
  tags!: string[];
  ngOnInit() {
    this.dataService.addTags(this.classRoom._id).subscribe((res: any) => {
      console.log(res.data[0]?.tags);
      this.tags = res.data[0]?.tags
    })


  }
}
