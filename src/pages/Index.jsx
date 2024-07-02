import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTask, setEditTask] = useState(null);
  const [editTaskText, setEditTaskText] = useState("");

  const addTask = () => {
    if (newTask.trim() === "") {
      toast.error("Task cannot be empty");
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: newTask }]);
    setNewTask("");
    toast.success("Task added");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast.success("Task deleted");
  };

  const startEditTask = (task) => {
    setEditTask(task);
    setEditTaskText(task.text);
  };

  const saveEditTask = () => {
    if (editTaskText.trim() === "") {
      toast.error("Task cannot be empty");
      return;
    }
    setTasks(tasks.map((task) => (task.id === editTask.id ? { ...task, text: editTaskText } : task)));
    setEditTask(null);
    setEditTaskText("");
    toast.success("Task updated");
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Todo App</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-4">
            <Input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task"
              className="flex-1"
            />
            <Button onClick={addTask}>Add</Button>
          </div>
          <ScrollArea className="h-64">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between mb-2">
                <span>{task.text}</span>
                <div className="flex space-x-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button variant="outline" size="sm" onClick={() => startEditTask(task)}>
                          Edit
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Edit Task</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button variant="destructive" size="sm" onClick={() => deleteTask(task.id)}>
                          Delete
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Delete Task</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>

      {editTask && (
        <Dialog open={editTask !== null} onOpenChange={() => setEditTask(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Label htmlFor="editTask">Task</Label>
              <Textarea
                id="editTask"
                value={editTaskText}
                onChange={(e) => setEditTaskText(e.target.value)}
                placeholder="Edit your task"
              />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setEditTask(null)}>
                  Cancel
                </Button>
                <Button onClick={saveEditTask}>Save</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Index;