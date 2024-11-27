import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { assignedUserToIssue } from "@/Redux/Issue/Action";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const UserList = ({issueDetails}) => {

  const {project}=useSelector(store=>store)
  const dispatch = useDispatch();

  const handleAssignIssueToUser=(userId)=>{
    dispatch(assignedUserToIssue({issueId: issueDetails.id, userId}))
  }

  return (
    <>
      <div className="space-y-1 ">
        <div className="border rounded-md ">
          <p className="py-2 px-3 bg-blue-200"> {issueDetails.assignee?.fullName || "Unassignee"}</p>
        </div>
        {project.projectDetails?.team.map((item)=> <div 
        onClick={()=>handleAssignIssueToUser(item.id)}
        key={item} className="py-0 group cursor-pointer flex items-center space-x-4 rounded-md border px-4 bg-blue-100">
            <Avatar className="cursor-pointer w-10 h-10 rounded-full bg-blue-200" >
                <AvatarFallback>
                    {item.fullName[0]}
                </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
            <p className="text-sm leading-none">{item.fullName}</p>
            <p className="text-sm text-muted-foreground">@{item.fullName.toLowerCase()} </p>
            </div>
        </div>)}
       
      </div>
    </>
  );
};

export default UserList;
