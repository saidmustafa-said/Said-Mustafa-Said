for project_type → Defines whether it's:
"individual" → You did it alone
"team" → You worked on it with others
"small_task" → A minor task, not a full project
all are individual

for all the fields if not mentions in the md file, leave it empty:
{
  "project_name": "",
  "description": "",
  "year": "",
  "month": "",
  "role": "",
  "project_type": "", 
  "technologies_used": [
    {
      "name": "",
      "description": ""
    }
  ],
  "infrastructure": [
    {
      "name": "",
      "description": "",
      "steps": []
    }
  ],
  "skills_required": [
    {
      "name": "",
      "description": ""
    }
  ],
  "challenges_faced": [
    {
      "name": "",
      "description": ""
    }
  ],
  "outcomes": [
    {
      "name": "",
      "description": ""
    }
  ],
  "links": [
    {
      "name": "",
      "url": ""
    }
  ]
}

fill the things that is missing if possible but dont force

use the shared structure and put my projects shared below in the same format each in sepereate json file:

<!-- -------------------------------------------------------------------------------- -->

17 :
<!-- @format -->

## Overview:

This project involved creating an automated AWS infrastructure using Terraform to provision and manage a variety of services for a cloud-based application. Key resources included VPC, EKS, RDS, MongoDB, Elasticache, and Vault HCP for secure management.

## Steps Involved:

### VPC Setup:

- Created a secure Virtual Private Cloud (VPC) for isolated networking.
- Configured networking components to ensure secure communication between services.

### Route 53 Configuration:

- Set up Route 53 for DNS management, directing traffic to AWS resources.
- Ensured proper DNS routing for high availability.

### Application Load Balancer (ALB) Deployment:

- Deployed an ALB to efficiently manage incoming traffic.
- Configured the ALB to direct traffic to applications running on EKS.

### EKS Cluster Provisioning:

- Set up an EKS cluster with six services for container orchestration.
- Ensured seamless deployment and management of containerized applications.

### RDS Integration:

- Integrated AWS RDS to handle relational database management for persistent data storage.

### MongoDB Setup:

- Installed and configured MongoDB as a NoSQL solution for handling unstructured data.

### Elasticache Deployment:

- Implemented Elasticache for in-memory data caching, improving system performance and reducing latency.

### Vault HCP Integration:

- Integrated Vault HCP for managing secrets and ensuring secure configuration.

### Service Mesh Implementation:

- Set up a service mesh to manage microservice communication, enhancing observability, security, and traffic management.

### Helm Charts:

- Used Helm charts for the easy deployment and management of Kubernetes applications on EKS.

## Skills Required:

- **Terraform**: Used to automate infrastructure provisioning and manage AWS services.
- **AWS Services**: Knowledge of AWS services such as VPC, Route 53, ALB, EKS, RDS, and Elasticache.
- **Kubernetes**: Proficient in managing container orchestration with EKS.
- **Helm Charts**: Experience with Helm for managing Kubernetes applications.
- **Vault HCP**: Expertise in integrating Vault for secure secret management.
- **Service Mesh**: Knowledge of service mesh technologies for microservice communication.
- **Networking**: Familiarity with AWS networking, VPC, Route 53, and load balancing (ALB).
- **Database Management**: Proficiency in both RDS (SQL) and MongoDB (NoSQL).
- **Cloud Security**: Experience in securing cloud environments using best practices and tools like Vault.

		{
			"id": 17,
			"title": "AWS Infrastructure Setup with Terraform",
			"description": "Automated AWS infrastructure provisioning using Terraform, incorporating services like EKS, RDS, MongoDB, and Vault for a cloud-based application setup.",
			"year": 2024,
			"month": 9,
			"topics": [
				"AWS",
				"Terraform",
				"Kubernetes",
				"Cloud Security",
				"Service Mesh",
				"Helm Charts",
				"Database Management"
			]
		},

18:

<!-- @format -->

### Overview

This project implements a Step Functions workflow to automate decision-making processes. The system validates data across checkpoints such as size, color, financial data, sample/serial status, and notifications, ensuring accuracy and efficiency.

---

### Steps Involved

#### Size Check

- Ensures size information is valid and prompts the user if missing.

#### Financial Data Validation

- Verifies completeness of financial data, including raw material, auxiliary material, and labor inputs.

#### Color Check

- Confirms color selection or prompts for input if missing.

#### Sample/Serial Status

- Manages confirmation or cancellation of sample/serial status.

#### Notifications

- Sends alerts or notifications for missing data and provides feedback to users.

---

### Skills Required

- **Workflow Automation:** Designing Step Functions workflows.
- **AWS Services:** Leveraging AWS tools like Lambda and Step Functions.
- **Error Handling:** Implementing robust error tracking and prompts.
- **Data Validation:** Ensuring data accuracy and completeness.

---

### Outcome

The workflow streamlines decision-making processes, enhances data validation, and provides clear feedback to users, all while enabling parallel task execution for efficiency.


		{
			"id": 18,
			"title": "Step Functions Workflow Implementation",
			"description": "A project to automate and manage decision-making processes using AWS Step Functions. It ensures data validation, error handling, and efficient task execution.",
			"year": 2024,
			"month": 9,
			"topics": [
				"Workflow Automation",
				"AWS Step Functions",
				"Data Validation",
				"Error Handling"
			]
		},