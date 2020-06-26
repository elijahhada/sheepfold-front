import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SheepsService } from '../sheeps.service';
import { SheepModel } from '../sheep-model';
import { SheepfoldModel } from '../sheepfold-model';
import { InfoModel } from '../info-model';

@Component({
  selector: 'app-sheepfold',
  templateUrl: './sheepfold.component.html',
  styleUrls: ['./sheepfold.component.scss']
})
export class SheepfoldComponent implements OnInit {

  constructor(private sheepsService: SheepsService) { }

  sheeps: SheepModel[];
  sheepfold1: SheepModel[];
  sheepfold2: SheepModel[];
  sheepfold3: SheepModel[];
  sheepfold4: SheepModel[];
  seconds: number = 0;
  days: number = 0;
  info: string = '';
  timeAndInfo: InfoModel;

  ngOnInit() {
    this.getAllSheeps();
    this.timing();
    this.assignTime();
  }

  assignTime() {
    this.sheepsService.GetTimeAndInfo().subscribe(
      timeAndInfo => {
        this.days = timeAndInfo.days;
        this.seconds = timeAndInfo.seconds;
      }
    )
  }

  getAllSheeps() {
    this.sheepsService.GetAllSheeps()
    .subscribe(sheeps => {
      this.sheeps = sheeps
      this.distributeSheeps();
    })
  }

  setTimeAndInfo(days: number, seconds: number, info: string) {
    let formData: any = new FormData();
    formData.append("days", days);
    formData.append("seconds", seconds);
    formData.append("info", info);
    this.sheepsService.SetTimeAndInfo(formData)
    .subscribe(info => {
      console.log(info);
    })
  }

  distributeSheeps() {
    this.sheepfold1 = this.sheeps.filter(sh => sh.sheepfold_id == 1);
    this.sheepfold2 = this.sheeps.filter(sh => sh.sheepfold_id == 2);
    this.sheepfold3 = this.sheeps.filter(sh => sh.sheepfold_id == 3);
    this.sheepfold4 = this.sheeps.filter(sh => sh.sheepfold_id == 4);
  }

  timing(){
    setInterval(() => {
      if(this.seconds == 9){
        this.days++;
        this.seconds = 0;
        this.everyDay();
        this.checkIfOnlyOneLeft();
      }else{
        this.seconds++;
      }
      if(this.days!=0 && this.days % 10 == 0 && this.seconds == 0){
        console.log("Decade passed");
        this.everyDecade();
      }
    }, 1000);
  }

  everyDay() {
    let sheepfoldsArray = [];
      if(this.sheepfold1.length >= 2){
        sheepfoldsArray.push(1);
      }
      if(this.sheepfold2.length >= 2){
        sheepfoldsArray.push(2);
      }
      if(this.sheepfold3.length >= 2){
        sheepfoldsArray.push(3);
      }
      if(this.sheepfold4.length >= 2){
        sheepfoldsArray.push(4);
      }
      let sheepfold_id = sheepfoldsArray[this.getRandomInt(sheepfoldsArray.length)];
      let formData: any = new FormData();
      formData.append("id", sheepfold_id);
      this.sheepsService.addNewSheep(formData)
        .subscribe(newSheep => {
          this.sheeps.push(newSheep);
          this.distributeSheeps();
          this.setTimeAndInfo(this.days, this.seconds, "New sheep was added");
        });
  }

  everyDecade() {
    let sheepfoldsArray = [];
    if(this.sheepfold1.length >= 1){
      sheepfoldsArray.push(1);
    }
    if(this.sheepfold2.length >= 1){
      sheepfoldsArray.push(2);
    }
    if(this.sheepfold3.length >= 1){
      sheepfoldsArray.push(3);
    }
    if(this.sheepfold4.length >= 1){
      sheepfoldsArray.push(4);
    }
    if(sheepfoldsArray.length > 0){
      let sheepfold_id = sheepfoldsArray[this.getRandomInt(sheepfoldsArray.length)];
      let sheepfold: SheepModel[];
      if(sheepfold_id==1){
        sheepfold = this.sheepfold1;
      }else if(sheepfold_id==2){
        sheepfold = this.sheepfold2;
      }else if(sheepfold_id==3){
        sheepfold = this.sheepfold3;
      }else if(sheepfold_id==4){
        sheepfold = this.sheepfold4;
      }

      let sheep: SheepModel = sheepfold[this.getRandomInt(sheepfold.length)];
      let formData: any = new FormData();
      formData.append("id", sheep.id);
      this.sheepsService.removeSheep(formData).subscribe(removedSheep => {
        this.getAllSheeps();
        this.distributeSheeps();
        this.setTimeAndInfo(this.days, this.seconds, "One sheep was taken");
      });
    }
  }

  checkIfOnlyOneLeft() {
    if(this.sheepfold1.length<2){
      this.transferOneSheep(this.getBigestSheepfold(), 1);
    }else if(this.sheepfold2.length<2){
      this.transferOneSheep(this.getBigestSheepfold(), 2);
    }else if(this.sheepfold3.length<2){
      this.transferOneSheep(this.getBigestSheepfold(), 3);
    }else if(this.sheepfold4.length<2){
      this.transferOneSheep(this.getBigestSheepfold(), 4);
    }
  }

  getBigestSheepfold() {
    let sheepfoldsArray = [];
    sheepfoldsArray.push(this.sheepfold1);
    sheepfoldsArray.push(this.sheepfold2);
    sheepfoldsArray.push(this.sheepfold3);
    sheepfoldsArray.push(this.sheepfold4);
    var max = 0;
    var index = -1;
    sheepfoldsArray.forEach(function(a, i){
      if (a.length>max) {
        max = a.length;
        index = i;
      }
    });
    if(index==0){
      return 1;
    }else if(index==1){
      return 2;
    }else if(index==2){
      return 3;
    }else if(index==3){
      return 4;
    }
  }

  transferOneSheep(from: number, to: number) {
    let formData: any = new FormData();
    formData.append("from_id", from);
    formData.append("to_id", to);
    this.sheepsService.transferSheep(formData).subscribe(transferedSheep => {
      this.getAllSheeps();
      this.distributeSheeps();
      this.setTimeAndInfo(this.days, this.seconds, "One sheep was transfered");
    });
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  @HostListener('window:beforeunload', ['$event']) onBeforeUnload(event) {
    this.setTimeAndInfo(this.days, this.seconds, "Page reloaded");
  }
}