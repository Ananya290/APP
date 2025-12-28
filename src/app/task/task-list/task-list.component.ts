import { Component, OnInit } from '@angular/core';
import { TaskMasterService } from '../../service/task-master.service';
import { toDoI } from '../../model/model';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent  implements OnInit {
  tasks : toDoI[]=[ ]
  selectedAction:string ='';
  constructor(private service: TaskMasterService, private router : Router){}
  ngOnInit() {
      this.loadData()
  }

  loadData(){
    this.service.getAPi().subscribe((res : toDoI[])=>{
      this.tasks = res
      this.service.todo$.next(res);
      console.log(this.tasks)
      console.log([res])
    })
  }
  deleteTask(task:toDoI){
    this.service.deleteApi(task?.id).subscribe((res)=>{
     this.tasks = this.tasks.filter((m)=> m.id != task.id)
     console.log("Deleted",res)
    })
  }
 onEdit(task:toDoI){
  this.router.navigate(['/form'], { queryParams: { id: task.id } });
 }  




}