import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import CreateProjectForm from "../Project/CreateProjectForm";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { PersonIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/Redux/Auth/Action";

const Navbar = () => {
  const {auth} = useSelector(store=>store)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const handleLogout =()=>{
    dispatch(logout())
  }
  return (
    <div className="border-b py-4 px-5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <p onClick={()=>navigate("/")} className="cursor-pointer font-bold text-xl">Project Execution Hub </p>
        <Dialog>
          <DialogTrigger>
            <Button variant="secondary">New Project </Button>
          </DialogTrigger>
    
          <DialogContent className="bg-white">
          <DialogHeader>Create New Project </DialogHeader>
            <CreateProjectForm />
          </DialogContent>
        </Dialog>
        <Button onClick={()=>navigate("/upgrade_plan")} variant="secondary">Upgrade </Button>
      </div>
      <div className="flex gap-3 items-center">
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button variant="outline" size="icon" className="rounded-full border-2 border-gray-500">
                    <PersonIcon/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent style={{ display: 'inline-block', minWidth: '70px', maxWidth: '200px' }}>
                <DropdownMenuItem 
                onClick={handleLogout}
                className="cursor-pointer">Logout </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        <p>{auth.user?.fullName}</p>
      </div>
    </div>
  );
};

export default Navbar;
