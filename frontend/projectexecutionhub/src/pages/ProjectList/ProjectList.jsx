import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MagnifyingGlassIcon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons";

import React, { useEffect, useState } from "react";
import ProjectCard from "../Project/ProjectCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects, searchProjects } from "@/Redux/Project/Action";

export const tags = [
  "All",
  "React",
  "Nextjs",
  "Spring Boot",
  "Mysql",
  "MongoDB",
  "Angular",
  "Python",
  "Flask",
  "Django",
];

const ProjectList = () => {
  const [keyword, setKeyword] = useState("");
  const [filters, setFilters] = useState({ category: "all", tag: "all" });
  const { project } = useSelector((store) => store);
  const dispatch = useDispatch();

  

  const fetchFilteredProjects = (updatedFilters) => {
    // Fetch projects using the combined filters
    const params = {};
    if (updatedFilters.category !== "all") {
      params.category = updatedFilters.category;
    }
    if (updatedFilters.tag !== "all") {
      params.tag = updatedFilters.tag;
    }
    dispatch(fetchProjects(params));
  };

  const handleFilterCategory = (value) => {
    const updatedFilters = { ...filters, category: value };
    setFilters(updatedFilters);
    fetchFilteredProjects(updatedFilters);
  };

  const handleFilterTags = (value) => {
    const updatedFilters = { ...filters, tag: value };
    setFilters(updatedFilters);
    fetchFilteredProjects(updatedFilters);
  };

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
    dispatch(searchProjects(e.target.value));
  };

  

  return (
    <>
      <div className="relative px-4 lg:px-0 lg:flex gap-5 justify-center py-4">
        <section className="filterSection">
          <Card className="p-4 sticky top-10">
            <div className="flex justify-between lg:w-[20rem]">
              <p className="text-xl -tracking-wider">Filters</p>
              <Button variant="ghost" size="icon">
                <MixerHorizontalIcon />
              </Button>
            </div>
            <CardContent className="mt-0 h-[70vh] overflow-hidden">
              <ScrollArea className="flex flex-col space-y-1 h-full overflow-y-auto">
                {/* Category Section */}
                <div className="flex-shrink-0">
                  <h1 className="pb-1 text-black-400 border-b">Category</h1>
                  <div className="pt-0">
                    <RadioGroup
                      className="space-y-1 pt-4"
                      defaultValue="all"
                      onValueChange={handleFilterCategory}
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="all" id="r1" />
                        <Label htmlFor="r1">All</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="frontend" id="r2" />
                        <Label htmlFor="r2">Frontend</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="backend" id="r3" />
                        <Label htmlFor="r3">Backend</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="fullstack" id="r4" />
                        <Label htmlFor="r4">Fullstack</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                {/* Tag Section */}
                <div className="pt-5 flex-shrink-0">
                  <h1 className="pb-1 text-black-400 border-b">Tags</h1>
                  <div className="pt-0">
                    <RadioGroup
                      className="space-y-1 pt-4"
                      defaultValue="all"
                      onValueChange={handleFilterTags}
                    >
                      {tags.map((item) => (
                        <div key={item} className="flex items-center gap-2">
                          <RadioGroupItem value={item} id={`r1-${item}`} />
                          <Label htmlFor={`r1-${item}`}>{item}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </section>
        <section className="projectListSection w-full lg:w-[48rem]">
          <div className="flex gap-2 items-center pb-5 justify-between">
            <div className="relative p-0 mt-3 w-full">
              <Input
                onChange={handleSearchChange}
                placeholder="search project"
                className="40% px-9"
              />
              <MagnifyingGlassIcon className="absolute top-3 left-4" />
            </div>
          </div>
          <div>
            {/* <div className="space-y-5 min-h-[74vh]">
              {keyword
                ? project.searchProjects?.map((item) => (
                    <ProjectCard item={item} key={item.id} />
                  ))
                : project.projects?.map((item) => (
                    <ProjectCard key={item.id} item={item} />
                  ))}
            </div> */}

<div className="space-y-5 min-h-[74vh]">
  {keyword && project.searchProjects?.length
    ? project.searchProjects.map((item) =>
        item?.id ? <ProjectCard item={item} key={item.id} /> : null
      )
    : project.projects?.length
    ? project.projects.map((item) =>
        item?.id ? <ProjectCard key={item.id} item={item} /> : null
      )
    : <p></p>}
</div>

          </div>
        </section>
      </div>
    </>
  );
};

export default ProjectList;

