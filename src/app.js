const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
   const {title, url, techs} = request.body;
   
   const repository = {
     id : uuid(),
     title,
     url,
     techs,
     likes : 0
   }

   repositories.push(repository);   

   return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  
  const repositoryIndex = repositories.findIndex( (value, index, arraySelf) => value.id === id);

  if (repositoryIndex>-1) {
    //repositories[repositoryIndex].likes ++;    
    repositories[repositoryIndex].title = title;
    repositories[repositoryIndex].url = url;
    repositories[repositoryIndex].techs = techs;    
    return response.json(repositories[repositoryIndex]);
  } else {
    return response.status(400).json("Repository not found");
  }

  

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  repositoryIndex = repositories.findIndex( (value, index, arraySelf) => value.id === id )
  if (repositoryIndex>-1) { 
    repositories.splice(repositoryIndex, 1);
    return response.status(204).json(repositories);
  } else {
    return response.status(400).json(repositories);
  }
  

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  
  //repositoryIndex = repositories.findIndex( (value, index, arraySelf) => value.id === id);
  repository = repositories.find( (value, index, arraySelf) => value.id === id);

  if (repository === undefined )  {
    return response.status(400).json("Repository not found")
  } else {
    repository.likes+=1;
    return response.json(repository);
  
  }
     //else {
  //   ;
  // }

  
  
});

module.exports = app;
