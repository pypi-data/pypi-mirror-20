
Artifact PonyExpress (or simply Pony) is an artifact repository and package manager that aims to simplify software modules integration into big projects. It is designed with native (read modern C++) development in mind but it is usefull everywhere there is an environment to setup in order to transform versioned data using any software.

Note: As pony works well with binary components, the transformation function (the tool used to transform data) itself may be a packaged component.

Pony use MongoDB as backend to store your packages and meta-informations so a running local or remote MongoDB database is needed in order to use pony. The pony's MongoDB database is the **pony_store** and the only collection it uses as a repository is named **packages**.

You can perform two main operation from the pony command line:

  - **charge** the pony to deliver your artifact to clients.
  - **deliver** dependencies of the working artifact to users.


