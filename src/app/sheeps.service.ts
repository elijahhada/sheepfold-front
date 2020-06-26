import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SheepModel } from './sheep-model';
import { SheepfoldModel } from './sheepfold-model';
import { InfoModel } from './info-model';

@Injectable({
  providedIn: 'root'
})
export class SheepsService {

  constructor(private http: HttpClient) {}

  public GetAllSheeps(): Observable<SheepModel[]>{
  	return this.http.get<SheepModel[]>('/get-all-sheeps');
  }

  public addNewSheep(formData: FormData): Observable<SheepModel>{
  	return this.http.post<SheepModel>('/add-new-sheep', formData);
  }

  public removeSheep(formData: FormData): Observable<SheepModel>{
  	return this.http.post<SheepModel>('/remove-sheep', formData);
  }

  public transferSheep(formData: FormData): Observable<SheepModel>{
  	return this.http.post<SheepModel>('/transfer-sheep', formData);
  }

  public GetTimeAndInfo(): Observable<InfoModel>{
  	return this.http.get<InfoModel>('/get-info');
  }

  public SetTimeAndInfo(formData: FormData): Observable<InfoModel>{
  	return this.http.post<InfoModel>('/save-time', formData);
  }
}
