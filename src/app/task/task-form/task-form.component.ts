import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { toDoI } from '../../model/model';
import { TaskMasterService } from '../../service/task-master.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  standalone: false,
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit {

  toDoFrom!: FormGroup
  taskID:any;
  taskListData : toDoI[] = []
  isEditMode: boolean = false;
  constructor(private fb :FormBuilder, private service :TaskMasterService,private route:Router, private activeRoute :ActivatedRoute){
    this.toDoFrom = this.fb.group({
      assignedTo: ['',Validators.required],
      status: ['',Validators.required],
      dueDate: ['',Validators.required],
      priority: ['',Validators.required],
      description:['',Validators.required]
    })

  }

  ngOnInit() {
      console.log("ng")
     this.activeRoute.queryParams.subscribe(params => {
        this.taskID = params['id'];
        console.log("Task ID from query params:", this.taskID);
        if (this.taskID) {
          this.isEditMode = true; 
        }
      })
      this.service.todo$.subscribe((res:toDoI[])=>{
        this.taskListData = JSON.parse(JSON.stringify(res));
        console.log("Task List Data:", this.taskListData);
      })
  }

getTaskbyId(){
  this.service.getTaskById(this.taskID).subscribe((res:toDoI)=>{
    this.toDoFrom.patchValue({ 
      assignedTo: res.assignedTo,
      status: res.status,
      dueDate: res.dueDate,
      priority: res.priority,
      description: res.description
     })
    })
  }

onSubmit(data :toDoI){
  if(this.isEditMode){
    this.service.updateApi(data,this.taskID).subscribe((res:toDoI)=>{
      console.log("Updated:",res);
      
      this.toDoFrom.reset();
      this.route.navigate(['/list']);
    })
  }else{
      this.service.postApi(data).subscribe((res:toDoI)=>{
        console.log("Posted:",res);
        this.service.todo$.next([...this.service.todo$.getValue(), res]);
        this.toDoFrom.reset();
        // this.route.navigate(['/list']);
      })
    }

}

  }



