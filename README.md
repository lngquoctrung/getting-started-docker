# GETTING STARTED WITH DOCKER

## What is Docker?

**Docker** is an open source platform used to automatically deploy, maintain, manage and run applications in containers. **A container** is a lightweight, independence init that contains resources, libraries and necessary dependencies for an application to run in any environments, from persional computers to cloud systems.

## Benefits of Docker

1. Containerization: This is not the same as **the traditional virtual machine (VMs)**, Docker uses the containers to package their applications and running environments. The containers share kernel of the host operating systems, which helps them to be lighter and restart faster with VMs.

2. Portability: The applications run in the containers which can work uniform on the difference environments (Example: development, test, or production environments)

3. Resource efficiency: The containers is lighter than VMs because they share the OS kernel of host, they don't need to the entire operating system like VMs.

4. Isolation: Each container runs independently, without effecting each other. This makes sure that the applications or services do not conflict about dependencies, software versions or configurations.

5. Scalability: Docker supports easy scaling, especially when combined with tools like **Docker Swarm** or **Kubernetes**. We can replicate containers to handle advanced load balancing.

## Terms in Docker

1. Container

## How to run a container

```bash
    docker run -d --name nginx 
```
