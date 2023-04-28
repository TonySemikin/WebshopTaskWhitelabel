# Tony's Web Shop - Technical Showcase

## Table of Contents

1. [Overview](#overview)
   1. [About](#about)
   2. [Architectural Design Overview](#architectural-design-overview)
2. [Server](#server)
   1. [Modular Single-Process Server](#modular-single-process-server)
   2. [API](#api)
      1. [GraphQL (Public)](#graphql-public)
      2. [REST (Admin)](#rest-admin)
   3. [Hexagon Design](#hexagon-design)
   4. [DDD](#ddd)
3. [Client](#client)
   1. [View Based Design](#view-based-design)
   2. [Context API](#context-api)
   3. [Container/Component Pattern](#containercomponent-pattern)
   4. [Styles](#styles)
4. [Infrastructure](#infrastructure)
   1. [Kubernetes Cluster](#kubernetes-cluster)
5. [Local Setup](#local-setup)
   1. [Preferred Way - Local k8s Cluster](#preferred-way---local-k8s-cluster)
   2. [Manual Setup](#manual-setup)
6. [Tests](#tests)
   1. [Test Data](#test-data)
   2. [Unit Tests](#unit-tests)
   3. [API Tests](#api-tests)
   4. [E2E Tests](#e2e-tests)

## 1. Overview <a name="overview"></a>

### 1.1 About <a name="about"></a>

This demo web shop application has been developed for as a quick technical task, showcasing my skills as a full-stack Software Engineer. The project is designed to demonstrate proficiency in various technologies and design patterns, highlighting my ability to deliver quality software solutions. If you want to jump right into the local setup, follow the [instructions in this link](#local-setup).

### 1.2 Architectural Design Overview <a name="architectural-design-overview"></a>

The application is built with a modular single-process server using the Nest.js framework and follows both Hexagon and Domain Driven Design principles for better organization and maintainability. The server offers a GraphQL API for public clients and a REST API for admin purposes. The client is a React SPA built with Apollo Client and uses SCSS for styling, global theming with CSS variables, and Ant Design as a component library. Lastly, the application is containerized and can be deployed on a Kubernetes cluster.

For more details on the architectural design, please refer to the `docs` directory in the repository or click [here](./docs).

## 2. Server <a name="server"></a>

### 2.1 Modular Single-Process Server <a name="modular-single-process-server"></a>

The server is built on top of the Nest.js framework as a single-process Node.js server. However, it has been designed to be framework-agnostic, which means that it can be easily adapted to other frameworks or technologies if required.

The server follows a strict modular structure that promotes extendability and maintainability. Each module is responsible for a specific part of the application and can be developed and tested independently. This modular approach allows us to scale the application easily and split it into microservices when needed. By doing this, we can ensure that our server remains flexible and robust, ready to adapt to any future requirements.

### 2.2 API <a name="api"></a>

By leveraging the [Hexagon Design](#hexagon-design), we can implement various API styles on top of the same service or application layer. This approach decouples the external representation of the data from the core application logic, allowing us to serve different types of clients and use cases without impacting the underlying system. This design choice leads to a more flexible and maintainable architecture.

#### 2.2.1 GraphQL (Public) <a name="graphql-public"></a>

The GraphQL API is designed for public client consumption, tailoring the API to meet the specific needs of our React UI. This API allows client to request exactly the data it needs, reducing the amount of over- or under-fetching. Alternatively, it can be split into a standalone Backend-for-Frontend (BFF) adapter, which can further optimize the API for individual client requirements and improve the overall performance and maintainability of the system.

#### 2.2.2 REST (Admin) <a name="rest-admin"></a>

The REST API is designed for inventory management by potential administrators or maintainers of the system. It demonstrates how different APIs can be seamlessly integrated on top of the same core system, catering to various use cases and clients. By implementing the REST API alongside the GraphQL API, I showcase the flexibility and adaptability of the system.

### 2.3 Hexagon Design <a name="hexagon-design"></a>

Each module mentioned in the [Modular Single-Process Server](#modular-single-process-server) section follows the Hexagon Design, also known as Ports and Adapters or Clean Architecture. This design pattern reinforces the concepts described above, promoting a flexible and maintainable structure. By adhering to these principles, we can ensure that our application's core logic remains independent of external influences, such as frameworks, libraries, or APIs.

### 2.4 DDD <a name="ddd"></a>

Each module and the system as a whole adhere to Domain Driven Design (DDD) principles. The strategic design aspect of DDD is applied through the separation of specific subdomains, such as User, Shopping, Cart, Checkout, and Payment. To see the component diagram illustrating these subdomains, please refer to [C3 Component Diagram](./docs/c3_component_diagram.jpg).

Additionally, I incorporate tactical DDD patterns, such as Entities and Value Objects, to further refine and model the domain, ensuring that our application is well-structured, maintainable, and adaptable to future changes.

## 3. Client <a name="client"></a>

The client is a Single Page Application (SPA) built using plain React and Apollo Client. It serves as the public-facing client for our webshop.

### 3.1 View Based Design <a name="view-based-design"></a>

The client code is split into two sections: the common section, which covers cross-cutting concerns and global components, and the views section, which focuses on strictly representational concerns and improved code organization. This separation ensures that the client's structure is tailored to the frontend requirements, rather than mirroring the backend structure.

### 3.2 Context API <a name="context-api"></a>

The application utilizes React's built-in Context API for global state management instead of Redux. While Redux offers a structured pattern for managing state, the Context API can work as efficiently or even better, if properly organized and maintained. By leveraging the Context API, we can achieve similar results while keeping the application lightweight and free of additional dependencies.

### 3.3 Container/Component Pattern <a name="containercomponent-pattern"></a>

In this application, I partially adopted the Container/Component separation pattern. Although the separation could have been cleaner given more time, it is still beneficial to set an objective for such a separation. The Container/Component pattern helps create a clear distinction between components responsible for handling data and logic (containers) and those focused on the presentation (components), resulting in a more maintainable and organized codebase.

### 3.4 Styles <a name="styles"></a>

The application uses SCSS as a style preprocessor. Global theming is achieved through the use of CSS variables and a dedicated React context. Additionally, Ant Design is used as a component design library for the user interface. This was my first experience with Ant Design, and although it provided some benefits, there were aspects that were not that good, specifically customizability, which is the issue for most material design libraries anyways.

## 4. Infrastructure <a name="infrastructure"></a>

### 4.1 Kubernetes Cluster <a name="kubernetes-cluster"></a>

The application is built as a containerized solution on top of Kubernetes. While using Kubernetes for this technical task may be considered overkill, it could be a suitable choice for real-life webshop. But also, implementing a Kubernetes setup demonstrates my ability to do it, since the task is anyways about showcasing skills.

## 5. Local Setup <a name="local-setup"></a>

### 5.1 Preferred Way - Local k8s Cluster <a name="preferred-way---local-k8s-cluster"></a>

_Note: This instruction is for Mac users (as the most popular platform). Reach out to me if you need instructions for Windows or Linux._

1. If you don't have Docker Desktop, install it. I have version 4.18.0 (104112), but it should work on earlier versions too.
2. Enable Kubernetes in Docker Desktop settings.
3. Make sure you have `kubectl` installed by running `which kubectl`. If you don't have `kubectl`, install it with `brew install kubectl`. If you don't use Homebrew, consider installing it.
4. Make sure you have the ingress-controller installed by running `kubectl get pods --namespace=ingress-nginx`. If no pods are logged, install ingress by running the following command:

`kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.7.0/deploy/static/provider/cloud/deploy.yaml`

Wait for the ingress to start (check the Docker Desktop dashboard). 5. Create a k8s namespace: `kubectl create namespace web-shop-showcase` 6. Install Skaffold (an infrastructure management tool) by running `brew install skaffold` 7. Navigate to the `./infrastructure/local` directory in your bash or zsh terminal and run `skaffold dev`. The initial process will take some time due to building images, but then you will have hot reloading and a convenient setup.

**Troubleshooting:**

1. Sometimes when running `skaffold dev` for the first time, it may have a hard time starting even after all images are built. Just kill the process and start `skaffold dev` again; the issue usually appears only once.

2. After running `skaffold dev`, you might see that Docker cannot access the admission webhook. If you don't have a current k8s setup running for your other projects and you know what you're doing, try running:

`kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission`

3. It can happen that Skaffold suddenly cannot connect to the Docker daemon, even though it is clearly running. If you know what you're doing, you can try:

`sudo ln -s "$HOME/.docker/run/docker.sock" /var/run/docker.sock`

### 5.2 Manual Setup <a name="manual-setup"></a>

You can opt out of the k8s setup and start all the components manually. It is quite easy to do. Follow these steps:

1. Make sure you have MongoDB running locally with an exposed port (look in the web for instructions on how to run MongoDB locally).
2. Provide a `.env` file in the server directory (you can use `.env-example` for reference).
3. Start the server with with `npm start`.
4. Start the client normally with `npm start` (just make sure it points to the proper server port). By default, it is `:80`. Also make sure your client URL, including the port, is included in the `ALLOWED_ORIGINS` entry in the server `.env` file.

## 6. Tests <a name="tests"></a>

### 6.1 Test Data <a name="test-data"></a>

Before running test data script, make sure the server is running without any issues. Follow these steps to generate test data:

1. Navigate to the `thunder-tests/mocks` directory in your terminal. You should see two files: `create-test-data.sh`, a bash script that can be used to automate API calls and generate test entries, and `test-data.json`, which is a data package for the script.
2. Make sure you have proper access modifier for the script file by running `chmod +x create-test-data.sh`.
3. Run `brew install jq`. This is a utility for parsing JSON files. If you don't have Homebrew, consider installing it, or find another way to install `jq`.
4. Run `./create-test-data.sh createCategory "Fruits"`. The category name input should match the category name in `test-data.json` file.
5. Then run `./create-test-data.sh createProducts "Fruits" <category ID>`, where `<category ID>` is the ID that was output by the previous command.
6. If you want, repeat the process for other categories available in `test-data.json`.

If you don't want to use the script, you can still create test data using thunder-client in VS Code as described [here](#api-tests)

### 6.2 Unit Tests <a name="unit-tests"></a>

In this project, an example of unit tests was implemented for the `Product` entity in the Shopping subdomain. To run unit tests, navigate to the server directory and run `npm run test`. Note that this is just for demonstration purposes and is not intended to provide complete test coverage.

### 6.3 API Tests <a name="api-tests"></a>

A Thunder Collection was created for this project to run REST API tests, covering all inventory management endpoints. To try out these tests, you can install the Thunder Client extension in VS Code. Console options are also available, if needed. Similar tests could be done for the GraphQL API.

### 6.4 E2E Tests <a name="e2e-tests"></a>

A very simple example of end-to-end (E2E) test was implemented in this project, although I am not an expert in this area and had to ask for some help from my wife to move forward quickly. To run the E2E tests, navigate to the `client` directory and run `npm run e2e` to see the test running in the browser, or `npm run e2e:silent` for console output only.
