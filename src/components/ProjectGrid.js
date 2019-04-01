import React, { useState } from "react";
import Project from "./Project";
import { styled } from "linaria/react";
import Card, { CardItem } from "./Card";

const GridContainer = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const ProjectCount = styled.span`
  float: right;
`;

const FilterStatus = styled.label`
    margin-right: 1em;
    span {
        line-height: 20px;
    }

    input {
        position: absolute; // take it out of document flow
        opacity: 0; // hide it
    }
    input + span {
        position: relative;
        cursor: pointer;
        padding: 0;
    }
      
    // Box.
    input + span:before {
        content: '';
        margin-right: 10px;
        margin-top: -4px;
        display: inline-block;
        vertical-align: text-top;
        width: 20px;
        height: 20px;
        background: white;
        outline: 1px solid #03A9F4;
    }
      
    // Box hover
    input:hover + span:before {
        background: #03A9F4;
    }
    
    // Box focus
    input:focus + span:before {
        box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.12);
    }
    
    // Box checked
    input:checked + span:before {
        background: #03A9F4;
    }
    
    // Disabled state label.
    input:disabled + span {
        color: #b8b8b8;
        cursor: auto;
    }
    
    // Disabled box.
    input:disabled + span:before {
        box-shadow: none;
        background: #ddd;
    }
    
    // Checkmark. Could be replaced with an image
    input:checked + span:after {
        content: '';
        display: block;
        position: absolute;
        left: 6px;
        top: -2px;
        width: 5px;
        height: 10px;
        border-bottom: 3px solid white;
        border-right: 3px solid white;
        transform: rotate(45deg);
    }
`;

const order = {
  active: 1,
  wip: 2,
  unmaintained: 3,
  abandoned: 4
};

const titles = {
  active: "Active",
  wip: "Work In Progress",
  unmaintained: "Unmaintained",
  abandoned: "Abandoned"
}

export default function ProjectGrid({ projects }) {
  const [visibleStatus, setStatusVisibility] = useState({
    active: true,
    unmaintained: true,
    wip: true,
    abandoned: false
  });

  const visibleProjects = projects
    .filter(project => visibleStatus[project.status])
    .sort((a, b) => order[a.status] - order[b.status] || a.name - b.name);

  return (
    <>
      <Card>
        <CardItem>
          <ProjectCount>
            {visibleProjects.length} / {projects.length} projects visible
          </ProjectCount>

          {Object.keys(order)
            .filter(status => projects.filter(project => project.status == status).length)
            .map(status => (
            <FilterStatus>
              <input
                type="checkbox"
                checked={visibleStatus[status]}
                onChange={event =>
                  setStatusVisibility({
                    ...visibleStatus,
                    [status]: event.target.checked
                  })
                }
              />
              <span>{titles[status]}</span>
            </FilterStatus>
          ))}
        </CardItem>
      </Card>
      <GridContainer>
        {visibleProjects.map(p => (
          <Project key={p.title} project={p} />
        ))}
      </GridContainer>
    </>
  );
}
