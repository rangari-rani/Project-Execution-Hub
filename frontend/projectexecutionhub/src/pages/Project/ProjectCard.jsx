import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteProject, fetchProjectById } from "@/Redux/Project/Action";

import { DotFilledIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({item}) => {
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const handleDelete=()=>{
    dispatch(deleteProject({projectId : item.id}))
  }

 
  return (
    <div>
      <Card className="p-5 w-full lg:max-w-3xl">
        <div className="space-y-5">
          <div className="space-y-2">
            <div className="flex justify-between">
              <div className="flex items-center gap-7">
                <h1 onClick={()=>navigate("/project/"+item.id)} className="cursor-pointer font-semibold text-lg">
                {item.name}
                </h1>
                <DotFilledIcon />
                <p className="text-sm text-black">{item.category}</p>
              </div>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button className="rounded-full" variant="destructive" size="icon">
                      <DotsVerticalIcon />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent style={{ display: 'inline-block', minWidth: '70px', maxWidth: '200px' }}>
                    <DropdownMenuItem>Update</DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <p className="text-black text-sm ">
              {item.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            {item.tags.map((tag)=><Badge key={item} variant="destructive">{tag}</Badge>)}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProjectCard;
